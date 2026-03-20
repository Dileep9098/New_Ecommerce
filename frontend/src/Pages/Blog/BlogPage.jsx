import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axiosInstance from '../../ApiHendler/axiosInstance';
import Config from '../../Config/Config';
import { Link } from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_IMG_URL;
import { format } from 'date-fns';

export default function BlogPage() {
    const [AllBlogs, setAllBlogs] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState(4); // Control the number of blogs displayed
    const [allLatestProduct, setAllLatestProduct] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(Config.END_POINT_LIST["GET_ALL_BLOGS"], { withCredentials: true });
                const getAllLetestProduct = await axiosInstance.get(Config.END_POINT_LIST["GET_ALL_PRODUCTS"], { withCredentials: true });


                if (response.data.success) {
                    setAllBlogs(response.data.AllBlogs);
                }
                if (getAllLetestProduct.data.success) {
                    setAllLatestProduct(getAllLetestProduct.data.allProductsFeatures)

                } else {
                    showErrorMsg(response.data.message);
                }
            } catch (error) {
                showErrorMsg(error.response.data.message);
            }
        };
        fetchData();
    }, []);

    const loadMoreProducts = () => {
        setDisplayedProducts(displayedProducts + 4); // Load more blogs
    };




    const activeProducts = Array.isArray(allLatestProduct) ? allLatestProduct.filter(product => product.IsActive && product.MarkAsNew) : [];
    // console.log("Letest", activeProducts)





    return (
        <>

            {/* section */}
            <section className="mt-8">
                <div className="container">
                    <div className="row">
                        {/* logo */}
                        <div className="col-12">
                            <h1 className="fw-bold">Shop Blog</h1>

                        </div>
                    </div>
                </div>
            </section>
            <section className="mt-6 mb-lg-14 mb-8">
                <div className="container">
                    <div className="row d-flex align-items-center mb-8">
                        <div className="col-12 col-md-12 col-lg-8">
                            <a href="#!">
                                <div className="img-zoom"><img src={`${BASE_URL}/banner/${AllBlogs[0]?.file}`} alt="" className="img-fluid w-100" />
                                </div>
                            </a>
                        </div>
                        <div className="col-12 col-md-12 col-lg-4">
                            <div className="ps-lg-8 mt-8 mt-lg-0">
                                <h2 className="mb-3">
                                    <a href="#!" className="text-inherit">
                                       {AllBlogs[0]?.mainTitle}
                                    </a>
                                </h2>
                                <p>
                                   {AllBlogs[0]?.Descriptions.substring(0, 150)}...
                                </p>
                               {AllBlogs[0]?.createdAt && (
  <div className="d-flex justify-content-between text-muted">
    <span>
      <small>{format(new Date(AllBlogs[0].createdAt), 'PPP')}</small>
    </span>
    <span>
      <small>
        Read time:
        <span className="text-dark fw-bold">{format(new Date(AllBlogs[0].createdAt), 'hh:mm a')}</span>
      </small>
    </span>
  </div>
)}

                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {AllBlogs.slice(0, displayedProducts).map((item, ind) => (
                            item.IsActive === "true" && (

                                <div className="col-12 col-md-6 col-lg-3 mb-10">
                                    <div className="mb-4">
                                        <a href="#!">
                                            <div className="img-zoom">
                                                <img
                                                    src={`${BASE_URL}/banner/${item.file}`}
                                                    alt=""
                                                    className="img-fluid w-100"
                                                />
                                            </div>
                                        </a>
                                    </div>
                                    <div className="mb-3">
                                        <a href="#!">Recipes</a>
                                    </div>
                                    <div>
                                        <h2 className="h5">
                                            <Link to={item._id} className="text-inherit">
                                               {item.mainTitle}
                                            </Link>
                                        </h2>
                                        <p>
                                           {item.Descriptions.substring(0, 100)}...
                                        </p>
                                        <div className="d-flex justify-content-between text-muted mt-4">
                                            <span>
                                                <small> {format(new Date(item.createdAt), 'PPP')}</small>
                                            </span>
                                            <span>
                                                <small>
                                                    Read time:
                                                    <span className="text-dark fw-bold">{format(new Date(item?.createdAt), 'hh:mm a')}</span>
                                                </small>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )
                        ))}

                        {/* View More Button */}
                        {AllBlogs.length > displayedProducts && (
                            <div className="text-center">
                                <button onClick={loadMoreProducts} className="btn viewMore">
                                    View More <i className="ri-arrow-down-s-line"></i>
                                </button>
                            </div>
                        )}
                        <div className="col-12">
                            <nav>
                                {/* pagination */}
                                <ul className="pagination">
                                    <li className="page-item disabled">
                                        <a className="page-link mx-1" href="#" aria-label="Previous">
                                            <i className="feather-icon icon-chevron-left" />
                                        </a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link mx-1 active" href="#">
                                            1
                                        </a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link mx-1" href="#">
                                            2
                                        </a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link mx-1" href="#">
                                            ...
                                        </a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link mx-1" href="#">
                                            12
                                        </a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link mx-1" href="#" aria-label="Next">
                                            <i className="feather-icon icon-chevron-right" />
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}
