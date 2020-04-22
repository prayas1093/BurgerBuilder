import React from 'react';
import { NavLink } from 'react-router-dom';
import styleClasses from './NavigationItem.css';


const navigationItem = (props) =>(
    
    <li className={styleClasses.NavigationItem}>
        <NavLink activeClassName={styleClasses.active}
        to={props.link} exact={props.exact} > {props.children}
        </NavLink>
    </li>
    
)

export default navigationItem;