'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import classNames from 'classnames';
import { useEffect, useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useMutation } from '@tanstack/react-query';
import { BounceLoader } from 'react-spinners';
import { Title } from '@/components';
import { signupErrors } from '@/data/signupErrors';
import { loginUser } from '@/endpoints';
import type { TProvider, TLoginData } from '@/interfaces';
import { emailWhiteList } from '@root/constants';
import styles from './index.module.scss';
import { useUserSession } from '@/hooks';

const AuthProviderButton = dynamic(() => import('@/components/AuthProviderButton').then((module) => module.default));
const Button = dynamic(() => import('@/components/Button').then((module) => module.default));
const Input = dynamic(() => import('@/components/Input').then((module) => module.default));

const providers: Array<TProvider> = [
  {
    id: 'google',
    name: 'Sign In with Google',
    icon: '/icons/brands/google.png',
  },
  {
    id: 'github',
    name: 'Sign In with Github',
    icon: '/icons/brands/github.png',
  },
];

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [signInError, setSignInError] = useState<string>('');
  const { status } = useUserSession();

  const { mutate, isLoading } = useMutation(handleUserLogin, {
    onError: () => {
      setSignInError(signupErrors.SERVER_ERROR);
    },
  });

  useEffect(() => {
    if (status === 'authenticated') router.push('/');
  }, [status]);

  // calls the API to create a new user
  async function handleUserLogin({ email, password }: TLoginData) {
    try {
      const response = await loginUser({ email, password });

      // if the response is not ok, set the error message from the server
      if (!response.ok) {
        setSignInError(response.message);
        return;
      }

      localStorage.setItem('session', JSON.stringify({ user: response.user }));
      router.push('/');
    } catch (error) {
      setSignInError(signupErrors.SERVER_ERROR);
    }
  }

  // validates the form fields
  const validateForm = () => {
    const errors: Record<string, string> = {};

    //* form first step checks
    errors.email =
      //* is email field empty
      (!email ? signupErrors.FIELD_REQUIRED : '') ||
      //* does email contain only valid characters
      !emailWhiteList.test(email)
        ? signupErrors.INVALID_EMAIL
        : '';

    setValidationErrors(errors);

    // checks if there is any error in the form, if so returns true to prevent the submission
    return Object.values(errors).find((error) => error.length);
  };

  const handleSubmission = () => {
    const formIsInvalid = validateForm();
    if (formIsInvalid) return;

    mutate({ email, password });
  };

  return (
    <div className={styles.loginContainer}>
      {status === 'unauthenticated' ? (
        <div className={styles.signInCard}>
          <div className={styles.headingContainer}>
            <Title tagType={'h1'} style={styles.getStartedTitle}>
              Sign in
            </Title>
            <p className={styles.textComplement}>Welcome to the Daily Tide - Let&apos;s sign in your account.</p>
            <p className={styles.textComplement}>
              Alternatively you can <Link href="/auth/signup">sign up</Link>.
            </p>
          </div>
          {Object.values(providers).map((provider: TProvider) => {
            return (
              <AuthProviderButton
                key={provider.id}
                id={`${provider.id}`}
                name={`${provider.name}`}
                onClick={() => signIn(provider.id)}
                icon={`${provider.icon}`}
              />
            );
          })}
          <form
            className={styles.formContainer}
            onSubmit={(e: FormEvent) => {
              e.preventDefault();
              handleSubmission();
            }}
          >
            <>
              <p className={styles.separator}>OR</p>
              <Input
                title="Email"
                placeholder=""
                minLength={6}
                maxLength={50}
                inputType="email"
                value={email}
                className={classNames(styles.input, styles.inputLowercase)}
                handleChange={(emailValue) => {
                  setEmail(emailValue);
                }}
                error={validationErrors.email}
              />
              <Input
                title="Password"
                inputType="password"
                placeholder="Enter your password"
                minLength={8}
                maxLength={16}
                className={styles.input}
                handleChange={(passwordValue: string) => {
                  setPassword(passwordValue);
                }}
                error={validationErrors.password}
              />
            </>
            <Button text={isLoading ? `Signing you in` : 'Sign In'} style={styles.signInButton} type="submit" />
            <BounceLoader loading={isLoading} color="#1d0ddd" size={30} className={styles.spinner} />
            {signInError ? <p className={styles.errorMessage}>{signInError}</p> : null}
          </form>

          <p className={styles.termsDisclaimer}>
            By signing up, you agree to The Daily Tides’s{' '}
            <Link className={styles.link} href="#" rel="noopener noreferrer">
              terms of service
            </Link>{' '}
            and{' '}
            <Link className={styles.link} href="#" rel="noopener noreferrer">
              privacy policy
            </Link>
            .
          </p>
        </div>
      ) : (
        <BounceLoader loading={true} color="#1d0ddd" size={30} className={styles.spinner} />
      )}
    </div>
  );
}
