const {client} = require('../../database/db_connection')
const userF = require('./user.js');
const crypto = require('crypto');
const saltRounds = 10;

async function handlePrerequisites(userId){

    try{
        await userF.addEmptyPartnerList(userId);
        console.log("Handled the prerequisites")
    }
    catch(err){
        console.log("Error occurred while handling pre-requisites for the new user")
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
    console.log(req.session);
    
    return res.json({
        success: true,
        statusCode: 200,
        body: 'Logged In'
    })
    
}

async function registerUser(req, res){

    const body = req.body;
    const data = body.data;

    console.log("Body: ",body);
    
    const salt = crypto.randomBytes(16).toString('hex');
    const hashedPassword = hashPassword(data.password, salt);


    // all fields are required as configured in frontend
    let userDetail = {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        password: hashedPassword,
        salt: salt
    }

    const accounts = client.db('Criador_DB').collection('accounts');
    try{
        const user = await accounts.findOne({email: userDetail.email})
        console.log("User: ",user);
        if(user){
            console.log("User already registered");
            return res.json({
                success: true,
                statusCode: 409,
                body: 'User already registered'
            })
        }
        else{

            try{
                const newUserResponse =  await accounts.insertOne(userDetail);
                console.log('New User: ', newUserResponse);
                console.log("User registered!")

                await handlePrerequisites(newUserResponse.insertedId);

                return res.json({
                    success: true,
                    statusCode: 201,
                    body: 'New user registered'
                })
                
            }
            catch(err){
                console.log("An error occurred while registering ", err);
                return res.json({
                    success: false,
                    statusCode: 400,
                    error: err
                })
            }
        }
    }
    catch(err){
        console.log("An error occurred while fetching data from DB ", err);
        return res.json({
            success: false,
            statusCode: 500,
            error: err
        })
    }
    
}

const logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err)
            throw err;
        else    
        res.redirect('/')
    });
    
}

module.exports = {
    loginUser: loginUser,
    registerUser: registerUser,
    logout: logout
}