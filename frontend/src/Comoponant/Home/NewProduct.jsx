
// import React, { useEffect } from 'react'
// import { useState } from 'react'
// import { Link } from 'react-router-dom'
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import CardActionArea from '@mui/material/CardActionArea';
// import CardActions from '@mui/material/CardActions';
// import Box from '@mui/material/Box';
// import { styled } from '@mui/system';
// import Rating from '@mui/material/Rating';
// import { useRef } from 'react';
// import Shere from '../../../Helper/Shere';
// import axiosInstance from '../../../ApiHendler/axiosInstance';
// import Config from '../../../Config/Config';
// import { replaceWhiteSpacesWithDashSymbolInUrl } from '../../../utils/ConversionHelper';
// const BASE_URL = import.meta.env.VITE_IMG_URL;
// import $ from 'jquery';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';
// import 'owl.carousel/dist/owl.carousel.min.js';




// const AmazonLink = styled(Box)`
//   position: absolute;
//   top: 7px;
//   left: 6px;
//   background-image: linear-gradient(to right, #021533, #04347c, #b0d0ff);
//   border-radius: 5px 5px;
//   font-size: 16px;
//   font-weight: bold;
//   overflow: hidden;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: rgb(255, 255, 255);
//   font-style: italic;
//   cursor: pointer;
//   padding: 2px 15px;
//   box-shadow: rgb(0, 0, 0) 0 10px 20px -5px;
  
//   &::before {
//     content: '';
//     position: absolute;
//     top: -50%;
//     left: -50%;
//     width: 200%;
//     height: 50%;
//     background: linear-gradient(45deg,
//             rgba(255, 255, 255, 0) 20%,
//             rgba(255, 255, 255, 0.8) 50%,
//             rgba(255, 255, 255, 0) 80%);
//     opacity: 0.8;
//     filter: brightness(3);
//     transform: rotate(45deg);
//     animation: shimmer1 2s linear infinite;
//   }

//   @keyframes shimmer1 {
//     0% {
//       transform: translateX(-100%) rotate(45deg);
//     }
//     100% {
//       transform: translateX(100%) rotate(45deg);
//     }
//   }
// `;

// const OnSaleLink = styled(Box)`
//   position: absolute;
//   top: 7px;
//   left: 6px;
//   background-image: linear-gradient(to right,rgb(164, 7, 151),rgb(145, 1, 148), #b0d0ff);
//   border-radius: 5px 5px;
//   font-size: 16px;
//   font-weight: bold;
//   overflow: hidden;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: rgb(255, 255, 255);
//   font-style: italic;
//   cursor: pointer;
//   padding: 2px 15px;
//   box-shadow: rgb(0, 0, 0) 0 10px 20px -5px;
  
//   &::before {
//     content: '';
//     position: absolute;
//     top: -50%;
//     left: -50%;
//     width: 200%;
//     height: 50%;
//     background: linear-gradient(45deg,
//             rgba(255, 255, 255, 0) 20%,
//             rgba(255, 255, 255, 0.8) 50%,
//             rgba(255, 255, 255, 0) 80%);
//     opacity: 0.8;
//     filter: brightness(3);
//     transform: rotate(45deg);
//     animation: shimmer1 2s linear infinite;
//   }

//   @keyframes shimmer1 {
//     0% {
//       transform: translateX(-100%) rotate(45deg);
//     }
//     100% {
//       transform: translateX(100%) rotate(45deg);
//     }
//   }
// `;

// const BestSeller = styled(Box)`
//   position: absolute;
//   top: 7px;
//   left: 6px;
//   background-image: linear-gradient(to right,rgb(49, 239, 249),rgb(9, 197, 214), #b0d0ff);
//   border-radius: 5px 5px;
//   font-size: 16px;
//   font-weight: bold;
//   overflow: hidden;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: rgb(255, 255, 255);
//   font-style: italic;
//   cursor: pointer;
//   padding: 2px 15px;
//   box-shadow: rgb(0, 0, 0) 0 10px 20px -5px;
  
//   &::before {
//     content: '';
//     position: absolute;
//     top: -50%;
//     left: -50%;
//     width: 200%;
//     height: 50%;
//     background: linear-gradient(45deg,
//             rgba(255, 255, 255, 0) 20%,
//             rgba(255, 255, 255, 0.8) 50%,
//             rgba(255, 255, 255, 0) 80%);
//     opacity: 0.8;
//     filter: brightness(3);
//     transform: rotate(45deg);
//     animation: shimmer1 2s linear infinite;
//   }

