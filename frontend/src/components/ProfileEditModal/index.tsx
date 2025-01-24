'use client';

import { Modal } from 'react-bootstrap';
import styles from './index.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setShowProfileEditModal } from '@/redux/reducers/mainReducer';
import classNames from 'classnames';
import type { TModal } from '@/interfaces';
import type { RootState } from '@/redux/store';

type FilterModalProps = {
  children?: React.ReactNode;
  className?: string;
  modal?: TModal;
  onSave?: () => void;
  onHide?: () => void;
};

const ProfileEditModal = ({ children, className, modal, onSave, onHide }: FilterModalProps) => {
  const { showProfileEditModal, currentModal }: { showProfileEditModal: boolean; currentModal: TModal } = useSelector(
    (state: RootState) => state.mainReducer,
  );
  const dispatch = useDispatch();

  if (currentModal !== modal) {
    return null;
  }

  return (
    <Modal show={showProfileEditModal} centered onHide={onHide} className={classNames(styles.modal, className)}>
      <Modal.Body className={styles.body}>{children}</Modal.Body>
      <Modal.Footer className={styles.footer}>
        <div onClick={() => dispatch(setShowProfileEditModal(false))} className={styles.cancel}>
          Cancel
        </div>
        <div
          onClick={() => {
            onSave && onSave();
            dispatch(setShowProfileEditModal(false));
          }}
          className={styles.save}
        >
          Save
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ProfileEditModal;
