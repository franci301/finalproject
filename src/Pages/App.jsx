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
import ViewAllOnMap from "./ViewSearchMap";
import PaletteInformation from "./PaletteInformation";
import SearchPage from "./SearchPage";
import SearchInformationPage from "./SearchInformationPage";
import {Helmet} from "react-helmet";
import AdvancedSearch from "./AdvancedSearch";
import AdvancedResults from "./AdvancedResults";

function App() {

  return (
    <>
      <Helmet>
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests"/>
      </Helmet>
      <Router>
        <Routes>
          <Route path='/*' element={<HomePage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/editProfile' element={<EditProfile/>}/>
          <Route path='/popularPage' element={<PopularPage/>}/>
          <Route path='/viewIndividualImage' element={<ViewIndividualImage/>}/>
          <Route path='/ViewOnMap' element={<ViewAllOnMap/>}/>
          <Route path='/uploadPhoto' element={<UploadPhotoPage/>}/>
          <Route path='/uploadImage' element={<UploadImage/>}/>
          <Route path='/verifyMap' element={<ShowMapPage/>}/>
          <Route path='/appInformation' element={<AppInformationPage/>}/>
          <Route path='/paletteInformation' element={<PaletteInformation/>}/>
          <Route path='/searchInformation' element={<SearchInformationPage/>}/>
          <Route path='/searchPage' element={<SearchPage/>}/>
          <Route path='/advancedSearch' element={<AdvancedSearch/>}/>
          <Route path='/advancedResults' element={<AdvancedResults/>}/>
        </Routes>
        <ScrollToTop/>
      </Router>
    </>
  );
}

export default App;