//   @keyframes shimmer1 {
//     0% {
//       transform: translateX(-100%) rotate(45deg);
//     }
//     100% {
//       transform: translateX(100%) rotate(45deg);
//     }
//   }
// `;

// export default function NewProduct(props) {

//     const [toggle, setToggle] = useState(true)
//     const [toggle1, setToggle1] = useState(false)
//     const [toggle2, setToggle2] = useState(false)
//     const [toggle3, setToggle3] = useState(false)
//     const [showPopover, setShowPopover] = useState(false);
//     const [copyurl, setCopyUrl] = useState(false);
//     const popoverRef = useRef(null);
//     const [allProduct, setAllProduct] = useState(props.AllProducts || []);
//     const [initialized, setInitialized] = useState(false);

//     useEffect(() => {
//         if (props.AllProducts && props.AllProducts.length) {
//             setAllProduct(props.AllProducts);
//         }
//     }, [props.AllProducts]);

//     console.log("Bhai kya hua re", props)
//     console.log("Bhai kya hua ALl kya hua",allProduct)

//     const togglePopover = () => {
//         setShowPopover(!showPopover);
//     };

//     const handleCopy = async () => {
//         const urlViewDetailImage = "http://localhost:3000";
//         try {
//             await navigator.clipboard.writeText(urlViewDetailImage);
//             setCopyUrl(true);
//             setTimeout(() => {
//                 setCopyUrl(false);
//                 setShowPopover(false);
//             }, 1500);
//         } catch (err) {
//             console.error('Failed to copy: ', err);
//             alert('Failed to copy link. Please try again.');
//         }
//     };

//     function Toggle() {
//         console.log("Before Toggle", toggle);  // Debugging line
//         setToggle(!toggle);
//         setToggle1(false);
//         setToggle2(false);
//         setToggle3(false);
//     }

//     function Toggle1() {
//         setToggle1(!toggle1)
//         setToggle(false)
//         setToggle2(false)
//         setToggle3(false)
//     }
//     function Toggle2() {
//         setToggle2(!toggle2)
//         setToggle(false)
//         setToggle1(false)
//         setToggle3(false)

//     }
//     function Toggle3() {
//         setToggle3(!toggle3)
//         setToggle(false)
//         setToggle1(false)
//         setToggle2(false)

//     }

//     // useEffect(() => {
//     //     if (props.AllProducts && props.AllProducts.length > 0) {
//     //         setAllProduct(props.AllProducts); // Set state with the passed prop
//     //     }
//     // }, [props.AllProducts]);


//     // useEffect(() => {
//     //     const fetchData = async () => {
//     //         try {
//     //             const response = await axiosInstance.get(Config.END_POINT_LIST["GET_ALL_PRODUCTS"], { withCredentials: true });
//     //             if (response.data.success) {
//     //                 setAllProduct(response.data.allProductsFeatures);
//     //             } else {
//     //                 showErrorMsg(response.data.message);
//     //             }
//     //         } catch (error) {
//     //             showErrorMsg(error.response.data.message);
//     //         }
//     //     };
//     //     fetchData();
//     // }, []);
//     useEffect(() => {
//         if (allProduct && allProduct.length > 0 && !initialized) {
//             $('#owlCarousel3').owlCarousel({
//                 loop: true,
//                 margin: 10,
//                 nav: true,
//                 autoplay: true,
//                 autoplayTimeout: 3000,
//                 autoplayHoverPause: true,
//                 smartSpeed: 1000,
//                 responsive: {
//                     0: { items: 2},
//                     600: { items: 3 },
//                     1000: { items: 4},
//                     1200: { items: 6},
//                 },
//             });
//             setInitialized(true);
//         }
//     }, [allProduct, initialized]);


//     // console.log("hvjhjb", allProduct)
//     // const ActiveAndMarkAsNEwProducts = Array.isArray(allProduct) ? allProduct.filter(product => product.IsActive && product.MarkAsNew) : [];
//     // console.log("Active", activeProducts)
//     const ActiveAndMarkAsNEwProducts = Array.isArray(allProduct)
//     ? allProduct.filter(product => product.IsActive) 
//     : [];


