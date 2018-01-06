import * as React from 'react';
import './RoundButton.css';
import * as classNames from 'classnames';

interface RoundButtonProps {
  classes?: string[];
  icon: JSX.Element;
}

const RoundButton: React.SFC<RoundButtonProps> = ({classes, icon}) => (
  <a className={classNames('RoundButton', classes)}>
    <span className="RoundButton-Icon">
      {icon}
    </span>
  </a>
);

export default RoundButton;
