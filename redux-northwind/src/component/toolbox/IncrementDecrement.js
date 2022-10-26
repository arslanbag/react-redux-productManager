import React, { Component } from "react";
import { addCart } from "../../redux/slice/cartSlice";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import alertify from "alertifyjs"

class IncrementDecrement extends Component {
  handleAddToCart = (product,type=1) => {
    return () =>  this.props.rdxAc.addCart(product) 
    && (type === 1) 
    ? alertify.success(product.productName + "<br/> <b>Ürün Sepete Eklendi</b>")
    : alertify.warning(product.product.productName + "<br/> <b>Ürün Sepetden eksildi</b>")

  }

  render() {
    return (
      <div>
            <button
              type="button"
              className="btn btn-secondary input-increment-decrement"
              onClick={this.handleAddToCart({product: this.props.cart.product , count : -1},0)}
            >
              {" "}
              -{" "}
            </button>
            <label className="input-increment-decrement-count">{this.props.cart.quantity}</label>
            <button
              type="button"
              className="btn btn-secondary input-increment-decrement"
              onClick={this.handleAddToCart(this.props.cart.product)}
    
            >
              {" "}
              +{" "}
            </button>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    rdxAc: {
      addCart: bindActionCreators(addCart, dispatch),
    },
  };
}
export default connect(null, mapDispatchToProps)(IncrementDecrement);