import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/table.css'
import '../styles/loading.css'
import NewItemWindowsComp from './newItemWindow';

const columnConfig = [
    { databaseField: 'hitCount', displayName: 'Action ID' },
    { databaseField: 'name', displayName: 'Name' },
    { databaseField: 'status', displayName: 'Status' },        
    { databaseField: 'projectName', displayName: 'Project' },
    { databaseField: 'updatedOn', displayName: 'Last Updated On' },
    { databaseField: 'partner', displayName: 'Collaborators' }
  ];

function TableComp(props) {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState('Desc');
    const [showPopup, setShowPopup] = useState(false);
    const [submitFormStatus, setSubmitFormStatus] = useState(false);
    const [userDetails, setUserDetails] = useState({})
    const [showWelcomeMsg, setShowWelcomeMsg] = useState(false);
    const [quote, setQuote] = useState(['Success is not final, failure is not fatal: It is the courage to continue that counts.', 'Winston Churchill'])

    const togglePopup = () => {
        setShowPopup(!showPopup);
      };
    
    const submitPopup = () => {
        setSubmitFormStatus(!submitFormStatus);
    };

    // useEffect(function(){
    //     axios.get('https://api.quotable.io/quotes/random?tags=work|opportunity|self|success|work|wisdom?maxLength=120')
    //     .then(response=>{
    //         console.log(response);
    //         setQuote([response.data[0].content, response.data[0].author]);
    //     })
    //     .catch(err=>console.error(err));
    // },[])

    useEffect(function(){
        try{
            axios.get('/api/action-item')
            .then(response=>{
                if(response.data.success){
                    const items = response.data.body;
                    // const reversedItems = items.reverse();
                    if(items.length===0){
                        setShowWelcomeMsg(true);
                    }
                    else{
                        setShowWelcomeMsg(false);
                    }
                    setData(items);
                    // HandleClickAndSort(items, 'updatedOn');
                    setLoading(false)
                }
                else{
                    console.error("Failed to fetch actions: ", response.data.error)
                }
            })

            axios.get('/api/user')
            .then(response=>{
                if(response.data.body){
                    setUserDetails(response.data.body);
                }
            })
            .catch(err=>{
                console.error("Failed to fetch user details: ", err);
            })  
        }
        catch(err){
            console.error("Error occurred to fetch actions: ", err)            
        }        
    }, [submitFormStatus])

    if (loading) {
        return (<div>
            <main>
                <svg className="ip" viewBox="0 0 256 128" width="256px" height="128px" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#5ebd3e" />
                            <stop offset="33%" stopColor="#ffb900" />
                            <stop offset="67%" stopColor="#f78200" />
                            <stop offset="100%" stopColor="#e23838" />
                        </linearGradient>
                        <linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
                            <stop offset="0%" stopColor="#e23838" />
                            <stop offset="33%" stopColor="#973999" />
                            <stop offset="67%" stopColor="#009cdf" />
                            <stop offset="100%" stopColor="#5ebd3e" />
                        </linearGradient>
                    </defs>
                    <g fill="none" strokeLinecap="round" strokeWidth="16">
                        <g className="ip__track" stroke="#ddd">
                            <path d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56"/>
                            <path d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64"/>
                        </g>
                        <g strokeDasharray="180 656">
                            <path className="ip__worm1" stroke="url(#grad1)" strokeDashoffset="0" d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56"/>
                            <path className="ip__worm2" stroke="url(#grad2)" strokeDashoffset="358" d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64"/>
                        </g>
                    </g>
                </svg>
            </main>
        </div>);
    }

    function HandleClickAndSort(list, field){
                
        const sortBasedOnFieldSelected = sortByField(list, field);

        setData(sortBasedOnFieldSelected);
        if(order==='Asc'){
            setOrder('Desc')
        }
        else{
            setOrder('Asc');
        }              
    }

    function sortByField(list, field) {
        return list.slice().sort((a, b) => {
          const valueA = getField(a, field);
          const valueB = getField(b, field);
      
          if (order === 'Asc') {
            return compareValues(valueA, valueB);
          } else if (order === 'Desc') {
            return compareValues(valueB, valueA);
          }
      
          return 0;
        });
      }
      
      function getField(obj, field) {
        const fields = field.split('.');
        return fields.reduce((value, key) => (value ? value[key] : undefined), obj);
      }
      
      function compareValues(valueA, valueB) {
        if (typeof valueA === 'number' && typeof valueB === 'number') {
          return valueA - valueB;
        } else if (typeof valueA === 'string' && typeof valueB === 'string') {
          return valueA.localeCompare(valueB);
        } else {
          // Fallback to string comparison for mixed types
          return String(valueA).localeCompare(String(valueB));
        }
      }

    return (
        <div style={{marginLeft: '10%', marginRight: '10%'}}>               
            {showPopup && <NewItemWindowsComp onUpdate={togglePopup} onSubmit={submitPopup} userDetails={userDetails}/>}                
            <div className='container table-container'> 
                {!showWelcomeMsg && (
                    <div style={{marginLeft: '10%', marginRight: '10%'}}>
                        <p style={{textAlign: 'center', fontFamily: 'script', fontSize: '20px', color: 'rgb(17,24,39)'}}>"{quote[0]}" <i style={{fontSize: '18px'}}>by {quote[1]}</i></p> 
                    </div>                    
                )}
                <div className='add-new-item'>
                    <button className='btn btn-primary add-logo' onClick={togglePopup}><i className="bi bi-plus-square logo-content"></i>New</button>
                </div>     
                                                                   
                <table>
                    <thead>
                        <tr className='table-header-row'>
                        {columnConfig.map((column) => (
                            <th className='table-header-row-data' key={column.databaseField} onClick={()=>HandleClickAndSort(data, column.databaseField)}>{column.displayName}</th>
                        ))}
                        </tr>
                    </thead> 
                    <tbody>
                        {data.map((row, index) => (
                        <tr className='table-row' key={index}>
                            {columnConfig.map((column, newIndex) => (
                            <td className='table-row-data' key={newIndex}>
                                {column.databaseField === 'name' ? (
                                    <Link className="table-name-field" to={`/action-item/${row['_id']}`}>
                                        {row[column.databaseField]}
                                    </Link>
                                ) : (row[column.databaseField])}
                                </td>
                            ))}
                        </tr>
                        ))}
                    </tbody>
                </table>
                
                {showWelcomeMsg && (
                <div className='welcome-msg'>
                    <h1>Welcome {userDetails.firstname}</h1>
                    <div className='row'>
                        <div className='col-10'>
                            <p>Get ready to embark on an exciting journey of creation and progress. Start by adding your first item, and watch your accomplishments grow as you keep track of tasks and items on your way to success. <b>Happy creating!</b></p>
                        </div>
                        <div className='col-2'>
                            <div className='welcome-img'>
                                <img className="img-item" src={process.env.PUBLIC_URL + '/images/excitedman.png'} alt='Lets go'/>
                            </div>
                        </div>
                    </div>
                    
                </div>
                )}                
            </div>
            <div style={{height: '100px'}} />            
        </div>
    );
}

export default TableComp;