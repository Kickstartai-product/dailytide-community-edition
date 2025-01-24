'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { useDispatch, useSelector } from 'react-redux';
import { setShowProfileEditModal, setUserDetails, setCurrentModal } from '@/redux/reducers/mainReducer';
import { updateUserProfile } from '@/endpoints';
import { RootState } from '@/redux/store';
import type { TUser, TModal } from '@/interfaces';
import { UNKNOWN_ACCOUNT } from '@root/constants';
import styles from './index.module.scss';

const Title = dynamic(() => import('@/components/Title').then((module) => module.default), { ssr: false });
const ProfileEditModal = dynamic(() => import('@/components/ProfileEditModal').then((module) => module));
const Input = dynamic(() => import('@/components/Input').then((module) => module.default), { ssr: false });

const ProfileUserInfo = () => {
  const { user }: { user: TUser } = useSelector((state: RootState) => state.mainReducer);

  const [localName, setLocalName] = useState<string>(user.name || '');
  const [localUsername, setLocalUsername] = useState<string>(user.username || '');

  const dispatch = useDispatch();

  const onUserSave = async () => {
    const updatedUser = await updateUserProfile(user._id, user?.userAuthToken || '', {
      name: localName,
      username: localUsername,
    });

    dispatch(setUserDetails(updatedUser.user));
    dispatch(setShowProfileEditModal(false));
  };

  const onEdit = () => {
    dispatch(setCurrentModal('profileEdit' as TModal));
    dispatch(setShowProfileEditModal(true));
  };

  return (
    <div className={styles.userDetailsContainer}>
      <Image
        src="/icons/userProfile.svg"
        alt="profile picture"
        width={100}
        height={100}
        className={styles.profilePic}
      />
      <div className={styles.userInfos}>
        <Title tagType="h2" style={styles.name}>
          {user.name || ''}
        </Title>
        <div className={styles.userName}>{user.username || UNKNOWN_ACCOUNT}</div>
        <div className={styles.email}>{user.email || ''}</div>
        <Link href="/profile/edit" className={styles.resetLink}>
          Reset Password
        </Link>
        <FontAwesomeIcon icon={faPen as IconDefinition} className={styles.editBtn} onClick={() => onEdit()} />
      </div>
      <ProfileEditModal modal={'profileEdit'} onSave={() => onUserSave()}>
        <Input
          title="Name"
          placeholder="Name"
          className={styles.editInput}
          value={localName}
          handleChange={(value: string) => setLocalName(value)}
        />
        <Input
          title="Username"
          placeholder="Username"
          className={styles.editInput}
          value={localUsername}
          handleChange={(value: string) => setLocalUsername(value)}
        />
      </ProfileEditModal>
    </div>
  );
};

export default ProfileUserInfo;
