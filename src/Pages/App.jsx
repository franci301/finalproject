import '../Assets/Styles/reset.css';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import HomePage from './HomePage';
import Register from './Register';
import Login from './Login';
import Profile from '../Pages/Profile';
import EditProfile from "./EditProfile";


function App() {

  return (
    // temporary solution until I download react router
    <>
      <Router>
        <Routes>
          <Route path='/*' element={<HomePage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/editProfile' element={<EditProfile/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
