import React from 'react';

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

interface MyButtonProps {
  onClick?: () => any;
  tip?: string;
  btnClassName?: string;
  tipClassName?: string;
}

const MyButton: React.FC<MyButtonProps> = ({
  children,
  onClick,
  tip,
  btnClassName,
  tipClassName,
}: any) => (
  <Tooltip title={tip} className={tipClassName} placement="top">
    <IconButton onClick={onClick} className={btnClassName}>
      {children}
    </IconButton>
  </Tooltip>
);

export default MyButton;
