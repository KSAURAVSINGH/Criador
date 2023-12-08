import React, { useEffect, useState } from 'react';
import '../styles/textEditorPopUp.css'
import ReactQuill from 'react-quill';
import axios from 'axios';


const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };

const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video']
    ]
}

function TextEditorPopUpComp(props) {

    const [content, setContent] = useState('');
    
    useEffect(()=>{
        setContent(props.editorContent.content);
    },[])

    // async function getUserId(){
    //     const userId = await axios.get('/api/user/id');
    //     if(userId.data.success){
    //         return userId.data.body;
    //     }
    //     return null;
    // }

    async function saveContentToDB(){

        try{
            // const userId = await getUserId();
            const actionId = props.actionId;
            const userId = props.user._id;

            const details = {
                content: content,
                userId: userId,
                actionId: actionId,
                updatedOn: new Date().toLocaleDateString('en-US', options),
                createdOn: new Date().toLocaleDateString('en-US', options)
            }

            const response = await axios.post('/api/progress-note', details);
            if(response.data.success){
                console.log("Note has been successfully added");                
            }
            else{
                console.error("Failed to add the note. Try again.");
            }

        }
        catch(err){
            console.error("Error occurred while adding note: ", err);
        }        
    }

    async function handleSaveClick(){

        try{
            const pnId = props.editorContent._id;

            const details = {
                'content': content,
                'updatedOn': new Date().toLocaleDateString('en-US', options)
            }

            const response = await axios.post(`/api/progress-note/note/${pnId}`, details)
              
            if(response.data.success){
                console.log("Progress note updated successfully");
            }         
            else{
                console.error("Failed to update progress note");
            }
        }
        catch(err){
            console.error("Error occurred while updating progress note: ", err)
        }

    }
    
    function handleCancelNote(){
        // clear the content 
        setContent('');
        props.popUpDisplay();
    }

    async function handleSaveNote(){

        // save the data to the database
        if(props.editorContent.content===''){
            await saveContentToDB();
        }
        else{
            await handleSaveClick();
        }
        
        setContent(props.editorContent.content);
        props.popUpDisplay();

    }

    function handleEditorContent(e){
        setContent(e);  
    }

    function isValueChanged(){
        return content !== props.editorContent.content;
    }

    return (
        <div className='text-editor-pop-up'>
            <div className='editor-overlay'>
                <div className='editor-pop-up-container'>
                    <div className='container'>
                        <div className='col'>
                            <div className='row-2 editor-pop-up-header'>
                                <div className='editor-pop-up-profile-image'>{props.user.firstname[0] + props.user.lastname[0]}</div>
                                <div className='editor-pop-up-header-username'>{props.user.firstname + " " + props.user.lastname}</div>
                                <div className='editor-pop-up-header-date'>{props.editorContent.updatedOn}</div>
                            </div>                    
                        </div>
                        <div className='row-5'>
                            <div className='editor-pop-up-react-quill-container'>
                                <ReactQuill 
                                    theme="snow" 
                                    value={content}
                                    modules={modules}
                                    onChange={handleEditorContent}
                                    className='editor-pop-up-react-quill'
                                />
                                <div className='editor-pop-up-footer'>
                                    <button 
                                        className='btn btn-danger'
                                        onClick={handleCancelNote}                                    
                                    >
                                        Cancel
                                    </button>                  
                                    <button 
                                        className='btn btn-primary'
                                        onClick={handleSaveNote}
                                        disabled={!isValueChanged()}
                                    >
                                        Save
                                    </button>
                                </div>                                
                            </div>
                        </div>
                    </div>     
                </div>
            </div>
        </div>
    );
}

export default TextEditorPopUpComp;