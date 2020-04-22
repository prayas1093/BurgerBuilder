import React,{Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axiosInstance from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
// import Axios from 'axios';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 1.2,
    meat: 1.5,
    cheese: 0.8
}


class BurgerBuilder extends Component {


    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }
    

    componentDidMount(){
        axiosInstance.get('https://react-my-burger-a28a3.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            }).catch(error =>{
                this.setState({error: true});
            });    
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
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () =>{
        this.setState({purchasing: false}); 
    }

    purchaseContinueHandler = () =>{
        console.log(this.props,"Kabir Arora");
        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price='+ this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?'+queryString
        });
    }


    render() {
        
        const disabledInfo = {
            ...this.state.ingredients
        }

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary =  null;  
        let burger = this.state.error ? <p>Sorry, can't get the ingredients.</p> : <Spinner></Spinner>;

        if(this.state.ingredients){
            burger=(
                    <Aux>
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
            orderSummary = <OrderSummary ingredients={this.state.ingredients} 
                    totalPrice={this.state.totalPrice}
                    purchaseContinued={this.purchaseContinueHandler} 
                    purchaseCancelled={this.purchaseCancelHandler}/>
        }
        if(this.state.loading){
            orderSummary = <Spinner/>
        }

        return(
            <Aux>
                {/* {this.state.purchasing ? <Modal>
                    <OrderSummary ingredients={this.state.ingredients} totalPrice={this.state.totalPrice}/>
                </Modal>:null} */}
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axiosInstance);