const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const crypto = require('crypto')
const {client} = require('../database/db_connection')
const { ObjectId } = require('mongodb');
const sendEmail = require('../backend/utils/sendEmail')

async function verifyPassword(enteredPassword, storedHashedPassword, salt) {
  
  try{
    const hash = crypto.scryptSync(enteredPassword, salt, 64, { N: 1024 }).toString('hex');
    return hash === storedHashedPassword;
  }
  catch (err) {
    // Handle any errors that occur during password verification
    throw err;
  }
}

async function verifyCallback(email, password, done){

    const accounts = client.db('Criador_DB').collection('accounts');
    
    try{
        const user = await accounts.findOne({email: email});
        if (!user) { 
            return done(null, false, { message: 'User not found' }); 
        }
        
        const isMatch = await verifyPassword(password, user.password, user.salt);

        if (isMatch) { 
            console.log("Inside verify callback");
            if(!user.verified){
              
              const tokenColl = client.db('Criador_DB').collection('tokens');
              const token = await tokenColl.findOne({userId: user._id});

              console.log("Token response: ", token);

              if (!token) {
                console.log("Inside token");
                const tokenDetails = {
                  userId: user._id,
                  token: crypto.randomBytes(32).toString("hex"),
                  createdAt: new Date()
                }

                const newToken = tokenColl.insertOne(tokenDetails)

                const url = `${process.env.BASE_URL}users/${user._id}/verify/${tokenDetails.token}`;
                await sendEmail(user.email, url, user.firstname);

                console.log("An email sent to the user for verification")
                return done(null, false, { message: 'An Email sent to your account please verify' });
              }     

              return done(null, false, { message: 'Please, try again' });
            }

            console.log("User found")
            return done(null, user); 
        }
        return done(null, false, { message: 'Incorrect username or password' });
    }
    catch(err){
        return done(err); 
    }

}

const strategy = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  },verifyCallback)

passport.use(strategy)

passport.serializeUser((user,done)=>{
    done(null,user._id);
});

passport.deserializeUser(async (userID,done)=>{

  try {
    const userIdnew = new ObjectId(userID);

    const accounts = client.db('Criador_DB').collection('accounts');
    const user = await accounts.findOne({ _id: userIdnew });

    if (user) {
      done(null, user);
    } else {
      done(new Error('User not found'));
    }
  } catch (error) {
    done(error);
  }
});
