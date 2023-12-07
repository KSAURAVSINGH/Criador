const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const crypto = require('crypto')
const {client} = require('../database/db_connection')
const { ObjectId } = require('mongodb');

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
