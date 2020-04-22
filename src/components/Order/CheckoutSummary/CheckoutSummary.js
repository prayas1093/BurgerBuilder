import React,{Component} from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import styleClasses from './CheckoutSummary.css'


const checkoutSummary = (props) =>{
    return(
        <div className={styleClasses.CheckoutSummary}>
            <h1>We Hope it tastes well.</h1>
            <div style={{weight: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients }/>
            </div>
            <Button btnType="Danger"
                clicked={props.checkoutCancelled}>Danger</Button>
            <Button btnType="Success"
                clicked={props.checkoutContinued}>Continue</Button>
        </div>
    )
}

export default checkoutSummary;