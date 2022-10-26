import React, { Component } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import { ListInlineItem, List } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import IncrementDecrement from "../toolbox/IncrementDecrement";
import { addCart } from "../../redux/slice/cartSlice";
import { NavLink} from "react-router-dom";

class Cart extends Component {
  emptyRender() {
    return <Nav.Link eventKey={2}>Sepetiniz Boş</Nav.Link>;
  }

  listRender(cartList) {
    return (
      <NavDropdown
        align="end"
        title="Sepetiniz"
        id="collasible-nav-dropdown"
        autoClose="outside"
      >
        {this.props.rdxSt.cart.cartList.map((Item) => (
          <NavDropdown.Item key={Item.id}>
              <List type="inline">
                <ListInlineItem > <IncrementDecrement cart={Item} /></ListInlineItem>
                <ListInlineItem> {Item.product.productName}</ListInlineItem>
              </List>
          </NavDropdown.Item>
        ))}
        <NavDropdown.Divider />
        <NavLink id="RouterNavLink" to="/cart">Sepete Git</NavLink>
      </NavDropdown>
    );
  }
  render() {
    const cartList = this.props.rdxSt.cart.cartList;
    return (
      <div>
        {cartList.length < 1 ? this.emptyRender() : this.listRender(cartList)}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { rdxSt: { cart: state.cart } };
}

function mapDispatchToProps(dispatch) {
  return {
    rdxAc: {
      addCart: bindActionCreators(addCart, dispatch),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
