import {createSlice} from '@reduxjs/toolkit'
//{id : 0, quantity : 1, product : {id : 0, categoryId: 3,productName: "N",quantityPerUnit: "PU", unitPrice : 10 ,unitsInStock : 20}}
const initialState= {
  cartList: [],
    test : "aaa",
    }
function cartAddFunction (product,cartList, count) {
     var addedItem = cartList.find (c=>c.id === product.id);
     if(addedItem){
        var newState = cartList.map(cartItem=>{
            if(cartItem.id === product.id)
            {
              console.log("ekelme added")
                return Object.assign({},addedItem,{quantity:addedItem.quantity+count})
            }
            return cartItem
        })
        return newState;
     }else
     {
        console.log("burası sıfırdan eklem")
        return [...cartList,{id: product.id, quantity:1, product: product}]
     }
  }

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers : {    
      addCart : (state,action) => {
        let count;
        let product;
        (action.payload.count)
        ? ((product = action.payload.product) && (count = action.payload.count))
        : ((product = action.payload) && (count = 1))
        
        state.cartList = cartAddFunction(product,state.cartList, count).filter(c=>c.quantity > 0);
      },  
  },
})


export default cartSlice.reducer
export const {addCart} = cartSlice.actions
