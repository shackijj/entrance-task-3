import * as React from 'react';
import * as classNames from 'classnames';
import './Logo.css';

const logo = require('./Logo.svg');

interface LogoProps {
    classes?: string[];
}

const Logo = ({classes}: LogoProps) => (
    <img className={classNames('Logo', classes)} src={logo}/>
);

export default Logo;
