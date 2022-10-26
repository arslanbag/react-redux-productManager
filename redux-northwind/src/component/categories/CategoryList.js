import React, { Component } from "react";
import {getCategories,changeCurrent,} from "../../redux/slice/categoriesSlice";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ListGroup, ListGroupItem ,Badge} from "react-bootstrap";
import { productsListForCategory,getProducts } from "../../redux/slice/productsSlice";

class CategoryList extends Component {
  componentDidMount() { //componentler yerleşince çalışır not: render olmadan
    this.props.rdxAc.getCategories();
  }
  handleCategory = (id) => {
    return () =>  
    this.props.rdxAc.productsListForCategory(id) && 
    this.props.rdxAc.getProducts() &&
    this.props.rdxAc.changeCurrent(id)
  }
  activeCategory = (local, state) => {
    return local === state ? true : false;
  }
  render() {
    let loading = this.props.rdxSt.categories.loading;
    let error = this.props.rdxSt.categories.error;
    let categoryList = this.props.rdxSt.categories.categoryList;
    let currentCategoryId = this.props.rdxSt.categories.currentId;
    let currentCategoryName = this.props.rdxSt.categories.currentName;
    let defaultCategoryName = this.props.rdxSt.categories.defaultName;

    return (
      <div>
        <ListGroup>
          <ListGroupItem
            key="-1"
            onClick={this.handleCategory(0)}
            active={this.activeCategory(currentCategoryId, 0)}>
                <h3>{defaultCategoryName}</h3> ---&gt; <Badge  bg="warning">{currentCategoryName}</Badge>
          </ListGroupItem>
          {loading && <div>Loading...</div>}
          {!loading && error ? <div> Error: {error} </div> : null}
          {!loading && categoryList.length ? (
            <div>
              {categoryList.map((category) => (
                <ListGroupItem
                  key={category.id}
                  onClick={this.handleCategory(category.id)}
                  active={this.activeCategory(currentCategoryId, category.id)}
                >
                  {category.categoryName}
                </ListGroupItem>
              ))}
            </div>
          ) : null}
        </ListGroup>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { rdxSt: { categories: state.categories , products: state.products } };
}

function mapDispatchToProps(dispatch) {
  return {
    rdxAc: {
      getCategories: bindActionCreators(getCategories, dispatch),
      changeCurrent: bindActionCreators(changeCurrent, dispatch),
      getProducts: bindActionCreators(getProducts, dispatch),
      productsListForCategory: bindActionCreators(productsListForCategory, dispatch),
     
      
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
