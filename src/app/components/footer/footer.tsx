import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Footer = () => (
  <footer>
    <Navbar bg="body-secondary" className="h-100">
      <Nav className="w-100">
        <Nav.Link as={Link} to="/about" className="flex-grow-1 text-center">
          About
        </Nav.Link>
        <Nav.Link as={Link} to="/help" className="flex-grow-1 text-center">
          Help
        </Nav.Link>
        <Nav.Link
          href="https://github.com/cgreggescalante/nff"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-grow-1 text-center"
        >
          Source
        </Nav.Link>
      </Nav>
    </Navbar>
  </footer>
);

export default Footer;
