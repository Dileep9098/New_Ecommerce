// import React from 'react'
// import ReactImageMagnify from "react-image-magnify"

// export default function ProductDetailsImages(props) {

//     return (
//         <>
//             <ReactImageMagnify
//                 {...{
//                     smallImage: {
//                         alt: "product",
//                         isFluidWidth: true,
//                         src: "",
//                         width: 400,
//                         height: 400
//                     },
//                     largeImage: {
//                         src: "",
//                         width: 1200,
//                         height: 1200
//                     },
//                     enlargedImageContainerStyle: {
//                         position: 'absolute',
//                         zIndex: 1000,
//                         overflow: 'hidden',
//                         width: 'auto',
//                         height: 'auto'
//                     },
//                     shouldUsePositiveSpaceLens: true,
//                     className: 'react-image-magnify'
//                 }}
//             />
//         </>
//     )
// }



// import React, { useEffect, useRef, useState } from "react";
// import Slider from "react-slick";
// import { Row, Col } from "reactstrap";
// import Config from "../../../helpers/Config";
// // import { getFileExtensionNameFromPath } from "../../../helpers/ConversionHelper";
// import ReactImageMagnify from "react-image-magnify";
// // import "./modifyImage.css"
// const ProductDetailsImages = (props) => {
//     const slider1 = useRef(null);
//     const slider2 = useRef(null);
//     const [state, setState] = useState({ nav1: null, nav2: null });
//     const [imagesList, setImagesList] = useState([]);
//     const [selectedImageIndex, setSelectedImageIndex] = useState(0);
//     // const [adminPanelBaseURL] = useState(Config['ADMIN_BASE_URL']);

//     useEffect(() => {
//         setState({
//             nav1: slider1.current,
//             nav2: slider2.current,
//         });
//     }, []);

//     useEffect(() => {
//         const MakeImageList = () => {
//             let arrayData = [];
//             if (props.ProductDetailsImages && props.ProductDetailsImages.length > 0) {
//                 arrayData = props.ProductDetailsImages.map((image, i) => ({
//                     __typename: image.ProductPictures,
//                     alt: "product detail image " + i,
//                     src:   image.ProductPictures,
//                 }));
//             }
//             setImagesList(arrayData);
//         };

//         MakeImageList();
//     }, [props.ProductImages]);

//     const handleThumbnailClick = (index) => {
//         setSelectedImageIndex(index);
//         if (slider1.current) {
//             slider1.current.slickGoTo(index);
//         }
//     };
//     const isMobile = window.innerWidth < 1365;
//     const isMobile2 = window.innerWidth < 1050;

//     // Set small image dimensions based on screen size
//     const smallImageWidth = isMobile2 ? 280 : (isMobile ? 300 : 400);
//     const smallImageHeight = isMobile2 ? 280 : (isMobile ? 300 : 400);


//     return (
//         <>
//             <div className="container">
//                 <div className="row">
//                     <div className="col-12">
//                         {imagesList.length > 0 && (
//                             <>
//                                 <div className="show1">
//                                     <img src={imagesList[selectedImageIndex]?.src} className="img-fluid" />
//                                 </div>
//                                 <div className="show2">
//                                     <ReactImageMagnify
//                                         {...{
//                                             smallImage: {
//                                                 alt: imagesList[selectedImageIndex]?.alt,
//                                                 isFluidWidth: false, // Change to false if you want to set specific dimensions
//                                                 src: imagesList[selectedImageIndex]?.src,
//                                                 width: smallImageWidth, // Adjust width as needed
//                                                 height: smallImageHeight // Adjust height as needed
//                                             },
//                                             largeImage: {
//                                                 src: imagesList[selectedImageIndex]?.src,
//                                                 width: 1200,
//                                                 height: 1200
//                                             },
//                                             enlargedImageContainerStyle: {
//                                                 position: 'absolute',
//                                                 zIndex: 1000,
//                                                 overflow: 'hidden',
//                                                 width: 'auto',
//                                                 height: 'auto',
//                                             },
//                                             shouldUsePositiveSpaceLens: true,
//                                             className: 'react-image-magnify' // Add this line

//                                         }}
//                                     />
//                                 </div>
//                             </>

