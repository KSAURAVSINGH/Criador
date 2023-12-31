import React, { useEffect, useState } from 'react';
import '../styles/newItemWindow.css'
import axios from 'axios';

const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  };

function NewItemWindowsComp(props) {

    const [name, setName] = useState('');
    const [status, setStatus] = useState('');
    const [collab, setCollab] = useState('')
    const [project, setProject] = useState('');
    const [desc, setDesc] = useState('');
    const [priority, setPriority] = useState('');
    let collaborators = [];

    useEffect(function(){

        setCollab(props.userDetails.email);

        // axios.get('/api/user')
        // .then(response=>{
        //     if(response.data.body){
        //         setCollab(response.data.body.email);
        //     }
        // })
        // .catch(err=>{
        //     setCollab("Unknown")
        // })

    }, [])    

    function handleChangeName(e){
        const value = e.target.value;
        setName(value);        
    }

    function handleChangeStatus(e){
        const value = e.target.value;
        setStatus(value);     
    }

    function handleChangeAssign(e){
        const value = e.target.value;
        setCollab(value);  
    }

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
    
    function handleCancelPopup(){
        props.onUpdate();
    }

    async function handleSubmit(e){
        
        e.preventDefault();
        props.onUpdate(); 
        if (collab.trim() !== '') {
            // Add the new element to the state
            collaborators = [...collaborators, collab]; 
        }
    
        // let userId = await getUserId(); 
        let userId = props.userDetails._id;           
        let projectDetails = await getProjectOrCreateNew(project);
        let projectId = projectDetails._id;

        await updateHitCount();        
        let hitCount = await getHitCount();           

        axios.post("/api/action-item", { data: {                
            name: name,
            desc: desc,
            status: status,
            priority: priority,
            projectName: project,
            partner: collaborators,            
            progressNote: [],
            user: userId,
            project: projectId,
            role: 'admin',
            createdOn: new Date().toLocaleDateString('en-US', options),
            updatedOn: new Date().toLocaleDateString('en-US', options),
            hitCount: "AI-"+hitCount.count
        }})
        .then(response=>{

            setName('');
            setStatus('');
            setCollab('');
            setProject('');
            setDesc('');
            setPriority('');    
            props.onSubmit();                           

        })
        .catch(err=>console.error("Error occurred: ", err))
                     
    }

    return (
        <div className='new-item-pop-up'>

            <div className="overlay">
                <div className="popup">                
                <h3 className='login-h3'>New Task</h3>            
                <form className='new-item-from' onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="ainame">Name:</label>
                        <input
                        type="text"
                        id="ainame"
                        name="ainame"
                        value={name}
                        onChange={handleChangeName}
                        required
                        />
                    </div>
                    <div>
                        <label htmlFor="aidesc">Description:</label>
                        <input
                        type="text"
                        id="aidesc"
                        name="aidesc"
                        value={desc}
                        onChange={handleChangeDesc}                                        
                        />
                    </div>
                    <div>
                        <label htmlFor="aiproject">Project:</label>
                        <input
                        type="text"
                        id="aiproject"
                        name="aiproject"
                        value={project}
                        onChange={handleChangeProject}
                        required
                        />
                    </div>
                    <div>
                        <label htmlFor="aicollab">Collaborators:</label>
                        <input
                        type="text"
                        id="aicollab"
                        name="aicollab"
                        value={collab}
                        onChange={handleChangeAssign}
                        readOnly={true}
                        required
                        disabled
                        />
                    </div>  
                    <div className='item-dropdown'>
                        <div className='status-dropdown'>
                            <label htmlFor="aistatus">Status:</label>
                            <select id="aistatus" name='aistatus' value={status} onChange={handleChangeStatus} required>
                                <option value="">Choose..</option>
                                <option value="Active">Active</option>
                                <option value="On Hold">On Hold</option>
                                <option value="Completed">Completed</option> 
                                <option value="Closed">Closed</option> 
                                <option value="Cancelled">Cancelled</option>                            
                            </select>   
                        </div>
                        <div className='priority-dropdown'>
                            <label htmlFor="aipriority">Priority:</label>
                            <select id="aipriority" name='aipriority' value={priority} onChange={handleChangePriority} required >
                                <option value="">Choose..</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>                                              
                            </select>     
                        </div>                                   
                    </div>    
                    <div className='item-form-buttons'>
                        <button className="btn btn-danger" onClick={handleCancelPopup} >Cancel</button>
                        <button className='btn btn-primary' type="submit">Create</button>
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

async function getHitCount(){
    const hitCount = await axios.get('/api/action/hitcount');
    if(hitCount.data.success){
        return hitCount.data.body;
    }
    else{
        return null;
    }
}

async function updateHitCount(){
    const hitCount = await axios.post('/api/action/hitcount');
    if(hitCount.data.success){
        return hitCount.data.body;
    }
    else{
        return hitCount.data.error;
    }
}

export default NewItemWindowsComp;