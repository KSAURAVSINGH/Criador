import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/login.css';
import HeaderComp from './header';

function LoginComp(props) {

    const navigate = useNavigate();
    const [userData, setUserData] = useState({                 
        email: '',         
        password: ''
    })

    async function handleSubmit(e){
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'            
          };
        
        try{
            // navigate to home component
            let response = await axios.post('/login', userData, {headers});            
            setUserData({           
                email: '',         
                password: ''
            })
            if(response.status === 200){
                response = response.data;
                console.log("User Logged In")
                navigate('/home')
            }
            
        }
        catch(err){
            if(err.response.status === 401){
                alert("Invalid username or password") 
            }
            setUserData({           
                email: '',         
                password: ''
            })
            console.log("Error occurred:" ,err)
        }
    }

    function handleChange(e){
        const {name, value} = e.target;
        setUserData({
            ...userData,
            [name]: value
        })
    }

    return (
        <div className='login'>   
            <HeaderComp />
            <div className='container p-3'>                
            </div>        
            <form className='login-form' onSubmit={handleSubmit}>  
                <h3 className='login-h3'>Login Here</h3>              
                <div>
                    <label className="login-label" htmlFor="email">Email:</label>
                    <input
                    className='login-input'
                    type='email'
                    id="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div>
                    <label className="login-label" htmlFor="password">Password:</label>
                    <input
                    className='login-input'
                    type="text"
                    id="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div className='login-submit-button'>
                    <button className="login-btn" type="submit">Log In</button>
                </div>     
                <div className='login-no-account'>
                    <p>Not a member? <Link to="/register">Register here</Link></p>                    
                </div>                
            </form>
        </div>
    );
}

export default LoginComp;