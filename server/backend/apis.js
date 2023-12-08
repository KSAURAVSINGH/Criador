const account = require('./utils/account.js');
const passport = require('passport');
const actionItem = require('./utils/actionItem.js');
const user = require('./utils/user.js')
const project = require('./utils/projects.js')
const request = require('./utils/request.js')
const progressNote = require('./utils/progressNote.js');
const {verifyApi} = require('../auth/verifyApi.js')
const emailAuth = require('../auth/emailAuth.js');
 
function handleAPIs(app){   

    app.post('/register', account.registerUser)
    app.post('/login', passport.authenticate('local'), account.loginUser)
    app.post('/logout', account.logoutUser);
    app.get('/users/:id/verify/:token/', emailAuth.verifyEmailToken)
    
    app.get('/action-item/:id', verifyApi, actionItem.getActionItem)
    app.delete('/action-item/:id', verifyApi, actionItem.deleteActionItem)
    app.post('/action-item/:id', verifyApi, actionItem.updateActionItem)
    app.post('/action-item', verifyApi, actionItem.addActionItem)
    app.get('/action-item', verifyApi, actionItem.getAllActionItem)
    
    app.get('/user/id', verifyApi, user.getUserId);
    app.get('/user/all', verifyApi, user.getAllUsers);
    app.get('/user/partner', verifyApi, user.getAllPartners);
    app.get('/user', verifyApi, user.getUserDetails);

    app.get('/project/api/create-by-name', verifyApi, project.getProjectOrCreateNew)
    app.get('/project/all', verifyApi, project.getProjects)

    app.get('/action/hitcount', verifyApi, actionItem.getHitCount)
    app.post('/action/hitcount', verifyApi, actionItem.updateHitCount)

    app.get('/request/sent/user', verifyApi, request.getAllSentPendingConn);
    app.get('/request/received/user', verifyApi, request.getAllReceivedPendingConn);
    app.post('/request/accept', verifyApi, request.acceptRequest)
    app.post('/request/cancel', verifyApi, request.cancelRequest)
    app.post('/request/add', verifyApi, request.addConnection);

    app.post('/progress-note', verifyApi, progressNote.addProgressNote);
    app.get('/progress-note/action/:actionId', verifyApi, progressNote.getProgressNotesRefAction)
    app.post('/progress-note/note/:pnId', verifyApi, progressNote.updateProgressNote)

    // app.get('/action/collab/all', actionItem.getCollabs);
    // app.post('/action/collab/new', actionItem.addCollab);
    // app.delete('/action/collab', actionItem.removeCollab);

}   

module.exports = handleAPIs;
