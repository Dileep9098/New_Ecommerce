import React from 'react'
import { Link } from 'react-router-dom';
import Config from '../../Config/Config';
import { replaceWhiteSpacesWithDashSymbolInUrl } from '../../utils/ConversionHelper';
const BASE_URL = import.meta.env.VITE_IMG_URL;

export default function DailyBestSells({ allProduct }) {
    return (
        <>
            <section className='bg-gray-100 py-6 my-4'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 mb-6">
                            {/* <h1 className="mb-0">Daily Best Sells</h1> */}
                            <div class="premium-heading">
                                <div class="lines top-line"></div>
                                <h1>Daily Best Sells</h1>
                                <div class="lines bottom-line"></div>
                                {/* <span class="view-all">View All →</span> */}
                            </div>
                        </div>
                    </div>
                    <div className="table-responsive-lg pb-6">
                        <div className="row row-cols-lg-4 row-cols-1 row-cols-md-2 g-4 flex-nowrap">
                            <div className="col">
                                <div
                                    className="pt-8 px-6 px-xl-8 rounded"
                                    style={{
                                        background:
                                            "url(assets/images/banner/b4.jpg) no-repeat",
                                        backgroundSize: "cover",
                                        height: 470
                                    }}
                                >
                                    <div>
                                        <h3 className="fw-bold text-white">
                                            Your Favorites Are Back with Big Savings.
                                        </h3>
                                        <p className="text-white">From daily essentials to trending must-haves, enjoy exciting discounts and limited-time offers you won’t want to miss.</p>
                                        <a href="#!" className="btn btn-primary">
                                            Shop Now
                                            <i className="feather-icon icon-arrow-right ms-1" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            {
                                allProduct.slice(0, 3).map((item, ind) => (
                                    <div className="col" key={ind}>
                                        <div className="card card-product">
                                            <div className="card-body">
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
                                                            className="mb-3 img-fluid" style={{ width: "100%", height: "250px" }}
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
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
