import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

enum Placement {
  'auto' = 'auto',
  'auto-end' = 'auto-end',
  'top-start' = 'top-start',
  'top' = 'top',
  'top-end' = 'top-end',
  'right-start' = 'right-start',
  'right' = 'right',
  'right-end' = 'right-end',
  'bottom-end' = 'bottom-end',
  'bottom' = 'bottom',
  'bottom-start' = 'bottom-start',
  'left-end' = 'left-end',
  'left' = 'left',
  'left-start' = 'left-start',
}

type CustomOverlayProps = {
  header?: React.ReactNode | string;
  body: React.ReactNode | string;
  placement?: Placement | undefined;
  show?: boolean;
  style?: string;
  headerStyle?: string;
  bodyStyle?: string;
  popoverStyle?: string;
  children: React.ReactElement;
};

const CustomOverlay = ({
  header,
  body,
  placement = Placement.auto,
  style,
  headerStyle,
  bodyStyle,
  children,
  popoverStyle,
}: CustomOverlayProps) => {
  const renderTooltip = (props: any) => (
    <Popover id="tooltip" {...props} className={popoverStyle}>
      <div className={style}>
        {header && <div className={headerStyle}>{header}</div>}
        <div className={bodyStyle}>{body}</div>
      </div>
    </Popover>
  );

  return (
    <OverlayTrigger placement={placement} overlay={renderTooltip} trigger={['click']} rootClose>
      {children}
    </OverlayTrigger>
  );
};

export default CustomOverlay;
