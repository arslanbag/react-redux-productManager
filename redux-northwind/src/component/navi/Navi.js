import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Cart from "../cart/Cart";
import { Link, NavLink } from "react-router-dom";

function CollapsibleExample() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light">
      <Container>
        <Navbar.Brand>
          <Link to="/">Arslanbağ Mağazası</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Hakkımızda</Nav.Link>
            <Nav.Link href="#pricing">Fırsatlar</Nav.Link>
          </Nav>
          <Nav>
            <Nav style={{paddingTop: "8px"}} >
              <NavLink to="/saveproduct" >*Yeni Ürün Ekle</NavLink>
            </Nav>
            <Cart></Cart>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;
