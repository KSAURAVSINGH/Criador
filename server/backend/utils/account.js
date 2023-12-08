const {client} = require('../../database/db_connection')
const userF = require('./user.js');
const crypto = require('crypto');
const sendEmail = require('./sendEmail.js')

async function handlePrerequisites(userId){

    try{
        await userF.addEmptyPartnerList(userId);
        console.log("Handled the prerequisites")
    }
    catch(err){
        console.error("Error occurred while handling pre-requisites for the new user: ", err)
    }
}

function hashPassword(rawPassword, salt) {
    try {
        const hash = crypto.scryptSync(rawPassword, salt, 64, { N: 1024 }).toString('hex');
        return hash;
    } catch (err) {
      // Handle any errors that occur during hashing
      throw err;
    }
  }

function loginUser(req, res){
    
    console.log("User logged in")
    return res.json({
        success: true,
        status: 200,
        body: 'Logged In'
    })
    
}

async function registerUser(req, res){

    try{

        const data = req.body;
        
        const salt = crypto.randomBytes(16).toString('hex');
        const hashedPassword = hashPassword(data.password, salt);
        console.log("Register new user with email", data.email);

        // all fields are required as configured in frontend
        let userDetail = {
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: hashedPassword,
            salt: salt,
            verified: false
        }

        const accounts = client.db('Criador_DB').collection('accounts');
        const user = await accounts.findOne({email: userDetail.email})

        if(user){
            console.log("User already registered in database. Instead LogIn");
            return res.json({
                success: true,
                status: 409,
                body: 'User already registered'
            })
        }
        else{
            try{
                const newUserResponse =  await accounts.insertOne(userDetail);
                console.log("User successfully registered!")

                const tokenDetails = {
                    userId: newUserResponse.insertedId,
                    token: crypto.randomBytes(32).toString("hex"),
                    createdAt: new Date()
                }

                const token = await client.db('Criador_DB').collection('tokens').insertOne(tokenDetails);
                
                const url = `${process.env.BASE_URL}users/${newUserResponse.insertedId}/verify/${tokenDetails.token}`;
		        await sendEmail(userDetail.email, url, userDetail.firstname);

                await handlePrerequisites(newUserResponse.insertedId);

                return res.json({
                    success: true,
                    status: 200,
                    body: 'An Email sent to your account. Please verify'
                })
                
            }
            catch(err){
                console.error("An error occurred while registering ", err);
                return res.json({
                    success: false,
                    status: 400,
                    error: err
                })
            }
        }
    }
    catch(err){
        console.error("An error occurred while fetching data from DB ", err);
        return res.json({
            success: false,
            status: 500,
            error: err
        })
    }   
}

const logoutUser = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return res.json({
                success: false,
                status: 500,
                error: err
            })
        }
        else{
            console.log("User logged out")
            return res.json({
                success: true,
                status: 200,
                body: 'User logged out'
            })
        }     
    });   
}


module.exports = {
    loginUser: loginUser,
    registerUser: registerUser,
    logoutUser: logoutUser
}