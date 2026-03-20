// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axiosInstance from "../../../ApiHendler/axiosInstance";
// const initialState = {
//     category: null,
//     error: null,
//     isLoading: false,
//     parentCategories:null
// }

// export const parentCategory = createAsyncThunk(
//     "/parent-category", async (data) => {
//         try {
//             const response = await axiosInstance.post("/api/v1/admin/add/parent-category", data, { withCredentials: true })
//             return response.data
//         } catch (error) {
//             return console.log(error.response?.data || 'Update Profile Faild due to an unknown error');

//         }
//     }
// )
// // export const getAllParentCategory = createAsyncThunk(
// //     "/get-all-parent-category", async () => {
// //         try {
// //             const response = await axiosInstance.get("/api/v1/admin/get-all/parent-category/", { withCredentials: true })

// //             return response.data
// //         } catch (error) {
// //             return console.log(error.response?.data || 'Update Profile Faild due to an unknown error');

// //         }
// //     }
// // )

// // export const subCategory = createAsyncThunk(
// //     "/Child-category", async (data) => {
// //         try {
// //             const response = await axiosInstance.post("/api/v1/admin/add/child-category", data, { withCredentials: true })
// //             return response.data
// //         } catch (error) {
// //             return console.log(error.response?.data || 'Update Profile Faild due to an unknown error');

// //         }
// //     }
// // )
// const categorySlice = createSlice({
//     name: "category",
//     initialState,
//     reducers: {
//         setUser: (state, action) => { },
//     },
//     extraReducers: ((builder) => {
//         builder
//             .addCase(parentCategory.pending, (state) => {
//                 state.isLoading = true
//             })
//             .addCase(parentCategory.fulfilled, (state, action) => {
//                 state.isLoading = false,
//                     state.category = action.payload
//             })
//             .addCase(parentCategory.rejected, (state, action) => {
//                 state.category = null;
//                 state.isLoading = false;
//                 state.error = action.payload || 'An error occurred while fetching users'; // Ensure error is properly set
//             })
//             // .addCase(getAllParentCategory.pending, (state) => {
//             //     state.isLoading = true
//             // })
//             // .addCase(getAllParentCategory.fulfilled, (state, action) => {
//             //     state.isLoading = false,
//             //     state.parentCategories = action.payload.category
//             // })
//             // .addCase(getAllParentCategory.rejected, (state, action) => {
//             //     state.parentCategories = null;
//             //     state.isLoading = false;
//             //     state.error = action.payload || 'An error occurred while fetching users'; // Ensure error is properly set

//             // })
//             // .addCase(subCategory.pending, (state) => {
//             //     state.isLoading = true
//             // })
//             // .addCase(subCategory.fulfilled, (state, action) => {
//             //     state.isLoading = false,
//             //     state.category = action.payload
//             // })
//             // .addCase(subCategory.rejected, (state, action) => {
//             //     state.category = null;
//             //     state.isLoading = false;
//             //     state.error = action.payload || 'An error occurred while fetching users'; // Ensure error is properly set

//             // })
//     })


// })

// export const { setUser } = categorySlice.actions
// export default categorySlice.reducer;




import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../ApiHendler/axiosInstance";

const initialState = { category: null, error: null, isLoading: false, isDelete: false, parentCategories: [], childCategories: []}


export const parentCategory = createAsyncThunk(
    "/parent-category", async (myform) => {
        try {
            
            const response = await axiosInstance.post("/api/v1/admin/add-parent-category", myform, { withCredentials: true })
            return response.data
        } catch (error) {
            return console.log(error.response?.data || 'Update Profile Faild due to an unknown error');

        }
    }
)
export const getAllParentCategory = createAsyncThunk(
    "/get-all-parent-category", async () => {
        try {
            const response = await axiosInstance.get("/api/v1/admin/get-parent-category", { withCredentials: true })

            return response.data
        } catch (error) {
            return console.log(error.response?.data || 'Update Profile Faild due to an unknown error');

        }
    }
)
export const deleteParentCategory = createAsyncThunk(
    "/Delete-parent-category", async (id) => {
        try {
            const response = await axiosInstance.delete(`/api/v1/admin/delete-parent-category/${id}`, { withCredentials: true })

            return response.data
        } catch (error) {
            return console.log(error.response?.data || 'Update Profile Faild due to an unknown error');

        }
    }
)
export const updateParentCategory = createAsyncThunk(

    "/Update-parent-category", async ({ getId, myform }) => {


        try {
            const response = await axiosInstance.put(`/api/v1/admin/update-parent-category/${getId}`, myform, { withCredentials: true })

            return response.data
        } catch (error) {
            return console.log(error.response?.data || 'Update Profile Faild due to an unknown error');

        }
    }
)

export const createSubCategory = createAsyncThunk(
    "/child-Category", async (myform) => {

        try {
            const response = await axiosInstance.post("/api/v1/admin/add-child-category/", myform, { withCredentials: true })
            return response.data

        } catch (error) {
            return console.log(error.response?.data || ' Create Subcategory Faild due to an unknown error');

        }
    }
)


export const getAllSubCategory = createAsyncThunk(
    "/get-all-child-Category", async () => {
        try {
            const response = await axiosInstance.get("/api/v1/admin/get-child-category", { withCredentials: true })
            return response.data

        } catch (error) {
            return console.log(error.response?.data || 'get all Subcategory Faild due to an unknown error');

        }
    }
)


const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setUser: (state, action) => {},
    },
    extraReducers: ((builder) => {
        builder
            .addCase(parentCategory.pending, (state) => {
                state.isLoading = true
            })
            .addCase(parentCategory.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.category = action.payload
            })
            .addCase(parentCategory.rejected, (state, action) => {
                state.category = null;
                state.isLoading = false;
                state.error = action.payload || 'An error occurred while fetching users'; // Ensure error is properly set
            })
            .addCase(getAllParentCategory.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllParentCategory.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.parentCategories = action.payload.category
            })
            .addCase(getAllParentCategory.rejected, (state, action) => {
                state.parentCategories = null;
                state.isLoading = false;
                state.error = action.payload || 'An error occurred while fetching users'; // Ensure error is properly set
            })

            .addCase(getAllSubCategory.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllSubCategory.fulfilled, (state, action) => {
                state.isLoading = false,
                state.childCategories = action.payload.childCategory
            })
            .addCase(getAllSubCategory.rejected, (state, action) => {
                state.childCategories = null;
                state.isLoading = false;
                state.error = action.payload || 'An error occurred while fetching users'; // Ensure error is properly set
            })

    })


})

export const { setUser } = categorySlice.actions
export default categorySlice.reducer;