import React,{Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 1.2,
    meat: 1.5,
    cheese: 0.8
}


class BurgerBuilder extends Component {


    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }
    
    
    updatePurchaseState = (ingredients) =>{
        const isPurchasable = Object.keys(ingredients).map((type)=>{
                                    return ingredients[type]
                                }).reduce((sum,el)=>{
                                    return sum+el;
                                },0)

        this.setState({
            purchasable: isPurchasable>0
        })
        
    }


    removeIngredientHandler = (type) =>{
        if(this.state.ingredients[type]<=0){
            return;
        }
        const updatedCount = this.state.ingredients[type] - 1;
        const updatedIngredients = {
            ... this.state.ingredients
        }
        updatedIngredients[type]=updatedCount;
        const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        })
        this.updatePurchaseState(updatedIngredients);
   }


    addIngredientHandler = (type) =>{
        const updatedCount = this.state.ingredients[type]+ 1;
        const updatedIngredients = {
            ... this.state.ingredients
        }
        updatedIngredients[type]=updatedCount;
        const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        })
        this.updatePurchaseState(updatedIngredients);
    }
    
    purchaseHandler = () => {
        console.log(this);
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () =>{
        this.setState({purchasing: false}); 
    }

    purchaseContinueHandler = () =>{
        alert('Purchase Continued');
    }


    render() {
        
        const disabledInfo = {
            ...this.state.ingredients
        }

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        return(
            <Aux>
                {/* {this.state.purchasing ? <Modal>
                    <OrderSummary ingredients={this.state.ingredients} totalPrice={this.state.totalPrice}/>
                </Modal>:null} */}
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients} totalPrice={this.state.totalPrice}
                    purchaseContinued={this.purchaseContinueHandler} purchaseCancelled={this.purchaseCancelHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                ingredientAdded = {this.addIngredientHandler} 
                ingredientRemoved = {this.removeIngredientHandler}
                totalPrice = {this.state.totalPrice}
                disabled = {disabledInfo} 
                isPurchasable={this.state.purchasable} 
                ordered={this.purchaseHandler}/>
            </Aux>
        )
    }
}

export default BurgerBuilder;