'use client';

import styles from './index.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { setShowFilterModal } from '@/redux/reducers/mainReducer';

const FilterBar = () => {
  const { showFilterModal }: { showFilterModal: boolean } = useSelector((state: RootState) => state.mainReducer);
  const dispatch = useDispatch();

  return (
    <div className={styles.filterBarContainer}>
      <div className={styles.filterContentContainer}>
        <div onClick={() => setShowFilterModal(!showFilterModal)} className={styles.dateInFilterBar}>
          <span className={styles.datePicker} onClick={() => dispatch(setShowFilterModal(true))}>
            Date
          </span>
          <FontAwesomeIcon icon={faFilter} />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
