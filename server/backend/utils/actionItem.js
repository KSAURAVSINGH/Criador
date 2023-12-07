const { ObjectId } = require('mongodb');
const {client} = require('../../database/db_connection')

function getActionItem(req, res){
    
    try{
        let actionItemID = req.params.id;
        actionItemID = new ObjectId(actionItemID);

        const actionItemsColl = client.db('Criador_DB').collection('action_items');
        const actionItem = actionItemsColl.findOne({"_id": actionItemID});
        
        actionItem
        .then(response=>{
            console.log("Fetching action item of user ", req.user.email)
            if(response){
                res.json({
                    success: true,
                    status: 200,
                    body: response
                })
            }
            else{
                console.log("No action item found")
                res.json({
                    success: false,
                    status: 404,
                    error: "No action item found"
                })
            }
        })
        .catch(err=>{
            console.error("Failed to fetch action item: ", err)
            res.json({
                success: false,
                status: 500,
                error: err
            })
        })
    }
    catch(err){
        console.error("Error occurred while fetching action item: ", err);
        res.json({
            success: false,
            status: 502,
            error: err
        })
    }
}

async function deleteActionItem(req, res){

    try{
        let actionItemID = req.params.id;
        actionItemID = new ObjectId(actionItemID);

        const actionItemsColl = client.db('Criador_DB').collection('action_items');
        const actionItem = actionItemsColl.deleteOne({"_id": actionItemID});
        
        actionItem
        .then(response=>{
            console.log("Action item deleted")
            res.json({
                success: true,
                status: 200,
                body: response
            })
        })
        .catch(err=>{
            console.error("Failed to delete action item: ", err)
            res.json({
                success: false,
                status: 400,
                error: err
            })
        })
    }
    catch(err){
        console.error("Error occurred while deleting action item: ", err);
        res.json({
            success: false,
            status: 502,
            error: err
        })
    }
}

async function updateActionItem(req, res){    
    
    try{

        let actionItemID = req.params.id;
        actionItemID = new ObjectId(actionItemID);

        let body = req.body;
        const update = {
            $set: body
        };

        const actionItemsColl = client.db('Criador_DB').collection('action_items');
        const actionItem = await actionItemsColl.updateOne({"_id": actionItemID}, update);

        if(actionItem){
            console.log("Action item updated with action id ", actionItemID)
            res.json({
                success: true,
                status: 200,
                body: "Action item updated"
            })
        }
        else{
            console.error("Failed to update action item")
            res.json({
                success: false,
                status: 400,
                error: "Failed to update action item"
            })
        }
    }
    catch(err){
        console.error("Error occurred while updating action item: ", err);
        return res.json({
            success: false,
            status: 500,
            error: err
        })
    }

}

async function addActionItem(req,res){

    try{
        const body = req.body;
        const data = body.data;
        const actionItemsColl = client.db('Criador_DB').collection('action_items');
        const actionItem = await actionItemsColl.insertOne(data);
        
        if(actionItem){
            console.log("New action item added by ", req.user.email)
            res.json({
                success: true,
                status: 201,
                body: "New action item created"
            })
        }
        else{
            console.error("Failed to add new action item by ", req.user.email)
            res.json({
                success: false,
                status: 400,
                error: "No action item created"
            })
        }

    }
    catch(err){
        console.error("Error occurred while creating action item: ", err);
        return res.json({
            success: false,
            status: 500,
            error: err
        })
    }

}

function getAllActionItem(req, res){

    try{
        const user = req.user;
        const userId = user._id.toString();
        const actionItemsColl = client.db('Criador_DB').collection('action_items');
        const actionItemsCursor = actionItemsColl.find({user: userId});
        
        const actionItems = actionItemsCursor.toArray();

        actionItems
        .then(response=>{
            const sortedResponse = response.sort((a,b)=>new Date(b.updatedOn)-new Date(a.updatedOn));
            console.log("Fetching all action items for user", user.email)
            if(response){
                res.json({
                    success: true,
                    status: 200,
                    body: sortedResponse
                })
            }
            else{
                console.log("No action item present")
                res.json({
                    success: false,
                    status: 404,
                    error: "No action item found"
                })
            }
        })
        .catch(err=>{
            console.error("Failed to fetch action items for user ", user.email)
            res.json({
                success: false,
                status: 500,
                error: err
            })
        })
    }
    catch(err){
        console.error("Error occurred while fetching all action items: ", err);
        res.json({
            success: false,
            status: 502,
            error: err
        })
    }
}

async function updateHitCount(req, res){

    try{
        const user = req.user;
        const userId = user._id.toString();

        const updateOperation = { $inc: { count: 1 } };
        const userApiHitColl = client.db('Criador_DB').collection('user_action_api_rel');
        const userHitData = await userApiHitColl.findOne({ user: userId })

        if(userHitData){
            const response = await userApiHitColl.updateOne({ user: userId }, updateOperation)
            if(response){
                return res.json({
                    success: true,
                    status: 200,
                    body: "Hit count updated"
                })
            }
            else{
                return res.json({
                    success: false,
                    status: 400,
                    error: "Failed to update hit count"
                })
            }
        }
        else{
            const response = await userApiHitColl.insertOne({
                user: userId,
                count: 1
            });
            if(response){
                return res.json({
                    success: true,
                    status: 201,
                    body: "Hit count updated"
                })
            }
            else{
                return res.json({
                    success: false,
                    status: 400,
                    error: "Failed to update hit count"
                })
            }            
        }
        
    }
    catch(err){
        console.error("Failed to update hit count: ", err);
        return res.json({
            success: false,
            status: 500,
            error: err
        })
    }

}

async function getHitCount(req, res){

    try{
        const user = req.user;
        const userId = user._id.toString();
        const userApiHitColl = client.db('Criador_DB').collection('user_action_api_rel');
        const userHitData = await userApiHitColl.findOne({ user: userId });

        if(userHitData){
            return res.json({
                success: true,
                status: 200,
                body: userHitData
            })
        }
        else{
            return res.json({
                success: false,
                status: 400,
                error: "Failed to get hit count"
            })
        }

    }
    catch(err){
        console.error("Error occurred in fetching hit count: ", err)
        return res.json({
            success: false,
            status: 500,
            error: err
        })
    }

}

async function getCollabs(req, res){
    

}


async function addCollab(req, res){

}

async function removeCollab(req, res){

}



module.exports = {
    getActionItem: getActionItem,
    deleteActionItem: deleteActionItem,
    updateActionItem: updateActionItem,
    addActionItem: addActionItem,
    getAllActionItem: getAllActionItem,
    updateHitCount: updateHitCount,
    getHitCount: getHitCount,
    getCollabs: getCollabs,
    addCollab: addCollab,
    removeCollab: removeCollab
}