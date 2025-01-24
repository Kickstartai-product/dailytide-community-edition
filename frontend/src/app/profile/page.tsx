'use client';

import { Suspense } from 'react';
import styles from './page.module.scss';
import dynamic from 'next/dynamic';
import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '@/endpoints';
import { useSession } from 'next-auth/react';
import { setUserDetails } from '@/redux/reducers/mainReducer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import type { TUser } from '@/interfaces';

const Section = dynamic(() => import('@/components/Section').then((module) => module), { ssr: false });
const ProfileUserInfo = dynamic(() => import('@/components/ProfileUserInfoSection').then((module) => module));
const ProfileSummary = dynamic(() => import('@/components/ProfileSummarySection').then((module) => module));
const ProfileDeleteAccount = dynamic(() => import('@/components/ProfileDeleteAccountSection').then((module) => module));

export default function Profile() {
  const { user }: { user: TUser } = useSelector((state: RootState) => state.mainReducer);
  const { data: session } = useSession();

  const { id, token } = session?.user || {};

  const dispatch = useDispatch();

  const { data, isFetching, isError } = useQuery({
    queryKey: ['getUserProfile', id, token],
    queryFn: () => getUserProfile(id || '', token || ''),
    onSuccess: (data) => {
      dispatch(setUserDetails(data.user));
    },
    refetchOnWindowFocus: false,
    enabled: !!id || !!token,
  });

  if (isFetching) {
    return <Section style={styles.loadingCanvas}></Section>;
  }

  return (
    <Suspense fallback={<Section style={styles.loadingCanvas}></Section>}>
      {isError && <Section style={styles.errorCanvas}>Failed to load user profile</Section>}
      {data && data.user && (
        <main className={styles.mainContainer}>
          <ProfileUserInfo />
          <ProfileSummary summary={user.summary} />
          <ProfileDeleteAccount />
        </main>
      )}
    </Suspense>
  );
}
