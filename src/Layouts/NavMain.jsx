import { Navbar, Nav, Container } from 'react-bootstrap';
// import profile from '../Assets/Images/profile.png';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import '../Assets/Styles/nav.css'
//  if button is clicked, then the profile picture will be replaced with a dropdown menu


function NavMain() {
  const [login, setLogin] = useState(true);

  useEffect(() => {
    // let loginToken = Boolean(Cookies.get('login-token'));
    // setLogin(loginToken);
  }, [])

  function handleLogout() {
    Cookies.remove('login-token');
    window.location.reload();
  }
  
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <div className='d-flex flex-row m-auto align-conetent-center'>
          <Navbar.Brand href="/*">Application Name</Navbar.Brand>
          <div className='py-2' id='login-text'>
            {login === true ?
              <Nav.Link href="/profile" className=''>Profile Picture</Nav.Link> :
              <Nav.Link href="/login">Login</Nav.Link>
            }
          </div>
        </div>
        <Navbar.Collapse id="basic-navbar-nav">
          <div className='py-3'>
            <Nav>
              {/* <NavDropdown.Divider /> */}

              {login === true ?
                <div className='parentLogin'>
                  <li onClick={handleLogout}>Logout</li>
                  <Nav.Link href="#">Profile</Nav.Link>
                </div>
                :
                <></>
              }
            </Nav>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavMain;