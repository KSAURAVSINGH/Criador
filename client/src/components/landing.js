import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/landing.css'
import HeaderComp from './header';

function LandingComp(props) {

    const navigate = useNavigate()

    function navigateToLogin(){
        navigate('/login')
    }

    return (
        <div className='landing'>
            <HeaderComp />
            
            <div className='container p-3'>
                <div className='col'>
                    {/* <div className='row-8 header'>
                        <div className='col logo-space'>
                            <Link to="/"><img src='https://as2.ftcdn.net/v2/jpg/01/16/16/21/1000_F_116162105_fzej37FR1pD8LOvbH8UQJvoBqVoTvDFQ.jpg' alt="Your Logo" /></Link>
                        </div>
                    </div> */}
                    <div className='row-4 intro-context-parent'>
                        <div className='col-4'>
                            <div className='intro-context text-left'>
                                <p  style={{fontSize: '35px', color: '#FFFFFF', textAlign: 'left', marginBottom: '20px'}}><b>From Chaos to Control</b></p>
                                <p style={{fontSize: '20px'}}>Transform your tasks into triumphs. Our platform equips you to maintain organization, focus, and a competitive edge, keeping you ahead of the game.</p>                                 
                            </div>
                            <div>
                                <div className='started-button'>
                                    <button type="button" className="intro-started" onClick={navigateToLogin}>Get Started</button>
                                </div>   
                            </div>                                                         
                        </div>                                          
                    </div>   
                </div>                           
            </div>            
        </div>
    );
}

export default LandingComp;