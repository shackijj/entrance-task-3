import * as React from 'react';
import './RoundButton.css';
import * as classNames from 'classnames';

interface RoundButtonProps {
  classes?: string[];
  icon: JSX.Element;
}

const RoundButton: React.SFC<RoundButtonProps> = ({classes, icon}) => (
  <a className={classNames('RoundButton', classes)}>
    {icon}
  </a>
);

export default RoundButton;
