const welcome = require('./utils/welcome.js');
const account = require('./utils/account.js');
const passport = require('passport');
const actionItem = require('./utils/actionItem.js');
const user = require('./utils/user.js')
const project = require('./utils/projects.js')
const request = require('./utils/request.js')
const progressNote = require('./utils/progressNote.js');

function handleAPIs(app){
    
    app.post('/register', account.registerUser)
    app.post('/login', passport.authenticate('local'), account.loginUser)
    app.get('/action-item/:id', actionItem.getActionItem)
    app.post('/action-item/:id', actionItem.updateActionItem)

    // action-item/api/:id
    app.post('/action-item', actionItem.addActionItem)
    // action-item/new
    app.get('/action-item', actionItem.getAllActionItem)
    // action-item
    app.get('/user/id', user.getUserId);
    // user
    app.get('/user/all', user.getAllUsers);
    app.get('/user/partner', user.getAllPartners);
    app.get('/user', user.getUserDetails);

    app.get('/project/api/create-by-name', project.getProjectOrCreateNew)
    app.get('/project/all', project.getProjects)

    app.get('/action/hitcount', actionItem.getHitCount)
    app.post('/action/hitcount', actionItem.updateHitCount)

    app.get('/request/sent/user', request.getAllSentPendingConn);
    app.get('/request/received/user', request.getAllReceivedPendingConn);
    app.post('/request/accept', request.acceptRequest)
    app.post('/request/cancel', request.cancelRequest)
    app.post('/request/add', request.addConnection);

    app.post('/progress-note', progressNote.addProgressNote);
    app.get('/progress-note/action/:actionId', progressNote.getProgressNotesRefAction)
    app.post('/progress-note/note/:pnId', progressNote.updateProgressNote)

    // app.get('/action/collab/all', actionItem.getCollabs);
    // app.post('/action/collab/new', actionItem.addCollab);
    // app.delete('/action/collab', actionItem.removeCollab);

}   

module.exports = handleAPIs;