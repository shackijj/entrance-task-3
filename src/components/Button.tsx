import * as React from 'react';
import * as classNames from 'classnames';
import './Button.css';

interface ButtonProps {
  disabled?: boolean;
  classes?: string[];
  onClick?: () => void;
}

const Button: React.SFC<ButtonProps> = ({classes, children, disabled, onClick}) => (
  <a className={classNames('Button', {'Button_disabled': disabled}, classes)} onClick={onClick}>{children}</a>
);

export default Button;