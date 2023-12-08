import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserHeaderComp from './userHeader';
import TableComp from './tableComp';
import '../styles/home.css'

function HomeComp(props) {
    
    // const [data, setData] = useState([])

    // useEffect(function(){

    //     try{
    //         axios.get('/api/action-item')
    //         .then(response=>{
    //             if(response.data.success){
    //                 const items = response.data.body;
    //                 setData(items);
    //             }
    //             else{
    //                 console.error(response.data.error)
    //             }
    //         })
    //     }
    //     catch(err){
    //         console.log("Error occurred to fetch actions: ", err)            
    //     }
        
    // }, [])
    
    return (
        <div className='home-page'>
            <UserHeaderComp />
            <TableComp />
        </div>
    );
}

export default HomeComp;