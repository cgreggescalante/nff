import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Auth, signOut } from 'firebase/auth';
import { UserInfo } from '@shared-data';

export interface HeaderProps {
  user: UserInfo | null;
  loading: boolean;
  auth: Auth;
}

export const Header = ({ user, loading, auth }: HeaderProps) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((err) => console.error(err));
  };

  return (
    <Navbar expand="lg" fixed="top" className="bg-body-secondary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          NFF
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse>
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/help">
              Help
            </Nav.Link>
          </Nav>

          <Nav className="ml-auto">
            {loading ? null : user ? (
              <Nav.Link onClick={handleSignOut}>Sign Out</Nav.Link>
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
            {user?.role === 'admin' ? (
              <Nav.Link as={Link} to={'/admin-tools'}>
                Admin
              </Nav.Link>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
