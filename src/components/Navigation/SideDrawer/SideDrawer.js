import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../UI/BackDrop/BackDrop';
import styleClasses from './SideDrawer.css';

const sideDrawer = (props) =>{
    let attachedClasses = [styleClasses.SideDrawer, styleClasses.Close];
    if (props.show) {
        attachedClasses = [styleClasses.SideDrawer, styleClasses.Open];
    }
    return(
        <Aux>
            <BackDrop show={props.show} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={styleClasses.Logo}>
                    <Logo></Logo>
                </div>
                <nav>
                    <NavigationItems></NavigationItems>
                </nav>
            </div>
        </Aux>
        
    );
}


export default sideDrawer; 