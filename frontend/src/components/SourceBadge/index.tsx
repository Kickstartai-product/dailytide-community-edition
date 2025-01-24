import React, { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import classnames from 'classnames';
import styles from './index.module.scss';
import { sendGTMEvent } from '@/marketing';
import { TReferenceLinks } from '@/interfaces/topics';
import { TopicSources } from '@root/constants';
import { getSource } from '@/utils';

const Overlay = dynamic(() => import('@/components/Overlay'), { ssr: false });

const SourceBadge = ({ source }: { source: TReferenceLinks }): JSX.Element => {
  if (!source) return <></>;

  const Body = () => {
    return (
      <div className={styles.body}>
        {source.title && (
          <div className={styles.title}>
            {source.title}
            <br />
          </div>
        )}{' '}
        <Link href={source.link} rel="noopener noreferrer" target="_blank" passHref={true}>
          {source.link}
        </Link>
      </div>
    );
  };

  const Header = () => {
    switch (getSource(source.source_name)) {
      case TopicSources.x:
        return (
          <div className={styles.header}>
            <Image src="/icons/sources/x-twitter.svg" alt={TopicSources.x} width={20} height={20} />
          </div>
        );
      case TopicSources.twitter:
        return (
          <div className={styles.header}>
            <Image src="/icons/sources/x-twitter.svg" alt={TopicSources.x} width={20} height={20} />
          </div>
        );
      case TopicSources.arxiv:
        return (
          <div className={styles.header}>
            <Image src="/icons/sources/arxiv.svg" alt={TopicSources.arxiv} width={20} height={20} />
          </div>
        );
      case TopicSources.reddit:
        return (
          <div className={styles.header}>
            <Image src="/icons/sources/reddit.svg" alt={TopicSources.reddit} width={20} height={20} />
          </div>
        );
      case TopicSources.hackernews:
        return (
          <div className={styles.header}>
            <Image src="/icons/sources/hacker-news.svg" alt={TopicSources.hackernews} width={20} height={20} />
          </div>
        );
      case TopicSources.news:
        return (
          <div className={styles.header}>
            <Image src="/icons/sources/news.png" alt={TopicSources.news} width={20} height={20} />
          </div>
        );
      default:
        return <></>;
    }
  };

  return (
    <Overlay body={<Body />} header={<Header />} style={styles.overlay} popoverStyle={styles.popover}>
      <div
        className={classnames(styles.badge, styles[source.source_name?.toLowerCase()])}
        onClick={() => sendGTMEvent('source_click', { source: source })}
      >
        {getSource(source.source_name)}
      </div>
    </Overlay>
  );
};

export default memo(SourceBadge);
