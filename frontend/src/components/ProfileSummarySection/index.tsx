'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { useDispatch } from 'react-redux';
import { setCurrentModal, setShowProfileEditModal } from '@/redux/reducers/mainReducer';
import { updateUserProfile } from '@/endpoints';
import { useSelector } from 'react-redux';
import { setUserDetails } from '@/redux/reducers/mainReducer';
import type { RootState } from '@/redux/store';
import type { TUser } from '@/interfaces';
import styles from './index.module.scss';

const Title = dynamic(() => import('@/components/Title').then((module) => module.default), { ssr: false });
const ProfileEditModal = dynamic(() => import('@/components/ProfileEditModal').then((module) => module.default), {
  ssr: false,
});
const Input = dynamic(() => import('@/components/Input').then((module) => module.default), { ssr: false });

type ProfileSummarySectionProps = {
  summary?: string;
};

const ProfileSummarySection = ({ summary = '' }: ProfileSummarySectionProps) => {
  const { user }: { user: TUser } = useSelector((state: RootState) => state.mainReducer);

  const [localSummary, setLocalSummary] = useState<string>(summary || '');

  const dispatch = useDispatch();

  const onSave = async () => {
    const updatedUser = await updateUserProfile(user._id, user?.userAuthToken || '', {
      summary: localSummary,
    });

    dispatch(setUserDetails(updatedUser.user));
    dispatch(setShowProfileEditModal(false));
    dispatch(setCurrentModal(undefined));
  };

  const onEdit = () => {
    dispatch(setCurrentModal('summaryEdit'));
    dispatch(setShowProfileEditModal(true));
  };

  return (
    <div className={styles.summaryContainer}>
      <Title tagType="h3" style={styles.sectionTitle}>
        Summary
      </Title>
      <p className={styles.summary}>{summary || 'Add something Here'}</p>
      <FontAwesomeIcon icon={faPen as IconDefinition} className={styles.editBtn} onClick={() => onEdit()} />
      <ProfileEditModal modal={'summaryEdit'} onSave={() => onSave()}>
        <Input
          type="textarea"
          rows={5}
          max="500"
          title="summary"
          placeholder="summary"
          className={styles.editInput}
          value={localSummary}
          handleChange={(value: string) => setLocalSummary(value)}
        />
      </ProfileEditModal>
    </div>
  );
};

export default ProfileSummarySection;
