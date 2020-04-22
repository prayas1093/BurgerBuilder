import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import styleClasses from './ContactData.css'
import axiosInstance from '../../../axios-orders'

class ContactData extends Component{

    state={
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '' 
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients :this.props.ingredients,
            totalPrice: this.props.totalPrice,
            customer: {
                name: 'Prayas Arora',
                email: 'prayasarora1093@gmail.com',
                address: {
                    addressLine1: 'f-17/40,sector-8',
                    addressLine2: 'Rohini,Delhi',
                    zipCode: '110085',
                    country: 'India'
                }
            },
            deliveryMethod: 'Fastest'
        };
        
        axiosInstance.post('/orders.json',order).
            then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
            },error =>{
                console.log(error);
                this.setState({loading: false});
            });
    }


    render(){
        let form=(
            <form>
                <input className={styleClasses.Input} type='text' name='name' placeholder='Enter Your Name'/>
                <input className={styleClasses.Input} type='email' name='email' placeholder='Enter Mail'/>
                <input className={styleClasses.Input} type='text' name='street' placeholder='Enter Your Street'/>
                <input className={styleClasses.Input} type='text' name='postalCode' placeholder='Enter Your Postal Code'/>
                <Button btnType='Success'
                clicked={this.orderHandler}>ORDER</Button>        
            </form>
        )
        if(this.state.loading){
            form=<Spinner></Spinner>
        }
        return(
            <div className={styleClasses.ContactData}>
                <h4>ENTER YOUR CONTACT DATA</h4>
                {form}
            </div>
        )
    }



}

export default ContactData;