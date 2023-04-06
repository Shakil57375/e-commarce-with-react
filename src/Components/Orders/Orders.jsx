import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import './Orders.css'
import Cart from '../Cart/Cart';
import { Link, useLoaderData } from 'react-router-dom';
import ReviewItem from '../ReviewItem/ReviewItem';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';

const Orders = () => {
    const savedCart = useLoaderData()
    const [cart, setCart] = useState(savedCart);
    // console.log(cart);
    const handleRemoveItem = (id) =>{
        setCart(cart.filter(product => product.id !== id))
        removeFromDb(id);
    }

    const handleClearCart = () =>{
        setCart([]);
        deleteShoppingCart();
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
                    <Cart handleClearCart = {handleClearCart} cart={cart}>
                        <Link className='proceed_link' to='/checkout'>
                            <button className='btn-proceed'>
                                Proced Checkout
                                <FontAwesomeIcon icon={faCreditCard} />

                            
                            </button>
                        </Link>
                    </Cart>
                </div>
            </div>
        </div>
    );
};

export default Orders;