import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../Store/Feature/auth/authSlice"
import paginationReducer from "./Feature/paginationSlice/paginationSlice"
import adminUserReducer from "./Feature/Admin/userSlice"
import categoryReduce from './Feature/category/categorySlice'
import productReduce from "./Feature/product/productSlice"
import cartReduce from "./Feature/cartSlice/cartSlice"
import currencyReducer from "./Feature/currencySlice/currencySlice"
// Step 1: Combine your reducers here
const rootReducer = combineReducers({
  auth: authReducer,
  pagination: paginationReducer,
  adminUser: adminUserReducer,
  category: categoryReduce,
  product: productReduce,
  cart: cartReduce,
  currency: currencyReducer,

  // example: cart: cartReducer
});

// Step 2: Create the store using configureStore
export const store = configureStore({
  reducer: rootReducer
});
