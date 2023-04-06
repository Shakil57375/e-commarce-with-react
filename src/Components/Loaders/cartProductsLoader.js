import { getShoppingCart } from "../../utilities/fakedb";

const cartProductsLoader = async () => {
    const loadedProduccts = await fetch('products.json');
    const products = await loadedProduccts.json();
    // console.log(products);
    // if cart data is in database, you have to use async await
    const storedCart = getShoppingCart()
    const savedCart = [];
    for(const id in storedCart){
        const addedProduct = products.find(pd => pd.id === id);
        // console.log (addedProduct);
        if(addedProduct){
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct);
        }        
    }

    // if you need to send two things
    // return [products, savedCart]
    // another option
    // return {products, cart: savedCart}

    return savedCart;
}

export default cartProductsLoader