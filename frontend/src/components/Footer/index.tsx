'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './index.module.scss';
import { Title } from '@/components';

const Footer = (): JSX.Element => {
  return (
    <footer className={styles.footer}>
      <div className={styles.menu}>
        <div className={styles.menuSection}>
          <Title tagType="h3" emphasis="normal" style={styles.sectionTitle}>
            Account
          </Title>
          <Link href="#" className={styles.sectionLink} prefetch={false}>
            Register
          </Link>
          <Link href="#" className={styles.sectionLink} prefetch={false}>
            Login
          </Link>
          <Link href="#" className={styles.sectionLink} prefetch={false}>
            Password forgotten
          </Link>
        </div>
        <div className={styles.menuSection}>
          <Title tagType="h3" emphasis="normal" style={styles.sectionTitle}>
            About
          </Title>
          <p className={styles.sectionText}>The Daily Tide is news automated by AI</p>
        </div>
        <div className={styles.menuSection}>
          <Title tagType="h3" emphasis="normal" style={styles.sectionTitle}>
            Contact
          </Title>
          <p className={styles.sectionText}>NEXT Delft</p>
          <p className={styles.sectionText}>Molengraaffsingel 8</p>
          <p className={styles.sectionText}>2629 JD, Delft</p>
        </div>
        <div className={styles.menuSection}>
          <Title tagType="h3" emphasis="normal" style={styles.sectionTitle}>
            Get in touch
          </Title>
          <p className={styles.sectionText}>
            Do you have a question, compliment, or feedback to share? We’d love to hear from you! For general enquiries
            please reach out to us contact[at]thedailytide.ai
          </p>
        </div>
      </div>
      <div className={styles.branding}>
        <Link href="https://kickstartai.org" className={styles.footerLink} prefetch={false}>
          <Image src="/images/poweredby-footer.svg" alt="Kickstart AI" width={200} height={30} />
        </Link>
      </div>
    </footer>
  );
};

export default memo(Footer);
