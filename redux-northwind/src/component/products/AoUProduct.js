import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../redux/slice/categoriesSlice";
import { saveProduct, getProducts } from "../../redux/slice/productsSlice";
import ProductDetail from "./ProductDetail";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AoUProduct() {
  const dispatch = useDispatch();
  let { productId } = useParams();
  productId = productId ? parseInt(productId) : "0";
  //console.log(productId)
  const categoryList = useSelector((state) => state.categories.categoryList);
  const productsList = useSelector((state) => state.products.productsList);
  const productReal = productCheckAndGet(productsList, productId);
  const [product, setProduct] = useState({ ...productReal });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  //console.log({...productsList})

  useEffect(() => {
    if (categoryList.length < 1) {
      dispatch(getCategories());
    }
    if (productsList.length < 1) {
      dispatch(getProducts());
    }
    if (productId > 0) {
      setProduct({ ...productReal });
    }
  }, [
    productsList.length,
    categoryList.length,
    dispatch,
    productReal,
    productId,
  ]);

  function handleChange(event) {
    const { name, value } = event.target;
    setProduct((previousProduct) => ({
      ...previousProduct,
      [name]: name === "categoryId" ? parseInt(value, 10) : value,
    }));

    validate(name, value);
    console.log(errors);
  }

  function validate(name, value) {
    let errorsv = {
      productName: "Ürün ismi Boş olamaz",
      quantityPerUnit: "Miktar Boş olamaz",
      unitPrice: "Ürün fiyatı Boş olamaz",
      unitsInStock: "Ürün stoğunu girmediniz..",
      categoryId: "Ürün kategorisi seçilmedi",
    };

    Object.entries(errorsv).map((entries) => {
      if (name === entries[0]) {
        setErrors((previousProduct) => ({
          ...previousProduct,
          [entries[0]]: value === "" ? entries[1] : "",
        }));
      }
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(saveProduct(product)).then(() => {
      navigate("/");
    });
  }

  function productCheckAndGet(productsList, productId) {
    return productId && productsList.length > 0
      ? productsList.find((c) => c.id === parseInt(productId)) || null
      : {};
  }
  // console.log(product.id+ "::][::" + productId);
  // if (product.id === parseInt(productId)) {
  return (
    <ProductDetail
      product={product}
      categoryList={categoryList}
      onChange={handleChange}
      onSubmit={handleSubmit}
      errors={errors}
    />
  );
  //}
}

export default AoUProduct;
