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
import UploadImage from "./imageUploadSequence/UploadImage";
import ShowMapPage from './imageUploadSequence/showMapPage';
import AppInformationPage from "./appInformationPage";

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
          <Route path='/verifyMap' element={<ShowMapPage/>}/>
          <Route path='/appInformation' element={<AppInformationPage/>}/>
        </Routes>
        <ScrollToTop/>
      </Router>
    </>
  );
}

export default App;
