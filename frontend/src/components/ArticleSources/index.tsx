'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Title } from '@/components';
import classNames from 'classnames';
import { TReferenceLinks } from '@/interfaces';
import { SOURCES_MINIMUM_LIMIT } from '@root/constants';
import styles from './index.module.scss';

export type ArticleSourcesProps = {
  sources: Array<TReferenceLinks>;
  isDark: boolean;
};

const Button = dynamic(() => import('@/components/Button'), { ssr: false });
const ArticleSingleSource = dynamic(() => import('@/components/ArticleSingleSource'), { ssr: false });

export default function ArticleSources({ sources, isDark }: ArticleSourcesProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [sourceNumber, setSourcesNumber] = useState<number>((sources && sources.length) || 0);

  useEffect(() => {
    setSourcesNumber(isExpanded ? sources.length : SOURCES_MINIMUM_LIMIT);
  }, [isExpanded]);

  return (
    <div className={styles.articleSourcesContainer}>
      <Title tagType="h2" emphasis="normal" style={classNames(styles.title, isDark && styles.dark)}>
        Sources
      </Title>
      <div
        className={classNames(styles.sourcesContainer, isExpanded ? styles.isExpanded : null)}
        style={{ height: isExpanded ? '180px' : '80px' }}
      >
        {sources &&
          sources
            .slice(0, sourceNumber)
            .map((source: TReferenceLinks) => <ArticleSingleSource key={source._id} source={source} />)}
      </div>
      {sources && sources.length > SOURCES_MINIMUM_LIMIT ? (
        <Button
          text={`Show ${isExpanded ? 'less' : 'more'}`}
          style={classNames(styles.showMoreButton, isDark && styles.dark)}
          onClick={() => setIsExpanded(!isExpanded)}
        />
      ) : null}
    </div>
  );
}
