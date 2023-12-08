const { ObjectId } = require('mongodb');
const {client} = require('../../database/db_connection')

async function addProgressNote(req, res){

    try{
        const body = req.body;
        const user = req.user;
        
        const progressNoteColl = client.db('Criador_DB').collection('progress_notes');
        const progressNote = await progressNoteColl.insertOne(body);

        if(progressNote){
            console.log("Adding a new progress note")
            return res.json({
                success: true,
                status: 201,
                body: "New progress note created"
            })
        }
        else{
            console.error("Failed to add a new progress note")
            return res.json({
                success: false,
                status: 400,
                error: "Failed to create note"
            })
        }
    }
    catch(err){
        console.error("Error occurred while creating progress note: ", err);
        return res.json({
            success: false,
            status: 500,
            error: err
        })
    }
}

async function getProgressNotesRefAction(req, res){

    try{
        const actionId = req.params.actionId;
        const query = {
            "actionId": actionId
        };

        const progressNoteColl = client.db('Criador_DB').collection('progress_notes');
        const progressNotes = await progressNoteColl.find(query).toArray();

        if(progressNotes){
            // const descProgressNotes = progressNotes.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));
            return res.json({
                success: true,
                status: 200,
                body: progressNotes
            })            
        }   
        else{
            return res.json({
                success: false,
                status: 400,
                error: "Failed to fetch progress notes based on action"
            })
        }    
    }
    catch(err){
        console.error("Error occurred while fetching progress notes wrt action id: ", err)
        return res.json({
            success: false,
            status: 500,
            error: err
        })
    }
}

async function updateProgressNote(req, res){

    try{

        const pnId = req.params.pnId;
        const data = req.body;

        const updateOperation = { $set: data };

        const progressNoteColl = client.db('Criador_DB').collection('progress_notes');
        const progressNotes = await progressNoteColl.updateOne({_id: new ObjectId(pnId)}, updateOperation);

        if(progressNotes){
            console.log("Progress note updated")
            return res.json({
                success: true,
                status: 200,
                body: "Updated the progress note"
            })   
        }
        else{
            console.error("Failed to update progress note")
            return res.json({
                success: false,
                status: 400,
                error: "Failed to fetch update progress note"
            })
        }
    }
    catch(err){
        console.error("Error occurred while updating progress note: ", err)
        return res.json({
            success: false,
            status: 500,
            error: err
        })
    }
}

module.exports = {
    addProgressNote: addProgressNote,
    getProgressNotesRefAction: getProgressNotesRefAction,
    updateProgressNote: updateProgressNote
}