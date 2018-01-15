import * as React from 'react';
import './RoundButton.css';
import * as classNames from 'classnames';

interface RoundButtonProps {
  icon: JSX.Element;
  classes?: string[];
  onClick?: () => void;
}

const RoundButton: React.SFC<RoundButtonProps> = ({classes, icon, onClick}) => (
  <a className={classNames('RoundButton', classes)} onClick={onClick}>
    <span className="RoundButton-Icon">
      {icon}
    </span>
  </a>
);

export default RoundButton;
