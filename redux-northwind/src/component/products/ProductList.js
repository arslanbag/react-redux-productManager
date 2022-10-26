import React, { Component } from "react";
import { Badge, Button, Row } from "react-bootstrap";
import { NavLink} from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getProducts } from "../../redux/slice/productsSlice";
import { addCart } from "../../redux/slice/cartSlice";
import alertify from "alertifyjs"

class ProductList extends Component {
  componentDidMount() {
    //componentler yerleşince çalışır not: render olmadan
    this.props.rdxAc.getProducts();
  }
  handleAddToCart = (product) => {
    return () =>  this.props.rdxAc.addCart(product) 
    && alertify.success(product.productName + "<br/> <b>Ürün Sepete Eklendi</b>")

  }
  render() {
    let currentCategoryName = this.props.rdxSt.categories.currentName;
    let productsList = this.props.rdxSt.products.productsList;

    return (
      <div>
        <Row>
        <h3>
          <Badge bg="success">Ürünleri Listele</Badge>
          <Badge bg="warning">{currentCategoryName}</Badge>
        </h3>
        </Row>
        <Row>
        <table className="table" >
          <thead>
            <tr>
              <th scope="col">#Kod</th>
              <th scope="col">Ürün Adı</th>
              <th scope="col">Miktar</th>
              <th scope="col">Fiyatı</th>
              <th scope="col">Stok</th>
              <th scope="col">İşlem</th>
            </tr>
          </thead>
          <tbody>
              {
              productsList.map((product) =>(
                <tr key={product.id}>
                  <th scope="row" >{product.id}</th>
                  <td><NavLink to={"/saveproduct/"+product.id}>{product.productName}</NavLink></td>
                  <td>{product.quantityPerUnit}</td>
                  <td>{product.unitPrice}</td>
                  <td>{product.unitsInStock}</td>
                  <td>
                    <Button onClick={this.handleAddToCart(product)}>Ekle</Button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { rdxSt: { categories: state.categories, products: state.products } };
}

function mapDispatchToProps(dispatch) {
  return {
    rdxAc: {
      getProducts: bindActionCreators(getProducts, dispatch),
      addCart: bindActionCreators(addCart, dispatch),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
