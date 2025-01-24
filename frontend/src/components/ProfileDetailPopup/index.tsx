'use client';

import { signOut } from 'next-auth/react';
import styles from './index.module.scss';

export type ProfileDetailPopupProps = {
  name: string;
  email: string;
};

export default function ProfileDetailPopup({ name, email }: ProfileDetailPopupProps) {
  return (
    <div className={styles.profileDetailPopupContainer}>
      <div className={styles.personalDetails}>
        <p className={styles.name}>{name}</p>
        <span className={styles.email}>{email}</span>
      </div>
      <button className={styles.signOutButton} onClick={() => signOut()}>
        Sign Out
      </button>
    </div>
  );
}
