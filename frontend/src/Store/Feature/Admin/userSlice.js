// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axiosInstance from "../../../ApiHendler/axiosInstance";

// const initialState = {
//     isLoading: false,
//     isAuthentication: false,
//     isUpdate:false,
//     users: null,
//     error: null,
// };

// export const getAllUser=createAsyncThunk(
//     "/Get-All-User",
//     async()=>{
//         try {
//             // debugger
//             const response=await axiosInstance.get("/api/v1/admin/user",{withCredentials:true})
//             return response.data
            
//         } catch (error) {
//             return console.log(error.response?.data || 'Update Profile Faild due to an unknown error');

//         }
//     }
// )
// const adminUserSlice=createSlice({
//     initialState,
//     name:"adminUser",
//     // reducers,
//     reducers: {
//         clearError: (state) => {
//             state.error = null; // This will reset the error state
//         }
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(getAllUser.pending, (state) => {
//                 state.isLoading = true;
//             })
//             .addCase(getAllUser.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.users = action.payload.users;
//                 state.error = null;  // Clear previous errors on success
//             })
//             .addCase(getAllUser.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.users = null;
//                 state.error = action.payload || 'An error occurred while fetching users';  // Ensure error is properly set
//             });
//    }
   
   
// })
// export const { clearError } = adminUserSlice.actions;

// export default adminUserSlice.reducer







// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axiosInstance from "../../../ApiHendler/axiosInstance";

// const initialState = {
//     isLoading: false,
//     isAuthentication: false,
//     isUpdate: false,
//     users: null,
//     error: null,
// };

// export const getAllUser = createAsyncThunk(
//     "/Get-All-User",
//     async () => {
//         try {
//             const response = await axiosInstance.get("/api/v1/admin/user", { withCredentials: true });
//             return response.data;
//         } catch (error) {
//             // Return the error message so it can be passed to the rejected case
//             return error.response?.data || 'An unknown error occurred';
//         }
//     }
// );

// const adminUserSlice = createSlice({
//     initialState,
//     name: "adminUser",
//     reducers: {
//         clearError: (state) => {
//             state.error = null; // This will reset the error state
//         }
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(getAllUser.pending, (state) => {
//                 state.isLoading = true;
//             })
//             .addCase(getAllUser.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.users = action.payload.users;
//                 state.error = null; // Clear previous errors on success
//             })
//             .addCase(getAllUser.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.users = null;
//                 state.error = action.payload || 'An error occurred while fetching users'; // Ensure error is properly set
//             });
//     }
// });

// export const { clearError } = adminUserSlice.actions;

// export default adminUserSlice.reducer;


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../ApiHendler/axiosInstance";

const initialState = {
    isLoading: false,
    isAuthentication: false,
    isUpdate: false,
    isDeleted: false,
    users: null,
    error: null,
    userCount:null,
};

export const getAllUser = createAsyncThunk(
    "/Get-All-User",
    async () => {
        try {
            const response = await axiosInstance.get("/api/v1/admin/user", { withCredentials: true });
            return response.data;
        } catch (error) {
            // Return the error message so it can be passed to the rejected case
            return error.response?.data || 'An unknown error occurred';
        }
    }
);
export const deleteUser = createAsyncThunk(
    "/Delete-User",
    async (id) => {
        try {
            const response = await axiosInstance.delete(`/api/v1/admin/user/${id}`, { withCredentials: true });
            return response.data;
        } catch (error) {
            // Return the error message so it can be passed to the rejected case
            return error.response?.data || 'An unknown error occurred';
        }
    }
);

const adminUserSlice = createSlice({
    initialState,
    name: "adminUser",
    reducers: {
        clearError: (state) => {
            state.error = null; 
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload.users;
                state.userCount = action.payload.userCount;
                state.error = null; // Clear previous errors on success
            })
            .addCase(getAllUser.rejected, (state, action) => {
                state.isLoading = false;
                state.users = null;
                state.userCount = null;
                state.error = action.payload || 'An error occurred while fetching users'; // Ensure error is properly set
            })
            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true;
                state.isDeleted=false
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isDeleted=true;
                state.users = action.payload;
                state.error = null; // Clear previous errors on success
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isDeleted=false;
                state.users = null;
                state.error = action.payload || 'An error occurred while fetching users'; // Ensure error is properly set
            });
    }
});

export const { clearError } = adminUserSlice.actions;

export default adminUserSlice.reducer;
