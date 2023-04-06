import React, { useState } from 'react';
import './Orders.css'
import Cart from '../Cart/Cart';
import { useLoaderData } from 'react-router-dom';
import ReviewItem from '../ReviewItem/ReviewItem';
import { removeFromDb } from '../../utilities/fakedb';

const Orders = () => {
    const savedCart = useLoaderData()
    const [cart, setCart] = useState(savedCart);
    // console.log(cart);
    const handleRemoveItem = (id) =>{
        setCart(cart.filter(product => product.id !== id))
        removeFromDb(id);
    }
    return (
        <div>
            <div className="shop-container">
                <div className="review-container">
                    {
                        cart.map(product => 
                        <ReviewItem 
                        key = {product.id} 
                        handleRemoveItem = {handleRemoveItem}
                        product = {product} >
                        </ReviewItem>)
                    }
                </div>
                <div className="cart-container">
                    <Cart cart={cart}></Cart>
                </div>
            </div>
        </div>
    );
};

export default Orders;