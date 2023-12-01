import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css'

function HeaderComp(props) {
    return (
        <div>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container">
                <Link to="/"><img style={{borderRadius: '30px', height: '40px'}} src='https://as2.ftcdn.net/v2/jpg/01/16/16/21/1000_F_116162105_fzej37FR1pD8LOvbH8UQJvoBqVoTvDFQ.jpg' alt="Your Logo" /></Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item navbar-options">
                            <Link to="/" class="nav-link active" aria-current="page" >Home</Link>
                        </li>
                        <li class="nav-item navbar-options">
                            <Link to="/" class="nav-link active" aria-current="page" >About</Link>
                        </li>      
                        <li class="nav-item navbar-options">
                            <Link to="/" class="nav-link active" aria-current="page" >Contact</Link>
                        </li>   
                    </ul>                             
                </div>
            </div>
            </nav>            
        </div>
    );
}

export default HeaderComp;