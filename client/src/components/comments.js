import React from 'react';
import '../styles/comments.css'

function CommentsComp(props) {


    function showTextEditorPopUp(){
        // props.editorContent();
        props.popUpDisplay();        
    }

    return (
        <div className='comments'>
            <div className='container'>
                <div className='col'>
                    <div className='row-2 comment-header'>
                        <div className='profile-image'>{props.user.firstname[0] + props.user.lastname[0]}</div>
                        <div className='comment-header-username'>{props.user.firstname + " " + props.user.lastname}</div>
                        <div className='comment-header-date'>{props.content.updatedOn}</div>
                    </div>                    
                </div>
                <div className='row-5'>
                    <div>
                        <div className='comment-preview' dangerouslySetInnerHTML={{__html: props.content.content}}>
                        </div>
                    </div>
                </div>
                <div className='row-2 comment-footer'>        
                    <i className="bi bi-pencil-square comment-footer-edit" onClick={showTextEditorPopUp}></i>
                    <i className="bi bi-heart comment-footer-heart"></i>
                    <i className="bi bi-link comment-footer-link"></i>                    
                </div>
            </div>            
        </div>
    );
}

export default CommentsComp;