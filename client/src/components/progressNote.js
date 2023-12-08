import React, { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import '../styles/progressNote.css'
import axios from 'axios';
import CommentsComp from './comments';
import TextEditorPopUpComp from './textEditorPopUp';

function ProgressNoteComp(props) {

    const [savedContent, setSavedContent] = useState([]);
    // const [userDetails, setUserDetails] = useState({});
    const [showPopUp, setShowPopup] = useState(false);
    const [changeAppeared, setChangeAppeared] = useState(false);
    const [editContent,setEditContent] = useState({
        content: ''
    });

    useEffect(()=>{

        axios.get(`/api/progress-note/action/${props.actionId}`)
        .then(response=>{
            if(response.data.success){
                setSavedContent(response.data.body);
            }
            else{
                console.error("Failed to fetch progress notes: ", response.data.error);
            }
        })
        .catch(err=>{
            console.error("Error occurred while fetching already existing progress notes");
        })
    },[changeAppeared])

    // useEffect(()=>{
    //     axios.get('/api/user')
    //     .then(user=>{
    //         if(user.data.success){
    //             setUserDetails(user.data.body);
    //         }
    //         else{
    //             console.error(user.data.error)
    //         }
    //     })
    //     .catch(err=>console.log("Error occurred while fetching user details"))
    // },[])

    function handleEditorContent(data){
        setEditContent(data);
        setShowPopup(!showPopUp)        
    }

    function handlePopUpDisplay(){
        setShowPopup(!showPopUp)
        setEditContent({
            content: ''
        })

        if(showPopUp){
            setChangeAppeared(!changeAppeared)
        }
    }

  function handleNewUpdate(){
    setShowPopup(!showPopUp);
  }

  return (
    <div className='progress-note'>
        <div>
            {showPopUp && <TextEditorPopUpComp popUpDisplay={handlePopUpDisplay} editorContent={editContent} user={props.userDetails} actionId={props.actionId}/> }
        </div>
        <div className='pn-addnew-button-container'>
            <button onClick={handleNewUpdate} className='pn-addnew-button'>Add New Update</button>
        </div>
        {
            savedContent.map((data,index)=>(
                <div key={index}>   
                    <CommentsComp content={data} user={props.userDetails} popUpDisplay={()=>handleEditorContent(data)}/>
                </div>                
            ))
        }        
        <div style={{height: '100px'}} />
    </div>
    
  )
}

export default ProgressNoteComp;