import * as React from 'react';
import * as classNames from 'classnames';

interface ButtonProps {
  classes?: string[];
  text: string;
}

const Button = ({classes, text}: ButtonProps) => (
  <a className={classNames('Button', classes)}>{text}</a>
);

export default Button;