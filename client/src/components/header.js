import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css'

function HeaderComp(props) {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
            
                <Link to="/"><img style={{borderRadius: '30px', height: '40px'}} src={process.env.PUBLIC_URL + '/images/logo.jpeg'} alt="Your Logo" /></Link>
                {/* <Link to="/"><img style={{borderRadius: '30px', height: '40px'}} src='https://as2.ftcdn.net/v2/jpg/01/16/16/21/1000_F_116162105_fzej37FR1pD8LOvbH8UQJvoBqVoTvDFQ.jpg' alt="Your Logo" /></Link> */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {/* <li className="nav-item navbar-options">
                        <Link to="#" className="nav-link active" aria-current="page" >Home</Link>
                    </li> */}
                    <li className="nav-item navbar-options">
                        <Link to="#" className="nav-link active" aria-current="page" >About</Link>
                    </li>      
                    <li className="nav-item navbar-options">
                        <Link to="#" className="nav-link active" aria-current="page" >Contact</Link>
                    </li>   
                </ul>                             
                </div>
            </div>
            </nav>            
        </div>
    );
}

export default HeaderComp;