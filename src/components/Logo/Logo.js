import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png'
import styleClasses from './Logo.css';


const logo = () =>(
    <div className={styleClasses.Logo}>
        <img src={burgerLogo} alt="MyBurger"/>
    </div>
);  

export default logo;