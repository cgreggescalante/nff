import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../../userContext';
import { useState } from 'react';
import { auth } from '../../../firebase';
import { CheckAdminStatus } from '@shared-data';

export const Header = () => {
  const { user, loading, logout } = useUser();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSignOut = () => {
    logout()
      .then(() => {
        navigate('/');
      })
      .catch((err) => console.error(err));
  };

  auth.onAuthStateChanged((user) => {
    if (user !== null) {
      CheckAdminStatus(user.uid).then((isAdmin) => {
        if (!isAdmin) navigate('/');
        else setIsAdmin(true);
      });
    }
  });

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
            <Nav.Link as={Link} to="/leaderboard">
              Leaderboard
            </Nav.Link>
          </Nav>

          <Nav className="ml-auto">
            {loading ? null : user ? (
              <>
                <Nav.Link as={Link} to="/user-dashboard">
                  Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/upload">
                  Upload
                </Nav.Link>
                <Nav.Link onClick={handleSignOut}>Sign Out</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Sign Up
                </Nav.Link>
              </>
            )}
            {isAdmin && (
              <Nav.Link as={Link} to={'/admin-tools'}>
                Admin
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
