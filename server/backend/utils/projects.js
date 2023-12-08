const {client} = require('../../database/db_connection')

async function getProjectOrCreateNew(req, res){

    try{
        const name = req.query.name;
        const projectColl = client.db('Criador_DB').collection('projects');

        const project = await projectColl.findOne({name: name});
        
        if(project){
            return res.json({
                success: true,
                status: 200,
                body: project
            })
        }
        else{
            // Create a new project with the mentioned name if not present already
            const user = req.user;
            const userId = user._id;

            const projectDetails = {
                name: name,
                user: userId
            }
            const newProject = await projectColl.insertOne(projectDetails);
            
            if(newProject){
                console.log("Created a new project - ", projectDetails.name);
                return res.json({
                    success: true,
                    status: 200,
                    body: newProject
                })
            }
            else{
                console.error("Failed to fetch project details");
                return res.json({
                    success: false,
                    status: 400,
                    error: "Failed to fetch project details"
                })
            }            
        }
    }
    catch(err){
        console.error("Error occurred while fetching project id: ", err);
        return res.json({
            success: false,
            status: 500,
            error: err
        })
    }
}

async function addProject(req, res){

    try{

        const user = req.user;
        const userId = user._id.toString();
        const body = req.body;
        const userDetails = {user: userId}
        const projectDetails = {...body, ...userDetails}

        console.log("Adding a new project with details such: ", projectDetails)

        const projectColl = client.db('Criador_DB').collection('projects');
        const project = await projectColl.insertOne(projectDetails);
        if(project){
            console.log("Added a new project")
            return res.json({
                success: true,
                status: 201,
                body: "New Project created"
            })
        }
        else{
            console.error("Failed to create a new project")
            return res.json({
                success: false,
                status: 400,
                error: "Failed to create project"
            })
        }
    }
    catch(err){
        console.error("Error occurred while creating project: ", err);
        return res.json({
            success: false,
            status: 500,
            error: err
        })
    }
}

function getProjects(req, res){    

    try{
        const user = req.user;
        const userId = user._id.toString();

        const projectColl = client.db('Criador_DB').collection('projects');
        const projectCursor  = projectColl.find({user: userId})
        const projects = projectCursor.toArray();

        projects
        .then(response=>{
            console.log("Fetching projects of user ", user.email)
            return res.json({
                success: true,
                status: 200,
                body: response
            })
        })
        .catch(err=>{
            console.error("Failed to fetch projects of user ", user.email)
            return res.json({
                success: false,
                status: 400,
                error: err
            })
        })
    }
    catch(err){
        console.error("Error occurred while fetching projects ", err)
        return res.json({
            success: false,
            status: 500,
            error: err
        })
    }
}

module.exports = {
    getProjectOrCreateNew: getProjectOrCreateNew,
    addProject: addProject,
    getProjects: getProjects
}