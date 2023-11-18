import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = async (e) => {
        console.log("object")
        e.preventDefault();
        const myForm = new FormData()
        myForm.append('name', name)
        myForm.append('email', email)
        myForm.append('password', password)
        setName('')
        setEmail('')
        setPassword('')
        try {
            const response = await axios.post('/api/register', myForm);
            console.log('Registration successful:', response.data);
            navigate('/')
        } catch (error) {
            console.error('Registration failed:', error);
        }
    }
    
    const authenticated = async () =>{
        const isValid = localStorage.getItem('token');
        if(isValid){
            navigate('/home')
        }
    }

    useEffect(()=>{
        authenticated();
    })
    return (
        <>
            <div className="register-container">
                <h2>Register</h2>
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" value={name} name="name" onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" value={email} name="email" onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" value={password} name="password" onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit">Register</button>
                </form>

            </div>
        </>
    )
}

export default Register
