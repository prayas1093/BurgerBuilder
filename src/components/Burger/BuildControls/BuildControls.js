import React from 'react';
import styleClasses from "./BuildControls.css";
import BuildControl from './BuildControl/BuildControl';


const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Meat', type: 'meat'},
    {label: 'Cheese', type: 'cheese'}
]





const buildControls = (props) =>{
    return (
    <div className={styleClasses.BuildControls}>
        <p>Current Price :  <b>{props.totalPrice.toFixed(2)}</b></p>
        {controls.map(ctrl => ( 
            <BuildControl 
            key={ctrl.label}  
            label={ctrl.label}
            added={ ()=> props.ingredientAdded(ctrl.type) }
            removed={ ()=> props.ingredientRemoved(ctrl.type) }
            disabled = {props.disabled[ctrl.type]}/>
        ))}
        <button 
        className = {styleClasses.OrderButton} 
        disabled={!props.isPurchasable}
        onClick={props.ordered}> Order Now </button>
    </div>
)}

export default buildControls;