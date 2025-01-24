'use client';
import { useState, useEffect } from 'react';
import styles from './index.module.scss';

export type PasswordMeterProps = {
  password: string;
  requirementsStatus: (hasMetRequirements: boolean) => void;
};

type PasswordRequirement = {
  text: string;
  pattern?: RegExp;
  minLength?: number;
};

// Password strength requirements
const passwordRequirements: Array<PasswordRequirement> = [
  { text: 'Minimum 8 characters', minLength: 8 },
  { text: 'Contains a lowercase letter', pattern: /[a-z]/ },
  { text: 'Contains an uppercase letter', pattern: /[A-Z]/ },
  { text: 'Contains a number', pattern: /\d/ },
  { text: 'Contains a special character', pattern: /[!@#$%^&*()_+\-=\[\]{};':\\|,.<>/?`~]/ },
];

export default function PasswordMeter({ password, requirementsStatus }: PasswordMeterProps) {
  const [requirementsMet, setRequirementsMet] = useState<Array<PasswordRequirement>>([]);

  const checkPasswordStrength = () => {
    const newRequirementsMet: Array<PasswordRequirement> = passwordRequirements.filter(
      (requirement: PasswordRequirement) => {
        if (requirement.minLength) return password && password.length >= requirement.minLength;

        if (requirement.pattern) {
          const regex = new RegExp(requirement.pattern);
          return password && regex.test(password);
        }
      },
    );

    setRequirementsMet(newRequirementsMet);
  };

  useEffect(() => {
    checkPasswordStrength();
    requirementsStatus(requirementsMet.length === passwordRequirements.length);
  }, [password]);

  return (
    <div className={styles.passwordMeterContainer}>
      <div
        className={styles.strengthBar}
        style={{ width: `${(requirementsMet.length * 100) / passwordRequirements.length}%` }}
      ></div>
      <ul className={styles.requirementList}>
        {passwordRequirements.map((requirement) => (
          <li key={requirement.text} className={styles.requirementItem}>
            <span className={styles.listItemText}>{requirement.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
