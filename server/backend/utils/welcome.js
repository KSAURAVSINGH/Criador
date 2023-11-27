function landingPage(req, res){
    console.log("At Landing Page");
    // res.send("Welcome to Criador. Bring your idea into execution!")
    const data = {
        "key": "Its communicating"
    }
    res.send("data");
}

function registerUser(req, res){
    console.log("At Register User")
    res.send("New user? Please register!");
}

function loginUser(){
    console.log("At Login User");
    res.send("Login please");
}

function logoutUser(){
    console.log("At Logout User");
    res.send("User has been logged out");
}


module.exports = {
    landingPage: landingPage,
    registerUser: registerUser,
    loginUser: loginUser,
    logoutUser: logoutUser
}