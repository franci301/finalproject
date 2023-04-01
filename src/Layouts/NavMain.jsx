import { Navbar, Nav, Container } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import '../Assets/Styles/nav.css'
//  if button is clicked, then the profile picture will be replaced with a dropdown menu


function NavMain() {
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let loginToken = Boolean(Cookies.get('login-token'));
    setLogin(loginToken);
  }, [])

  async function handleLogout() {
    const auth = getAuth();
    await signOut(auth).then(() => {
        Cookies.remove('login-token');
        navigate('/login');
        window.location.reload();
    }).catch((error) => {
        window.alert(error.message);
    });
  }

  

  
  return (
    <Navbar id='navbar-container' expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <div className='d-flex flex-row m-auto align-content-center'>
          <Navbar.Brand href="/*">Application Name</Navbar.Brand>
          <div className='py-2' id='nav-login-text'>
            {login === true ?
              <Nav.Link href="/profile" className=''>Profile Picture</Nav.Link> :
              <Nav.Link href="/login">Login</Nav.Link>
            }
          </div>
        </div>
        <Navbar.Collapse id="basic-navbar-nav">
          <div className='py-3' id='navOptions-container'>
            <Nav>
              {/* <NavDropdown.Divider /> */}
              <Nav.Link href='/'>Home</Nav.Link>
              <Nav.Link href='/searchPage'>Search</Nav.Link>
              <Nav.Link href='/advancedSearch'>Advanced Search</Nav.Link>
              {login == true?
                <Nav.Link href='/uploadImage'>Upload</Nav.Link>:null
              }
              <Nav.Link href='/appInformation'>App Information</Nav.Link>
              {login === true ?
                <div className='parentLogin'>
                  <li onClick={handleLogout}>Logout</li>
                </div>:null
              }
            </Nav>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavMain;