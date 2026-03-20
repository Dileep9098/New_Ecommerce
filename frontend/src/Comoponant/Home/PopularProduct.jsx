import React from 'react'
import { Link } from 'react-router-dom';
import Config from '../../Config/Config';
import { replaceWhiteSpacesWithDashSymbolInUrl } from '../../utils/ConversionHelper';
const BASE_URL = import.meta.env.VITE_IMG_URL;

export default function PopularProduct({ allProduct }) {
    console.log("Bhai mere kaisa  hai yrr tu", allProduct)
    return (
        <>
            <section className="my-lg-4 my-8 ">
                <div className="container-fluid px-lg-8">
                    <div className="row">
                        <div className="col-12">
                            <div class="premium-heading">
                                <div class="lines top-line"></div>
                                <h1>Popular Products</h1>
                                <div class="lines bottom-line"></div>
                                {/* <span class="view-all">View All →</span> */}
                            </div>

                        </div>

                    </div>
                    <div className="row g-4 row-cols-lg-6 row-cols-2 row-cols-md-3">
                        {
                            allProduct.map((item, ind) => (
                                <div className="col" key={ind}>
                                    <div className="card card-product mt-4 ">
                                        <div className="card-body " style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
                                            <div className="text-center position-relative">
                                                <div className="position-absolute top-0 start-0">
                                                    <span className="badge bg-success">
                                                        {item?.DiscountProductsMappings?.DiscountValue
                                                            ? `${item.DiscountProductsMappings.DiscountValue} %`
                                                            : ""}
                                                    </span>
                                                </div>
                                                <Link to={`product-details/${item._id}/${item.ProductsCategoriesMappings.map((category) => replaceWhiteSpacesWithDashSymbolInUrl(category.Name)).join('-') ?? "shop"}/${replaceWhiteSpacesWithDashSymbolInUrl(item.ProductName)}`}>
                                                    <img
                                                        src={
                                                            item?.ProductPictures?.length
                                                                ? `${BASE_URL}/${item.ProductPictures[0]}`
                                                                : 'fallback-image.jpg'
                                                        }
                                                        alt="Grocery Ecommerce Template"
                                                        className="mb-3 img-fluid" style={{ width: "100%", height: "200px" }}
                                                    />
                                                </Link>
                                                <div className="card-product-action">
                                                    <a
                                                        href="#!"
                                                        className="btn-action"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#quickViewModal"
                                                    >
                                                        <i
                                                            className="bi bi-eye"
                                                            data-bs-toggle="tooltip"
                                                            data-bs-html="true"
                                                            title="Quick View"
                                                        />
                                                    </a>
                                                    <a
                                                        href="pages/shop-wishlist.html"
                                                        className="btn-action"
                                                        data-bs-toggle="tooltip"
                                                        data-bs-html="true"
                                                        title="Wishlist"
                                                    >
                                                        <i className="bi bi-heart" />
                                                    </a>
                                                    <a
                                                        href="#!"
                                                        className="btn-action"
                                                        data-bs-toggle="tooltip"
                                                        data-bs-html="true"
                                                        title="Compare"
                                                    >
                                                        <i className="bi bi-arrow-left-right" />
                                                    </a>
                                                </div>
                                            </div>
                                            {/* <div className="text-small mb-1">
                                                <a href="#!" className="text-decoration-none text-muted">
                                                    <small>Bakery &amp; Biscuits</small>
                                                </a>
                                            </div> */}
                                            <h2 className="fs-6">
                                                <Link
                                                    href="pages/shop-single.html"
                                                    className="text-inherit text-decoration-none"
                                                >
                                                    {item.ProductName.slice(0, 55)}...
                                                </Link>
                                            </h2>
                                            <div className="text-warning">
                                                <small>
                                                    <i className="bi bi-star-fill" />
                                                    <i className="bi bi-star-fill" />
                                                    <i className="bi bi-star-fill" />
                                                    <i className="bi bi-star-fill" />
                                                    <i className="bi bi-star-half" />
                                                </small>
                                                <span className="text-muted small">4.5 (25)</span>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center mt-3">
                                                <div>
                                                    <p className="" style={{ color: "#020237", fontSize: "18px" }}> &#8377;{item.Price}<sub><del>{item.OldPrice}</del></sub> </p>
                                                </div>
                                                <div>
                                                    <a href="#!" className="btn btn-primary btn-sm">
                                                        <i class="bi bi-plus-lg me-2"></i>
                                                        Add
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                        {/* <div className="col">
                            <div className="card card-product">
                                <div className="card-body">
                                    <div className="text-center position-relative">
                                        <div className="position-absolute top-0 start-0">
                                            <span className="badge bg-success">14%</span>
                                        </div>
                                        <a href="pages/shop-single.html">
                                            <img
                                                src="assets/images/products/product-img-2.jpg"
                                                alt="Grocery Ecommerce Template"
                                                className="mb-3 img-fluid"
                                            />
                                        </a>
                                        <div className="card-product-action">
                                            <a
                                                href="#!"
                                                className="btn-action"
                                                data-bs-toggle="modal"
                                                data-bs-target="#quickViewModal"
                                            >
                                                <i
                                                    className="bi bi-eye"
                                                    data-bs-toggle="tooltip"
                                                    data-bs-html="true"
                                                    title="Quick View"
                                                />
                                            </a>
                                            <a
                                                href="pages/shop-wishlist.html"
                                                className="btn-action"
                                                data-bs-toggle="tooltip"
                                                data-bs-html="true"
                                                title="Wishlist"
                                            >
                                                <i className="bi bi-heart" />
                                            </a>
                                            <a
                                                href="#!"
                                                className="btn-action"
                                                data-bs-toggle="tooltip"
                                                data-bs-html="true"
                                                title="Compare"
                                            >
                                                <i className="bi bi-arrow-left-right" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="text-small mb-1">
                                        <a href="#!" className="text-decoration-none text-muted">
                                            <small>Bakery &amp; Biscuits</small>
                                        </a>
                                    </div>
                                    <h2 className="fs-6">
                                        <a
                                            href="pages/shop-single.html"
                                            className="text-inherit text-decoration-none"
                                        >
                                            NutriChoice Digestive
                                        </a>
                                    </h2>
                                    <div className="text-warning">
                                        <small>
                                            <i className="bi bi-star-fill" />
                                            <i className="bi bi-star-fill" />
                                            <i className="bi bi-star-fill" />
                                            <i className="bi bi-star-fill" />
                                            <i className="bi bi-star-half" />
                                        </small>
                                        <span className="text-muted small">4.5 (25)</span>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                        <div>
                                            <span className="text-dark">$24</span>
                                        </div>
                                        <div>
                                            <a href="#!" className="btn btn-primary btn-sm">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={16}
                                                    height={16}
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="feather feather-plus"
                                                >
                                                    <line x1={12} y1={5} x2={12} y2={19} />
                                                    <line x1={5} y1={12} x2={19} y2={12} />
                                                </svg>
                                                Add
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}



                    </div>
                </div>
            </section>
        </>
    )
}
