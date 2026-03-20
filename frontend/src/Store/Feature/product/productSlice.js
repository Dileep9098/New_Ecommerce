// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axiosInstance from "../../../ApiHendler/axiosInstance";
// const initialState = {
//     error: null,
//     isLoading: false,
//     isDelete: false,
//     product: null
// }

// // export const parentCategory = createAsyncThunk(
// //     "/parent-category", async (myform) => {
// //         try {
// //             const response = await axiosInstance.post("/api/v1/admin/add-parent-category", myform, { withCredentials: true })
// //             return response.data
// //         } catch (error) {
// //             return console.log(error.response?.data || 'Update Profile Faild due to an unknown error');

// //         }
// //     }
// // )
// // export const getAllParentCategory = createAsyncThunk(
// //     "/get-all-parent-category", async () => {
// //         try {
// //             const response = await axiosInstance.get("/api/v1/admin/get-parent-category", { withCredentials: true })

// //             return response.data
// //         } catch (error) {
// //             return console.log(error.response?.data || 'Update Profile Faild due to an unknown error');

// //         }
// //     }
// // )
// // export const deleteParentCategory = createAsyncThunk(
// //     "/Delete-parent-category", async (id) => {
// //         try {
// //             const response = await axiosInstance.delete(`/api/v1/admin/delete-parent-category/${id}`, { withCredentials: true })

// //             return response.data
// //         } catch (error) {
// //             return console.log(error.response?.data || 'Update Profile Faild due to an unknown error');

// //         }
// //     }
// // )
// // export const updateParentCategory = createAsyncThunk(

// //     "/Update-parent-category", async ({ getId, myform }) => {


// //         try {
// //             const response = await axiosInstance.put(`/api/v1/admin/update-parent-category/${getId}`, myform, { withCredentials: true })

// //             return response.data
// //         } catch (error) {
// //             return console.log(error.response?.data || 'Update Profile Faild due to an unknown error');

// //         }
// //     }
// // )

// export const createProduct = createAsyncThunk(
//     "/add-product", async ({myform,selectedCategories}) => {

//         try {
//             const response = await axiosInstance.post("/api/v1/admin/add-product-data", {myform,selectedCategories}, { withCredentials: true })
//             return response.data

//         } catch (error) {
//             return console.log(error.response?.data || ' Create Product Data Faild due to an unknown error');

//         }
//     }
// )


// export const getAllSubCategory = createAsyncThunk(
//     "/get-all-child-Category", async () => {
//         try {
//             const response = await axiosInstance.get("/api/v1/admin/get-child-category", { withCredentials: true })
//             return response.data

//         } catch (error) {
//             return console.log(error.response?.data || 'get all Subcategory Faild due to an unknown error');

//         }
//     }
// )


// const productSlice = createSlice({
//     name: "product",
//     initialState,
//     reducers: {
//         setUser: (state, action) => {},
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
//             .addCase(getAllParentCategory.pending, (state) => {
//                 state.isLoading = true
//             })
//             .addCase(getAllParentCategory.fulfilled, (state, action) => {
//                 state.isLoading = false,
//                     state.parentCategories = action.payload.category
//             })
//             .addCase(getAllParentCategory.rejected, (state, action) => {
//                 state.parentCategories = null;
//                 state.isLoading = false;
//                 state.error = action.payload || 'An error occurred while fetching users'; // Ensure error is properly set
//             })

//             .addCase(getAllSubCategory.pending, (state) => {
//                 state.isLoading = true
//             })
//             .addCase(getAllSubCategory.fulfilled, (state, action) => {
//                 state.isLoading = false,
//                 state.childCategories = action.payload.childCategory
//             })
//             .addCase(getAllSubCategory.rejected, (state, action) => {
//                 state.childCategories = null;
//                 state.isLoading = false;
//                 state.error = action.payload || 'An error occurred while fetching users'; // Ensure error is properly set
//             })

//     })


// })

// export const { setUser } = productSlice.actions
// export default productSlice.reducer;



import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../ApiHendler/axiosInstance";
const initialState = {
    error: null,
    isLoading: false,
    isDelete: false,
    products: null,
    productCount:null,
}

