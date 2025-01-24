import dynamic from 'next/dynamic';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import styles from './index.module.scss';

const Title = dynamic(() => import('@/components/Title').then((module) => module.default), { ssr: false });

const ProfileConnectionSection = () => {
  return (
    <div className={styles.connectionContainer}>
      <Title tagType="h3" style={styles.sectionTitle}>
        My connections
      </Title>
      <FontAwesomeIcon icon={faPen as IconDefinition} className={styles.editBtn} />
    </div>
  );
};

export default ProfileConnectionSection;
