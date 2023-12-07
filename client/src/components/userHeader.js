import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/userHeader.css';
import axios from 'axios'

function UserHeaderComp(props) {

    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    function handleProfileClick(){
        setShowDropdown(!showDropdown);
    }

    async function handleLogOutClick(){
        const response = await axios.post('/api/logout');
        if(response.data.success){
            navigate('/')
        }
        else{
            console.log("Failed to log out from the page")
        }
    }

    return (
        <div className='user-header'>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <Link to="/"><img style={{borderRadius: '30px', height: '40px'}} src='https://as2.ftcdn.net/v2/jpg/01/16/16/21/1000_F_116162105_fzej37FR1pD8LOvbH8UQJvoBqVoTvDFQ.jpg' alt="Your Logo" /></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item navbar-options">
                        <Link to="/home" className="nav-link active" aria-current="page" >Home</Link>                        
                    </li>
                    <li className="nav-item navbar-options">    
                        <div className='form search-form'>
                            <input type='text' className="search-input" placeholder='Search..'/>
                            <i className='bi bi-search search-icon'></i>
                        </div>
                    </li>                     
                </ul>  
                <div>
                <i className="bi bi-bell fs-3 p-5"></i>
                </div>      
                <div>
                    <i className="bi bi-person-circle fs-3" onClick={handleProfileClick}></i>
                    {
                        showDropdown && 
                        (
                            <div className='header-profile-dropdown'>
                        <Link className='header-profile-link'><div className='header-profile-link-container'>Profile</div></Link>
                        <Link className='header-profile-link'><div className='header-profile-link-container'>Dashboard</div></Link>
                        <Link className='header-profile-link'><div className='header-profile-link-container'>Requests</div></Link>
                        <Link className='header-profile-link' onClick={handleLogOutClick}><div className='header-profile-link-container'>LogOut</div></Link>                        
                    </div>
                        )
                    }                    
                </div>        
                </div>
            </div>
            </nav>
        </div>
    );
}

export default UserHeaderComp;