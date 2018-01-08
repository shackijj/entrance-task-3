import * as React from 'react';
import * as classNames from 'classnames';
import './Logo.css';

interface LogoProps {
    classes?: string[];
}

const Logo = ({classes}: LogoProps) => (
    <div className={classNames('Logo', classes)}/>
);

export default Logo;
