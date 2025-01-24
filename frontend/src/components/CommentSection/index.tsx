'use client';

import { useState, memo } from 'react';
import dynamic from 'next/dynamic';
import { Section } from '@/components';
import styles from './index.module.scss';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getComments } from '@/endpoints';
import { useUserSession } from '@/hooks';
import { toast } from 'react-toastify';
import { VOTE_LOGIN_WARNING } from '@root/constants';

const CommentBar = dynamic(() => import('@/components/CommentBar').then((module) => module.default));
const Comment = dynamic(() => import('@/components/Comment').then((module) => module.default));
const CommentInput = dynamic(() => import('@/components/CommentInput').then((module) => module.default));

const CommentSection = (): JSX.Element => {
  const isDark: boolean = useSelector((state: RootState) => state.mainReducer.isDark);
  const [openReply, setOpenReply] = useState<boolean>(false);
  const params: { id: string } = useParams<{ id: string }>() || { id: '' };
  const { session, status } = useUserSession();

  const { data, isError, isFetching, refetch } = useQuery({
    queryKey: ['getComments', params?.id || '', session?.user?.id || ''],
    queryFn: () => getComments(params?.id || '', session?.user?.id || ''),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const showCommentInput = () => {
    if (!session?.user) {
      toast.warn(VOTE_LOGIN_WARNING);
      return;
    }

    setOpenReply(!openReply);
  };

  if (isError) {
    return <></>;
  }

  return (
    <Section style={styles.commentSectionContainer}>
      <CommentBar showComment showShare isDark={isDark} showCommentInput={showCommentInput} />
      <CommentInput
        rows={5}
        topicId={params?.id}
        show={openReply}
        setShowCommentInput={(value: boolean) => setOpenReply(value)}
        refetch={() => refetch()}
        commentType="comment"
      />
      {!isFetching && data && data.data && data.data.length > 0
        ? data.data.map((comment: any, index: number) => (
            <Comment key={index} topicId={params.id} comment={comment} isDark={isDark} refetch={() => refetch()} />
          ))
        : null}
    </Section>
  );
};

export default memo(CommentSection);
