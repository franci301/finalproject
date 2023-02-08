import { Navbar, Nav, Container } from 'react-bootstrap';
import profile from '../Assets/Images/profile.png';
//  if button is clicked, then the profile picture will be replaced with a dropdown menu


function NavMain() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <div className='m-auto'>
          <Navbar.Brand href="#home">Application Name</Navbar.Brand>
        </div>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="py-2">
            <Nav.Link href="#home">Profile</Nav.Link>
            {/* <NavDropdown.Divider /> */}
            <Nav.Link href="#link">Settings</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <img alt="Profile Picture" />
      </Container>
    </Navbar>
  );
}

export default NavMain;