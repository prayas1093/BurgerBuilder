import React from 'react';
import styleClasses from './BackDrop.css'


const backDrop = (props) =>(
    props.show ? <div className = {styleClasses.BackDrop} onClickCapture={props.clicked}/> : null
)

export default backDrop;