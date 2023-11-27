const {client} = require('../../database/db_connection')

function getAllSentPendingConn(req, res){

    try{
        const user = req.user;
        const userId = user._id.toString();
        
        const sentRequestColl = client.db('Criador_DB').collection('sent_requests');
        const sentRequestCursor = sentRequestColl.find({user: userId, status: 'pending'});

        const sentRequests = sentRequestCursor.toArray();

        sentRequests
        .then(response=>{
            return res.json({
                success: true,
                status: 200,
                body: response
            })
        })
        .catch(err=>{
            console.error("Failed to fetch sent requests: ",err);
            return res.json({
                success: false,
                status: 400,
                error: err
            })
        })
    }
    catch(err){
        console.error("Error occurred while fetching sent requests: ",err);
        return res.json({
            success: false,
            status: 500,
            error: err
        })
    }

}

function getAllReceivedPendingConn(req, res){

    try{
        const user = req.user;
        const userId = user._id.toString();
        
        const receivedRequestColl = client.db('Criador_DB').collection('received_requests');
        const receivedRequestCursor = receivedRequestColl.find({user: userId, status: 'pending'});

        const receivedRequests = receivedRequestCursor.toArray();

        receivedRequests
        .then(response=>{
            return res.json({
                success: true,
                status: 200,
                body: response
            })
        })
        .catch(err=>{
            console.error("Failed to fetch received requests: ",err);
            return res.json({
                success: false,
                status: 400,
                error: err
            })
        })
    }
    catch(err){
        console.error("Error occurred while fetching received requests: ",err);
        return res.json({
            success: false,
            status: 500,
            error: err
        })
    }

}

async function acceptRequest(req, res){

    try{
        const body = req.body;
        const partnerId = body.partnerId;

        const user = req.user;
        const userId = user._id.toString();;

        const receivedRequestColl = client.db('Criador_DB').collection('received_requests');
        const sentRequestColl = client.db('Criador_DB').collection('sent_requests');

        const receivedRequest = await receivedRequestColl.updateOne({user: userId, partner: partnerId}, { 
            $set: { status: 'accepted' } 
        });

        const sentRequest = await sentRequestColl.updateOne({user: partnerId, partner: userId}, { 
            $set: { status: 'accepted' } 
        });

        if(receivedRequest.modifiedCount>0 && sentRequest.modifiedCount>0){
            
            const userPartnerColl = client.db('Criador_DB').collection('user_partner_rel');
            const dataForUser = userPartnerColl.updateOne({user: userId}, 
                { $push: { partners: partnerId } 
            });
            const dataForPartner = userPartnerColl.updateOne({user: partnerId}, 
                { $push: { partners: userId } 
            });

            return res.json({
                success: true,
                success: 200,
                body: "Connection request accepted"
            })

        }
        else{
            return res.json({
                success: false,
                success: 400,
                error: "Failed to accept the connection"
            })
        }
    }
    catch(err){
        console.error("Error occurred while accepting the request: ", err);
        return res.json({
            success: false,
            success: 500,
            error: err
        })
    }
}

async function cancelRequest(req, res){

    try{
        const body = req.body;
        const partnerId = body.partnerId;

        const user = req.user;
        const userId = user._id.toString();;

        const receivedRequestColl = client.db('Criador_DB').collection('received_requests');
        const sentRequestColl = client.db('Criador_DB').collection('sent_requests');

        const receivedRequest = await receivedRequestColl.updateOne({user: userId, partner: partnerId}, { 
            $set: { status: 'cancelled' } 
        });

        const sentRequest = await sentRequestColl.updateOne({user: partnerId, partner: userId}, { 
            $set: { status: 'cancelled' } 
        });

        if(receivedRequest.modifiedCount>0 && sentRequest.modifiedCount>0){            
            return res.json({
                success: true,
                success: 200,
                body: "Connection request cancelled"
            })

        }
        else{
            return res.json({
                success: false,
                success: 400,
                error: "Failed to cancel the connection"
            })
        }


    }
    catch(err){
        console.error("Error occurred while cancelling the connection request: ", err);
        return res.json({
            success: false,
            success: 500,
            error: err
        })
    }
}

async function addConnection(req, res){

    try{
        const body = req.body;
        const partnerId = body.partnerId;

        const user = req.user;
        const userId = user._id.toString();;

        const receivedRequestColl = client.db('Criador_DB').collection('received_requests');
        const sentRequestColl = client.db('Criador_DB').collection('sent_requests');

        const receivedRequest = await receivedRequestColl.insertOne({
            user: partnerId,
            partner: userId,
            status: 'pending'
        })

        const sentRequest = await sentRequestColl.insertOne({
            user: userId,
            partner: partnerId,
            status: 'pending'
        })

        if(receivedRequest.insertedCount==1 && sentRequest.insertedCount==1){
            return res.json({
                success: true,
                status: 200,
                body: "Connection request sent"
            })
        }
        else{
            return res.json({
                success: false,
                status: 400,
                error: "Failed to send connection request"
            })
        }
        



    }
    catch(err){
        console.error("Error occurred while sending connection request: ", err);
        return res.json({
            success: false,
            status: 500,
            error: err
        })
    }
}


module.exports = {
    getAllSentPendingConn: getAllSentPendingConn,
    getAllReceivedPendingConn: getAllReceivedPendingConn,
    acceptRequest: acceptRequest,
    cancelRequest: cancelRequest,
    addConnection: addConnection
}