

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axiosInstance from "../../../ApiHendler/axiosInstance";
// const initialState = {
//     cartItems: {
//         cartItems: localStorage.getItem("cartItems")
//           ? JSON.parse(localStorage.getItem("cartItems"))
//           : [],
//         shippingInfo: localStorage.getItem("shippingInfo")
//           ? JSON.parse(localStorage.getItem("shippingInfo"))
//           : {},
//       },
//     error: null,
//     isLoading:null,
//     isDelete: false,
//     TotalCartItems:JSON.parse(localStorage.getItem("cartItems")).length
   
// }


// export const setCustomerCart = createAsyncThunk(
//     "/Add-To-Cart", async (cartItem) => {
//         try {
            
//             // const response = cartItem
//             return cartItem
//         } catch (error) {
//             return console.log(error || 'Update Profile Faild due to an unknown error');

//         }
//     }
// )
// export const SetTotalCartItems = createAsyncThunk(
//     "/Add-To-Cart-qty", async (qty) => {
//         try {
            
//             // const response = cartItem
//             return qty
//         } catch (error) {
//             return console.log(error || 'Update Profile Faild due to an unknown error');

//         }
//     }
// )



// const cartSlice = createSlice({
//     name: "cart",
//     initialState,
//     reducers: {
//         setCart: (state, action) => {},
//     },
//     extraReducers: ((builder) => {
//         builder
//             .addCase(setCustomerCart.pending, (state) => {
//                 state.isLoading = true
//             })
//             .addCase(setCustomerCart.fulfilled, (state, action) => {
//                 state.isLoading = false,
//                     state.cartItems = action.payload
//                     state.TotalCartItems=JSON.parse(localStorage.getItem("cartItems")).length
//             })
//             .addCase(setCustomerCart.rejected, (state, action) => {
//                 state.cartItems = null;
//                 state.isLoading = false;
//                 state.error = action.payload || 'An error occurred while fetching users'; // Ensure error is properly set
//             })
//             .addCase(SetTotalCartItems.pending, (state) => {
//                 state.isLoading = true
//             })
//             .addCase(SetTotalCartItems.fulfilled, (state, action) => {
//                 state.isLoading = false,
//                     state.TotalCartItems = action.payload
//             })
//             .addCase(SetTotalCartItems.rejected, (state, action) => {
//                 state.TotalCartItems = null;
//                 state.isLoading = false;
//                 state.error = action.payload || 'An error occurred while fetching users'; // Ensure error is properly set
//             })
           
//     })


// })

// export const { setCart } = cartSlice.actions
// export default cartSlice.reducer;



// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   cartItems: {
//     cartItems: localStorage.getItem("cartItems")
//       ? JSON.parse(localStorage.getItem("cartItems"))
//       : [],
//     shippingInfo: localStorage.getItem("shippingInfo")
//       ? JSON.parse(localStorage.getItem("shippingInfo"))
//       : {},
//   },
//   error: null,
//   isLoading: null,
//   isDelete: false,
//   TotalCartItems: localStorage.getItem("cartItems")
//     ? JSON.parse(localStorage.getItem("cartItems")).length
//     : 0,
// };

// // Async thunk for updating the cart
// export const setCustomerCart = createAsyncThunk(
//   "/Add-To-Cart",
//   async (cartItem) => {
//     try {
//       // You can call an API here if needed, currently it's just returning the cartItem
//       return cartItem;
//     } catch (error) {
//       console.log(error || "Update Profile Failed due to an unknown error");
//       throw error; // make sure to throw an error so that it can be handled in the rejected case
//     }
//   }
// );

// // Async thunk for updating the total cart items count
// export const SetTotalCartItems = createAsyncThunk(
//   "/Add-To-Cart-qty",
//   async (qty) => {
//     try {
//       return qty; // Just return the quantity
//     } catch (error) {
//       console.log(error || "Update Profile Failed due to an unknown error");
//       throw error;
//     }
//   }
// );

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     setCart: (state, action) => {
//       // Optional, if you need to manually update the cart, you can use this reducer
//       state.cartItems = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(setCustomerCart.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(setCustomerCart.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.cartItems.cartItems = action.payload; // Update cart items with the payload
//         state.TotalCartItems = state.cartItems.cartItems.length; // Recompute total cart items
//       })
//       .addCase(setCustomerCart.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message || "An error occurred while updating the cart";
//       })
//       .addCase(SetTotalCartItems.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(SetTotalCartItems.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.TotalCartItems = action.payload; // Update total items count
//       })
//       .addCase(SetTotalCartItems.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message || "An error occurred while updating the total cart items";
//       });
//   },
// });

// export const { setCart } = cartSlice.actions;
// export default cartSlice.reducer;







import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
  error: null,
  isLoading: null,
  isDelete: false,
  TotalCartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems")).length
    : 0,
};

// Async thunk for updating the cart
export const setCustomerCart = createAsyncThunk(
  "/Add-To-Cart",
  async (cartItem) => {
    try {
      return cartItem;
    } catch (error) {
      console.log(error || "Update Profile Failed due to an unknown error");
      throw error;
    }
  }
);

// Async thunk for updating the total cart items count
export const SetTotalCartItems = createAsyncThunk(
  "/Add-To-Cart-qty",
  async (qty) => {
    try {
      return qty;
    } catch (error) {
      console.log(error || "Update Profile Failed due to an unknown error");
      throw error;
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cartItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setCustomerCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setCustomerCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems.cartItems = action.payload;
        state.TotalCartItems = state.cartItems.cartItems.length;
      })
      .addCase(setCustomerCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "An error occurred while updating the cart";
      })
      .addCase(SetTotalCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(SetTotalCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.TotalCartItems = action.payload;
      })
      .addCase(SetTotalCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "An error occurred while updating the total cart items";
      });
  },
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
