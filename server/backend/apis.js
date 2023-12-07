const account = require('./utils/account.js');
const passport = require('passport');
const actionItem = require('./utils/actionItem.js');
const user = require('./utils/user.js')
const project = require('./utils/projects.js')
const request = require('./utils/request.js')
const progressNote = require('./utils/progressNote.js');
const {verifyApi} = require('../auth/verifyApi.js')

function handleAPIs(app){
    
    app.post('/api/register', account.registerUser)
    app.post('/api/login', passport.authenticate('local'), account.loginUser)
    app.post('/api/logout', account.logoutUser);
    
    app.get('/api/action-item/:id', verifyApi, actionItem.getActionItem)
    app.delete('/api/action-item/:id', verifyApi, actionItem.deleteActionItem)
    app.post('/api/action-item/:id', verifyApi, actionItem.updateActionItem)
    app.post('/api/action-item', verifyApi, actionItem.addActionItem)
    app.get('/api/action-item', verifyApi, actionItem.getAllActionItem)
    
    
    app.get('/api/user/id', verifyApi, user.getUserId);
    app.get('/api/user/all', verifyApi, user.getAllUsers);
    app.get('/api/user/partner', verifyApi, user.getAllPartners);
    app.get('/api/user', verifyApi, user.getUserDetails);

    app.get('/api/project/api/create-by-name', verifyApi, project.getProjectOrCreateNew)
    app.get('/api/project/all', verifyApi, project.getProjects)

    app.get('/api/action/hitcount', verifyApi, actionItem.getHitCount)
    app.post('/api/action/hitcount', verifyApi, actionItem.updateHitCount)

    app.get('/api/request/sent/user', verifyApi, request.getAllSentPendingConn);
    app.get('/api/request/received/user', verifyApi, request.getAllReceivedPendingConn);
    app.post('/api/request/accept', verifyApi, request.acceptRequest)
    app.post('/api/request/cancel', verifyApi, request.cancelRequest)
    app.post('/api/request/add', verifyApi, request.addConnection);

    app.post('/api/progress-note', verifyApi, progressNote.addProgressNote);
    app.get('/api/progress-note/action/:actionId', verifyApi, progressNote.getProgressNotesRefAction)
    app.post('/api/progress-note/note/:pnId', verifyApi, progressNote.updateProgressNote)

    // app.get('/action/collab/all', actionItem.getCollabs);
    // app.post('/action/collab/new', actionItem.addCollab);
    // app.delete('/action/collab', actionItem.removeCollab);

}   

module.exports = handleAPIs;
