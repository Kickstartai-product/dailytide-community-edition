'use client';

import { Modal } from 'react-bootstrap';
import styles from './index.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setShowFilterModal } from '@/redux/reducers/mainReducer';
import classNames from 'classnames';
import type { RootState } from '@/redux/store';

type FilterModalProps = {
  children?: React.ReactNode;
  className?: string;
  onSave?: () => void;
  onHide?: () => void;
};

const FilterModal = ({ children, className, onSave, onHide }: FilterModalProps) => {
  const { showFilterModal }: { showFilterModal: boolean } = useSelector((state: RootState) => state.mainReducer);
  const dispatch = useDispatch();

  return (
    <Modal show={showFilterModal} centered onHide={onHide} className={classNames(styles.modal, className)}>
      <Modal.Body className={styles.body}>{children}</Modal.Body>
      <Modal.Footer className={styles.footer}>
        <div onClick={() => dispatch(setShowFilterModal(false))} className={styles.cancel}>
          Cancel
        </div>
        <div
          onClick={() => {
            onSave && onSave();
            dispatch(setShowFilterModal(false));
          }}
          className={styles.save}
        >
          Save
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default FilterModal;
