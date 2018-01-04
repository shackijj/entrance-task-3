import * as React from 'react';
import './Logo.css';

const logo = require('./Logo.svg');

const Logo = () => (
    <img className="Logo" src={logo}/>
);

export default Logo;
