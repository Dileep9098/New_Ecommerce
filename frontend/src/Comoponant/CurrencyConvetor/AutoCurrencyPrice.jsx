// // import { useEffect, useState } from 'react';
// // import axios from 'axios';

// // function AutoCurrencyPrice({ basePrice = 499 }) {
// //   const [currency, setCurrency] = useState('INR');
// //   const [rate, setRate] = useState(1);

// //   useEffect(() => {
// //     const fetchCurrencyInfo = async () => {
// //       try {
// //         const ipInfo = await axios.get('https://ipapi.co/json/');
// //         const userCurrency = ipInfo.data.currency || 'INR';
// //         setCurrency(userCurrency);

// //         const exchangeData = await axios.get(
// //           `https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/INR`
// //         );

// //         const conversionRate = exchangeData.data.conversion_rates[userCurrency];
// //         setRate(conversionRate || 1);
// //       } catch (err) {
// //         console.error("Currency detect error:", err);
// //       }
// //     };

// //     fetchCurrencyInfo();
// //   }, []);

// //   const convertedPrice = (basePrice * rate).toFixed(2);

// //   return (
// //     <p>
// //       Price: {currency === 'INR' ? '₹' : currency + ' '}
// //       {convertedPrice}
// //     </p>
// //   );
// // }

// // export default AutoCurrencyPrice;



// import { useEffect, useState } from 'react';
// import axios from 'axios';

// function AutoCurrencyPrice({ basePrice = 499, oldPrice = null }) {
//   const [currency, setCurrency] = useState('INR');
//   const [rate, setRate] = useState(1);
//   const [loading, setLoading] = useState(true);

//   const symbolMap = {
//     INR: '₹',
//     USD: '$',
//     EUR: '€',
//     GBP: '£',
//     CAD: 'CA$',
//     AUD: 'A$',
//     JPY: '¥',
//   };

//   useEffect(() => {
//     const fetchCurrencyInfo = async () => {
//       try {
//         // Step 1: Get user currency from IP
//         const ipRes = await axios.get('https://ipapi.co/json/');
//         const userCurrency = ipRes.data.currency || 'INR';
//         setCurrency(userCurrency);

//         // Step 2: Convert using exchangerate.host (no API key)

//         if (userCurrency !== 'INR') {
//           const res = await axios.get(
//             `https://api.exchangerate.host/convert?from=INR&to=${userCurrency}`
//           );
//           const rate = res.data.result || 1;
//           setRate(rate);
//         }
//       } catch (err) {
//         console.error('Currency conversion error:', err);
//         setCurrency('INR');
//         setRate(1);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCurrencyInfo();
//   }, []);

//   const symbol = symbolMap[currency] || currency + ' ';
//   const convertedPrice = (basePrice * rate).toFixed(2);
//   const convertedOld = oldPrice ? (oldPrice * rate).toFixed(2) : null;

//   if (loading) return <p>Loading price...</p>;

//   return (
//     <p>
//       Price: {symbol}{convertedPrice}
//       {convertedOld && (
//         <sub style={{ marginLeft: '6px', color: '#999' }}>
//           <del>{symbol}{convertedOld}</del>
//         </sub>
//       )}
//     </p>
//   );
// }

// export default AutoCurrencyPrice;



// AutoCurrencyPrice.jsx
import React from 'react';
import { useSelector } from 'react-redux';

export default function AutoCurrencyPrice({ Price }) {
  const { currency, rate, loading } = useSelector((state) => state.currency);

  if (loading) return <span>Loading...</span>;

  const currencySymbols = {
    INR: '₹',
    USD: '$',
    EUR: '€',
    GBP: '£',
    CAD: 'C$',
    AUD: 'A$',
    JPY: '¥',
  };

  const converted = (Price * rate).toFixed(2);
  const symbol = currencySymbols[currency] || currency;

  return (
    <>
    {symbol}{converted}
    </>
  );
}
