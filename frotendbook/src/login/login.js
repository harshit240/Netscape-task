import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        console.log("object")
        e.preventDefault();
        const myForm = new FormData()
        myForm.append('email', email)
        myForm.append('password', password)
        setEmail('')
        setPassword('')
        try {
            const response = await axios.post('/api/login', myForm);
            console.log('Login successful:', response.data);
            if(response.data.status == "success") {
                localStorage.setItem('token', response.data.Token)
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    }

    const authenticated = async () =>{
        const isValid = await localStorage.getItem('token');
        if(!isValid){
            navigate('/home')
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
                        <input type="text" value={email} name="email" onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}id="password" required />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    )
}

export default Login
