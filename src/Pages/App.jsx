import '../Assets/Styles/reset.css';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import HomePage from './HomePage';
import Register from './Register';
import Login from './Login';
import NavMain from '../Layouts/NavMain';
import Footer from '../Layouts/Footer';
import Profile from '../Pages/Profile';

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
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
