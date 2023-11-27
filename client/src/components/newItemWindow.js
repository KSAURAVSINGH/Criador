import React, { useEffect, useState } from 'react';
import '../styles/newItemWindow.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

async function getUserId(){
    const userId = await axios.get('/user/id');
    if(userId.data.success){
        return userId.data.body;
    }
    return null;
}
const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };

function NewItemWindowsComp(props) {

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [status, setStatus] = useState('');
    const [collab, setCollab] = useState('')
    const [project, setProject] = useState('');
    const [desc, setDesc] = useState('');
    const [priority, setPriority] = useState('');
    
    const actionId = props.actionId;
    let collaborators = [];

    useEffect(function(){
        axios.get('/user')
        .then(response=>{
            if(response.data.body){
                setCollab(response.data.body.email);
            }
        })
        .catch(err=>{
            setCollab("Unknown")
        })
    }, [])


    useEffect(function(){
        if(!actionId==="0"){
            
            // fetch data of AI from backend apis
            axios.get(`/action-item/${actionId}`)
            .then(response=>{
                const data = response.data;
                console.log("Data: ", data)
                if(data.success){
                    const body = data.body
                    
                    const aiName = body.name;
                    const aiStatus = body.status;
                    const aiCollab = body.collab;
                    const aiProject = body.projectName;

                    setName(aiName);
                    setStatus(aiStatus);
                    setCollab(aiCollab);
                    setProject(aiProject);
                }
            })
            .catch(err=>console.log(err))
        }

    }, [])    

    async function getProjects(){
        const projects = await axios.get('/project/all');

        if(projects.data.success){
            return projects.data.body;
        }
        else{
            console.log("Error occurred while fetching projects: ", projects.data.error)
            return [];
        }
    }
    

    async function addProject(name){
        const payload = {
            name: name
        }
        const project = await axios.post('/project/new', payload)

        if(project.data.success){
            console.log("New project created")
        }
        else{
            console.log("Failed to create new project")
        }
    }

    async function getProjectOrCreateNew(name){
        const project = await axios.get('/project/api/create-by-name', {params: {name: name}});

        if(project.data.success){
            return project.data.body;
        }
        else{
            console.log("Error occurred while fetching projects: ", project.data.error)
            return {};
        }
    }

    async function getHitCount(){
        const hitCount = await axios.get('/action/hitcount');
        if(hitCount.data.success){
            return hitCount.data.body;
        }
        else{
            return null;
        }

    }

    async function updateHitCount(){
        const hitCount = await axios.post('/action/hitcount');
        if(hitCount.data.success){
            return hitCount.data.body;
        }
        else{
            return hitCount.data.error;
        }
    }

    // async function getCollabs(){
    //     const collabs = await axios.get('/action/collab/all');
    //     if(collabs.data.success){
    //         return collabs.data.body;
    //     }
    //     else{
    //         return [];
    //     }
    // }

    // async function addCollab(data){
    //     // data is the email id of the collaborator
    //     const collab = await axios.post('/action/collab/new', data);
    //     if(collab.data.success){
    //         return collab.data.body;
    //     }
    //     else{
    //         return collab.data.error;
    //     }
    // }

    // async function removeCollab(data){
    //     // data is the email id of the collaborator
    //     const collab = await axios.delete('/action/collab', { params: { data } });
    //     if(collab.data.success){
    //         return collab.data.body;
    //     }
    //     else{
    //         return collab.data.error;
    //     }
    // }

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
        
        if (collab.trim() !== '') {
            // Add the new element to the state
            collaborators = [...collaborators, collab]; 
        }
    
        let userId = await getUserId();            
        let projectDetails = await getProjectOrCreateNew(project);
        let projectId = projectDetails._id;

        await updateHitCount();        
        let hitCount = await getHitCount();

        console.log("User id: ", userId);
        console.log("Project id: ", projectId)
        console.log("Hit count: ", hitCount)
        console.log("Collaborators: ", collaborators);            

        axios.post("/action-item", { data: {                
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
            console.log(response);
            setName('');
            setStatus('');
            setCollab('');
            setProject('');
            setDesc('');
            setPriority('');    
            props.onSubmit();
            props.onUpdate();                

        })
        .catch(err=>console.log("Error occurred: ", err))
                     
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

export default NewItemWindowsComp;