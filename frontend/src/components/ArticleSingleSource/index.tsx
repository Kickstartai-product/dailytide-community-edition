import Link from 'next/link';
import dynamic from 'next/dynamic';
import styles from './index.module.scss';
import { TReferenceLinks } from '@/interfaces';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import classNames from 'classnames';

const Button = dynamic(() => import('@/components/Button').then((module) => module.default));

export type ArticleSingleSourceProps = {
  source: TReferenceLinks;
};

const ArticleSingleSource = ({ source }: ArticleSingleSourceProps): JSX.Element => {
  const isDark: boolean = useSelector((state: RootState) => state.mainReducer.isDark);

  return (
    <div className={styles.singleArticleSourceContainer}>
      <Button style={classNames(styles.sourceName)} text={source.source_name} outline isDark={isDark} />
      <Link
        className={classNames(styles.sourceLink, isDark && styles.dark)}
        href={source.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        {source.link}
      </Link>
    </div>
  );
};

export default ArticleSingleSource;
