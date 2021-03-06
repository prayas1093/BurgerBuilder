import React,{ Component } from 'react';
import Order from '../../components/Order/Order';
import axiosInstance from '../../axios-orders';

class Orders extends Component{

    state={
        orders: [],
        loading: true
    }


    componentDidMount(){
        let data=null;
        axiosInstance.get('/orders.json')
            .then(response=>{
                const fetchedOrders = [];
                for(let key in response.data){
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    })
                }
                this.setState({loading: false, orders: fetchedOrders});
            })
            .catch(err=>{
                this.setState({loading: false});
            })


    }


    render(){
         
        return(
            <div>
                {this.state.orders.map(order=>(
                    <Order
                        key={order.id} 
                        ingredients={order.ingredients}
                        price={order.totalPrice} />
                ))}
            </div>
        )
    }



}

export default Orders;