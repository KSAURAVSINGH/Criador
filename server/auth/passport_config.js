const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');
const {client} = require('../database/db_connection')
const { ObjectId } = require('mongodb');

async function verifyPassword(enteredPassword, storedHashedPassword) {
  try {
    const result = await bcrypt.compare(enteredPassword, storedHashedPassword);
    return result;
  } catch (err) {
    // Handle any errors that occur during password verification
    throw err;
  }
}

async function verifyCallback(email, password, done){

    console.log("Email: ", email)
    console.log("Password: ", password)

    const accounts = client.db('Criador_DB').collection('accounts');
    // console.log("Accounts: ", accounts)

    try{
        const user = await accounts.findOne({email: email});
        if (!user) { 
            return done(null, false, { message: 'User not found' }); 
        }
        console.log("User found: ", user)
        const isMatch = await verifyPassword(password, user.password);
        console.log("Match result: ", isMatch)

        if (isMatch) { 
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
    // console.log("In desc", user);

    if (user) {
      done(null, user);
    } else {
      done(new Error('User not found'));
    }
  } catch (error) {
    done(error);
  }
});
