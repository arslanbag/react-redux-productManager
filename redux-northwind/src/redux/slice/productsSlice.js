import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'


const initialState= {
  loading: false,
  productsList: [],
  product: [],
  error: '',
  baseUrl : "http://localhost:3000/",
  pathUrl : "products/",
  queryUrl : "",
}

export const getProducts= createAsyncThunk('products/getProducts', async (arg ,store) => {
  const state = store.getState(); // <-- invoke and access state object
  return await axios
  .get(state.products.baseUrl+state.products.pathUrl+state.products.queryUrl)
  .then((response) => response.data)
})

export const saveProduct= createAsyncThunk('products/updateProducts', async (product ,store) => {
  const state = store.getState(); // <-- invoke and access state object
  return await fetch(state.products.baseUrl+state.products.pathUrl + (product.id || ""),{
    method: product.id ? "PUT" : "POST", //Gönderme Methodu
    headers: {"content-type": "application/json"}, //içerik tipi
    body: JSON.stringify(product) //product arrayini jsona çeviriyoruz 
  })
  .then(handleResponse) //handleResponseye dön 
  .catch(handleError); //hata olursa yakala
})

const produtctsSlice = createSlice({
  name: 'products',
  initialState,
  reducers : {
      productsListForCategory : (state,action) => {
        let queryUrl = (action.payload === 0 ||action.payload  === ""  || action.payload  === "0" || action.payload  === null) 
        ? ""
        : "?categoryId="+action.payload;
        state.queryUrl = queryUrl
      },    
      setProductState : (state,action) => {
        state.product = action.payload
      }, 
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getProducts.fulfilled, (state,action) => {
      state.loading = false
      state.productsList = action.payload
      state.error = ''
    })
    builder.addCase(getProducts.rejected, (state,action) => {
      state.loading = false
      state.productsList=[]
      state.error = action.error.message
    })
  },
})

//hata fonksiyonları
//fetchden gelen veriyi kontrol eder
export async function handleResponse(response){
  if(response.ok){
    return response.json()
  }
  const error = await response.text()
  throw new Error(error)
}

//fetch işlemi sonucunda hata varmı onu kontrol eder
export function handleError(error){
  console.error("Bir Hata oluştu")
  throw new Error(error)
}



export default produtctsSlice.reducer
export const {productsListForCategory,setProductState} = produtctsSlice.actions
