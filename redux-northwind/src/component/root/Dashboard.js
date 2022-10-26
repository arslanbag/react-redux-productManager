import React, { Component } from 'react'
import {Row ,Col} from 'react-bootstrap'
import CategoryList from "../categories/CategoryList"
import ProductList from "../products/ProductList"

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <Row >
            <Col xs="3">
                <CategoryList/>
            </Col>
            <Col xs="8">
                <ProductList/>
            </Col>
        </Row>
      </div>
    )
  }
}