//                         )}
//                     </div>
//                 </div>
//             </div>
//             <Row>
//                 <Col>
//                     <Slider
//                         className="slider-nav"
//                         asNavFor={state.nav1}
//                         ref={slider2}
//                         slidesToShow={3}
//                         swipeToSlide={true}
//                         focusOnSelect={true}
//                         arrows={false}
//                         adaptiveHeight={true}
//                     >
//                         {imagesList.map((img, i) => (
//                             <div key={i} className="thumbnail">
//                                 <img
//                                     src={img.src}
//                                     alt={img.alt}
//                                     className="img-fluid"
//                                     onClick={() => handleThumbnailClick(i)}
//                                     style={{ cursor: 'pointer', height: "150px" }}
//                                 />
//                             </div>
//                         ))}
//                     </Slider>
//                 </Col>
//             </Row>
//         </>
//     );
// };

// export default ProductDetailsImages;



// import React, { useEffect, useRef, useState } from "react";
// import Slider from "react-slick";
// import { Row, Col } from "reactstrap";
// import ReactImageMagnify from "react-image-magnify";
// import "./modifyImage.css"
// // import "./prductDetails.css"

// const ProductDetailsImages = (props) => {
//     const slider1 = useRef(null);
//     const slider2 = useRef(null);
//     const [state, setState] = useState({ nav1: null, nav2: null });
//     const [imagesList, setImagesList] = useState([]);
//     const [selectedImageIndex, setSelectedImageIndex] = useState(0);

//     useEffect(() => {
//         setState({
//             nav1: slider1.current,
//             nav2: slider2.current,
//         });
//     }, []);

//     useEffect(() => {
//         const MakeImageList = () => {
//             let arrayData = [];
//             if (props.ProductDetailsImages && props.ProductDetailsImages.length > 0) {
//                 arrayData = props.ProductDetailsImages.map((filename, i) => ({
//                     alt: "product detail image " + i,
//                     src: `/image/products/${filename}`, 
//                 }));
//             }
//             setImagesList(arrayData);
//         };

//         MakeImageList();
//     }, [props.ProductDetailsImages]); 

//     const handleThumbnailClick = (index) => {
//         setSelectedImageIndex(index);
//         if (slider1.current) {
//             slider1.current.slickGoTo(index);
//         }
//     };

//     const isMobile = window.innerWidth < 1365;
//     const isMobile2 = window.innerWidth < 1050;

//     const smallImageWidth = isMobile2 ? 280 : (isMobile ? 300 : 400);
//     const smallImageHeight = isMobile2 ? 280 : (isMobile ? 300 : 400);

//     return (
//         <div className="container">
//             <div className="row">
//                 <div className="col-12">
//                     {imagesList.length > 0 && (
//                         <>
//                             <div className="show1">
//                                 <img src={imagesList[selectedImageIndex]?.src} className="img-fluid" />
//                             </div>
//                             <div className="show2">
//                                 <ReactImageMagnify
//                                     {...{
//                                         smallImage: {
//                                             alt: imagesList[selectedImageIndex]?.alt,
//                                             isFluidWidth: false,
//                                             src: imagesList[selectedImageIndex]?.src,
//                                             width: smallImageWidth,
//                                             height: smallImageHeight
//                                         },
//                                         largeImage: {
//                                             src: imagesList[selectedImageIndex]?.src,
//                                             width: 1200,
//                                             height: 1200
//                                         },
//                                         enlargedImageContainerStyle: {
//                                             position: 'absolute',
//                                             zIndex: 1000,
//                                             overflow: 'hidden',
//                                             width: 'auto',
//                                             height: 'auto',
//                                         },
//                                         shouldUsePositiveSpaceLens: true,
//                                         className: 'react-image-magnify'
//                                     }}
//                                 />
//                             </div>
//                         </>
//                     )}
//                 </div>
//             </div>

//             <Row>
//                 <Col>
//                     <Slider
//                         className="slider-nav mt-3 "
//                         asNavFor={state.nav1}
//                         ref={slider2}
//                         slidesToShow={3}
//                         swipeToSlide={true}
//                         focusOnSelect={true}
//                         arrows={false}
//                         adaptiveHeight={true}
//                     >
//                         {imagesList.map((img, i) => (
//                             <div key={i} className="thumbnail">
//                                 <img
//                                     src={img.src}
//                                     alt={img.alt}
//                                     className="img-fluid "
//                                     onClick={() => handleThumbnailClick(i)}
//                                     style={{ cursor: 'pointer', height: "150px", }}
//                                 />
//                             </div>
//                         ))}
//                     </Slider>
//                 </Col>
//             </Row>
//         </div>
//     );
// };

