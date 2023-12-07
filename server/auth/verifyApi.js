function verifyApi(req, res, next){
    if('user' in req){
        next();
    }
    else{
        console.error("User session expired or not found")
        return res.json({
            success: false,
            status: 400,
            err: "Authorization failed to access the api"
        })
    }
}

module.exports = {
    verifyApi: verifyApi
}