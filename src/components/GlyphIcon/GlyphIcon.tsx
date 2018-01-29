import * as React from 'react';
import './GlyphIcon.css';
import * as classNames from 'classnames';

interface IconProps {
  classes?: string[];
  onClick?: () => void;
}

export const ArrowLeft: React.SFC<IconProps> =
  ({classes, onClick}) =>
    (<span onClick={onClick} className={classNames(['GlyphIcon', 'GlyphIcon_ArrowLeft', classes])}/>);
export const ArrowRight: React.SFC<IconProps> =
  ({classes, onClick}) =>
    (<span onClick={onClick} className={classNames(['GlyphIcon', 'GlyphIcon_ArrowRight', classes])}/>);
export const Calendar: React.SFC<IconProps> = 
  ({classes, onClick}) =>
    (<span onClick={onClick} className={classNames(['GlyphIcon', 'GlyphIcon_Calendar', classes])}/>);
export const Close: React.SFC<IconProps> = 
  ({classes, onClick}) =>
    (<span onClick={onClick} className={classNames(['GlyphIcon', 'GlyphIcon_Close', classes])}/>);
export const Edit: React.SFC<IconProps> =
  ({classes, onClick}) =>
    (<span onClick={onClick} className={classNames(['GlyphIcon', 'GlyphIcon_Edit', classes])}/>);