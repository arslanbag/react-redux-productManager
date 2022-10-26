import React from "react";
import { Form } from "react-bootstrap";
import SelectInput from "../toolbox/SelectInput";
import TextInput from "../toolbox/TextInput";

const ProductDetail = ({
  categoryList,
  product,
  onSubmit,
  onChange,
  errors,
}) => {
  return (
    <Form href="#" onSubmit={onSubmit}>
      <h2>{product.id ? "Güncelle" : "Ekle"}</h2>
      <TextInput
        name="productName"
        label="Ürün adı"
        value={product.productName}
        onChange={onChange}
        error={errors.productName}
      />
      <br />
      <TextInput
        name="unitPrice"
        label="Fiyatı"
        value={product.unitPrice}
        onChange={onChange}
        error={errors.unitPrice}
      />
      <br />
      <TextInput
        name="quantityPerUnit"
        label="Adet"
        value={product.quantityPerUnit}
        onChange={onChange}
        error={errors.quantityPerUnit}
      />
      <br />
      <TextInput
        name="unitsInStock"
        label="Stok"
        value={product.unitsInStock}
        onChange={onChange}
        error={errors.unitsInStock}
      />
      <br />

      <SelectInput
        name="categoryId"
        label="Kategori"
        value={product.categoryId || ""}
        defaultOption="Seçiniz"
        options={categoryList}
        onChange={onChange}
        error={errors.categoryId}
      />

      <br />

      <button type="submit" className="btn btn-success">
        {product.id ? "Güncelle" : "Kaydet"}
      </button>
    </Form>
  );
};
export default ProductDetail;
/*options={categories.categoryList.map(c=>({
            value: c.id,
            text: c.categoryName
        }))} */
// options={categories.categoryList}