//     // const ActiveAndMarkAsNEwProducts = Array.isArray(allProduct)
//     // ? allProduct.filter(product => product.IsActive && product.MarkAsNew)
//     // : [];

// console.log("Filtered Active and New Products: ", ActiveAndMarkAsNEwProducts);




//     return (
//         <>
//             <section id='newProduct'>
//                 <div className="container-fluid">
//                     <div className="row">

//                         <div className="col-12">
//                             <div className="newProduct1">
//                                 <h2 className='fontsize2'>Bringing Heritage to Your Fingertips</h2>
//                                 <p className='p'>Sell & showcase unique handicrafts globally with our powerful e-commerce platform.</p>
//                             </div>

//                             <div className="d-flex justify-content-center">
//                                 <Link className={`toggle ${toggle  ? 'toggleBorder' : ""}`} onClick={() => Toggle()} > New Products </Link>
//                                 <Link className={`toggle ${toggle1 ? 'toggleBorder' : ""}`} onClick={() => Toggle1()} style={{ marginLeft: '20px' }}> On sale</Link>
//                                 <Link className={`toggle ${toggle2 ? 'toggleBorder' : ""}`} onClick={() => Toggle2()} style={{ marginLeft: '20px' }}>hot deal</Link>
//                                 <Link className={`toggle ${toggle3 ? 'toggleBorder' : ""}`} onClick={() => Toggle3()} style={{ marginLeft: '20px' }}>Best sellers</Link>

//                             </div>
//                             <hr />
//                         </div>
//                         <div className="">
//                             {toggle && (
//                                 <div id='owlCarousel3' className="owl-carousel">

//                                     {ActiveAndMarkAsNEwProducts && ActiveAndMarkAsNEwProducts.length > 0 ?
//                                         (
//                                             ActiveAndMarkAsNEwProducts.map((product, ind) => (
//                                                 <div key={ind}>
//                                                     <Card sx={{ maxWidth: 300, position: 'relative', marginBottom: "10px" }} >
//                                                         <CardActionArea>
//                                                             <CardMedia
//                                                                 component="img"
//                                                                 height="200"
//                                                                 // image={`/image/products/${product.ProductPictures[0]}`}
//                                                                image={
//                                                                     product?.ProductPictures?.length
//                                                                         ? product.ProductPictures[0]?.url || `${BASE_URL}/${product.ProductPictures[0]}`
//                                                                         : 'fallback-image.jpg' // Replace with your fallback image
//                                                                 }
//                                                                 // ${BASE_URL}/${campaign?.file}
//                                                                 alt="green iguana"
//                                                                 className='newProductImage'
//                                                             />

//                                                             <AmazonLink>New</AmazonLink>

//                                                             <CardContent>
//                                                                 <div className="Review" style={{ display: 'flex', alignItems: 'center', marginBottom: "10px" }}>
//                                                                     <Rating name="read-only" value={5} readOnly />
//                                                                 </div>
//                                                             </CardContent>
//                                                         </CardActionArea>

//                                                         <div className="detail-title detail-title">
//                                                             <div className="detail-right">
//                                                                 <Shere
//                                                                     ProductId={product._id}
//                                                                     ProductName={product.ProductName}
//                                                                     ProductsCategoriesMappings={product.ProductsCategoriesMappings}
//                                                                 />

//                                                             </div>
//                                                             <div className="detail-left ">
//                                                                 <Link to={`${Config.WEBSITE_IBASE_URL}product-details/${product._id}/${product.ProductsCategoriesMappings.map((category) => replaceWhiteSpacesWithDashSymbolInUrl(category.Name)).join('-') ?? "shop"}/${replaceWhiteSpacesWithDashSymbolInUrl(product.ProductName)}`}>See More...</Link>
//                                                             </div>
//                                                         </div>
//                                                     </Card>


//                                                 </div>
//                                             ))
//                                         )
//                                         : ""}




//                                 </div>
//                             )}
//                             {toggle1 && (
//                                 <div className='row'>

//                                     {ActiveAndMarkAsNEwProducts && ActiveAndMarkAsNEwProducts.length > 0 ?
//                                         (
//                                             ActiveAndMarkAsNEwProducts.slice(0, 10).map((product, ind) => (
//                                                 <div className='col-lg-3 col-md-3 col-sm-4 col-6 mb-2' key={ind}>
//                                                     <Card sx={{ maxWidth: 300, position: 'relative', marginBottom: "10px" }} >
//                                                         <CardActionArea>
//                                                             <CardMedia
//                                                                 component="img"
//                                                                 height="200"
//                                                                 image={product.ProductPictures[0].url||`${BASE_URL}/${product.ProductPictures[0]}`}
//                                                                 alt="green iguana"
//                                                                 className='newProductImage'
//                                                             />

