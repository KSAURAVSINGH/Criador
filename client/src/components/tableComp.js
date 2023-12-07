import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/table.css'
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

    const togglePopup = () => {
        setShowPopup(!showPopup);
      };
    
    const submitPopup = () => {
        setSubmitFormStatus(!submitFormStatus);
    };

    useEffect(function(){
        try{
            axios.get('/api/action-item')
            .then(response=>{
                if(response.data.success){
                    const items = response.data.body;
                    // const reversedItems = items.reverse();
                    setData(items);
                    // HandleClickAndSort(items, 'updatedOn');
                    setLoading(false)
                }
                else{
                    console.error("Failed to fetch actions: ", response.data.error)
                }
            })
        }
        catch(err){
            console.error("Error occurred to fetch actions: ", err)            
        }        
    }, [submitFormStatus])

    if (loading) {
        return <p>Loading...</p>;
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
            {showPopup && <NewItemWindowsComp onUpdate={togglePopup} onSubmit={submitPopup}/>}                                      
            <div className='container table-container'>   
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
            </div>
            <div style={{height: '100px'}} />            
        </div>
    );
}

export default TableComp;