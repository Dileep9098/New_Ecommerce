import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { getAllSubCategory } from "../../Store/Feature/category/categorySlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "./HomePageStyle.css";
const BASE_URL = import.meta.env.VITE_IMG_URL;

export default function ShowcategoryHome() {
    const { childCategories } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSubCategory());
  }, [dispatch]);
  return (
    <>
       {childCategories && childCategories.length > 0 ? (
            <Swiper
              modules={[Autoplay]}
              spaceBetween={20}
              slidesPerView={2}
              loop={true}
              speed={2500}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
              }}
              allowTouchMove={false}
              breakpoints={{
                376: { slidesPerView: 3 },
                576: { slidesPerView: 3 },
                768: { slidesPerView: 3 },
                992: { slidesPerView: 4 },
                1200: { slidesPerView: 8 },
                1400: { slidesPerView: 8 },
              }}
              className="mySwiper continuous-slider"
            >
              {childCategories.map((item) => (
                <SwiperSlide key={item._id}>
                  <div className="item">
                    <Link
                      to={`/all-product/0/${item?._id}`}
                      className="text-decoration-none text-inherit"
                    >
                      <div className="card card-product border-0 bg-transparent text-center">
                        <div className="card-body p-3 d-flex flex-column align-items-center">
                          <div className="category-circle mb-2">
                            <img
                              src={`${BASE_URL}/category/${item.file}`}
                              alt={item.Name}
                              className="category-img"
                            />
                          </div>
                          <div className="fw-semibold category-name text-truncate">
                            {item.Name}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </SwiperSlide>


              ))}
            </Swiper>
          ) : (
            <p className="text-center text-muted">No categories found </p>
          )}
      
    </>
  )
}
