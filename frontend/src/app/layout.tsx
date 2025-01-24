import '@/styles/globals.scss';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import localFont from 'next/font/local';
import { Roboto } from 'next/font/google';
import classNames from 'classnames';
import { config } from '@fortawesome/fontawesome-svg-core';
import { ThemeContextProvider } from '@/contexts/themeContext';
import { ReactQueryProvider, ReduxProvider, AuthenticationProvider } from '@/providers';
import { GoogleAnalytics, GoogleTagManager } from '@/marketing';
import { FavIconData } from '@root/constants';
import styles from './layout.module.scss';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

const Footer = dynamic(() => import('@/components/Footer').then((module) => module), { ssr: false });
const NavBar = dynamic(() => import('@/components/NavBar').then((module) => module), { ssr: false });

export const metadata: Metadata = {
  title: 'The Daily Tide',
  description: 'Daily insights into trending topics, Simplified.',
};

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-roboto',
});

const kickstartFont = localFont({
  src: [
    {
      path: '../../public/fonts/ABCDiatypeSemi-Mono-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ABCDiatypeSemi-Mono-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-kickstartai',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        {FavIconData.map((data, index) => {
          return <link {...data} key={index} />;
        })}
        {process.env.NODE_ENV === 'development' && <GoogleTagManager />}
        <meta name="msapplication-TileColor" content="#ff6400" />
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>
      <>
        <AuthenticationProvider>
          <ThemeContextProvider>
            <ReduxProvider>
              <body className={classNames(kickstartFont.variable, roboto.variable, styles.body)}>
                {process.env.NODE_ENV === 'production' && <GoogleAnalytics />}
                <ReactQueryProvider>
                  <NavBar />
                  {children}
                  <Footer />
                </ReactQueryProvider>
                {process.env.NODE_ENV === 'development' && (
                  <noscript
                    dangerouslySetInnerHTML={{
                      __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}" height="0" width="0" style="display: none; visibility: hidden;"></iframe>`,
                    }}
                  />
                )}
              </body>
            </ReduxProvider>
          </ThemeContextProvider>
        </AuthenticationProvider>
      </>
    </html>
  );
}
