import React from 'react';
import UserHeaderComp from './userHeader';
import TableComp from './tableComp';
import '../styles/home.css'

function HomeComp(props) {
    
    return (
        <div className='home-page'>
            <UserHeaderComp />
            <TableComp />
        </div>
    );
}

export default HomeComp;