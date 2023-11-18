import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'react-axios';

const Register = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = async (e) => {
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
        } catch (error) {
            console.error('Registration failed:', error.response.data);
        }


    }
    return (
        <>
            <div className="register-container">
                <h2>Register</h2>
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="username" name="username" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <button type="submit">Register</button>
                </form>

            </div>
        </>
    )
}

export default Register