//                                                             <OnSaleLink>On Sale</OnSaleLink>

//                                                             <CardContent>
//                                                                 <div className="Review" style={{ display: 'flex', alignItems: 'center', marginBottom: "10px" }}>
//                                                                     <Rating name="read-only" value={5} readOnly />
//                                                                 </div>
//                                                             </CardContent>
//                                                         </CardActionArea>

//                                                         <div className="detail-title detail-title">
//                                                             <div className="detail-right">
//                                                                 <Shere
//                                                                     ProductId={product._id}
//                                                                     ProductName={product.ProductName}
//                                                                     ProductsCategoriesMappings={product.ProductsCategoriesMappings}
//                                                                 />

//                                                             </div>
//                                                             <div className="detail-left ">
//                                                                 <Link to={`${Config.WEBSITE_IBASE_URL}product-details/${product._id}/${product.ProductsCategoriesMappings.map((category) => replaceWhiteSpacesWithDashSymbolInUrl(category.Name)).join('-') ?? "shop"}/${replaceWhiteSpacesWithDashSymbolInUrl(product.ProductName)}`}>See More...</Link>
//                                                             </div>
//                                                         </div>
//                                                     </Card>

//                                                 </div>
//                                             ))
//                                         )
//                                         : ""}




//                                 </div>

//                             )}
//                             {toggle2 && (
//                                 <div className='row'>

//                                     {ActiveAndMarkAsNEwProducts && ActiveAndMarkAsNEwProducts.length > 0 ?
//                                         (
//                                             ActiveAndMarkAsNEwProducts.slice(0, 8).map((product, ind) => (
//                                                 <div className='col-lg-3 col-md-3 col-sm-4 col-6 mb-2' key={ind}>
//                                                     <Card sx={{ maxWidth: 300, position: 'relative', marginBottom: "10px" }} >
//                                                         <CardActionArea>
//                                                             <CardMedia
//                                                                 component="img"
//                                                                 height="200"
//                                                               image={
//                                                                     product?.ProductPictures?.length
//                                                                         ? product.ProductPictures[0]?.url || `${BASE_URL}/${product.ProductPictures[0]}`
//                                                                         : 'fallback-image.jpg' // Replace with your fallback image
//                                                                 }
//                                                                 alt="green iguana"
//                                                                 className='newProductImage'
//                                                             />

//                                                             <OnSaleLink>Hot Deal</OnSaleLink>

//                                                             <CardContent>
//                                                                 <div className="Review" style={{ display: 'flex', alignItems: 'center', marginBottom: "10px" }}>
//                                                                     <Rating name="read-only" value={5} readOnly />
//                                                                 </div>
//                                                             </CardContent>
//                                                         </CardActionArea>

//                                                         <div className="detail-title detail-title">
//                                                             <div className="detail-right">
//                                                                 <Shere
//                                                                     ProductId={product._id}
//                                                                     ProductName={product.ProductName}
//                                                                     ProductsCategoriesMappings={product.ProductsCategoriesMappings}
//                                                                 />

//                                                             </div>
//                                                             <div className="detail-left ">
//                                                                 <Link to={`${Config.WEBSITE_IBASE_URL}product-details/${product._id}/${product.ProductsCategoriesMappings.map((category) => replaceWhiteSpacesWithDashSymbolInUrl(category.Name)).join('-') ?? "shop"}/${replaceWhiteSpacesWithDashSymbolInUrl(product.ProductName)}`}>See More...</Link>
//                                                             </div>
//                                                         </div>
//                                                     </Card>

//                                                 </div>
//                                             ))
//                                         )
//                                         : ""}




//                                 </div>
//                             )}
//                             {toggle3 && (
//                                 <div className='row'>

