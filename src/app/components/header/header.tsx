import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../../providers/useAuth';
import { toast } from 'react-toastify';
import { auth } from '../../../firebase';
import { signOut } from 'firebase/auth';

export const Header = () => {
  const { isAdmin } = useAuth();

  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        toast.success('Signed out successfully');
        navigate('/');
      })
      .catch((err) => console.error(err));
  };

  return (
    <Navbar expand="md" fixed="top" className="bg-body-secondary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          NFF
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse>
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/events">
              Events
            </Nav.Link>
          </Nav>

          <Nav className="ml-auto">
            {auth.currentUser == null ? (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Sign Up
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/user-dashboard">
                  Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/upload">
                  Upload
                </Nav.Link>
                <Nav.Link onClick={handleSignOut}>Sign Out</Nav.Link>
              </>
            )}
            {isAdmin && (
              <Nav.Link as={Link} to={'/addUser-tools'}>
                Admin
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