// export default ProductDetailsImages;

import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { Row, Col } from "reactstrap";
import ReactImageMagnify from "react-image-magnify";
import "./modifyImage.css";
const BASE_URL = import.meta.env.VITE_IMG_URL;

const ProductDetailsImages = (props) => {
    const slider1 = useRef(null);
    const slider2 = useRef(null);
    const [state, setState] = useState({ nav1: null, nav2: null });
    const [imagesList, setImagesList] = useState([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        setState({
            nav1: slider1.current,
            nav2: slider2.current,
        });
    }, []);

    useEffect(() => {
        const MakeImageList = () => {
            let arrayData = [];
            if (props.ProductDetailsImages && props.ProductDetailsImages.length > 0) {
                arrayData = props.ProductDetailsImages.map((filename, i) => ({
                    alt: "product detail image " + i,
                    src: filename.url ? filename.url : `${BASE_URL}/${filename}`, // Use the URL if available, otherwise construct it
                }));
            }
            setImagesList(arrayData);
        };

        MakeImageList();
    }, [props.ProductDetailsImages]);

    const handleThumbnailClick = (index) => {
        setSelectedImageIndex(index);
        if (slider1.current) {
            slider1.current.slickGoTo(index);
        }
    };

    // Resize listener for window width
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Dynamically adjust image size based on window width
    const getImageSize = (width) => {
        if (width < 600) {
            return { smallWidth: 200, smallHeight: 200, largeWidth: 600, largeHeight: 600 }; // Extra small screen
        } else if (width < 768) {
            return { smallWidth: 250, smallHeight: 250, largeWidth: 800, largeHeight: 800 }; // Small screens
        } else if (width < 1024) {
            return { smallWidth: 300, smallHeight: 300, largeWidth: 1000, largeHeight: 1000 }; // Medium screens
        } else {
            return { smallWidth: 500, smallHeight: 400, largeWidth: 1200, largeHeight: 1200 }; // Large screens
        }
    };

    const { smallWidth, smallHeight, largeWidth, largeHeight } = getImageSize(windowWidth);

    return (
        <>
            {imagesList.length > 0 && (
                <>
                    <div className="show1">
                        <img src={imagesList[selectedImageIndex]?.src} className="img-fluid" alt="Image " />
                    </div>
                    <div className="show2" style={{ width: '100%' }}>
                        <ReactImageMagnify
                            {...{
                                smallImage: {
                                    alt: imagesList[selectedImageIndex]?.alt,
                                    isFluidWidth: false,
                                    src: imagesList[selectedImageIndex]?.src,
                                    width: smallWidth,
                                    height: smallHeight,
                                },
                                largeImage: {
                                    src: imagesList[selectedImageIndex]?.src,
                                    width: largeWidth,
                                    height: largeHeight,
                                },
                                enlargedImageContainerDimensions: {
                                    width: "200%",
                                    height: "100%",
                                },
                                enlargedImageContainerStyle: {
                                    position: "absolute",
                                    zIndex: 1000,
                                    overflow: "hidden",
                                    width: "auto",
                                    height: "auto",
                                },
                                shouldUsePositiveSpaceLens: true,
                                className: "react-image-magnify",
                            }}
                        />
                    </div>
                </>
            )}

            <Row>
                <Col>
                    <Slider
                        className="slider-nav-productDetails custom-slider mt-3"
                        asNavFor={state.nav1}
                        ref={slider2}
                        slidesToShow={3}
                        swipeToSlide={true}
                        focusOnSelect={true}
                        arrows={false}
                        adaptiveHeight={true}
                    >
                        {imagesList.map((img, i) => (
                            <div key={i} className="thumbnail">
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    className="img-fluid"
                                    onClick={() => handleThumbnailClick(i)}
                                    style={{ cursor: "pointer", height: "100%" }}
                                />
                            </div>
                        ))}
                    </Slider>
                </Col>
            </Row>
        </>
    );
};

export default ProductDetailsImages;

