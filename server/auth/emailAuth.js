const {client} = require('../database/db_connection.js')
const { ObjectId } = require('mongodb');

async function verifyEmailToken(req, res){
	try {

        const userId = new ObjectId(req.params.id)
        const accounts = client.db('Criador_DB').collection('accounts');
        const user = await accounts.findOne({ _id: userId })

		if (!user){
            res.send('<h3>Invalid link</h3>')                 
        }

        const tokenColl = client.db('Criador_DB').collection('tokens');
        const token = await tokenColl.findOne({ 
            userId: user._id,
            token: req.params.token
        })

        if (!token){
            res.send('<h3>Invalid link</h3>')        
        }
        
        await accounts.updateOne({_id: user._id}, {$set: {'verified': true}});
        
        await tokenColl.deleteMany({ 
            userId: user._id
        })

        res.send('<h3>Email verified successfully</h3>') 

	} catch (error) {

        res.send('<h3>Something went wrong. Please try again later</h3>') 
	}
};

module.exports = {
    verifyEmailToken: verifyEmailToken
}