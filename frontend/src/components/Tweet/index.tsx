import { memo } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { ITweet } from '@/interfaces';
import { TweetLoader } from '@/components';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons/faXTwitter';
import styles from './index.module.scss';

const Tweet = dynamic(
  () => import('react-tweet').then((module) => module.Tweet),
  { ssr: false },
);

const FontAwesomeIcon = dynamic(
  () =>
    import('@fortawesome/react-fontawesome').then(
      (module) => module.FontAwesomeIcon,
    ),
  { ssr: false },
);

// TODO: Fix this
const CustomTweet = (props: { data: ITweet; embed: boolean }) => {
  const {
    data: {
      id = '1628832338187636740',
      text = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      image = '',
      user = {
        name: 'Vercel',
        profile_image_url: '',
        id: 'vercel',
      },
    },
    embed = true,
  } = props;

  const ProfileImage = () => {
    if (!user.profile_image_url)
      return <FontAwesomeIcon icon={faUser} className={styles.profileImage} />;

    return (
      <Image
        src={user.profile_image_url}
        alt="Twitter"
        width={20}
        height={20}
        className={styles.profileImage}
        priority
      />
    );
  };

  const TweetHead = () => {
    return (
      <div className={styles.header}>
        <div className={styles.profileContainer}>
          <ProfileImage />
          <div className={styles.userDetailContainer}>
            <span className={styles.name}>{user.name}</span>
            <span className={styles.id}>@{user.id}</span>
          </div>
        </div>

        <FontAwesomeIcon icon={faXTwitter} className={styles.xLogo} />
      </div>
    );
  };

  const TweetBody = () => {
    return (
      <div className={styles.body}>
        {image && (
          <Image
            src={image}
            alt="Twitter"
            width={500}
            height={300}
            className={styles.bodyImage}
            priority
          />
        )}
        <p className={styles.bodyText}>{text}</p>
        <span className={styles.bodyDate}>8:01 PM · Feb 23, 2023</span>
      </div>
    );
  };

  if (!id) {
    return <TweetLoader />;
  }

  if (embed) {
    return <Tweet id={id} />;
  }

  return (
    <Link
      href="/"
      // passHref
      className={styles.tweetContainer}
      // target="_blank"
    >
      <TweetHead />
      <TweetBody />
    </Link>
  );
};

export default memo(CustomTweet);
