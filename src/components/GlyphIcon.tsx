import * as React from 'react';
import './GlyphIcon.css';
import * as classNames from 'classnames';

interface GlyphIconProps {
  classes?: string[];
}

const GlyphIcon = ({classes}: GlyphIconProps) => (
  <span className={classNames('GlyphIcon', classes)}/>
);

export default GlyphIcon;
