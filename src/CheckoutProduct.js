import React from 'react'
import './CheckoutProduct.css'
import { useStateValue } from './StateProvider'

const CheckoutProduct = ({ id, image, title, price, rating, hideButton }) => {

    const [{basket},dispatch] = useStateValue();

    const removefromBasket = () =>{
        //remove the item from the basket
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id : id,

        })
    }
    return (
        <div className='checkoutProduct'>
            <img className='checkoutProduct_image' src={image} />

            <div className='checkoutProduct_info'>
                <p className='CheckoutProduct_title'>{title}</p>
                <p className='checkoutProduct_price'>
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className='checkoutProduct_rating'>
                    {Array(rating).fill().map((_, i) => (<p>⭐</p>))}
                </div>
                {!hideButton && (
                     <button onClick={removefromBasket}>Remove from Basket</button>
                )}
            </div>
        </div>
    )
}

export default CheckoutProduct
