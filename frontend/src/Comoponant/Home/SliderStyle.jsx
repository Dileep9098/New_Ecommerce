// import React, { useState, useRef, useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import { Navigation, Autoplay } from "swiper/modules";

// export default function SliderStyle({allHomeBanner}) {
//     console.log("AllHomeBanner",allHomeBanner)

// const [isOpen, setIsOpen] = useState(true);
// const contentRef = useRef(null);

// const toggleAccordion1 = () => {
//     setIsOpen((prev) => !prev);
// };

// useEffect(() => {
//     if (contentRef.current) {
//         contentRef.current.style.maxHeight = isOpen
//             ? `${contentRef.current.scrollHeight}px`
//             : "0px";
//     }
// }, [isOpen]);

//     return (
//         <>

//             <div className="accordion1-header" onClick={toggleAccordion1}>
//                 <h5 className="mb-0 fw-semibold">Slider Style</h5>
//                 <span className={`accordion1-icon ${isOpen ? "rotate" : ""}`}>
//                     <i className="bi bi-chevron-down"></i>
//                 </span>
//             </div>

//             <div ref={contentRef} className="accordion1-body-wrapper">
//                 <div className="accordion1-body">
//                     <div className="container py-4 shadow-2xl rounded-4 mb-5">

//                         <section className="mt-8">
//                             <div className="container">
//                                 <Swiper modules={[Navigation, Autoplay]} navigation autoplay={{ delay: 3000 }} loop={true} className="hero-slider"  >
//                                     {/* Slide 1 */}
//                                     <SwiperSlide>
//                                         <div
//                                             style={{
//                                                 background: "url(assets/images/slider/slide-1.jpg) no-repeat center",
//                                                 backgroundSize: "cover",
//                                                 borderRadius: "0.5rem",
//                                                 height: "400px",
//                                             }}
//                                             className="d-flex align-items-center"
//                                         >
//                                             <div className="ps-lg-12 col-xxl-5 col-md-7 py-14 px-8 text-xs-center">
//                                                 <span className="badge text-bg-warning">Opening Sale Discount 50%</span>
//                                                 <h2 className="text-dark display-5 fw-bold mt-4">SuperMarket For Fresh Grocery</h2>
//                                                 <p className="lead">
//                                                     Introduced a new model for online grocery shopping and convenient home delivery.
//                                                 </p>
//                                                 <a href="#!" className="btn btn-dark mt-3">
//                                                     Shop Now <i className="feather-icon icon-arrow-right ms-1" />
//                                                 </a>
//                                             </div>
//                                         </div>
//                                     </SwiperSlide>

//                                     {/* Slide 2 */}
//                                     <SwiperSlide>
//                                         <div
//                                             style={{
//                                                 background: "url(assets/images/slider/slider-2.jpg) no-repeat center",
//                                                 backgroundSize: "cover",
//                                                 borderRadius: "0.5rem",
//                                                 height: "400px",
//                                             }}
//                                             className="d-flex align-items-center"
//                                         >
//                                             <div className="ps-lg-12 col-xxl-5 col-md-7 py-14 px-8 text-xs-center">
//                                                 <span className="badge text-bg-warning">Free Shipping - orders over $100</span>
//                                                 <h2 className="text-dark display-5 fw-bold mt-4">
//                                                     Free Shipping on <br /> orders over <span className="text-primary">$100</span>
//                                                 </h2>
//                                                 <p className="lead">
//                                                     Free Shipping to First-Time Customers Only, After promotions and discounts are applied.
//                                                 </p>
//                                                 <a href="#!" className="btn btn-dark mt-3">
//                                                     Shop Now <i className="feather-icon icon-arrow-right ms-1" />
//                                                 </a>
//                                             </div>
//                                         </div>
//                                     </SwiperSlide>
//                                 </Swiper>
//                             </div>
//                         </section>

//                     </div>
//                 </div>
//             </div>
//         </>


//     );
// }




// import React, { useState, useRef, useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import { Navigation, Autoplay } from "swiper/modules";

// export default function SliderStyle({ allHomeBanner }) {
//   const [isOpen, setIsOpen] = useState(true);
//   const contentRef = useRef(null);

//   const toggleAccordion1 = () => setIsOpen((prev) => !prev);

//   useEffect(() => {
//     if (contentRef.current) {
//       contentRef.current.style.maxHeight = isOpen
//         ? `${contentRef.current.scrollHeight}px`
//         : "0px";
//     }
//   }, [isOpen]);

//   return (
//     <>
//       {/* Accordion Header */}
//       <div className="accordion1-header" onClick={toggleAccordion1}>
//         <h5 className="mb-0 fw-semibold">Slider Style</h5>
//         <span className={`accordion1-icon ${isOpen ? "rotate" : ""}`}>
//           <i className="bi bi-chevron-down"></i>
//         </span>
//       </div>

