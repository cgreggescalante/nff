import styles from './header.module.scss';
import { Container, Nav, Navbar } from "react-bootstrap";
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
        <Navbar.Brand href="/">NFF</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse>
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/help">Help</Nav.Link>
          </Nav>

          <Nav className="ml-auto">
            {
              authenticated ?
                <Nav.Link onClick={handleSignOut}>Sign Out</Nav.Link> :
                <>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/signup">Sign Up</Nav.Link>
                </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
