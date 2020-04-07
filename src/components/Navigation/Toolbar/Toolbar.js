import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import styleClasses from './Toolbar.css';


const toolbar = (props) =>( 
    <header className={styleClasses.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked}></DrawerToggle>
        <Logo></Logo>
        <nav></nav>
        <nav className={styleClasses.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
)
    


export default toolbar;