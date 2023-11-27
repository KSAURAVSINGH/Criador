import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import LandingComp from './components/landing';
import RegisterComp from './components/register';
import LoginComp from './components/login';
import HomeComp from './components/home';
import ActionItemComp from './components/actionItem';
import SearchUsersComp from './components/searchUsers';
import './App.css'

function App() {
  
  return (
    <div className='routes'>
      <Router>
          <Routes>
            <Route path='/' exact Component={LandingComp} />
            <Route path='/register' Component={RegisterComp} />
            <Route path='/login' Component={LoginComp} />
            <Route path='/home' Component={HomeComp} />
            <Route path='/search' Component={SearchUsersComp} />
            <Route path='/action-item/:actionId' Component={ActionItemComp} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;