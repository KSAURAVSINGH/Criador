import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/register.css'
import HeaderComp from './header';

function RegisterComp(props) {

    const navigate = useNavigate();
    const [userData, setUserData] = useState({         
        firstname: '', 
        lastname: '',
        email: '',         
        password: ''
    })

    function handleSubmit(e){
        e.preventDefault();
        
        axios.post("/register", { data: userData})
        .then(response=>{
            console.log(response);
            return response.data;
        })
        .then(response=>{
            const result = response.success;
            console.log(response)
            if(result){
                if(response.body === 'New user registered'){
                    navigate('/login')
                }
                else{
                    alert("User already registered, please login");
                    navigate('/login')
                }            
            }
            else{
                console.log('An error occurred while registering user: ', response.error);
                alert('Something went wrong');
                setUserData({
                    firstname: '', 
                    lastname: '',
                    email: '',         
                    password: ''
                })
            }
        })
        .catch(err=>console.log("Error occurred: ", err))        
    }

    function handleChange(e){
        const {name, value} = e.target;
        setUserData({
            ...userData,
            [name]: value
        })
    }

    return (
        <div className='register'>
            <HeaderComp />
            <div className='container p-3'>                
            </div>    
            <form className="reg-form" onSubmit={handleSubmit}>
                <h3>Register</h3>   
                <div>
                    <label className='reg-label' htmlFor="firstname">First Name:</label>
                    <input
                    className='reg-input'
                    type="text"
                    id="firstname"
                    name="firstname"
                    value={userData.firstname}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div>
                    <label className='reg-label' htmlFor="lastname">Last Name:</label>
                    <input
                    className='reg-input'
                    type="text"
                    id="lastname"
                    name="lastname"
                    value={userData.lastname}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div>
                    <label className='reg-label' htmlFor="email">Email:</label>
                    <input
                    className='reg-input'
                    type='email'
                    id="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div>
                    <label className='reg-label' htmlFor="password">Password:</label>
                    <input
                    className='reg-input'
                    type="text"
                    id="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div className='reg-submit-button'>
                    <button className='reg-btn' type="submit">Register</button>
                </div>
                <div className='reg-already-account'>
                    <p>Already have an account? <Link to="/login">Log In</Link></p>                    
                </div> 
            </form>
        </div>
    );
}

export default RegisterComp;