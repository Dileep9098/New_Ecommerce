

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Tooltip from "../../UI/Tooltip";
import axiosInstance from "../../ApiHendler/axiosInstance";
import Config from "../../Config/Config";
import { logoutUser } from "../../Store/Feature/auth/authSlice";
import { showSuccessMsg } from "../../utils/ShowMessages";

export default function SearchBar({setLogoUrl}) {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [searchBar, setSearchBar] = useState({
    placeholderText: "Search for products...",
    backgroundColor: "#ffffff",
    textColor: "#000000",
    borderColor: "#ced4da",
    status: "Active",
    logo: "assets/images/logo/freshcart-logo.svg",
    icons: [],
  });

  // 🧠 Fetch SearchBar Settings
  useEffect(() => {
    const tooltipTriggerList = Array.from(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.forEach((el) => new window.bootstrap.Tooltip(el));

    const fetchSettings = async () => {
      try {
        const response = await axiosInstance.get(
          Config.END_POINT_LIST["GET_THEME_SEARCHBAR"],
          { withCredentials: true }
        );

        if (response.data.success && response.data.setting) {
          const setting = response.data.setting;
          if (setting.status === "In Active") return setSearchBar({});
          setSearchBar(setting);
          setLogoUrl(`https://new-ecommerce-backend-nljz.onrender.com/uploads/searchbar/${setting.logo}`);
        }
      } catch (error) {
        console.error("Error fetching searchbar settings:", error);
      }
    };

    fetchSettings();
  }, []);

  // 🎨 Dynamic Style
  const topbarStyle = {
    background: searchBar.backgroundColor?.startsWith("linear-gradient")
      ? searchBar.backgroundColor
      : searchBar.backgroundColor,
    color: searchBar.textColor || "black",
  };

  // 🖼️ Logo Source
  const logoSrc = searchBar.logo?.startsWith("assets/")
    ? searchBar.logo
    : `https://new-ecommerce-backend-nljz.onrender.com/uploads/searchbar/${searchBar.logo}`;



    const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);
    
        useEffect(() => {
            const handleResize = () => {
                setIsMobile(window.innerWidth <= 991);
            };
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }, []);


        const { cart, TotalCartItems } = useSelector((state) => state.cart);
    const dispatch = useDispatch()
    const logout = () => {
        dispatch(logoutUser()).then((data) => {
            console.log(data.payload)
            if (data.payload.success) {
                showSuccessMsg(data.payload.message)
            }
        })
    }

    // Get the wishlist from localStorage

    const [wishListCount, setWishListCount] = useState(0)

    useEffect(() => {
        const wishilist = localStorage.getItem("customerWishList");

        if (wishilist) {
            const wishlistArray = JSON.parse(wishilist);
            const productCount = wishlistArray.length;
            setWishListCount(parseInt(productCount))

            console.log("Number of products in the wishlist:", productCount);
        } else {
            console.log("Wishlist is empty or doesn't exist.");
        }

    }, [wishListCount])

    
    const [search,setSearch]=useState("")
   
    const handleSearch = (e) => {
        e.preventDefault();
        if (search && search.length > 1) {
            const categoryId = 0;  // Example category_id
            const categoryName = "all-categories";  // Example category_name
            
            // Replace spaces with '+' in the search term
            const formattedSearchTerm = search.replace(/\s+/g, "+");
            
            // Create the correct URL with query parameters
            const url = `/all-product/${categoryId}/${categoryName}?SearchTerm=${formattedSearchTerm}`;
            // window.location.href = url;
            navigate(url);
            
        } else {
            showInfoMsg('Enter something to search');
        }
    };

  return (
    <div className="py-4" style={topbarStyle}>
      <div className="container">
        <div className="row w-100 align-items-center gx-lg-2 gx-0">
          {/* 🖼️ Logo */}
          <div className="col-xxl-3 col-lg-3 col-md-6 col-5">
            <Link className="navbar-brand d-none d-lg-block" to="/" style={{ width: "200px" }}>
              <img
                src={logoSrc}
                alt="Logo"
                style={{
                  height: "55px",
                  width: "auto",
                  objectFit: "contain",
                }}
              />
            </Link>

            {/* Mobile Logo */}
            <div className="d-flex justify-content-between d-lg-none">
              <Link className="navbar-brand" to="/">
                <img
                  src={logoSrc}
                  alt="Logo"
                  style={{ height: "45px", width: "auto", objectFit: "contain" }}
                />
              </Link>
            </div>
          </div>

          {/* 🔍 Search Input */}
          <div className="col-xxl-6 col-lg-6 d-none d-lg-block">
            <form onSubmit={handleSearch}>
              <div className="input-group">
                <input
                  className="form-control rounded"
                  type="search"
                  placeholder={searchBar.placeholderText || "Search for products..."}
                  style={{
                    background: "transparent",
                    color: searchBar.textColor,
                    borderColor: searchBar.borderColor,

                  }}
                  onChange={(e)=>setSearch(e.target.value)}
                  value={search}
                />
                <button
                  className="btn border-start-0 ms-n10 rounded-0 rounded-end"
                  type="button"
                  style={{ color: searchBar.textColor }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-search"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </button>
              </div>
            </form>
          </div>

          <div className="col-lg-3 col-xxl-3 text-end col-md-6 col-7">
            <div className="list-inline d-flex align-items-center justify-content-end gap-4">

              {Array.isArray(searchBar?.icons) && searchBar.icons.length > 0 ? (
                

                isMobile?(
                    <>
                     <Link
                    key={searchBar.icons[0]._id || index}
                    to={searchBar.icons[0].link || "#"}
                    className="text-muted position-relative"
                  >
                    <span dangerouslySetInnerHTML={{ __html: searchBar.icons[0].name }}   style={{ fontSize: "1.4rem" }}></span>
                    {searchBar.icons[0].link === "/my-wishlist" && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                        0
                      </span>
                    )}
                  </Link>

                     <Link
                    key={searchBar.icons[1]._id || index}
                    to={searchBar.icons[1].link || "#"}
                    className="text-muted position-relative"
                  >
                    <span dangerouslySetInnerHTML={{ __html: searchBar.icons[1].name }}   style={{ fontSize: "1.4rem" }}></span>
                    {searchBar.icons[1].link === "/my-wishlist" && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                        {wishListCount ?? 0}
                      </span>
                    )}
                  </Link>
                    
                    </>
                ):
                (
                    searchBar.icons.map((icon, index) => (
                  // <Link
                  //   key={icon._id || index}
                  //   to={icon.link || "#"}
                  //   className="text-muted position-relative"
                  // >
                  //   <span dangerouslySetInnerHTML={{ __html: icon.name }}   style={{ fontSize: "1.4rem" }}></span>
                  //   {icon.link === "/my-wishlist" && (
                  //     <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                  //      {wishListCount ?? 0}
                  //     </span>
                  //   )}
                  // </Link>

                  <a
    key={icon._id || index}
    href={icon.link || "#"}
    className="text-muted position-relative"
  >
    <span
      dangerouslySetInnerHTML={{ __html: icon.name }}
      style={{ fontSize: "1.4rem" }}
    ></span>

    {/* Wishlist badge */}
    {icon.link === "/my-wishlist" && (
      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
        {wishListCount ?? 0}
      </span>
    )}

    {/* Cart badge */}
    {icon.link === "/cart" && (
      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
        {TotalCartItems ?? 0}
      </span>
    )}
  </a>
                ))
                )

              ) : (
                <>
                 <div className="list-inline-item m  ">
                                    <Link
                                        className="text-muted position-relative"
                                        data-bs-toggle="offcanvas"
                                        data-bs-target="#offcanvasRight"
                                        to="#offcanvasExample"
                                        role="button"
                                        aria-controls="offcanvasRight" 
                                    >
                                        <span style={{ fontSize: "1.4rem" }}> 
                                            
                                       <i className="fa-solid fa-heart"></i>
                                        </span>
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                                            1<span className="visually-hidden">unread messages</span>
                                        </span>
                                    </Link>
                                </div>
                 <div className="list-inline-item   ">
                                    <Link
                                        className="text-muted position-relative"
                                        data-bs-toggle="offcanvas"
                                        data-bs-target="#offcanvasRight"
                                        to="#offcanvasExample"
                                        role="button"
                                        aria-controls="offcanvasRight"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={20}
                                            height={20}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="feather feather-shopping-bag"
                                        >
                                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                            <line x1={3} y1={6} x2={21} y2={6} />
                                            <path d="M16 10a4 4 0 0 1-8 0" />
                                        </svg>
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                                            1<span className="visually-hidden">unread messages</span>
                                        </span>
                                    </Link>
                                </div>
                </>
              )}

              {/* User / Login */}
              {user ? (
                <Tooltip text="Go to Profile" placement="top">
                  <Link to="/profile" className="text-muted">
                    <i className="fa-regular fa-user fs-5"></i>
                  </Link>
                </Tooltip>
              ) : (
                <Link
                  to="#!"
                  className="text-muted"
                  data-bs-toggle="modal"
                  data-bs-target="#userModal"
                >
                  <i className="fa-regular fa-user fs-5"></i>
                </Link>
              )}

              {/* Mobile Menu Toggle */}
              <div className="list-inline-item d-inline-block d-lg-none">
                                    {/* Button */}
                                    <button
                                        className="navbar-toggler collapsed"
                                        type="button"
                                        data-bs-toggle="offcanvas"
                                        data-bs-target="#navbar-default"
                                        aria-controls="navbar-default"
                                        aria-label="Toggle navigation"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={32}
                                            height={32}
                                            fill="currentColor"
                                            className="bi bi-text-indent-left text-primary"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm.646 2.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L4.293 8 2.646 6.354a.5.5 0 0 1 0-.708zM7 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm-5 3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                                        </svg>
                                    </button>
                                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// import React, { useEffect } from 'react'
// import { useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'
// import Tooltip from '../../UI/Tooltip';

// export default function SerachBar() {
//     const { user, error, isLoading, isAuthentication } = useSelector((state) => state.auth)
// useEffect(() => {
//     const tooltipTriggerList = Array.from(
//       document.querySelectorAll('[data-bs-toggle="tooltip"]')
//     );
//     tooltipTriggerList.forEach((el) => {
//       new window.bootstrap.Tooltip(el);
//     });
//   }, []);
//     return (
//         <>
//             <div className="py-5">
//                 <div className="container">
//                     <div className="row w-100 align-items-center gx-lg-2 gx-0">
//                         <div className="col-xxl-2 col-lg-3 col-md-6 col-5">
//                             <Link className="navbar-brand d-none d-lg-block" to="index.html">
//                                 <img
//                                     src="assets/images/logo/freshcart-logo.svg"
//                                     alt="eCommerce HTML Template"
//                                 />
//                             </Link>
//                             <div className="d-flex justify-content-between w-100 d-lg-none">
//                                 <Link className="navbar-brand" to="index.html">
//                                     <img
//                                         src="assets/images/logo/freshcart-logo.svg"
//                                         alt="eCommerce HTML Template"
//                                     />
//                                 </Link>
//                             </div>
//                         </div>
//                         <div className="col-xxl-5 col-lg-5 d-none d-lg-block">
//                             <form action="#">
//                                 <div className="input-group">
//                                     <input
//                                         className="form-control rounded"
//                                         type="search"
//                                         placeholder="Search for products"
//                                     />
//                                     <span className="input-group-append">
//                                         <button
//                                             className="btn bg-white border border-start-0 ms-n10 rounded-0 rounded-end"
//                                             type="button"
//                                         >
//                                             <svg
//                                                 xmlns="http://www.w3.org/2000/svg"
//                                                 width={16}
//                                                 height={16}
//                                                 viewBox="0 0 24 24"
//                                                 fill="none"
//                                                 stroke="currentColor"
//                                                 strokeWidth={2}
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                                 className="feather feather-search"
//                                             >
//                                                 <circle cx={11} cy={11} r={8} />
//                                                 <line x1={21} y1={21} x2="16.65" y2="16.65" />
//                                             </svg>
//                                         </button>
//                                     </span>
//                                 </div>
//                             </form>
//                         </div>
//                         <div className="col-md-2 col-xxl-3 d-none d-lg-block">
//                             {/* Button trigger modal */}
//                             <button
//                                 type="button"
//                                 className="btn btn-outline-gray-400 text-muted"
//                                 data-bs-toggle="modal"
//                                 data-bs-target="#locationModal"
//                             >
//                                 <i className="feather-icon icon-map-pin me-2" />
//                                 Location
//                             </button>
//                         </div>
//                         <div className="col-lg-2 col-xxl-2 text-end col-md-6 col-7">
//                             <div className="list-inline">
//                                 <div className="list-inline-item me-5">
//                                     <Link
//                                         to="pages/shop-wishlist.html"
//                                         className="text-muted position-relative"
//                                     >
//                                         <svg
//                                             xmlns="http://www.w3.org/2000/svg"
//                                             width={20}
//                                             height={20}
//                                             viewBox="0 0 24 24"
//                                             fill="none"
//                                             stroke="currentColor"
//                                             strokeWidth={2}
//                                             strokeLinecap="round"
//                                             strokeLinejoin="round"
//                                             className="feather feather-heart"
//                                         >
//                                             <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
//                                         </svg>
//                                         <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
//                                             5<span className="visually-hidden">unread messages</span>
//                                         </span>
//                                     </Link>
//                                 </div>

//                                 <div className="list-inline-item me-5  ">
//                                     <Link
//                                         className="text-muted position-relative"
//                                         data-bs-toggle="offcanvas"
//                                         data-bs-target="#offcanvasRight"
//                                         to="#offcanvasExample"
//                                         role="button"
//                                         aria-controls="offcanvasRight"
//                                     >
//                                         <svg
//                                             xmlns="http://www.w3.org/2000/svg"
//                                             width={20}
//                                             height={20}
//                                             viewBox="0 0 24 24"
//                                             fill="none"
//                                             stroke="currentColor"
//                                             strokeWidth={2}
//                                             strokeLinecap="round"
//                                             strokeLinejoin="round"
//                                             className="feather feather-shopping-bag"
//                                         >
//                                             <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
//                                             <line x1={3} y1={6} x2={21} y2={6} />
//                                             <path d="M16 10a4 4 0 0 1-8 0" />
//                                         </svg>
//                                         <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
//                                             1<span className="visually-hidden">unread messages</span>
//                                         </span>
//                                     </Link>
//                                 </div>
                           
//                 {user ? (
//                   <div className="list-inline-item me-5 me-lg-0">
//                         <Tooltip text="Go to Profile" placement="top">

//                     <Link
//                       to="/profile"
//                       className=""
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width={20}
//                         height={20}
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth={2}
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         className="feather feather-user"
//                       >
//                         <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
//                         <circle cx={12} cy={7} r={4} />
//                       </svg>
//                     </Link>
//                     </Tooltip>
                    
//                   </div>
//                 ) : (
//                   <div className="list-inline-item me-5 me-lg-0">
//                     <Link
//                       to="#!"
//                       className="text-muted"
//                       data-bs-toggle="modal"
//                       data-bs-target="#userModal"
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width={20}
//                         height={20}
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth={2}
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         className="feather feather-user"
//                       >
//                         <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
//                         <circle cx={12} cy={7} r={4} />
//                       </svg>
//                     </Link>
//                   </div>
//                 )}

//                                 <div className="list-inline-item d-inline-block d-lg-none">
//                                     {/* Button */}
//                                     <button
//                                         className="navbar-toggler collapsed"
//                                         type="button"
//                                         data-bs-toggle="offcanvas"
//                                         data-bs-target="#navbar-default"
//                                         aria-controls="navbar-default"
//                                         aria-label="Toggle navigation"
//                                     >
//                                         <svg
//                                             xmlns="http://www.w3.org/2000/svg"
//                                             width={32}
//                                             height={32}
//                                             fill="currentColor"
//                                             className="bi bi-text-indent-left text-primary"
//                                             viewBox="0 0 16 16"
//                                         >
//                                             <path d="M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm.646 2.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L4.293 8 2.646 6.354a.5.5 0 0 1 0-.708zM7 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm-5 3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
//                                         </svg>
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//         </>
//     )
// }
