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
        console.log(userData);
        alert(JSON.stringify(userData, null, 2))

        const headers = {
            'Content-Type': 'application/json'            
          };
        
        try{
            // navigate to home component
            let response = await axios.post('/api/login', userData, {headers});            
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
                console.log("Invalid username or password");     
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
                {/* <div className='col'>
                    <div className='row-8 header'>
                        <div className='col logo-space'>
                            <Link to="/"><img src='https://as2.ftcdn.net/v2/jpg/01/16/16/21/1000_F_116162105_fzej37FR1pD8LOvbH8UQJvoBqVoTvDFQ.jpg' alt="Your Logo" /></Link>                        
                        </div>
                    </div>
                </div>  */}
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