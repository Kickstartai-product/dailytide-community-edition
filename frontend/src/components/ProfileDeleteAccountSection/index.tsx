'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUserProfile } from '@/endpoints';
import type { RootState } from '@/redux/store';
import { removeUserDetails } from '@/redux/reducers/mainReducer';
import type { TUser } from '@/interfaces';
import { deleteAllCookies } from '@/utils';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import styles from './index.module.scss';

const Input = dynamic(() => import('@/components/Input').then((module) => module.default), { ssr: false });
const Button = dynamic(() => import('@/components/Button').then((module) => module.default), { ssr: false });

const ProfileDeleteAccountSection = () => {
  const { user }: { user: TUser } = useSelector((state: RootState) => state.mainReducer);
  const dispatch = useDispatch();

  const router = useRouter();

  const [showDeleteApprove, setShowDeleteApprove] = useState<boolean>(false);
  const [deleteInput, setDeleteInput] = useState<string>('');

  const onDeleteAccount = async () => {
    if (deleteInput !== user.username) {
      alert('Username does not match');
      return;
    }

    const deletedUser = await deleteUserProfile(user._id, user?.userAuthToken || '');

    if (!deletedUser) {
      return;
    }

    signOut();
    dispatch(removeUserDetails());
    localStorage.clear();
    deleteAllCookies();
    router.push('/');
  };

  return (
    <div className={styles.deleteAccountContainer}>
      {!showDeleteApprove ? (
        <div className={styles.deleteAccountLink} onClick={() => setShowDeleteApprove(true)}>
          <FontAwesomeIcon icon={faTrash as IconDefinition} className={styles.deleteIcon} />
          <span className={styles.deleteLink}>Delete Account</span>
        </div>
      ) : (
        <div className={styles.deleteApproveContainer}>
          {`Enter the "${user.username}" to confirm`}
          <Input
            placeholder={user.username}
            className={styles.deleteInput}
            value={deleteInput}
            handleChange={(value: string) => setDeleteInput(value)}
          />
          <div className={styles.actionButtonContainer}>
            <Button text="Cancel" outline style={styles.cancelBtn} onClick={() => setShowDeleteApprove(false)}></Button>
            <Button text="Delete" outline style={styles.deleteAccountBtn} onClick={() => onDeleteAccount()}></Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDeleteAccountSection;