//                                     {ActiveAndMarkAsNEwProducts && ActiveAndMarkAsNEwProducts.length > 0 ?
//                                         (
//                                             ActiveAndMarkAsNEwProducts.slice(0, 8).map((product, ind) => (
//                                                 <div className='col-lg-3 col-md-3 col-sm-4 col-6 mb-2' key={ind}>
//                                                     <Card sx={{ maxWidth: 300, position: 'relative', marginBottom: "10px" }} >
//                                                         <CardActionArea>
//                                                             <CardMedia
//                                                                 component="img"
//                                                                 height="200"
//                                                                 image={product.ProductPictures[0].url||`${BASE_URL}/${product.ProductPictures[0]}`}
//                                                                 alt="green iguana"
//                                                                 className='newProductImage'
//                                                             />

//                                                             <BestSeller>Best Sellers</BestSeller>

//                                                             <CardContent>
//                                                                 <div className="Review" style={{ display: 'flex', alignItems: 'center', marginBottom: "10px" }}>
//                                                                     <Rating name="read-only" value={5} readOnly />
//                                                                 </div>
//                                                             </CardContent>
//                                                         </CardActionArea>

//                                                         <div className="detail-title detail-title">
//                                                             <div className="detail-right">
//                                                                 <Shere
//                                                                     ProductId={product._id}
//                                                                     ProductName={product.ProductName}
//                                                                     ProductsCategoriesMappings={product.ProductsCategoriesMappings}
//                                                                 />

//                                                             </div>
//                                                             <div className="detail-left ">
//                                                                 <Link to={`${Config.WEBSITE_IBASE_URL}product-details/${product._id}/${product.ProductsCategoriesMappings.map((category) => replaceWhiteSpacesWithDashSymbolInUrl(category.Name)).join('-') ?? "shop"}/${replaceWhiteSpacesWithDashSymbolInUrl(product.ProductName)}`}>See More...</Link>
//                                                             </div>
//                                                         </div>
//                                                     </Card>

//                                                 </div>
//                                             ))
//                                         )
//                                         : ""}


//                                 </div>
//                             )}


//                         </div>

//                     </div>
//                 </div>
//             </section>

//         </>
//     )
// }


// import React, { useEffect, useState, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import { styled } from '@mui/system';
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import CardActionArea from '@mui/material/CardActionArea';
// import Rating from '@mui/material/Rating';
// import Shere from '../../../Helper/Shere';
// import Config from '../../../Config/Config';
// import { replaceWhiteSpacesWithDashSymbolInUrl } from '../../../utils/ConversionHelper';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Navigation } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';

// const BASE_URL = import.meta.env.VITE_IMG_URL;

// // === Same styled components (OnSaleLink, BestSeller) ===

// export default function NewProduct(props) {
//   const [toggle, setToggle] = useState(true);
//   const [toggle1, setToggle1] = useState(false);
//   const [toggle2, setToggle2] = useState(false);
//   const [toggle3, setToggle3] = useState(false);
//   const [allProduct, setAllProduct] = useState(props.AllProducts || []);

//   useEffect(() => {
//     if (props.AllProducts && props.AllProducts.length) {
//       setAllProduct(props.AllProducts);
//     }
//   }, [props.AllProducts]);

//   const ActiveAndMarkAsNEwProducts = Array.isArray(allProduct)
//     ? allProduct.filter((product) => product.IsActive)
//     : [];

//   return (
//     <section id="newProduct">
//       <div className="container-fluid">
//         <div className="row">
//           <div className="col-12">
//             <div className="newProduct1">
//               <h2 className="fontsize2">Bringing Heritage to Your Fingertips</h2>
//               <p className="p">
//                 Sell & showcase unique handicrafts globally with our powerful e-commerce platform.
//               </p>
//             </div>

//             <div className="d-flex justify-content-center">
//               <Link
//                 className={`toggle ${toggle ? 'toggleBorder' : ''}`}
//                 onClick={() => {
//                   setToggle(true);
//                   setToggle1(false);
//                   setToggle2(false);
//                   setToggle3(false);
//                 }}
//               >
//                 New Products
//               </Link>
//               <Link
//                 className={`toggle ${toggle1 ? 'toggleBorder' : ''}`}
//                 onClick={() => {
//                   setToggle1(true);
//                   setToggle(false);
//                   setToggle2(false);
//                   setToggle3(false);
//                 }}
//                 style={{ marginLeft: '20px' }}
//               >
//                 On Sale
//               </Link>
//               <Link
//                 className={`toggle ${toggle2 ? 'toggleBorder' : ''}`}
//                 onClick={() => {
//                   setToggle2(true);
//                   setToggle(false);
//                   setToggle1(false);
//                   setToggle3(false);
//                 }}
//                 style={{ marginLeft: '20px' }}
//               >
//                 Hot Deal
//               </Link>
//               <Link
//                 className={`toggle ${toggle3 ? 'toggleBorder' : ''}`}
//                 onClick={() => {
//                   setToggle3(true);
//                   setToggle(false);
//                   setToggle1(false);
//                   setToggle2(false);
//                 }}
//                 style={{ marginLeft: '20px' }}
//               >
//                 Best Sellers
//               </Link>
//             </div>
//             <hr />
//           </div>

