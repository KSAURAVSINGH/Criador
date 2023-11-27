const { ObjectId } = require('mongodb');
const {client} = require('../../database/db_connection')

function getActionItem(req, res){

    let actionItemID = req.params.id;
    actionItemID = new ObjectId(actionItemID);
    
    try{
        const actionItemsColl = client.db('Criador_DB').collection('action_items');
        const actionItem = actionItemsColl.findOne({"_id": actionItemID});
        
        actionItem
        .then(response=>{
            console.log("ActionItem: ", response);
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
            console.log("Error occured while fetching action item: ", err)
            res.json({
                success: false,
                status: 500,
                error: err
            })
        })
    }
    catch(err){
        console.log("Error occurred while fetching action item: ", err);
        res.json({
            success: false,
            status: 502,
            error: err
        })
    }
}

async function updateActionItem(req, res){    
    
    try{

        console.log("Inside updating acting action item");
        let actionItemID = req.params.id;
        actionItemID = new ObjectId(actionItemID);

        let body = req.body;

        const update = {
            $set: body
        };

        console.log("actionitemId", actionItemID);
        console.log("updatedata", update);

        const actionItemsColl = client.db('Criador_DB').collection('action_items');
        const actionItem = await actionItemsColl.updateOne({"_id": actionItemID}, update);

        console.log("actionitem response", actionItem);

        if(actionItem){
            res.json({
                success: true,
                status: 200,
                body: "Action item updated"
            })
        }
        else{
            res.json({
                success: false,
                status: 400,
                error: "Failed to update action item"
            })
        }

    }
    catch(err){
        console.log("Error occurred while updating action item: ", err);
        return res.json({
            success: false,
            status: 500,
            error: err
        })
    }

}

async function addActionItem(req,res){

    const body = req.body;
    const data = body.data;

    console.log("Data received from add action item: ", data);

    try{
        const actionItemsColl = client.db('Criador_DB').collection('action_items');
        const actionItem = await actionItemsColl.insertOne(data);
        
        console.log("Action item added: ", actionItem);
        if(actionItem){
            res.json({
                success: true,
                status: 201,
                body: "New action item created"
            })
        }
        else{
            res.json({
                success: false,
                status: 400,
                error: "No action item created"
            })
        }

    }
    catch(err){
        console.log("Error occurred while creating action item: ", err);
        return res.json({
            success: false,
            status: 500,
            error: err
        })
    }

}

function getAllActionItem(req, res){

    const user = req.user;
    const userId = user._id.toString();
    console.log("Get user ID: ", userId)

    try{
        const actionItemsColl = client.db('Criador_DB').collection('action_items');
        const actionItemsCursor = actionItemsColl.find({user: userId});
        
        const actionItems = actionItemsCursor.toArray();

        console.log("Inside get all actions")
        actionItems
        .then(response=>{
            const sortedResponse = response.sort((a,b)=>new Date(b.updatedOn)-new Date(a.updatedOn));
            console.log("All action items: ", response)
            if(response){
                res.json({
                    success: true,
                    status: 200,
                    body: sortedResponse
                })
            }
            else{
                console.log("All action items: ", response)
                console.log("No action item found")
                res.json({
                    success: false,
                    status: 404,
                    error: "No action item found"
                })
            }
        })
        .catch(err=>{
            console.log("Error occured while fetching action item: ", err)
            res.json({
                success: false,
                status: 500,
                error: err
            })
        })
    }
    catch(err){
        console.log("Error occurred while fetching all action items: ", err);
        res.json({
            success: false,
            status: 502,
            error: err
        })
    }

}

function generateActionID(req, res){

    const userId = req.user._id.toString();
    console.log("Get user ID: ", userId)

    try{
        const actionItemsColl = client.db('Criador_DB').collection('action_items');
        const actionItemCursor = actionItemsColl.find({ userId: userId }).sort({ createdOn: -1 }).limit(1);
        
        const actionItem = actionItemCursor.toArray();

        console.log("Inside get all actions", actionItem)
        actionItem
        .then(response=>{
            console.log("All action items: ", response)
            if(response){
                const actionId = response[0].actionId + 1;
                res.json({
                    success: true,
                    status: 200,
                    body: actionId
                })
            }
            else{                
                console.log("No action item found")
                res.json({
                    success: true,
                    status: 200,
                    body: 'AI01'
                })
            }
        })
        .catch(err=>{
            console.log("Error occured while fetching action item: ", err)
            res.json({
                success: false,
                status: 500,
                error: err
            })
        })
    }
    catch(err){
        console.log("Error occurred while fetching all action items: ", err);
        res.json({
            success: false,
            status: 502,
            error: err
        })
    }
}

async function updateHitCount(req, res){

    const user = req.user;
    const userId = user._id.toString();

    const updateOperation = { $inc: { count: 1 } };

    try{
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
        console.log("Failed to update hit count: ", err);
        return res.json({
            success: false,
            status: 500,
            error: err
        })
    }

}

async function getHitCount(req, res){

    const user = req.user;
    const userId = user._id.toString();

    try{
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
        console.log("Error occurred in fetching hit count: ", err)
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
    updateActionItem: updateActionItem,
    addActionItem: addActionItem,
    getAllActionItem: getAllActionItem,
    updateHitCount: updateHitCount,
    getHitCount: getHitCount,
    getCollabs: getCollabs,
    addCollab: addCollab,
    removeCollab: removeCollab
}