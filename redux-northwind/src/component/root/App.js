
import { Component } from "react";
import {Container} from "react-bootstrap"
import {Routes, Route} from "react-router-dom"
import Dashboard from "../root/Dashboard";
import CartDetail from "../cart/CartDetail";
import Navi from "../navi/Navi";
import AoUProduct from "../products/AoUProduct";
import NotFound from "../common/NotFound";

export default class App extends Component {

  render() 
  {
    
    return (
      <div>
        <Container>
          <Navi/>
          <Routes>
            <Route  path="/" exact element={<Dashboard/>}/>
            <Route  path="/cart" element={<CartDetail/>}/>
            <Route  path="/saveproduct/:productId"  element={<AoUProduct/>}/>
            <Route  path="/saveproduct/"  element={<AoUProduct/>}/>
            <Route  path="*" element={<NotFound/>}/>
          </Routes>
        </Container>
      </div>
    );
  }
}


