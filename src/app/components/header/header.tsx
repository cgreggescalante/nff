import { Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../providers/useAuth';
import { toast } from 'react-toastify';
import { auth } from '@shared-data';
import { signOut } from 'firebase/auth';
import { LinkContainer } from 'react-router-bootstrap';

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
    <Navbar
      collapseOnSelect
      expand="md"
      fixed="top"
      className="bg-body-secondary"
    >
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>NFF</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id={'navbar-nav'}>
          <Nav className="me-auto">
            <LinkContainer to="/events">
              <Nav.Link>Events</Nav.Link>
            </LinkContainer>

            {auth.currentUser && (
              <>
                <LinkContainer to="/user-dashboard">
                  <Nav.Link>Dashboard</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/upload">
                  <Nav.Link>Upload</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>

          <Nav className="ms-auto">
            {auth.currentUser == null ? (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/signup">
                  <Nav.Link>Sign Up</Nav.Link>
                </LinkContainer>
              </>
            ) : (
              <Nav.Link onClick={handleSignOut}>Sign Out</Nav.Link>
            )}
            {isAdmin && (
              <LinkContainer to="/admin-tools">
                <Nav.Link>Admin</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
