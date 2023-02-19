import { Navbar, Nav, Container } from 'react-bootstrap';
// change what is displayed when clicking the button

function NotLoggedIn() {
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <div className='m-auto'>
                        <Navbar.Brand href="/*">Application Name</Navbar.Brand>
                    </div>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="py-2">
                            <Nav.Link href="#home">Profile</Nav.Link>
                            {/* <NavDropdown.Divider /> */}
                            <Nav.Link href="#link">Settings</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Nav.Link href="/login">Login</Nav.Link>
                </Container>
            </Navbar>
        </>
    );
}
export default NotLoggedIn;