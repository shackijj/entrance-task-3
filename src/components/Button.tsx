import * as React from 'react';
import * as classNames from 'classnames';
import './Button.css';

interface ButtonProps {
  disabled?: boolean;
  classes?: string[];
}

const Button: React.SFC<ButtonProps> = ({classes, children, disabled}) => (
  <a className={classNames('Button', {'Button_disabled': disabled}, classes)}>{children}</a>
);

export default Button;