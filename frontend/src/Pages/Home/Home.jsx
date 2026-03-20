import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import HomeBanner from '../../Comoponant/Home/HomeBanner';
import CategoryFeature from '../../Comoponant/Home/CategoryFeature';
import PopularProduct from '../../Comoponant/Home/PopularProduct';
import axiosInstance from '../../ApiHendler/axiosInstance';
import Config from '../../Config/Config';
import { showErrorMsg } from '../../utils/ShowMessages';
import HotDealBanner from '../../Comoponant/Home/HotDealBanner';
import DailyBestSells from '../../Comoponant/Home/DailyBestSells';
import GeneralInfo from '../../Comoponant/Home/GeneralInfo';
import CampaignSection from '../../Comoponant/Home/CompainingSection';
import NewProduct from '../../Comoponant/Home/NewProduct';
import ShowcategoryHome from '../../Comoponant/Home/ShowcategoryHome';
export default function Home() {

    const [allProduct, setAllProduct] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(Config.END_POINT_LIST["GET_ALL_PRODUCTS"], { withCredentials: true });
                if (response.data.success) {
                    setAllProduct(response.data.allProductsFeatures);
                } else {
                    showErrorMsg(response.data.message);
                }
            } catch (error) {
                showErrorMsg(error.response.data.message);
            }
        };
        fetchData();
    }, []);

    console.log("All Product get", allProduct)

    return (
        <>
        <ShowcategoryHome/>
            <HomeBanner />
            <PopularProduct allProduct={allProduct} />
            <CategoryFeature />
            <GeneralInfo />
            <HotDealBanner />
            <DailyBestSells allProduct={allProduct} />
            <CampaignSection />
            <NewProduct AllProducts={allProduct} />



        </>
    )
}
