const {client} = require('../../database/db_connection')

function getUserId(req, res){

    try{
        const user = req.user;
        const userId = user._id.toString();
        if(userId){
            return res.json({
                success: true,
                status: 200,
                body: userId
            });
        }
        else{
            return res.json({
                success: false,
                status: 500,
                error: "Failed to fetch user id"
            });
        }
    }
    catch(err){
        return res.json({
            success: false,
            status: 500,
            error: err
        });
    }
    
}

function getUserDetails(req, res){

    try{
        const user = req.user;
        if(user){
            console.log("Fetching user details")
            return res.json({
                success: true,
                status: 200,
                body: user
            });
        }
        else{
            console.error("Failed to fetch user details")
            return res.json({
                success: false,
                status: 500,
                error: "Failed to fetch user details"
            });
        }
    }
    catch(err){
        return res.json({
            success: false,
            status: 500,
            error: err
        });
    }
}

async function getAllUsers(req, res){ 

    try{
        const user = req.user;
        const userId = user._id.toString();

        const accountColl = client.db('Criador_DB').collection('accounts');
        const accounts = await accountColl.find({ _id: { $ne: userId } }).toArray();

        accounts
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
        console.error("Error occurred while fetching all users: ", err)
        return res.json({
            success: false,
            status: 500,
            error: err
        })
    }
}

async function addEmptyPartnerList(userId){ 

    try{
        const data = {
            partner: [],
            user: userId
        }
        const userPartnersColl = client.db('Criador_DB').collection('user_partner_rel');
        const userPartners = await userPartnersColl.insertOne(data);
    }
    catch(err){
        console.log("Error occurred while adding empty partner list to any user")
    }
}

async function getAllPartners(){

    try{
        const user = req.user;
        const userId = user._id.toString();;
        
        const userPartnersColl = client.db('Criador_DB').collection('user_partner_rel');
        const userPartners = await userPartnersColl.findOne({user: userId});

        if(userPartners){
            return res.json({
                success: true,
                status: 200,
                body: userPartners.partners
            })
        }
        else{
            return res.json({
                success: false,
                status: 400,
                error: "Failed to fetch all partners of user"
            })
        }

    }
    catch(err){
        console.error("Error occurred while fetching all partners of user: ", err);
        return res.json({
            success: false,
            status: 500,
            error: err
        })
    }
}

module.exports = {
    getUserId: getUserId,
    getAllUsers: getAllUsers,
    getAllPartners: getAllPartners,
    getUserDetails: getUserDetails,
    addEmptyPartnerList: addEmptyPartnerList
}