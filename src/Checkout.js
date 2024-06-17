import React from 'react'
import './Checkout.css'
import Subtotal from './Subtotal'
import CheckoutProduct from './CheckoutProduct'
import { useStateValue } from './StateProvider'

const Checkout = () => {

  const [{basket,user}, dispatch] = useStateValue();

  return (
    <div className='checkout'>
      <div className='checkout_left'>
        <img className="checkout_add" src="https://paxcom.ai/wp-content/uploads/2016/06/banner.png" alt=""/>    
        <div>
          <h3>Hello, {user?.email}</h3>
          <h2 className='checkout_title'>
            Your Shopping Basket
          </h2>
          {basket.map(item=>(
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
      <div className='checkout_right'>
        <Subtotal/>
      </div>
    </div>
  )
}

export default Checkout
