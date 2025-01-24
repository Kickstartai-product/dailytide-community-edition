import NextAuth, { User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import Auth0Provider from 'next-auth/providers/auth0';
import GitHubProvider from 'next-auth/providers/github';
import { AdapterUser } from 'next-auth/adapters';
import { createProviderUser, validateUserRegistration } from '@/endpoints';

const handler = NextAuth({
  providers: [
    Auth0Provider({
      clientId: `${process.env.AUTH0_CLIENT_ID}`,
      clientSecret: `${process.env.AUTH0_CLIENT_SECRET}`,
      issuer: `${process.env.AUTH0_ISSUER}`,
    }),
    GitHubProvider({
      clientId: `${process.env.GITHUB_ID}`,
      clientSecret: `${process.env.GITHUB_SECRET}`,
      profile: (profile) => {
        const { id, email, name, avatar_url } = profile;

        return {
          id: id,
          name: name || email,
          username: name || email,
          email: email,
          image: avatar_url,
        };
      },
    }),
    GoogleProvider({
      clientId: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
      profile: (profile) => {
        const { sub, email, name, picture, token } = profile;

        return {
          id: sub,
          name: name || email,
          username: name?.replaceAll(' ', '_') || email,
          email: email,
          image: picture,
          token: token,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 30,
    updateAge: 60 * 60, // 1 hours
  },
  pages: {
    signIn: '/auth/signin',
  },

  callbacks: {
    async redirect({ baseUrl }) {
      return baseUrl;
    },
    async signIn({ user }: { user: User | AdapterUser }) {
      if (!user.email) return '/auth/unauthorized';

      const accountDetails = await validateUserRegistration(user);
      if (accountDetails.userExist) {
        user.id = accountDetails.user._id;
        user.token = accountDetails.token;
        return true;
      } else {
        const createdUser = await createProviderUser(user);
        if (!createdUser) return '/auth/unauthorized';
        return true;
      }
    },
    async jwt({ token, user }) {
      if (user?.id) {
        token.uid = user.id;
      }
      if (user?.token) {
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.uid) {
        session.user.id = token.uid as string;
      }
      session.user.email = token.email as string;
      if (token.token) {
        session.user.token = token.token as string;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
