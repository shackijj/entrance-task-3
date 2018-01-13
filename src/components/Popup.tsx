import * as React from 'react';
import './Popup.css';

interface PopupProps {
  emoji: string;
  message: string;
  details: JSX.Element;
  buttons: JSX.Element[];
}

const Popup: React.SFC<PopupProps> = ({emoji, message, details, buttons}) => (
  <div className="Popup">
    <div className="Popup-Emoji">{emoji}</div>
    <div className="Popup-Message">{message}</div>
    <div className="Popup-Details">{details}</div>
    <div className="Popup-Buttons">
      {...buttons}
    </div>
  </div>
);

export default Popup;
