'use client';
import Image from 'next/image';
import type { TProvider } from '@/interfaces';
import styles from './index.module.scss';

export type AuthProviderButtonProps = TProvider & {
  onClick: () => void;
};

export default function AuthProviderButton({ id, name, icon, onClick }: AuthProviderButtonProps) {
  return (
    <button className={styles.authProviderButtonContainer} onClick={onClick} role="button" aria-label={name}>
      <Image className={styles.icon} src={`${icon}`} alt={id} width={45} height={45} />
      {name}
    </button>
  );
}