// export const parentCategory = createAsyncThunk(
//     "/parent-category", async (myform) => {
//         try {
//             const response = await axiosInstance.post("/api/v1/admin/add-parent-category", myform, { withCredentials: true })
//             return response.data
//         } catch (error) {
//             return console.log(error.response?.data || 'Update Profile Faild due to an unknown error');

//         }
//     }
// )
// export const getAllParentCategory = createAsyncThunk(
//     "/get-all-parent-category", async () => {
//         try {
//             const response = await axiosInstance.get("/api/v1/admin/get-parent-category", { withCredentials: true })

//             return response.data
//         } catch (error) {
//             return console.log(error.response?.data || 'Update Profile Faild due to an unknown error');

//         }
//     }
// )
// export const deleteParentCategory = createAsyncThunk(
//     "/Delete-parent-category", async (id) => {
//         try {
//             const response = await axiosInstance.delete(`/api/v1/admin/delete-parent-category/${id}`, { withCredentials: true })

//             return response.data
//         } catch (error) {
//             return console.log(error.response?.data || 'Update Profile Faild due to an unknown error');

//         }
//     }
// )
// export const updateParentCategory = createAsyncThunk(

//     "/Update-parent-category", async ({ getId, myform }) => {


//         try {
//             const response = await axiosInstance.put(`/api/v1/admin/update-parent-category/${getId}`, myform, { withCredentials: true })

//             return response.data
//         } catch (error) {
//             return console.log(error.response?.data || 'Update Profile Faild due to an unknown error');

//         }
//     }
// )

export const createProduct = createAsyncThunk(

    "/add-product", async (myform) => {

        try {
            
            const response = await axiosInstance.post("/api/v1/admin/add-product-data", myform, { withCredentials: true })
            return response.data

        } catch (error) {
            return console.log(error.response?.data || ' Create Product Data Faild due to an unknown error');

        }
    }
)

// export const getAllProducts = createAsyncThunk(
//     "/get-all-Products", async (param) => {
//         try {
//             // debugger
//             let link = `/api/v1/admin/get-all-product-data?keyword=${param.SearchTerm}`;
            
//             // Check if CategoryID is not an empty string or null
//             if (param.CategoryID && param.CategoryID !== "0") {
//                 link += `&ProductsCategoriesMappings=${param.CategoryID}`;
//             }
//             if (param.ManufacturerID && param.ManufacturerID !== "0") {
//                 link += `&Menufacturs=${param.ManufacturerID}`;
//             }
//             if (param.SizeID && param.SizeID !== "0") {
//                 link += `&ProductSize=${param.SizeID}`;
//             }
//             if (param.MaxPrice && param.MinPrice && param.SizeID !== "0") {
//                 link += `&Price[gte]=${param.MaxPrice}&Price[lte]=${param.MinPrice}`;
//             }

//             console.log("Category Id ky hai ", param.MaxPrice);

//             // Make the API request
//             const response = await axiosInstance.get(link, { withCredentials: true });

//             return response.data;

//         } catch (error) {
//             return console.log(error.response?.data || 'get all Products failed due to an unknown error');
//         }
//     }
// );

// Frontend action that constructs the API request URL
export const getAllProducts = createAsyncThunk(
    "/get-all-Products", async ({param,CategoryName}) => {
        try {
            // debugger
            let link = `/api/v1/admin/get-all-product-data?keyword=${param.SearchTerm}`;
            
            // Check if CategoryID is not an empty string or null
            if (param.CategoryID && param.CategoryID !== "0") {
                link += `&ProductsCategoriesMappings=${param.CategoryID}`;
            }
            if (param.ManufacturerID && param.ManufacturerID !== "0") {
                link += `&Menufacturs=${param.ManufacturerID}`;
            }
            if (param.SizeID && param.SizeID !== "0") {
                link += `&ProductSize=${param.SizeID}`;
            }
            if (param.MaxPrice && param.MinPrice) {
                link += `&Price[gte]=${param.MinPrice}&Price[lte]=${param.MaxPrice}`;
            }
            if (param.Rating && param.Rating!== "0") {
                link += `&ReviewRating=${param.Rating}`;
            }
            if (param.PageNo && param.PageNo!== "0") {
                link += `&page=${param.PageNo}`;
            }
            if (param.OrderByColumnName && param.OrderByColumnName!== "") {
                link += `&OrderByColumnName=${param.OrderByColumnName}`;
            }
            // debugger
            // if (param.PageSize && param.PageSize > 10) {
            //     link += `&PageSize=${param.PageSize}`;
            // } else {
            //     link += `&PageSize=10`; // Or any other default value
            // }
            

            // console.log("Constructed API link: ", link);

            // Make the API request
            if(CategoryName && CategoryName !== "0"){
                link += `&CategoryName=${CategoryName}`;
            }

            const response = await axiosInstance.get(link, { withCredentials: true });

            return response.data;

        } catch (error) {
            console.log(error.response?.data || 'get all Products failed due to an unknown error');
        }
    }
);


