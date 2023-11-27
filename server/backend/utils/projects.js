const {client} = require('../../database/db_connection')

async function getProjectOrCreateNew(req, res){

    

    const name = req.query.name;

    const projectColl = client.db('Criador_DB').collection('projects');

    try{
        const project = await projectColl.findOne({name: name});
        
        console.log("Project based on name: ", project);
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

            console.log("Create a new project");
            if(newProject){
                return res.json({
                    success: true,
                    status: 200,
                    body: newProject
                })
            }
            else{
                console.log("Failed to fetch project details");
                return res.json({
                    success: false,
                    status: 400,
                    error: "Failed to fetch project details"
                })
            }            
        }

    }
    catch(err){
        console.log("Error occurred while fetching project id: ", err);
        return res.json({
            success: false,
            status: 500,
            error: err
        })
    }
}

async function addProject(req, res){

    const user = req.user;
    const userId = user._id.toString();
   
    const body = req.body;

    const userDetails = {user: userId}
    const projectDetails = {...body, ...userDetails}

    console.log("Adding a new project with details such: ", projectDetails)

    try{
        const projectColl = client.db('Criador_DB').collection('projects');
        const project = await projectColl.insertOne(projectDetails);
        if(project){
            return res.json({
                success: true,
                status: 201,
                body: "New Project created"
            })
        }
        else{
            return res.json({
                success: false,
                status: 400,
                error: "Failed to create project"
            })
        }
    }
    catch(err){
        console.log("Error occurred while creating project: ", err);
        return res.json({
            success: false,
            status: 500,
            error: err
        })
    }
}

function getProjects(req, res){

    const user = req.user;
    const userId = user._id.toString();

    console.log("Inside get projects all")

    try{
        const projectColl = client.db('Criador_DB').collection('projects');
        const projectCursor  = projectColl.find({user: userId})
        const projects = projectCursor.toArray();

        projects
        .then(response=>{
            return res.json({
                success: true,
                status: 200,
                body: response
            })
        })
        .catch(err=>{
            return res.json({
                success: false,
                status: 400,
                error: err
            })
        })
    }
    catch(err){
        console.log("Error occurred while fetching projects ", err)
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