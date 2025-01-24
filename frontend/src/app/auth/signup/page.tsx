'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import classNames from 'classnames';
import ConfettiExplosion from 'react-confetti';
import { useRouter } from 'next/navigation';
import { useEffect, useState, FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import { useMutation } from '@tanstack/react-query';
import { BounceLoader } from 'react-spinners';
import { Title, PasswordMeter } from '@/components';
import { signupErrors } from '@/data/signupErrors';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { createUser } from '@/endpoints';
import type { TSignUpData, TProvider } from '@/interfaces';
import styles from './index.module.scss';
import { emailWhiteList } from '@root/constants';
import { useUserSession } from '@/hooks';

const Button = dynamic(() => import('@/components/Button').then((module) => module.default));
const AuthProviderButton = dynamic(() => import('@/components/AuthProviderButton').then((module) => module.default));
const Input = dynamic(() => import('@/components/Input').then((module) => module.default));

const providers: Array<TProvider> = [
  {
    id: 'google',
    name: 'Sign Up with Google',
    icon: '/icons/brands/google.png',
  },
  {
    id: 'github',
    name: 'Sign Up with Github',
    icon: '/icons/brands/github.png',
  },
];

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isBasicSignUpInCourse, setBasicSignUpInCourse] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [signUpError, setSignUpError] = useState<string>('');
  const [passwordRequirementsStatus, setPasswordRequirementsStatus] = useState<boolean>(false);
  const [isSignupSuccessful, setSignupSuccessful] = useState<boolean>(false);
  const { status } = useUserSession();

  const { mutate, isLoading } = useMutation(handleUserCreation, {
    onError: () => {
      setSignUpError(signupErrors.SERVER_ERROR);
    },
  });

  useEffect(() => {
    if (status === 'authenticated') router.push('/');
  }, [status]);

  // calls the API to create a new user
  async function handleUserCreation({ username, email, password }: TSignUpData) {
    try {
      const response = await createUser({ username, email, password });

      // if the response is not ok, set the error message from the server
      if (!response.ok) {
        setSignUpError(response.message);
        return;
      }

      setSignupSuccessful(true);

      return response.message;
    } catch (error) {
      setSignUpError(signupErrors.SERVER_ERROR);
    }
  }

  const handleBackButton = () => {
    setBasicSignUpInCourse(false);
    setSignupSuccessful(false);
    setSignUpError('');
  };

  // validates the form fields
  const validateForm = () => {
    const errors: Record<string, string> = {};

    //* form first step checks
    errors.email =
      //* is email field empty
      (!isBasicSignUpInCourse && !email ? signupErrors.FIELD_REQUIRED : '') ||
      //* does email contain only valid characters
      (!isBasicSignUpInCourse && emailWhiteList.test(email))
        ? signupErrors.INVALID_EMAIL
        : '';

    // form second step checks
    errors.username = isBasicSignUpInCourse && !username ? signupErrors.FIELD_REQUIRED : '';
    errors.password =
      (isBasicSignUpInCourse && !password ? signupErrors.FIELD_REQUIRED : '') ||
      (isBasicSignUpInCourse && !passwordRequirementsStatus)
        ? signupErrors.PASSWORD_REQUIREMENTS
        : '';

    setValidationErrors(errors);

    // checks if there is any error in the form, if so returns true to prevent the submission
    return Object.values(errors).find((error) => error.length);
  };

  const handleSubmission = () => {
    const formIsInvalid = validateForm();
    if (formIsInvalid) return;

    if (!isBasicSignUpInCourse) {
      setBasicSignUpInCourse(true);
    } else {
      mutate({ email, username, password });
    }
  };

  return (
    <div className={styles.signUpContainer}>
      {status === 'unauthenticated' ? (
        <div className={styles.signUpCard}>
          {!isBasicSignUpInCourse ? (
            <>
              <div className={styles.headingContainer}>
                <Title tagType={'h1'} style={styles.getStartedTitle}>
                  Let&apos;s get started!
                </Title>
                <p className={styles.textComplement}>Welcome to the Daily Tide - Let&apos;s create your account</p>
                <p className={styles.textComplement}>
                  Alternatively you can <Link href="/auth/signin">sign in</Link>.
                </p>
              </div>
              {Object.values(providers).map((provider: TProvider) => {
                return (
                  <AuthProviderButton
                    key={provider.id}
                    id={provider.id}
                    name={provider.name}
                    onClick={() => signIn(provider.id)}
                    icon={provider.icon}
                  />
                );
              })}
            </>
          ) : null}
          <form
            className={styles.formContainer}
            onSubmit={(e: FormEvent) => {
              e.preventDefault();
              handleSubmission();
            }}
          >
            {!isBasicSignUpInCourse ? (
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
                  handleChange={(emailValue: string) => {
                    setEmail(emailValue);
                  }}
                  error={validationErrors.email}
                />
              </>
            ) : (
              <>
                <Button text="Back" icon={faArrowLeft} onClick={() => handleBackButton()} style={styles.backButton} />
                <div className={styles.headingContainer}>
                  <Title tagType={'h1'}>Create your username and password</Title>
                  <p className={styles.textComplement}>
                    Stand out with a unique username. Create yours and personalize your experience.
                  </p>
                </div>
                <Input
                  title="Username"
                  inputType="text"
                  placeholder="Enter your username"
                  value={username}
                  className={styles.input}
                  minLength={6}
                  maxLength={50}
                  handleChange={(username: string) => {
                    setUsername(username);
                  }}
                  error={validationErrors.username}
                />{' '}
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
                <PasswordMeter
                  password={password}
                  requirementsStatus={(hasMetRequirements) => setPasswordRequirementsStatus(hasMetRequirements)}
                />
              </>
            )}
            <Button text={isLoading ? `Signing you up` : 'Continue'} style={styles.continueButton} type="submit" />
            <BounceLoader loading={isLoading} color="#1d0ddd" size={30} className={styles.spinner} />
            {signUpError && !isSignupSuccessful ? <p className={styles.errorMessage}>{signUpError}</p> : null}
            {isSignupSuccessful ? (
              <>
                <p className={styles.successMessage}>Sign up successful! Check your email :)</p>
                <ConfettiExplosion className={styles.confetti} width={1000} height={1000} />
              </>
            ) : null}
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
