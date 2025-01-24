import { createElement } from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';

export type TitleProps = {
  children: string | JSX.Element | Array<JSX.Element>;
  style?: string;
  tagType: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  emphasis?: 'normal' | 'section' | 'uppercase';
};

function Title({ children, style, tagType, emphasis = 'normal' }: TitleProps) {
  return createElement(tagType, { className: classNames(styles.heading, styles[emphasis], style) }, children);
}

export default Title;
