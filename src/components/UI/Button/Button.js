import React from 'react';
import styleClasses from './Button.css';



const button = (props) =>(
    <button className={[styleClasses.Button, styleClasses[props.btnType]].join(' ')}
    onClick={props.clicked}>{props.children}</button>
)

export default button;