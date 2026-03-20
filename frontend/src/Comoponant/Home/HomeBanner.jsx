import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { useState } from 'react';
import { useEffect } from 'react';
import axiosInstance from '../../ApiHendler/axiosInstance';
import Config from '../../Config/Config';
import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default function HomeBanner() {
    const [allHomeBanner, setAllHomeBanner] = useState([])
    const [selectedBanner, setSelectedBanner] = useState()
    const swiperConfig = {
        modules: [Navigation, Pagination, Autoplay],
        navigation: true,
        pagination: { clickable: true },
        autoplay: { delay: 3000, disableOnInteraction: false },
        loop: true,
    };

    useEffect(() => {
        const fetchData = async () => {
            try {  
                const response = await axiosInstance.get(
                    Config.END_POINT_LIST["GET_ALL_HOME_BANNER"],
                    { withCredentials: true }
                );

                if (response.data.success) {
                    const banners = response.data.allHomeBanners;
                    setAllHomeBanner(banners);

                    // ✅ Yahan se bannerStyle set kar
                    if (banners.length > 0) {
                        // Example: agar sabka same style hai to pehla le le
                        setSelectedBanner(banners[0].bannerStyle);
                    }
                } else {
                    showErrorMsg(response.data.message);
                }
            } catch (error) {
                showErrorMsg(error.response?.data?.message || "Something went wrong");
            }
        };

        fetchData();
    }, []);

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);
    
        useEffect(() => {
            const handleResize = () => {
                setIsMobile(window.innerWidth <= 991);
            };
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }, []);

    console.log("hello bhai mere kaise hi tum", allHomeBanner)


    const renderPreview = (styleId) => {
        switch (styleId) {
            case "style2":
                // Tailwind Modern Center
                return (
                    <Swiper {...swiperConfig}>
                        {allHomeBanner?.map((b) => (
                            <SwiperSlide key={b._id}>
                                <div
                                    className="preview-slide flex items-center justify-center text-white text-center"
                                    style={{
                                        backgroundImage: `linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.5)), url(http://localhost:5000/uploads/banner/${b.file})`, backgroundSize: "cover",
                                              backgroundPosition: "center",
                                              borderRadius: "0.5rem",
                                              height: isMobile?"300px":"600px",
                                              backgroundRepeat:"no-repeat",

                                    }}
                                >
                                    <h5 className="fw-bold text-light">{b.mainTitle}</h5>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                );

            case "style3":
                // Dark Gradient bottom overlay
                return (
                    <Swiper {...swiperConfig}>
                        {allHomeBanner?.map((b) => (
                            <SwiperSlide key={b._id}>
                                <div
                                    className="preview-slide text-white d-flex align-items-end justify-content-center"
                                    style={{
                                        background: `linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.1)), url(http://localhost:5000/uploads/banner/${b.file}) center/cover`, backgroundSize: "cover",
                                              backgroundPosition: "center",
                                              borderRadius: "0.5rem",
                                              height: isMobile?"300px":"600px",
                                              backgroundRepeat:"no-repeat",

                                    }}
                                >
                                    <p className="mb-10 fw-semibold ">{b.bottomTitle}</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                );

            case "style4":
                // Minimal Clean
                return (
                    <Swiper {...swiperConfig}>
                        {allHomeBanner.map((b) => (
                            <SwiperSlide key={b._id}>
                                <div
                                    className="preview-slide bg-light text-dark border d-flex align-items-center justify-content-center"
                                    style={{
                                        backgroundImage: `url(http://localhost:5000/uploads/banner/${b.file})`,
                                         backgroundSize: "cover",
                                              backgroundPosition: "center",
                                              borderRadius: "0.5rem",
                                              height: isMobile?"300px":"600px",
                                              backgroundRepeat:"no-repeat",

                                    }}
                                >
                                    <div className="bg-warning bg-opacity-75 rounded px-3 py-1 ">
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
                        {allHomeBanner.map((b) => (
                            <SwiperSlide key={b._id}>
                                <div
                                    className="preview-slide d-flex align-items-center justify-content-center text-white"
                                    style={{
                                        backgroundImage: `url(http://localhost:5000/uploads/banner/${b.file})`,
                                      backgroundPosition: "center",
                                              borderRadius: "0.5rem",
                                              height: isMobile?"300px":"600px",
                                              backgroundRepeat:"no-repeat",
                                    }}
                                >
                                    <div className="text-center">
                                   <h3 className="fw-bold text-shadow">{b.mainTitle}</h3>
                                       <h6 className="mb-10 fw-semibold text-shadow">{b.bottomTitle}</h6>


                                    </div>
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
                                        backgroundImage: `url(http://localhost:5000/uploads/banner/${b.file})`,
                                          backgroundPosition: "center",
                                              borderRadius: "0.5rem",
                                              height: isMobile?"300px":"600px",
                                              backgroundRepeat:"no-repeat",
                                    }}
                                >
                                    <div className="glass-card text-center text-white px-3 py-2 rounded mb-6">
                                        <h5 className="fw-bold mb-1">{b.mainTitle}</h5>
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
                                        background: `linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.5)), url(http://localhost:5000/uploads/banner/${b.file}) center/cover`,
                                        transform: "translateZ(0)",
                                        backgroundPosition: "center",
                                              borderRadius: "0.5rem",
                                              height: isMobile?"300px":"600px",
                                              backgroundRepeat:"no-repeat",
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
                                        background: `url(http://localhost:5000/uploads/banner/${b.file}) center/cover`,
                                       backgroundPosition: "center",
                                              borderRadius: "0.5rem",
                                              height: isMobile?"300px":"600px",
                                              backgroundRepeat:"no-repeat",
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
                                        backgroundImage: `url(http://localhost:5000/uploads/banner/${b.file})`,
                                        backgroundPosition: "center",
                                              borderRadius: "0.5rem",
                                              height: isMobile?"300px":"600px",
                                              backgroundRepeat:"no-repeat",
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
                                <div className="preview-slide d-flex flex-row align-items-center justify-content-between bg-light" style={{height: isMobile?"300px":"600px",}}>
                                    <div className="p-15 w-50">
                                       <span className="badge text-bg-warning">{b.topTitle}</span>
                                              <h2 className="text-dark display-5 fw-bold mt-4">{b.mainTitle}</h2>
                                              <p className="lead d-none d-md-block">
                                                  {b.bottomTitle}
                                              </p>
                                              <div className="d-flex  gap-2">
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
                                        {/* <button className="btn btn-primary btn-sm">Explore</button> */}
                                    </div>
                                    <div
                                        className="w-50 h-100"
                                        style={{
                                            background: `url(http://localhost:5000/uploads/banner/${b.file}) center/cover`,
                                            borderRadius: "0.5rem",
                                           backgroundPosition: "center",
                                              borderRadius: "0.5rem",
                                              height: isMobile?"300px":"600px",
                                              backgroundRepeat:"no-repeat",
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
                        {allHomeBanner?.map((b) => (
                            
                            <SwiperSlide>
                                      <div
                                          style={{
                                              backgroundImage: `url(http://localhost:5000/uploads/banner/${b.file})`,
                                              backgroundSize: "cover",
                                              backgroundPosition: "center",
                                              borderRadius: "0.5rem",
                                              height: isMobile?"300px":"600px",
                                              backgroundRepeat:"no-repeat",

                                          }}
                                          className="d-flex align-items-center"
                                      >
                                          <div className={`ps-lg-12 col-xxl-5 col-md-7 py-14 px-8 text-xs-center`}>
                                              <span className="badge text-bg-warning">{b.topTitle}</span>
                                              <h2 className="text-dark display-5 fw-bold mt-4">{b.mainTitle}</h2>
                                              <p className="lead d-none d-md-block">
                                                  {b.bottomTitle}
                                              </p>
                                              <div className="d-flex  gap-2">
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
            <section className="mt-3">
                <div className="container-fluid ">
                    <div className="slider-preview mb-2" style={{height:isMobile?"300px":"600px"}}>
                        {selectedBanner ? renderPreview(selectedBanner) : <p>Loading banner...</p>}
                    </div>
                </div>
            </section>
        </>
    )
}


// import React from 'react'

// export default function HomeBanner() {
//   return (
//     <>
      
//        <section className="mt-8">
//                           <div className="container">
//                               <Swiper
//                                   modules={[Navigation, Autoplay]}
//                                   navigation
//                                   autoplay={{ delay: 3000 }}
//                                   loop={true}
//                                   className="hero-slider"
//                               >
//                                   {/* Slide 1 */}
//                                   <SwiperSlide>
//                                       <div
//                                           style={{
//                                               background: "url(assets/images/slider/slide-1.jpg) no-repeat center",
//                                               backgroundSize: "cover",
//                                               borderRadius: "0.5rem",
//                                               height: "400px",
//                                           }}
//                                           className="d-flex align-items-center"
//                                       >
//                                           <div className="ps-lg-12 col-xxl-5 col-md-7 py-14 px-8 text-xs-center">
//                                               <span className="badge text-bg-warning">Opening Sale Discount 50%</span>
//                                               <h2 className="text-dark display-5 fw-bold mt-4">SuperMarket For Fresh Grocery</h2>
//                                               <p className="lead">
//                                                   Introduced a new model for online grocery shopping and convenient home delivery.
//                                               </p>
//                                               <a href="#!" className="btn btn-dark mt-3">
//                                                   Shop Now <i className="feather-icon icon-arrow-right ms-1" />
//                                               </a>
//                                           </div>
//                                       </div>
//                                   </SwiperSlide>
      
//                                   {/* Slide 2 */}
//                                   <SwiperSlide>
//                                       <div
//                                           style={{
//                                               background: "url(assets/images/slider/slider-2.jpg) no-repeat center",
//                                               backgroundSize: "cover",
//                                               borderRadius: "0.5rem",
//                                               height: "400px",
//                                           }}
//                                           className="d-flex align-items-center"
//                                       >
//                                           <div className="ps-lg-12 col-xxl-5 col-md-7 py-14 px-8 text-xs-center">
//                                               <span className="badge text-bg-warning">Free Shipping - orders over $100</span>
//                                               <h2 className="text-dark display-5 fw-bold mt-4">
//                                                   Free Shipping on <br /> orders over <span className="text-primary">$100</span>
//                                               </h2>
//                                               <p className="lead">
//                                                   Free Shipping to First-Time Customers Only, After promotions and discounts are applied.
//                                               </p>
//                                               <a href="#!" className="btn btn-dark mt-3">
//                                                   Shop Now <i className="feather-icon icon-arrow-right ms-1" />
//                                               </a>
//                                           </div>
//                                       </div>
//                                   </SwiperSlide>
//                               </Swiper>
//                           </div>
//                       </section>
//     </>
//   )
// }