//       {/* Accordion Body */}
//       <div ref={contentRef} className="accordion1-body-wrapper">
//         <div className="accordion1-body">
//           <div className="container py-4 shadow rounded-4 mb-5">
//             <section className="mt-4">
//               <Swiper
//                 modules={[Navigation, Autoplay]}
//                 navigation
//                 autoplay={{ delay: 4000, disableOnInteraction: false }}
//                 loop={true}
//                 className="hero-slider"
//               >
//                 {allHomeBanner && allHomeBanner.length > 0 ? (
//                   allHomeBanner.map((banner) => (
//                     <SwiperSlide key={banner._id}>
//                       <div
//                         style={{
//                           background: `url(https://new-ecommerce-backend-nljz.onrender.com/uploads/banner/${banner.file}) no-repeat center`,
//                           backgroundSize: "cover",
//                           borderRadius: "0.5rem",
//                           height: "450px",
//                         }}
//                         className="d-flex align-items-center"
//                       >
//                         <div className="ps-lg-12 col-xxl-5 col-md-7 py-14 px-8 text-xs-center">
//                           {banner.topTitle && (
//                             <span className="badge text-bg-warning">
//                               {banner.topTitle}
//                             </span>
//                           )}
//                           {banner.mainTitle && (
//                             <h2 className="text-dark display-5 fw-bold mt-4">
//                               {banner.mainTitle}
//                             </h2>
//                           )}
//                           {banner.bottomTitle && (
//                             <p className="lead">{banner.bottomTitle}</p>
//                           )}
//                           <div className="d-flex flex-wrap gap-2 mt-3">
//                             {banner.leftButtonText && (
//                               <a
//                                 href={banner.leftButtonUrl || "#"}
//                                 className="btn btn-dark"
//                               >
//                                 {banner.leftButtonText}
//                               </a>
//                             )}
//                             {banner.rightButtonText && (
//                               <a
//                                 href={banner.rightButtonUrl || "#"}
//                                 className="btn btn-outline-dark"
//                               >
//                                 {banner.rightButtonText}
//                               </a>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </SwiperSlide>
//                   ))
//                 ) : (
//                   <SwiperSlide>
//                     <div
//                       style={{
//                         height: "400px",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         background: "#f8f9fa",
//                         borderRadius: "0.5rem",
//                       }}
//                     >
//                       <h5 className="text-muted">No banners available</h5>
//                     </div>
//                   </SwiperSlide>
//                 )}
//               </Swiper>
//             </section>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./SliderStyleSelector.css";
import axiosInstance from "../../ApiHendler/axiosInstance";
import Config from "../../Config/Config";
import { showErrorMsg, showSuccessMsg } from "../../utils/ShowMessages";

