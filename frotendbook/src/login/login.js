import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData()
        myForm.append('email', email)
        myForm.append('password', password)
        setEmail('')
        setPassword('')
    }

    const authenticated = async () =>{
        const isValid = await localStorage.getItem('token');
        if(!isValid){
            navigate('/register')
        }
    }

    useEffect(()=>{
        authenticated();
    },[])
    return (
        <>
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <label htmlFor="username">Email:</label>
                        <input type="text" id="username" name="username" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    )
}

export default Login
