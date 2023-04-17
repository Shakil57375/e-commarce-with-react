import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Shop from './Components/Shop/Shop';
import Home from './Components/Layout/Home';
import Orders from './Components/Orders/Orders';
import Inventory from './Components/Inventory/Inventory';
import Login from './Components/Login/Login';
import cartProductsLoader from './Components/Loaders/cartProductsLoader';
import CheckOut from './Components/CheckOut/CheckOut';
import SignUp from './Components/SignUp/SignUp';
import AuthProvider from './Components/Provider/AuthProvider';

const router = createBrowserRouter([
  {
    path: '/',
    element : <Home></Home>,
    children : [
    {
      path : '/',
      element : <Shop></Shop>
    },
    {
      path : 'orders',
      element : <Orders></Orders>,
      // loader : () => fetch('products.json'),
      loader : cartProductsLoader,
    },
    {
      path : 'inventory',
      element : <Inventory></Inventory>
    },
    {
      path : 'checkout',
      element : <CheckOut></CheckOut>
    },
    {
      path : 'login',
      element : <Login></Login>
    },
    {
      path : 'signUp',
      element : <SignUp></SignUp>
    }
  ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