export default function SliderStyleSelector({ allHomeBanner }) {
    const [isOpen, setIsOpen] = useState(true);
    const contentRef = useRef(null);

    const toggleAccordion1 = () => {
        setIsOpen((prev) => !prev);
    };

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.style.maxHeight = isOpen
                ? `${contentRef.current.scrollHeight}px`
                : "0px";
        }
    }, [isOpen]);
    const [selectedStyle, setSelectedStyle] = useState("style1");


    const styles = [
        { id: "style1", name: "Classic Bootstrap", desc: "Text Left + Buttons" },
        { id: "style2", name: "Tailwind Modern", desc: "Centered Overlay Text" },
        { id: "style3", name: "Dark Gradient", desc: "Bottom Gradient + White Text" },
        { id: "style4", name: "Minimal Clean", desc: "Subtle Minimal Banner" },
        { id: "style5", name: "Dots Showcase", desc: "Center Focus + Dots Pagination" },
        { id: "style6", name: "Glassmorphism", desc: "Blurred Card Over Image" },
        { id: "style7", name: "Parallax Motion", desc: "Smooth Parallax Animation" },
        { id: "style8", name: "Card Stack 3D", desc: "Flip / Stack Animation" },
        { id: "style9", name: "Blur Overlay", desc: "Elegant Blur Card Style" },
        { id: "style10", name: "Split Hero", desc: "Left Text + Right Image" },
    ];

    const swiperConfig = {
        modules: [Navigation, Pagination, Autoplay],
        navigation: true,
        pagination: { clickable: true },
        autoplay: { delay: 3000, disableOnInteraction: false },
        loop: true,
    };

    const handleSelect = async (id) => {

        setSelectedStyle(id);
        


        try {
            const response = await axiosInstance.put(`${Config.END_POINT_LIST["UPDATE_BANNER_STYLE"]}`, { id }, { withCredentials: true })

            if (response.data.success) {
                showSuccessMsg(response.data.message)
            }
        } catch (error) {
            showErrorMsg(error.response.data.message);


        }
    };

    const renderPreview = (styleId) => {
        switch (styleId) {
            case "style2":
                // Tailwind Modern Center
                return (
                    <Swiper {...swiperConfig}>
                        {allHomeBanner?.slice(0, 3).map((b) => (
                            <SwiperSlide key={b._id}>
                                <div
                                    className="preview-slide flex items-center justify-center text-white text-center"
                                    style={{
                                        backgroundImage: `linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.5)), url(https://new-ecommerce-backend-nljz.onrender.com/uploads/banner/${b.file})`,
                                    }}
                                >
                                    <h5 className="fw-bold">{b.mainTitle}</h5>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                );

            case "style3":
                // Dark Gradient bottom overlay
                return (
                    <Swiper {...swiperConfig}>
                        {allHomeBanner?.slice(0, 3).map((b) => (
                            <SwiperSlide key={b._id}>
                                <div
                                    className="preview-slide text-white d-flex align-items-end justify-content-center"
                                    style={{
                                        background: `linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.1)), url(https://new-ecommerce-backend-nljz.onrender.com/uploads/banner/${b.file}) center/cover`,
                                    }}
                                >
                                    <p className="mb-3 fw-semibold">{b.mainTitle}</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                );

            case "style4":
                // Minimal Clean
                return (
                    <Swiper {...swiperConfig}>
                        {allHomeBanner?.slice(0, 3).map((b) => (
                            <SwiperSlide key={b._id}>
                                <div
                                    className="preview-slide bg-light text-dark border d-flex align-items-center justify-content-center"
                                    style={{
                                        backgroundImage: `url(https://new-ecommerce-backend-nljz.onrender.com/uploads/banner/${b.file})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}
                                >
                                    <div className="bg-white bg-opacity-75 rounded px-3 py-1">
                                        <small>{b.topTitle}</small>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                );

            case "style5":
                // Dots + Center Focus
                return (
                    <Swiper {...swiperConfig} pagination={{ clickable: true }}>
                        {allHomeBanner?.slice(0, 3).map((b) => (
                            <SwiperSlide key={b._id}>
                                <div
                                    className="preview-slide d-flex align-items-center justify-content-center text-white"
                                    style={{
                                        backgroundImage: `url(https://new-ecommerce-backend-nljz.onrender.com/uploads/banner/${b.file})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}
                                >
                                    <h4 className="fw-bold text-shadow">{b.mainTitle}</h4>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                );

            case "style6":
                // Glassmorphism
                return (
                    <Swiper {...swiperConfig}>
                        {allHomeBanner?.slice(0, 3).map((b) => (
                            <SwiperSlide key={b._id}>
                                <div
                                    className="preview-slide position-relative"
                                    style={{
                                        backgroundImage: `url(https://new-ecommerce-backend-nljz.onrender.com/uploads/banner/${b.file})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}
                                >
                                    <div className="glass-card text-center text-white px-3 py-2 rounded">
                                        <h6 className="fw-bold mb-1">{b.mainTitle}</h6>
                                        <small>{b.bottomTitle}</small>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                );
            case "style7":
                return (
                    <Swiper
                        {...swiperConfig}
                        effect="fade"
                        speed={1500}
                        autoplay={{ delay: 3500 }}
                        parallax={true}
                    >
                        {allHomeBanner?.slice(0, 3).map((b) => (
                            <SwiperSlide key={b._id}>
                                <div
                                    className="preview-slide position-relative text-white d-flex flex-column justify-content-center align-items-center"
                                    style={{
                                        background: `linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.5)), url(https://new-ecommerce-backend-nljz.onrender.com/uploads/banner/${b.file}) center/cover`,
                                        transform: "translateZ(0)",
                                    }}
                                >
                                    <h3
                                        data-swiper-parallax="-200"
                                        className="fw-bold display-6 mb-2"
                                    >
                                        {b.mainTitle}
                                    </h3>
                                    <p data-swiper-parallax="-100" className="lead mb-0">
                                        {b.bottomTitle}
                                    </p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                );

            case "style8":
                return (
                    <Swiper
                        {...swiperConfig}
                        effect="cards"
                        grabCursor={true}
                        modules={[Navigation, Pagination, Autoplay]}
                        pagination={{ clickable: true }}
                    >
                        {allHomeBanner?.slice(0, 3).map((b) => (
                            <SwiperSlide key={b._id}>
                                <div
                                    className="preview-slide rounded-4 shadow-lg overflow-hidden"
                                    style={{
                                        background: `url(https://new-ecommerce-backend-nljz.onrender.com/uploads/banner/${b.file}) center/cover`,
                                        height: "300px",
                                    }}
                                >
                                    <div className="bg-dark bg-opacity-50 h-100 d-flex justify-content-center align-items-center text-white">
                                        <h4>{b.mainTitle}</h4>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                );
            case "style9":
                return (
                    <Swiper {...swiperConfig}>
                        {allHomeBanner?.slice(0, 3).map((b) => (
                            <SwiperSlide key={b._id}>
                                <div
                                    className="preview-slide position-relative d-flex justify-content-center align-items-center"
                                    style={{
                                        backgroundImage: `url(https://new-ecommerce-backend-nljz.onrender.com/uploads/banner/${b.file})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        filter: "brightness(0.7)",
                                    }}
                                >
                                    <div
                                        style={{
                                            backdropFilter: "blur(6px)",
                                            background: "rgba(255,255,255,0.2)",
                                            padding: "1rem 2rem",
                                            borderRadius: "10px",
                                        }}
                                        className="text-white text-center"
                                    >
                                        <h5 className="fw-bold">{b.mainTitle}</h5>
                                        <p className="small mb-0">{b.bottomTitle}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                );
            case "style10":
                return (
                    <Swiper {...swiperConfig}>
                        {allHomeBanner?.slice(0, 3).map((b) => (
                            <SwiperSlide key={b._id}>
                                <div className="preview-slide d-flex flex-row align-items-center justify-content-between bg-light">
                                    <div className="p-4 w-50">
                                        <h5 className="fw-bold">{b.mainTitle}</h5>
                                        <p>{b.bottomTitle}</p>
                                        <button className="btn btn-primary btn-sm">Explore</button>
                                    </div>
                                    <div
                                        className="w-50 h-100"
                                        style={{
                                            background: `url(https://new-ecommerce-backend-nljz.onrender.com/uploads/banner/${b.file}) center/cover`,
                                            borderRadius: "0.5rem",
                                            height: "250px",
                                        }}
                                    ></div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                );

            default:
                // Bootstrap Classic Left
                return (
                    <Swiper {...swiperConfig}>
                        {allHomeBanner?.slice(0, 3).map((b) => (
                            <SwiperSlide key={b._id}>
                                <div
                                    className="preview-slide d-flex align-items-center justify-content-start ps-3 text-white"
                                    style={{
                                        backgroundImage: `url(https://new-ecommerce-backend-nljz.onrender.com/uploads/banner/${b.file})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}
                                >
                                    <div>
                                        <span className="badge bg-warning text-dark">
                                            {b.topTitle}
                                        </span>
                                        <h6 className="fw-bold mt-2">{b.mainTitle}</h6>
                                        <div className="d-flex justify-content-center gap-2">
                                            {b.leftButtonText && (
                                                <a
                                                    href={b.leftButtonUrl}
                                                    className="btn btn-warning text-dark fw-bold"
                                                >
                                                    {b.leftButtonText}
                                                </a>
                                            )}
                                            {b.rightButtonText && (
                                                <a
                                                    href={b.rightButtonUrl}
                                                    className="btn btn-outline-light"
                                                >
                                                    {b.rightButtonText}
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                );
        }
    };

    return (
        <>
            <div className="accordion1-header" onClick={toggleAccordion1}>
                <h5 className="mb-0">Slider Style</h5>
                <span className={`accordion1-icon ${isOpen ? "rotate" : ""}`}>
                    <i className="bi bi-chevron-down"></i>
                </span>
            </div>

            <div ref={contentRef} className="accordion1-body-wrapper">
                <div className="accordion1-body">
                    <div className="container py-4 shadow-2xl rounded-4 mb-5">
                        <h2 className="fw mb-4">Choose Your Slider Style</h2>

                        <div className="row g-4">
                            {styles.map((s) => (
                                <div className="col-md-6 col-lg-6" key={s.id}>
                                    <div
                                        className={`style-card shadow-sm rounded-4 p-2 ${selectedStyle === s.id ? "active-style" : ""
                                            }`}
                                    >
                                        <div className="slider-preview mb-2">{renderPreview(s.id)}</div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <label className="fw-medium">{s.name}</label>
                                                <p className="small text-muted mb-0">{s.desc}</p>
                                            </div>
                                            <input
                                                type="radio"
                                                name="sliderStyle"
                                                value={s.id}
                                                checked={selectedStyle === s.id}
                                                onChange={() => handleSelect(s.id)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="text-center mt-4">
                            <h6 className="fw-semibold">
                                ✅ Selected Style:{" "}
                                <span className="text-primary">{selectedStyle}</span>
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
