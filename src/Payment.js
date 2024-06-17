import React, { useEffect, useState } from 'react'
import './Payment.css'
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct';
import { Link } from 'react-router-dom';
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import {getBasketTotal} from "./reducer";
import axios from "./axios";
import { useNavigate } from 'react-router-dom';
import { db,doc,setDoc,collection,addDoc} from './firebase';



const Payment = () => {
    const [{ basket, user }, dispatch] = useStateValue();

    const navigate =  useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(null);
    const [succeeded,setSucceeded] = useState(null);
    const [processing,setProcessing] = useState("");
    const [clientSecret,setClientSecret] = useState(true);

    useEffect(() => {
        // Generate the special Stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            try {
                const response = await axios.post(`/payments/create?total=${getBasketTotal(basket) * 100}`);
                setClientSecret(response.data.clientSecret);
                console.log(response.data.clientSecret)
            } catch (error) {
                console.error('Error fetching client secret:', error);
            }
        };
    
        getClientSecret();
    }, [basket]);

    console.log('The Secret is..........',clientSecret);

    const handleSubmit = async (event) => {
        //all stripe related things handled here

        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card: elements.getElement(CardElement)
            }
        }).then(async ({paymentIntent})=>{
            //paymentIntent = payment confirmation

            const userDocRef = doc(collection(db, 'users'), user.uid);
            const ordersCollectionRef = collection(userDocRef, 'orders');
            const orderDocRef = doc(ordersCollectionRef, paymentIntent.id);
    
            await setDoc(orderDocRef, {
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created,
            });

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type : 'EMPTY_BASKET'
            })

            navigate('/orders');
        })
    }

    const handleChange = e => {
        //listen to the changes in the card element
        //and display any errors as the user types their card details

        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
    }

    return (
        <div className='payment'>
            <div className='payment_container'>
                <h1>
                    Checkout(
                    <Link to="/checkout">{basket.length} items</Link>
                    )
                </h1>
                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment_address'>
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>Los Angeles, CA</p>
                    </div>
                </div>
                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className='payment_items'>
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>
                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className='payment_details'>
                        <form onSubmit={handleSubmit}>
                            <CardElement  onChange={handleChange}/>
                            <div className='payment_priceContainer'>
                                <CurrencyFormat
                                    renderText={value => (
                                        <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing || disabled || 
                                succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
