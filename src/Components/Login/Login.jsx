import React, { useContext, useState } from 'react';
import './Login.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
const Login = () => {
    const [show, setShow] = useState(false)
    const {SignIn} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation()
    console.log(location);
    const from = location.state?.from?.pathname || "/";
    const [error, setError] = useState("")
    const [success, setSuccess]  = useState("")
    const handleSignIn = (event) =>{
        event.preventDefault()
        setError(" ")
        setSuccess(" ")
        const form = event.target
        const email = form.email.value
        const password = form.password.value
        console.log(email, password);
        SignIn(email, password)
        .then(result =>{
            const loggedUser = result.user
            console.log(loggedUser);
            setSuccess("User successfully logged in")
            form.reset()
            navigate(from, {replace : true})
        })
        .catch(error =>{
            console.log(error);
            setError(error.message)
        })
    }
    return (
        <div>
            <div onSubmit={handleSignIn} className="form-container">
                <h2 className="form-title">Login</h2>
                    <form>
                        <div className="form-control">
                            <label htmlFor="email">Email</label>
                            <input type="email" name='email' placeholder='Enter your email' required />
                        </div>
                        <div className="form-control">
                            <label htmlFor="password">Password</label>
                            <input type={show ? "text" : "password"} name='password' placeholder='Enter your password' required />
                            <p onClick={() => setShow(!show)}>
                                <small>
                                    {
                                        show ? <span>Hide Password</span> : <span>Show password</span>
                                    }
                                </small>
                            </p>
                        </div>
                        <input type="submit" value="Login" className='btn-submit' />
                    </form>
                    <p><small>New to ema jhon? <Link to='/signUp'>Sign Up</Link> </small></p>
                    <p className='text-error'>{error}</p>
                    <p className='text-success'>{success}</p>
            </div>
        </div>
    );
};

export default Login;