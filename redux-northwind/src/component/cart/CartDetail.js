import React, { Component } from "react";
import { Badge, Button, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addCart } from "../../redux/slice/cartSlice";
import IncrementDecrement from "../toolbox/IncrementDecrement";
import alertify from "alertifyjs"

class CartDetail extends Component {
  handleAddToCart = (product) => {
    return () =>  this.props.rdxAc.addCart(product) 
    && alertify.warning(product.product.productName + "<br/> <b>Ürün Sepeten Kaldırıldı</b>")
  }
  cartNoEmpty = (cartList) => 
  {
    return(
      <div>
      <Row>
      <h3>
        <Badge bg="success"></Badge>
        <Badge bg="warning">Ürün Sepetiniz</Badge>
      </h3>
      </Row>
      <Row>
      <table className="table" >
        <thead>
          <tr>
            <th scope="col">#Kod</th>
            <th scope="col">Ürün Adı</th>
            <th scope="col">Ölçüsü</th>
            <th scope="col">Birim Fiyatı</th>
            <th scope="col">Miktarı</th>
            <th scope="col">Tutarı</th>
            <th scope="col">Kaldır</th>
          </tr>
        </thead>
        <tbody>
            {
            cartList.map((Item) =>(
              <tr key={Item.product.id}>
                <th scope="row" >{Item.product.id}</th>
                <td>{Item.product.productName}</td>
                <td>{Item.product.quantityPerUnit}</td>
                <td>{Item.product.unitPrice} ₺</td>
                <td>{ <IncrementDecrement cart={Item} />}</td>
                <td>{Item.product.unitPrice * Item.quantity}₺</td>
                <td>
                  <Button 
                    variant="danger" 
                    onClick={this.handleAddToCart({product:Item.product, count : Item.quantity*-1})}>
                      Kaldır
                  </Button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      </Row>
      </div>
    )
  }
  cartEmpty = () => 
  {
    return (
      <div>
        Sepetiniz Boş
      </div>
    )
  }
  render() {
    let cartList = this.props.rdxSt.cart.cartList;
    return (
      <div>
            {cartList.length > 0 ? this.cartNoEmpty(cartList): this.cartEmpty()}
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
export default connect(mapStateToProps, mapDispatchToProps)(CartDetail);
