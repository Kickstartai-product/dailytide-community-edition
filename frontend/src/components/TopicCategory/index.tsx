import { Title } from '@/components';
import styles from './index.module.scss';
import type { TTopicCategory } from '@/interfaces/topics';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import classNames from 'classnames';
import { getCategoryColor } from '@/utils';

export type TopicCategoryProps = {
  categories?: TTopicCategory[];
};

const TopicCategory = ({ categories }: TopicCategoryProps) => {
  const isDark: boolean = useSelector((state: RootState) => state.mainReducer.isDark);

  if (!categories || categories.length === 0) return null;
  return (
    <div className={styles.topicCategoryContainer}>
      <span className={classNames(styles.dot, styles[getCategoryColor(categories[0]?.name)])}></span>
      <Title tagType={'h3'} emphasis={'normal'} style={classNames(styles.categoryTitle, isDark && styles.dark)}>
        {categories.map((category) => category.name).join(', ')}
      </Title>
    </div>
  );
};

export default TopicCategory;
