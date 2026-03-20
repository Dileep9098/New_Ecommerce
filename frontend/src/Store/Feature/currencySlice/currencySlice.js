// // src/Store/features/currencySlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const fetchCurrency = createAsyncThunk(
//     'currency/fetchCurrency',
//     async () => {
//         try {
//             const ipRes = await axios.get('https://ipapi.co/json/');
//             debugger;
//             const userCurrency = ipRes.data.currency || 'INR';

//       let rate = 1;
//       if (userCurrency !== 'INR') {
//         const res = await axios.get(`https://api.exchangerate.host/convert?from=INR&to=${userCurrency}`);
//         rate = res.data.result || 1;
//       }

//       return { currency: userCurrency, rate };
//     } catch (err) {
//       console.error("Currency fetch failed", err);
//       return { currency: 'INR', rate: 1 };
//     }
//   }
// );

// const currencySlice = createSlice({
//   name: 'currency',
//   initialState: {
//     currency: 'INR',
//     rate: 1,
//     loading: true,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCurrency.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchCurrency.fulfilled, (state, action) => {
//         state.currency = action.payload.currency;
//         state.rate = action.payload.rate;
//         state.loading = false;
//       })
//       .addCase(fetchCurrency.rejected, (state) => {
//         state.loading = false;
//         state.currency = 'INR';
//         state.rate = 1;
//       });
//   },
// });

// export default currencySlice.reducer;



// src/Store/features/currencySlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';



// export const fetchCurrency = createAsyncThunk(
//   'currency/fetchCurrency',
//   async () => {
//     try {
//       // Step 1: Get country from IP (FREE API)
//     //   const ipRes = await axios.get('https://ipwho.is/'); // Auto detect IP
//         const ipRes = await axios.get('https://ipwho.is/8.8.8.8');
//         console.log("IP Response:", ipRes.data);
//       const countryCode = ipRes.data.country_code || 'IN';

//       // Step 2: Map country to currency code
//       const countryToCurrency = {
//         IN: 'INR',
//         US: 'USD',
//         CA: 'CAD',
//         AU: 'AUD',
//         GB: 'GBP',
//         EU: 'EUR',
//         JP: 'JPY',
//       };

//       const userCurrency = countryToCurrency[countryCode] || 'INR';

//       // Step 3: Fetch exchange rate from INR to detected currency
//       let rate = 1;
//       debugger
// //       if (userCurrency !== 'INR') {
// //         // const res = await axios.get(
// //         //   `https://api.exchangerate.host/convert?from=INR&to=${userCurrency}`
// //         // );
// // const res = await axios.get('https://api.exchangerate.host/convert', {
// //           params: { from: 'INR', to: userCurrency }
// //         });

// //         console.log("Exchange rate response:", res.data);
// //         rate = res.data.result || 1;
// //       }

//       return { currency: userCurrency, rate };
//     } catch (err) {
//       console.error("Currency fetch failed", err);
//       return { currency: 'INR', rate: 1 };
//     }
//   }
// );

// export const fetchCurrency = createAsyncThunk(
//   'currency/fetchCurrency',
//   async () => {
//     try {
//     //   const ipRes = await axios.get('https://ipwho.is/'); // ya 'https://ipwho.is/8.8.8.8' for USA testing
//              const ipRes = await axios.get('https://ipwho.is/8.8.8.8');

//       const countryCode = ipRes.data.country_code || 'IN';

//       const countryToCurrency = {
//         IN: 'INR',
//         US: 'USD',
//         CA: 'CAD',
//         AU: 'AUD',
//         GB: 'GBP',
//         EU: 'EUR',
//         JP: 'JPY',
//       };

//       const manualRates = {
//         INR: 1,
//         USD: 0.012,     // 1 INR = 0.012 USD
//         CAD: 0.016,
//         AUD: 0.018,
//         GBP: 0.0095,
//         EUR: 0.011,
//         JPY: 1.75,
//       };

//       const userCurrency = countryToCurrency[countryCode] || 'INR';
//       const rate = manualRates[userCurrency] || 1;

//       return { currency: userCurrency, rate };
//     } catch (err) {
//       console.error("Currency fetch failed", err);
//       return { currency: 'INR', rate: 1 };
//     }
//   }
// );

// const currencySlice = createSlice({
//   name: 'currency',
//   initialState: {
//     currency: 'INR',
//     rate: 1,
//     loading: true,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCurrency.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchCurrency.fulfilled, (state, action) => {
//         state.currency = action.payload.currency;
//         state.rate = action.payload.rate;
//         state.loading = false;
//       })
//       .addCase(fetchCurrency.rejected, (state) => {
//         state.loading = false;
//         state.currency = 'INR';
//         state.rate = 1;
//       });
//   },
// });

// export default currencySlice.reducer;



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCurrency = createAsyncThunk(
  "currency/fetchCurrency",
  async () => {
    try {
      // Real user IP ke liye
      const ipRes = await axios.get("https://ipwho.is/");
      
      // const ipRes = await axios.get("https://ipwho.is/95.163.32.140");

      // Testing ke liye fixed USA IP:
      // const ipRes = await axios.get("https://ipwho.is/8.8.8.8");

      const countryCode = ipRes.data.country_code || "IN";

      let userCurrency = "USD"; // default
      if (countryCode === "IN") {
        userCurrency = "INR";
      }
      let rate=userCurrency==="USD"?0.012: 1

      return { currency: userCurrency,rate:rate };
    } catch (err) {
      console.error("Currency fetch failed", err);
      return { currency: "INR",rate:1 }; // fallback INR
    }
  }
);

const currencySlice = createSlice({
  name: "currency",
  initialState: {
    currency: "INR",
    loading: true,
    rate:1
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrency.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrency.fulfilled, (state, action) => {
        state.currency = action.payload.currency;
        state.rate = action.payload.rate;
        state.loading = false;
      })
      .addCase(fetchCurrency.rejected, (state) => {
        state.loading = false;
        state.currency = "INR";
        state.rate = 1;

      });
  },
});

export default currencySlice.reducer;
