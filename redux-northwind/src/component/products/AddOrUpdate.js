import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCategories } from "../../redux/slice/categoriesSlice";
import { saveProduct } from "../../redux/slice/productsSlice";
import ProductDetail from "./ProductDetail";
import {  useParams } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'


function AoUProduct({
  products,
  categories,
  getCategories,
  saveProduct,
  history,
  ...props
}) {
  //fonksiyonun başlangıcı kafan karışmasın :)
  const {productId} = useParams(); //urldeki Id yi çeker
  const [product, setProduct] = useState({ ...props.product }); 
  const navigate = useNavigate(); 
  console.log(productId)
  ///product ve kategorileri middle warede oluşturuyoruzzz
  useEffect(() => {
    //class yapısındaki didmount gibi componentler eklenirken çalışır middleware katmanında çalışır
    if (categories.categoryList.length === 0) {
      //eğer categoriler hiç yüklenmeden buraya gelinmişse kategorileri yükle
      getCategories();
    }
    setProduct({ ...props.product });//ürünleri ara katmanda  yüklüyoruz
  }, [props.product,categories,getCategories])

  function handleChange(event) 
  {
  const { name, value } = event.target;
  setProduct((previousProduct) => ({
    ...previousProduct,
    [name]: name === "categoryId" ? parseInt(value, 10) : value,
  }))
}

  function handleSubmit(event) 
  {
    event.preventDefault()
    saveProduct(product).then(() => {
      navigate("/")
    })
    return false;
  }

  return (
    <ProductDetail
      product={product}
      categories={categories}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}
export function getProductById(products, productId) {
  let product = products.find((c) => c.id === productId) || null;
  return product;
}

function mapStateToProps(state) {
   const productId = this.productId
   const product =
   productId && state.products.productList.length > 0
      ? getProductById(state.products.productList, productId)
      : {};
  return {
    product,
    products: state.products,
    categories: state.categories,
  };
}
const mapDispatchToProps = {
  getCategories,
  saveProduct,
};
export default connect(mapStateToProps, mapDispatchToProps)(AoUProduct);
