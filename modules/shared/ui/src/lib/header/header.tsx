import styles from './header.module.scss';
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Auth, signOut } from 'firebase/auth';

export interface HeaderProps {
  auth: Auth
  authenticated: boolean
}

export const Header = ({ auth, authenticated }: HeaderProps) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch(err => console.error(err));
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/nff">NFF</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse>
          <Nav className="mr-auto">
            <Nav.Link href="/nff">Home</Nav.Link>
            <Nav.Link href="/nff/about">About</Nav.Link>
            <Nav.Link href="/nff/help">Help</Nav.Link>
          </Nav>

          <Nav className="ml-auto">
            {
              authenticated ?
                <Nav.Link onClick={handleSignOut}>Sign Out</Nav.Link> :
                // <Button variant="link" style={{ textDecoration: 'none', color: 'inherit' }} onClick={handleSignOut}>Sign Out</Button> :
                <>
                  <Nav.Link href="/nff/login">Login</Nav.Link>
                  <Nav.Link href="/nff/signup">Sign Up</Nav.Link>
                </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
