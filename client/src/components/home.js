import React, { useEffect, useState } from 'react';
import HeaderComp from './header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserHeaderComp from './userHeader';
import TableComp from './tableComp';
import '../styles/home.css'

function HomeComp(props) {
    
    const [data, setData] = useState([])

    const navigate = useNavigate();
    const actionId = 0;

    function navigateToAI(){
       
        navigate(`/action-item/:${actionId}`)
    }

    function openAI(){
       
        navigate(`/action-item/:${actionId}`)
    }

    useEffect(function(){

        try{
            axios.get('/action-item')
            .then(response=>{
                console.log("action item response: ", response)
                if(response.data.success){
                    const items = response.data.body;
                    setData(items);
                }
                else{
                    console.log("Failed to fetch actions")
                }
            })
        }
        catch(err){
            console.log("Error occurred to fetch actions")            
        }
        
    }, [])
    
    const columnConfig = [
        { databaseField: 'hitCount', displayName: 'Action ID' },
        { databaseField: 'name', displayName: 'Name' },
        { databaseField: 'status', displayName: 'Status' },        
        { databaseField: 'projectName', displayName: 'Project' },
        { databaseField: 'updatedOn', displayName: 'Last Updated On' },
        { databaseField: 'partner', displayName: 'Collaborators' },
        // { databaseField: 'actionId', displayName: 'Action ID' }
      ];
    
    return (
        <div className='home-page'>
            <UserHeaderComp />
            <TableComp />
        </div>
    );
}

export default HomeComp;