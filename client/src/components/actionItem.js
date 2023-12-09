import React, { useEffect, useState } from 'react';
import ActionItemBarComp from './actionItemBar';
import ProgressNoteComp from './progressNote';
import { useParams } from 'react-router-dom';
import UserHeaderComp from './userHeader';
import '../styles/actionItem.css'
import axios from 'axios';

/**
 * Renders a page that displays the user header, an action item bar, and a progress note.
 * @returns {JSX.Element} The rendered action item page.
 */
function ActionItemComp() {
  const { actionId } = useParams();
  const [userDetails, setUserDetails] = useState({})

  useEffect(()=>{
    axios.get('/api/user')
    .then(user=>{
        if(user.data.success){
            setUserDetails(user.data.body);
        }
        else{
            console.error(user.data.error)
        }
    })
    .catch(err=>console.log("Error occurred while fetching user details"))
},[])


  return (
    <div className='action-item-page'>
      <UserHeaderComp />
      <ActionItemBarComp actionId={actionId} userDetails={userDetails}/>
      <ProgressNoteComp actionId={actionId} userDetails={userDetails}/>
    </div>
  );
}

export default ActionItemComp;
