import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link } from 'react-router-dom';
const Shop = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([]);
    useEffect(()=>{
        fetch('products.json')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[]);
    useEffect(()=>{
        // console.log({products});
        const storedCart = getShoppingCart();
        const savedCart = [];
        // console.log(storedCart);
        // step-1 : get id of the addedProduct
        for(const id in storedCart){
            // console.log(id);
            // step-2 : get product from products state by using id
            const addedProduct = products.find(product => product.id === id);
            if(addedProduct){
                // step-3 : add quantity
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                // step-4: add the added product to the saved cart
                savedCart.push(addedProduct);
            }
            // console.log(addedProduct);
        }
        // step-5 : set the cart
        setCart(savedCart);
    },[products])
    const handleAddToCart = (product) =>{
        // const newCart = [...cart, product]
        // if product doesn't exist in the cart, then set quantity = 1
        //  if exist update quantity by 1
        let newCart = [];
        const exist = cart.find(pd => pd.id === product.id)
        if(!exist){
            product.quantity = 1;
            newCart = [...cart, product]
        }
        else{
            exist.quantity = exist.quantity + 1;
            const remaining = cart.filter(pd => pd.id !== product.id)
            newCart = [...remaining, exist]
        }
        setCart(newCart);
        addToDb(product.id);
    }

    const handleClearCart = () =>{
        setCart([])
        deleteShoppingCart();
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product product={product} key = {product.id} handleAddToCart = {handleAddToCart} ></Product>)
                    
                }
            </div>
            <div className="cart-container">
                <Cart handleClearCart = {handleClearCart} cart = {cart}>
                    <Link className='proceed_link' to='/orders'>
                        <button className='btn-proceed'>
                            Review Order
                            <FontAwesomeIcon className='right-icon' icon={faRightLong} />
                        </button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;