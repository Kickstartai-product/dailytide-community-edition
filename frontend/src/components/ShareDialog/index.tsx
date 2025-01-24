import {
  EmailShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  RedditShareButton,
  LinkedinIcon,
  RedditIcon,
  XIcon,
  EmailIcon,
} from 'react-share';
import Modal from 'react-bootstrap/Modal';
import dynamic from 'next/dynamic';
import styles from './index.module.scss';

const Input = dynamic(() => import('@/components/Input').then((module) => module.default));

export interface ShareDialogProps {
  url: string;
  show: boolean;
  onHide: () => void;
}

const ShareDialog = (props: ShareDialogProps) => {
  const { url, show, onHide } = props;

  return (
    <Modal {...props} show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body className={styles.modalBodyContainer}>
        <Input
          placeholder={`${process.env.NEXT_PUBLIC_APP_URL}${url}`}
          value={`${process.env.NEXT_PUBLIC_APP_URL}${url}`}
          className={styles.inputLink}
        />

        <div className={styles.shareOptionsContainer}>
          <LinkedinShareButton url={`${process.env.NEXT_PUBLIC_APP_URL}${url}`}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
          <TwitterShareButton url={`${process.env.NEXT_PUBLIC_APP_URL}${url}`}>
            <XIcon size={32} round />
          </TwitterShareButton>
          <RedditShareButton url={`${process.env.NEXT_PUBLIC_APP_URL}${url}`} windowWidth={660} windowHeight={460}>
            <RedditIcon size={32} round />
          </RedditShareButton>
          <EmailShareButton url={`${process.env.NEXT_PUBLIC_APP_URL}${url}`} body="body">
            <EmailIcon size={32} round />
          </EmailShareButton>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ShareDialog;
