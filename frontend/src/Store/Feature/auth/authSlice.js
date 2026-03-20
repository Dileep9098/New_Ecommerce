import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../../../ApiHendler/axiosInstance';

const initialState = {
    isLoading: false,
    isAuthentication: false,
    isUpdate:false,
    user: null,
    error: null,
};

// Thunks for registering and logging in
export const registerUser = createAsyncThunk(
    "/register",
    async ({ email,name,lname, password }, { rejectWithValue }) => {
        try {
            // debugger
            const response = await axiosInstance.post(
                "/api/v1/register/",
                { email, password, name,lname },
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Registration failed due to an unknown error');
        }
    }
);

export const loginUser = createAsyncThunk(
    "/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(
                "/api/v1/login/",
                { email, password },
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Login failed due to an unknown error');
        }
    }
);


// export const loadUser = createAsyncThunk(
//     "/loadUser",
//     async ( rejectWithValue ) => {
//         try {
//             const response = await axiosInstance.get('/api/v1/me', { withCredentials: true })
//             return response.data;

//         } catch (error) {
//             return rejectWithValue(error.response?.data || 'Login failed due to an unknown error');

//         }
//     }
// )

export const loadUser = createAsyncThunk(
  "/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/api/v1/me', { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Login failed due to an unknown error');
    }
  }
);
  
export const logoutUser=createAsyncThunk(
    "/logout",
    async()=>{
        try {
            const response =await axiosInstance("/api/v1/logout",{withCredentials:true})
            return response.data
            
        } catch (error) {
            return console.log(error.response?.data || 'Login failed due to an unknown error');

        }
    }
) 

export const updateUser=createAsyncThunk(
    "/update/user",
    
    async(myform)=>{
        try {
            // debugger
            const response=await axiosInstance.put("/api/v1/me/update",myform,{withCredentials:true})
            return response.data
            
        } catch (error) {
            return console.log(error.response?.data || 'Update Profile Faild due to an unknown error');

        }
    }
)

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


// Auth Slice
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null; // This will reset the error state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthentication = true;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isAuthentication = false;
                state.user = null;
                state.isLoading = false;
                state.error = action.payload;  
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload.success) {
                    state.user = action.payload.user;
                    state.isAuthentication = true;
                    state.error = null;
                } else {
                    state.user = null;
                    state.isAuthentication = false;
                    state.error = action.payload;  // Assuming the response has error details
                }
            })
            .addCase(loginUser.rejected, (state, action) => {
                console.error("Login failed", action.payload);
                state.isLoading = false;
                state.isAuthentication = false;
                state.user = null;
                state.error = action.payload;  // Store the error message
            })
            .addCase(loadUser.pending, (state) => {
                state.isLoading = true; // Set loading to true when request is made
              })
              .addCase(loadUser.fulfilled, (state, action) => {
                state.isLoading = false; // Set loading to false when the request succeeds
              
                // Check if the response has success as true
                if (action.payload.success) {
                  state.user = action.payload.user; // Set user data
                  state.isAuthentication = true; // Mark user as authenticated
                  state.error = null; // Reset error state
                } else {
                  state.user = null; // Reset user data if response is not successful
                  state.isAuthentication = false; // Set authentication to false
                  state.error = action.payload; // Assuming action.payload contains the error message
                }
              })
              .addCase(loadUser.rejected, (state, action) => {
                console.error("Login failed", action.payload); // Log the error to the console
                state.isLoading = false; // Set loading to false when the request fails
                state.isAuthentication = false; // Mark user as not authenticated
                state.user = null; // Reset user data
                state.error = action.payload; // Store the error message from the rejected action
              })
              
            .addCase(logoutUser.pending,(state)=>{
                state.isLoading = true;

            })
            .addCase(logoutUser.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.isAuthentication = false;
                state.user = null;
            })
            .addCase(updateUser.pending,(state)=>{
                state.isLoading=true;
                state.isUpdate=false;
            })
            .addCase(updateUser.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.isUpdate=true;
                state.user=action.payload
            })
            .addCase(updateUser.rejected, (state, action) => {
                console.error("Login failed", action.payload);
                state.isLoading = false;
                state.isUpdate = false;
                state.user = null;
                state.error = action.payload;  // Store the error message
            })
            // .addCase(getAllUser.pending,(state)=>{
            //     state.isLoading=true;
            // })
            // .addCase(getAllUser.fulfilled,(state,action)=>{
            //     state.isLoading=false;
            //     state.user=action.payload
            // })
            // .addCase(getAllUser.rejected, (state, action) => {
            //     console.error("Login failed", action.payload);
            //     state.isLoading = false;
            //     state.user = null;
            //     state.error = action.payload;  // Store the error message
            // })

    }
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;
