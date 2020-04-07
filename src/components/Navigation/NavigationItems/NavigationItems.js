import React from 'react';
import styleClasses from './NavigationItems.css';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={styleClasses.NavigationItems}>
        <NavigationItem link='/' active>Burger Builder</NavigationItem>
        <NavigationItem>Checkout</NavigationItem>    
    </ul>
) 

export default navigationItems;