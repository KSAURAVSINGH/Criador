import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios'
import '../styles/actionItemBar.css'
import { useNavigate } from 'react-router-dom';

const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };

function ActionItemBarComp(props) {

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [status, setStatus] = useState('');
    const [collab, setCollab] = useState('')
    const [project, setProject] = useState('');
    const [desc, setDesc] = useState('');
    const [priority, setPriority] = useState('');
    const [updatedOn, setUpdatedOn] = useState('')
    const [pageRefresh, setPageRefreshStatus] = useState(true);
    const [showDeletePopup, setShowDeletePopup] =  useState(false);

    const aiExtraParams = useRef(null);    
    const actionId = props.actionId;

    useEffect(function(){
            
        console.log("Action item api calling")
        // fetch data of AI from backend apis
        axios.get(`/api/action-item/${actionId}`)
        .then(response=>{
            const data = response.data;
            
            if(data.success){      
                console.log("Fetched action items");          
                
                const body = data.body
                const aiName = body.name;
                const aiDesc = body.desc;
                const aiProject = body.projectName;                
                const aiCollab = body.partner;
                const aiStatus = body.status;
                const aiPriority = body.priority;
                const aiUpdatedOn = body.updatedOn;
                aiExtraParams.createdOn = body.createdOn;
                aiExtraParams.updatedOn = body.updatedOn;
                aiExtraParams.actionItemNum = body.hitCount; 

                setName(aiName);
                setDesc(aiDesc);                                
                setProject(aiProject);
                setCollab(aiCollab);
                setStatus(aiStatus);
                setPriority(aiPriority);
                setUpdatedOn(aiUpdatedOn);
            }
            else{
                console.error(data.error)
            }
        })
        .catch(err=>console.error("Error occurred while fetching action items: ", err))        
    }, [pageRefresh, actionId])    
    
    function handleChangeName(e){
        const value = e.target.value;
        setName(value);        
    }

    function handleChangeStatus(e){
        const value = e.target.value;
        setStatus(value);     
    }

    // function handleChangeAssign(e){
    //     const value = e.target.value;
    //     setCollab(value);  
    // }

    function handleChangeProject(e){
        const value = e.target.value;
        setProject(value);  
    }

    function handleChangeDesc(e){
        const value = e.target.value;
        setDesc(value);  
    }

    function handleChangePriority(e){
        const value = e.target.value;
        setPriority(value);  
    }

    async function handleSubmit(e){
        e.preventDefault();
        
        let projectDetails = await getProjectOrCreateNew(project);
        let projectId = projectDetails._id;

        const updatedValues = {
            name: name,
            projectName: project,
            project: projectId,
            desc: desc,
            status: status,
            priority: priority,
            updatedOn: new Date().toLocaleDateString('en-US', options)
        };

        // Updating the current action id with the new values
        axios.post(`/api/action-item/${actionId}`, updatedValues)
        .then(response=>{
            if(response.data.success){
                console.log("Updating action id");
            }
            else{
                console.error(response.data.error);
            }
            setPageRefreshStatus(!pageRefresh);
        }) 
        .catch(err=>{
            console.error("Error occurred while updating values: ", err)
        })        
    }

    async function handleDelete(){
        setShowDeletePopup(true);
    }

    async function handleDeleteCancel(){
        setShowDeletePopup(false);
    }

    async function handleFinalDeleteDecision(){
        setShowDeletePopup(false);
        // call the delete api and navigate to home
        axios.delete(`/api/action-item/${actionId}`)
        .then(response=>{
            if(response.data.success){
                console.log("Action item deleted");
            }
        })
        .catch(err=>{
            console.error("Error occurred while deleting action item: ", err);
        })
        navigate('/home')
    }

    return (
        <div style={{marginLeft: '10%', marginRight: '10%'}}>
            {showDeletePopup && (
                <div className='delete-overlay'>
                    <div className='delete-popup'>
                        <h2>Are you sure?</h2>
                        <div className='delete-options'>
                            <button className='btn' style={{backgroundColor: 'grey', color: 'white'}} onClick={handleDeleteCancel}>Cancel</button>
                            <button className='btn btn-danger' onClick={handleFinalDeleteDecision}>Delete</button>
                        </div>
                    </div>
                </div>                
            )}
            <div className='container action-item-container'> 
                <div className='action-item-form'>
                    <form id="action-item-form" onSubmit={handleSubmit}>
                        <div className='action-item-heading'>
                            <h4>{aiExtraParams.actionItemNum} - {name}</h4>  
                            <button className='btn btn-danger heading-delete' onClick={handleDelete}><i className="bi bi-trash3" style={{paddingRight: '10px'}} ></i>Delete</button>                                     
                            <button className='btn btn-primary' type="submit"><i className="bi bi-floppy" style={{paddingRight: '10px'}} ></i>Save</button>                                     
                        </div>  
                        <div className='row action-item-form-contents '>
                            <div className='col-6'>
                                <div className='action-item-name'>
                                    <label htmlFor="ainame">Name</label>
                                    <input
                                        type="text"
                                        id="ainame"
                                        name="ainame"
                                        value={name}
                                        onChange={handleChangeName}
                                        required
                                    />
                                </div>
                                <div className='action-item-desc'>
                                    <label htmlFor="aidesc">Description</label>
                                    <input
                                        type="text"
                                        id="aidesc"
                                        name="aidesc"
                                        value={desc}
                                        onChange={handleChangeDesc}                                                                        
                                    />
                                </div>
                                <div className='action-item-status'>
                                    <label htmlFor="aistatus">Status</label>
                                    <select id="aistatus" name='aistatus' value={status} onChange={handleChangeStatus} required>
                                        <option value="Active">Active</option>
                                        <option value="On Hold">On Hold</option>
                                        <option value="Completed">Completed</option> 
                                        <option value="Closed">Closed</option> 
                                        <option value="Cancelled">Cancelled</option>                            
                                    </select>   
                                </div>
                                <div className='action-item-updated'>
                                    <label htmlFor="aidesc">Updated</label>
                                    <i>{updatedOn}</i>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className='action-item-project'>
                                    <label htmlFor="aiproject">Project</label>
                                    <input
                                        type="text"
                                        id="aiproject"
                                        name="aiproject"
                                        value={project}
                                        onChange={handleChangeProject}
                                        required
                                    />
                                </div>
                                <div className='action-item-collab'>
                                    <label htmlFor="aicollab">Collaborators</label>
                                    <input
                                        type="text"
                                        id="aicollab"
                                        name="aicollab"
                                        value={collab}
                                        // onChange={handleChangeAssign}
                                        readOnly={true}
                                        required
                                        disabled
                                    />
                                </div>
                                <div className='action-item-priority'>
                                    <label htmlFor="aipriority">Priority</label>
                                    <select id="aipriority" name='aipriority' value={priority} onChange={handleChangePriority} required>
                                        {/* <option value="">{priority}</option> */}
                                        <option value="High">High</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Low">Low</option>                                              
                                    </select>     
                                </div> 
                                <div className='action-item-created'>
                                    <label htmlFor="aidesc">Created</label>
                                    <i>{aiExtraParams.createdOn}</i>
                                </div>                            
                            </div> 
                        </div>                                                        
                    </form>
                </div>
            </div>
        </div>
    );
}

async function getProjectOrCreateNew(name){
    const project = await axios.get('/api/project/api/create-by-name', {params: {name: name}});

    if(project.data.success){
        return project.data.body;
    }
    else{
        console.log("Error occurred while fetching projects: ", project.data.error)
        return {};
    }
}

export default ActionItemBarComp;