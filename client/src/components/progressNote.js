import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/progressNote.css'
import axios from 'axios';
import CommentsComp from './comments';
import TextEditorPopUpComp from './textEditorPopUp';

function ProgressNoteComp(props) {
    const [content, setContent] = useState('');
    const [savedContent, setSavedContent] = useState([]);
    const [copySavedContent, setCopySavedContent] = useState([]);
    const [userDetails, setUserDetails] = useState({});
    const [showPopUp, setShowPopup] = useState(false);
    const [changeAppeared, setChangeAppeared] = useState(false);
    const [editContent,setEditContent] = useState({
        content: ''
    });

    useEffect(()=>{

        console.log("Fetching updated progress notes");
        axios.get(`/api/progress-note/action/${props.actionId}`)
        .then(response=>{
            if(response.data.success){
                setSavedContent(response.data.body);
            }
            else{
                console.log("Failed to fetch progress notes: ", response.data.error);
            }
        })
        .catch(err=>{
            console.error("Error occurred while fetching already existing progress notes");
        })
    },[changeAppeared])

    useEffect(()=>{
        axios.get('/api/user')
        .then(user=>{
            if(user.data.success){
                setUserDetails(user.data.body);
            }
            else{
                console.log(user.data.error)
            }
        })
        .catch(err=>console.log("Error occurred while fetching user details"))
    },[userDetails])

    function handleEditorContent(data){
        setEditContent(data);
        setShowPopup(!showPopUp)
        console.log("Show pop up value - ", showPopUp);
        // if(showPopUp){
        //     setChangeAppeared(!changeAppeared)
        // }
    }

    function handlePopUpDisplay(){
        setShowPopup(!showPopUp)
        setEditContent({
            content: ''
        })
        console.log("Show pop up value - ", showPopUp);
        if(showPopUp){
            setChangeAppeared(!changeAppeared)
        }
        
    }

  function handleNewUpdate(){
    
    setShowPopup(!showPopUp);

    // console.log("Show pop up value - ", showPopUp);

    // if(showPopUp){
    //     setChangeAppeared(!changeAppeared)
    // }
  }

  return (
    <div className='progress-note'>
        <div>
            {showPopUp && <TextEditorPopUpComp popUpDisplay={handlePopUpDisplay} editorContent={editContent} user={userDetails} actionId={props.actionId}/> }
        </div>
        <div className='pn-addnew-button-container'>
            <button onClick={handleNewUpdate} className='pn-addnew-button'>Add New Update</button>
        </div>
        {
            savedContent.map((data,index)=>(
                <div key={index}>   
                    <CommentsComp content={data} user={userDetails} popUpDisplay={()=>handleEditorContent(data)}/>
                </div>                
            ))
        }

        {/* <ReactQuill 
            theme="snow" 
            value={content} 
            onChange={setContent} 
            modules={modules}
            className='pn-react-quill'
        />
        { content!=='' && (
            <div className='pn-button-section'>
                <button className='pn-cancel-button' onClick={handleCancelNote}>Cancel</button>
                <button className='pn-save-button' onClick={handleSaveNote}>Save</button>  
            </div>
        )}
        
        <div>
            {savedContent.map((data,index)=>(
                <div key={index} style={{marginTop: '80px'}}>   
                    <ReactQuill 
                        theme="snow" 
                        value={copySavedContent[index].value} 
                        readOnly={copySavedContent[index].readOnly}
                        onChange={(value)=>{handlePNChange(value, index)}} 
                        modules={modules}
                        className='pn-react-quill'
                    />
                    {!copySavedContent[index].readOnly && (
                        <div className='pn-button-section'>                        
                        <button 
                            onClick={() => handleCancelClick(index,data)}
                            className='pn-cancel-button'   
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={() => handleSaveClick(index,data)}
                            disabled={!isValueChanged(index,data)}
                            className='pn-save-button'    
                        >
                            Save
                        </button>
                        </div>
                    )}
                    {copySavedContent[index].readOnly && (
                        <div className='pn-button-section'>
                            <button 
                                onClick={() => handleEditClick(index)}
                                className='pn-edit-button' 
                                >
                                    Edit
                            </button>
                        </div>
                    )}                    
                </div>
            ))}
        </div> */}
        <div style={{height: '100px'}} />
    </div>
    
  )
}

export default ProgressNoteComp;