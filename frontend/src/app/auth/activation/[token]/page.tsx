'use client';

import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import ConfettiExplosion from 'react-confetti';
import { activateAccount } from '@/endpoints';
import { Title } from '@/components';
import styles from './page.module.scss';

export default function Activation() {
  const params: { token: string } | null = useParams<{ token: string }>();
  const { token } = params || { token: '' };
  const [activationOutcome, setActivationOutcome] = useState<string>('');
  const [hasSuccessfulResponse, setHasSuccessfulResponse] = useState<boolean>(false);

  const handleAccountActivation = async () => {
    if (!token) {
      setHasSuccessfulResponse(false);
      setActivationOutcome('Activation code not found. Please try again.');
      return;
    }

    try {
      const response = await activateAccount(token);

      if (!response) {
        setActivationOutcome('Activation Service down. Please try again.');
        return;
      }

      if (response.status === 202) setHasSuccessfulResponse(true);
      setActivationOutcome(response.activationResponse.message);
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    handleAccountActivation();
  }, [token]);

  return (
    <>
      <Head>
        <title>Activation</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.activationContainer}>
        <Title tagType={'h1'} style={styles.title}>
          {activationOutcome}
        </Title>
        <Link href={`/auth/${hasSuccessfulResponse ? 'signin' : 'signup'}`}>
          Go to Sign {hasSuccessfulResponse ? 'In' : 'Up'}
        </Link>

        {hasSuccessfulResponse ? <ConfettiExplosion className={styles.confetti} /> : null}
      </main>
    </>
  );
}