//           {/* --- Only slider section changed --- */}
//           {toggle && (
//             <Swiper
//               slidesPerView={6}
//               spaceBetween={10}
//               navigation
//               autoplay={{ delay: 3000 }}
//               loop
//               modules={[Autoplay, Navigation]}
//               breakpoints={{
//                 0: { slidesPerView: 2 },
//                 600: { slidesPerView: 3 },
//                 1000: { slidesPerView: 4 },
//                 1200: { slidesPerView: 6 },
//               }}
//             >
//               {ActiveAndMarkAsNEwProducts.map((product, ind) => (
//                 <SwiperSlide key={ind}>
//                   <Card sx={{ maxWidth: 300, position: 'relative', marginBottom: '10px' }}>
//                     <CardActionArea>
//                       <CardMedia
//                         component="img"
//                         height="200"
//                         image={
//                           product?.ProductPictures?.length
//                             ? product.ProductPictures[0]?.url ||
//                               `${BASE_URL}/${product.ProductPictures[0]}`
//                             : 'fallback-image.jpg'
//                         }
//                         alt="product"
//                         className="newProductImage"
//                       />
//                       <Box
//                         sx={{
//                           position: 'absolute',
//                           top: '7px',
//                           left: '6px',
//                           background:
//                             'linear-gradient(to right, #021533, #04347c, #b0d0ff)',
//                           color: 'white',
//                           padding: '2px 15px',
//                           borderRadius: '5px',
//                           fontWeight: 'bold',
//                         }}
//                       >
//                         New
//                       </Box>

//                       <CardContent>
//                         <div
//                           className="Review"
//                           style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}
//                         >
//                           <Rating name="read-only" value={5} readOnly />
//                         </div>
//                       </CardContent>
//                     </CardActionArea>

//                     <div className="detail-title">
//                       <div className="detail-right">
//                         <Shere
//                           ProductId={product._id}
//                           ProductName={product.ProductName}
//                           ProductsCategoriesMappings={product.ProductsCategoriesMappings}
//                         />
//                       </div>
//                       <div className="detail-left">
//                         <Link
//                           to={`${Config.WEBSITE_IBASE_URL}product-details/${product._id}/${product.ProductsCategoriesMappings.map(
//                             (category) =>
//                               replaceWhiteSpacesWithDashSymbolInUrl(category.Name)
//                           ).join('-') ?? 'shop'}/${replaceWhiteSpacesWithDashSymbolInUrl(
//                             product.ProductName
//                           )}`}
//                         >
//                           See More...
//                         </Link>
//                       </div>
//                     </div>
//                   </Card>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./HomePageStyle.css";

import Shere from "../../Helper/Shere";
import Config from "../../Config/Config";
import { replaceWhiteSpacesWithDashSymbolInUrl } from "../../utils/ConversionHelper";

const BASE_URL = import.meta.env.VITE_IMG_URL;

/* --- Label styles --- */
const LabelBase = styled(Box)`
  position: absolute;
  top: 8px;
  left: 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  padding: 3px 10px;
  color: #fff;
  letter-spacing: 0.4px;
  z-index: 2;
  backdrop-filter: blur(4px);
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 200%;
    height: 100%;
    background: linear-gradient(120deg, rgba(255, 255, 255, 0.3), transparent);
    animation: shimmer 2s infinite;
  }
  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }

  @media (max-width: 600px) {
    font-size: 10px;
    padding: 2px 8px;
  }
`;
const AmazonLink = styled(LabelBase)` background: linear-gradient(135deg, #005bea, #00c6fb);`;
const OnSaleLink = styled(LabelBase)` background: linear-gradient(135deg, #ff512f, #dd2476);`;
const BestSeller = styled(LabelBase)` background: linear-gradient(135deg, #f7971e, #ffd200);`;