// export const getAllProducts = createAsyncThunk(
//     "/get-all-Products", async (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) => {

//         try {
//             debugger

//             let link = `/api/v1/admin/get-all-product-data?keyword=${keyword}&page=${currentPage}&Price[gte]=${price[0]}&Price[lte]=${price[1]}&ratings[gte]=${ratings}`;

//             if (category) {
//                 link = `/api/v1/admin/get-all-product-data?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ProductsCategoriesMappings=${category}&ratings[gte]=${ratings}`;
//             }
            
//             // const response = await axiosInstance.get(`/api/v1/admin/get-all-product-data/`, { withCredentials: true })
//             const response = await axiosInstance.get(link)

//             return response.data

//         } catch (error) {
//             return console.log(error.response?.data || 'get all Products Faild due to an unknown error');

//         }
//     }
// )

export const updateProduct = createAsyncThunk(
    "/Update-Product", async ({ id, myform }) => {
        try {
            // debugger
            const response = await axiosInstance.put(`/api/v1/admin/update-product-data/${id}`, myform, { withCredentials: true })

            return response.data
        } catch (error) {
            return console.log(error.response?.data || 'Update Product Faild due to an unknown error');

        }
    }
)
export const deleteProduct = createAsyncThunk(
    "/Delete-Product", async (id) => {
        try {
            const response = await axiosInstance.delete(`/api/v1/admin/delete-product-data/${id}`, { withCredentials: true })

            return response.data
        } catch (error) {
            return console.log(error.response?.data || 'Delete Product Faild due to an unknown error');

        }
    }
)
export const getSingleProduct = createAsyncThunk(
    "/Single-Product", async (id) => {
        try {
            const response = await axiosInstance.get(`/api/v1/admin/get-single-product/${id}`, { withCredentials: true })

            return response.data
        } catch (error) {
            return console.log(error.response?.data || 'Single Product Faild due to an unknown error');

        }
    }
)

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setUser: (state, action) => { },
    },
    extraReducers: ((builder) => {
        builder
            .addCase(createProduct.pending, (state) => {
                state.isLoading = true
                state.isDelete = false;

            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.isDelete = false;

                state.products = action.payload
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.products = null;
                state.isLoading = false;
                state.error = action.payload || 'An error occurred while fetching Product'; // Ensure error is properly set
            })
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true
                state.isDelete = false;

            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isDelete = false;
                state.products = action.payload.allProducts
                state.productCount = action.payload.productCount
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.products = null;
                state.isLoading = false;
                state.isDelete = false;

                state.error = action.payload || 'An error occurred while fetching Product'; // Ensure error is properly set
            })
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true,
                    state.isDelete = false
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.isDelete = true,
                    state.products = action.payload
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.products = null;
                state.isLoading = false;
                state.isDelete = false;
                state.error = action.payload || 'An error occurred while fetching Product'; // Ensure error is properly set
            })
            .addCase(getSingleProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getSingleProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload.getSingleProduct
            })
            .addCase(getSingleProduct.rejected, (state, action) => {
                state.products = null;
                state.isLoading = false;
                state.error = action.payload || 'An error occurred while fetching Product'; // Ensure error is properly set
            })
            .addCase(updateProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload.updatedProduct
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.products = null;
                state.isLoading = false;
                state.error = action.payload || 'An error occurred while fetching Product'; // Ensure error is properly set
            })
    })


})

export const { setUser } = productSlice.actions
export default productSlice.reducer;