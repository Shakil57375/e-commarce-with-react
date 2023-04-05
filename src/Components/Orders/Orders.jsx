import React from 'react';
import './Orders.css'
import Cart from '../Cart/Cart';
import { useLoaderData } from 'react-router-dom';
import ReviewItem from '../ReviewItem/ReviewItem';

const Orders = () => {
    const cart = useLoaderData()
    // console.log(cart);
    return (
        <div>
            <div className="shop-container">
                <div className="review-container">
                    {
                        cart.map(product => <ReviewItem key = {product.id} product = {product} ></ReviewItem>)
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