import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import '../styles/actionItemBar.css'

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

    const aiExtraParams = useRef(null);

    let collaborators = [];
    const actionId = props.actionId;

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
            
        console.log("Inside useEffect hook to get the initial values")

        // fetch data of AI from backend apis
        axios.get(`/action-item/${actionId}`)
        .then(response=>{
            const data = response.data;
            
            if(data.success){                
                const body = data.body
                console.log("Action item data: ", body);

                const aiName = body.name;
                const aiDesc = body.desc;
                const aiProject = body.projectName;                
                const aiCollab = body.collab;
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
                console.error("Failed to fetch action item with given id")
            }
        })
        .catch(err=>console.log(err))        
    }, [pageRefresh])    

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
    

    async function handleSubmit(e){
        
        console.log("Inside handle submit function");

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
        axios.post(`/action-item/${actionId}`, updatedValues)
        .then(response=>{
            if(response.data.success){
                console.log(response.data.body);
            }
            else{
                console.log(response.data.error);
            }

            setPageRefreshStatus(!pageRefresh);
        }) 
        .catch(err=>{
            console.error("Error occurred while updating values")
        })

        


        if(true){
            console.log("HI");
        }
        else{

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
                status: status,
                partner: collaborators,
                projectName: project,
                progressNote: [],
                user: userId,
                project: projectId,
                role: 'admin',
                createdOn: new Date().toLocaleDateString('en-US', options),
                updatedOn: new Date().toLocaleDateString('en-US', options),
                hitCount: hitCount.count
            }})
            .then(response=>{
                console.log(response);
                setName('');
                setStatus('');
                setCollab('');
                setProject('');    
                navigate('/home');                    

            })
            .catch(err=>console.log("Error occurred: ", err))

            
        }
    }

    return (
        <div style={{marginLeft: '10%', marginRight: '10%'}}>
            <div className='container action-item-container'> 
                <div className='action-item-form'>
                    <form id="action-item-form" onSubmit={handleSubmit}>
                        <div className='action-item-heading'>
                            <h4>{aiExtraParams.actionItemNum} - {name}</h4>                
                            <button className='btn btn-primary' type="submit"><i class="bi bi-floppy" style={{paddingRight: '10px'}} ></i>Save</button>                                     
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
                                        <option value="">{status}</option>
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
                                        onChange={handleChangeAssign}
                                        readOnly={true}
                                        required
                                        disabled
                                    />
                                </div>
                                <div className='action-item-priority'>
                                    <label htmlFor="aipriority">Priority</label>
                                    <select id="aipriority" name='aipriority' value={priority} onChange={handleChangePriority} required>
                                        <option value="">{priority}</option>
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

export default ActionItemBarComp;