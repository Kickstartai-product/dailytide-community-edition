import { memo } from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';

type SectionProps = {
  children?: string | JSX.Element | JSX.Element[] | undefined;
  style?: string;
  id?: string;
  dataTestId?: string;
};

const Section = (props: SectionProps): JSX.Element => {
  const { children, style, id, dataTestId } = props;

  return (
    <section
      className={classNames(styles.section, style)}
      id={id}
      data-testid={dataTestId}
    >
      {children}
    </section>
  );
};

export default memo(Section);