/* --- Card --- */
const ProductCard = styled(Card)`
  max-width: 280px;
  width: 100%;
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
  transition: all 0.4s ease;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 600px) {
    max-width: 90%;
    margin: 0 auto;
  }
`;

const ProductTitle = styled(Typography)`
  font-size: 1rem;
  font-weight: 600;
  color: #222;
  text-align: center;
  margin-top: 8px;

  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
`;

const SeeMore = styled(Link)`
  font-size: 0.9rem;
  color: #0072ff;
  font-weight: 500;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 600px) {
    font-size: 0.85rem;
  }
`;

export default function NewProduct({ AllProducts = [] }) {
  const [toggle, setToggle] = useState("new");
  const ActiveProducts = Array.isArray(AllProducts)
    ? AllProducts.filter((p) => p.IsActive)
    : [];

  const renderLabel = (type) => {
    switch (type) {
      case "new": return <AmazonLink>New</AmazonLink>;
      case "sale": return <OnSaleLink>Sale</OnSaleLink>;
      case "hot": return <OnSaleLink>Hot</OnSaleLink>;
      case "best": return <BestSeller>Best</BestSeller>;
      default: return null;
    }
  };

  const filteredProducts = () => {
    switch (toggle) {
      case "new": return ActiveProducts;
      case "sale": return ActiveProducts.slice(0, 10);
      case "hot": return ActiveProducts.slice(0, 8);
      case "best": return ActiveProducts.slice(0, 8);
      default: return [];
    }
  };

  return (
    <section id="newProduct" className="py-8" style={{ background: "#f9fbff" }}>
      <div className="container-fluid text-center">
        <h2 className="fontsize2 mb-2 fw-bold">Bringing Heritage to Your Fingertips</h2>
        <p className="p mb-4 text-muted">
          Showcase your craftsmanship globally with our artisan-first platform.
        </p>

        {/* --- Toggle buttons --- */}
        <div className="d-flex justify-content-center flex-wrap mb-4">
          {["new", "sale", "hot", "best"].map((item) => (
            <Link
              key={item}
              className={`toggle ${toggle === item ? "toggleBorder" : ""}`}
              onClick={() => setToggle(item)}
              style={{
                margin: "6px 10px",
                fontSize: "1rem",
                padding: "6px 12px",
                borderRadius: "8px",
                transition: "all 0.3s ease",
              }}
            >
              {item === "new"
                ? "New Products"
                : item === "sale"
                ? "On Sale"
                : item === "hot"
                ? "Hot Deals"
                : "Best Sellers"}
            </Link>
          ))}
        </div>

        {/* --- Swiper --- */}
        <Swiper
          spaceBetween={15}
          slidesPerView={1}
          navigation
          autoplay={{ delay: 5500, disableOnInteraction: false }}
          breakpoints={{
            480: { slidesPerView: 1.2 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1200: { slidesPerView: 6 },
          }}
          modules={[Autoplay, Navigation]}
          className="mySwiper"
        >
          {filteredProducts().map((product, ind) => (
            <SwiperSlide key={ind}>
              <ProductCard>
                <CardMedia
                  component="img"
                  height="200"
                  image={
                    product?.ProductPictures?.length
                      ? product.ProductPictures[0]?.url ||
                        `${BASE_URL}/${product.ProductPictures[0]}`
                      : "fallback-image.jpg"
                  }
                  alt={product.ProductName}
                  className="newProductImage"
                />
                {renderLabel(toggle)}

                <CardContent>
                  {/* <ProductTitle>{product.ProductName}</ProductTitle> */}
                  <Rating name="read-only" value={5} readOnly />
                </CardContent>

                <div className="d-flex justify-content-between align-items-center px-3 pb-3">
                  <Shere
                    ProductId={product._id}
                    ProductName={product.ProductName}
                    ProductsCategoriesMappings={product.ProductsCategoriesMappings}
                  />
                  <SeeMore
                    to={`${Config.WEBSITE_IBASE_URL}product-details/${
                      product._id
                    }/${
                      product.ProductsCategoriesMappings?.map((cat) =>
                        replaceWhiteSpacesWithDashSymbolInUrl(cat.Name)
                      ).join("-") ?? "shop"
                    }/${replaceWhiteSpacesWithDashSymbolInUrl(product.ProductName)}`}
                  >
                    See More →
                  </SeeMore>
                </div>
              </ProductCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
