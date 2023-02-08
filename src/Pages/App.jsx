import '../Assets/Styles/reset.css';
import Footer from '../Layouts/Footer';
import NavMain from '../Layouts/NavMain';
import TopComponent from '../Components/TopComponent';

function App() {
  return (
    <div className='text-primary'>
      <NavMain/>
      <TopComponent/>

      <Footer/>
    </div>
  );
}

export default App;
