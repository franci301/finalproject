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
import PopularPage from './PopularPage';
import ScrollToTop from "../Components/ScrollToTop";
import ViewIndividualImage from "../Components/ViewIndividualImage";
import UploadPhotoPage from "./UploadPhotoPage";
import UploadImage from "../Components/UploadImage";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/*' element={<HomePage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/editProfile' element={<EditProfile/>}/>
          <Route path='/popularPage' element={<PopularPage/>}/>
          <Route path='/viewIndividualImage' element={<ViewIndividualImage/>}/>
          <Route path='/uploadPhoto' element={<UploadPhotoPage/>}/>
          <Route path='/uploadImage' element={<UploadImage/>}/>
        </Routes>
        <ScrollToTop/>
      </Router>
    </>
  );
}

export default App;
