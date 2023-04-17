import React, { useContext, useState } from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
const SignUp = () => {
    const [error, setError] = useState("")
    const {createUser} = useContext(AuthContext)
    const handleSignUp = (event) =>{
        event.preventDefault()
        setError(" ")
        const form = event.target
        const email = form.email.value
        const password = form.password.value
        const confirm = form.confirm.value
        console.log(email, password, confirm);
        if(password !== confirm){
            setError("Your password didn't match")
            return
        }
        else if(password.length < 6){
            setError("password must be 6 character longer")
        }
        createUser(email, password)
        .then(result =>{
            const loggedUser = result.user
            console.log(loggedUser);
        })
        .catch(error =>{
            console.log(error);
            setError(error.message)
        })
    }
    return (
        <div>
            <div className="form-container">
                <h2 className="form-title">Sign Up</h2>
                    <form onSubmit={handleSignUp}>
                        <div className="form-control">
                            <label htmlFor="email">Email</label>
                            <input type="email" name='email' placeholder='Enter your email' required />
                        </div>
                        <div className="form-control">
                            <label htmlFor="password">Password</label>
                            <input type="password" name='password' placeholder='Enter your password' required />
                        </div>
                        <div className="form-control">
                            <label htmlFor="password">Confirm Password</label>
                            <input type="password" name='confirm' placeholder='Enter your password' required />
                        </div>
                        <input type="submit" value="Sign Up" className='btn-submit' />
                    </form>
                    <p><small>Already have an account <Link to='/login'>Login</Link> </small></p>
                    <p className='text-error'>{error}</p>
            </div>
        </div>
    );
};

export default SignUp;