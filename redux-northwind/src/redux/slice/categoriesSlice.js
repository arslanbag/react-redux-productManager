import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState= {
  loading: false,
  categoryList: [],
  error: '',
  baseUrl : "http://localhost:3000/",
  pathUrl : "categorys",
  currentId : 0,
  currentName : "Tüm Kategoriler",
  defaultName : "Tüm Kategoriler"
}

export const getCategories = createAsyncThunk('categories/getCategories', async () => {
  return await axios
  .get(initialState.baseUrl+initialState.pathUrl)
  .then((response) => response.data)
})

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers : {
    changeCurrent : (state,action) => {
        state.currentId = action.payload;
        (action.payload !== 0) 
        ?
        state.currentName = state.categoryList[(action.payload-1)].categoryName
        :
        state.currentName = state.defaultName
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getCategories.fulfilled, (state,action) => {
      state.loading = false
      state.categoryList = action.payload
      state.error = ''
    })
    builder.addCase(getCategories.rejected, (state,action) => {
      state.loading = false
      state.categoryList=[]
      state.error = action.error.message
    })
  },
})

export default categoriesSlice.reducer
export const {changeCurrent} = categoriesSlice.actions