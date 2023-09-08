import styles from './header.module.scss';
import { Container, Nav, Navbar } from "react-bootstrap";

const Header = () =>
  <Navbar expand="lg" className="bg-body-tertiary">
    <Container>
      <Navbar.Brand href="/nff">NFF</Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse>
        <Nav className="me-auto">
          <Nav.Link href="/nff">Home</Nav.Link>
          <Nav.Link href="/nff/about">About</Nav.Link>
          <Nav.Link href="/nff/help">Help</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>

export default Header;
