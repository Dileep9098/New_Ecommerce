import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Config from '../../Config/Config';
import axiosInstance from '../../ApiHendler/axiosInstance';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSubCategory } from '../../Store/Feature/category/categorySlice';
const BASE_URL = import.meta.env.VITE_IMG_URL;

export default function MainBar({logoUrl}) {

    const [mainBarSetting, setMainbarSetting] = useState()
    const [menuSetting, setMenuSettings] = useState()

     const { isLoading, childCategories } = useSelector((state) => state.category)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllSubCategory())
        // console.log(childCategories)

    }, [])

    useEffect(() => {
        const tooltipTriggerList = Array.from(
            document.querySelectorAll('[data-bs-toggle="tooltip"]')
        );
        tooltipTriggerList.forEach((el) => new window.bootstrap.Tooltip(el));

        const fetchSettings = async () => {
            try {
                const response = await axiosInstance.get(
                    Config.END_POINT_LIST["GET_MAIN_BAR_SETTINGS"],
                    { withCredentials: true }
                );
                const menuResponse= await axiosInstance.get(Config.END_POINT_LIST['GET_MENUS'],{withCredentials:true})


                if (response.data.success && response.data.settings) {
                    const settings = response.data.settings;
                    if (settings.status === "Inactive") return setMainbarSetting({});
                    setMainbarSetting(settings);
                }
                if (menuResponse.data.success && menuResponse.data.menus) {
                    const menus = menuResponse.data.menus;
                    if (menus.status === "Inactive") return setMenuSettings({});
                    setMenuSettings(menus);
                }            } catch (error) {
                console.error("Error fetching searchbar menus:", error);
            }
        };

        fetchSettings();
    }, []);

    console.log("sdlfhfdjkgh",menuSetting)
   const groupedMenus = menuSetting
  ?.filter(
    (menu) =>
      menu.type === "main" &&
      menu.status === "active" &&
      menu.title && menu.title.trim() !== "" 
  )
  .map((main) => ({
    ...main,
    subMenus: menuSetting.filter(
      (sub) =>
        sub.type === "sub" &&
        sub.status === "active" &&
        sub.parentMenu?._id === main._id
    ),
  }));



    return (
        <>
    

            <nav className="navbar navbar-expand-lg navbar-light navbar-default py-0 p-lg-4" aria-label="Offcanvas navbar large"
             style={{
    background: mainBarSetting?.backgroundColor || "#fff",
    color: mainBarSetting?.textColor || "#000",
    transition: "all 0.3s ease",
  }}>
                <div className="container">
                    <div className="offcanvas offcanvas-start" tabIndex={-1} id="navbar-default" aria-labelledby="navbar-defaultLabel"   >
                        <div className="offcanvas-header pb-1">
                            <Link to="/"  data-bs-dismiss="offcanvas"
                                aria-label="Close">
                                <img
                                    src={logoUrl||`${BASE_URL}/default-logo.png`}
                                    alt="eCommerce HTML Template"
                                     style={{
                  height: "55px",
                  width: "auto",
                  objectFit: "contain",
                }}
                                />
                            </Link>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="offcanvas"
                                aria-label="Close"
                            />
                        </div>
                        <div className="offcanvas-body">
                           
                            <div className="d-block d-lg-none mb-4">
                                <a
                                    className="btn btn-primary w-100 d-flex justify-content-center align-items-center"
                                    data-bs-toggle="collapse"
                                    href="#collapseExample"
                                    role="button"
                                    aria-expanded="false"
                                    aria-controls="collapseExample"
                                >
                                    <span className="me-2">

                                    </span>
                                    All Category
                                </a>

                                <div className="collapse mt-2" id="collapseExample">
                                    <div className="card card-body" style={{height:"250px",overflow:"auto"}}>
                                        <ul className="mb-0 list-unstyled" >
                                            
                                           
                                            {childCategories && childCategories.length > 0 &&
                                        childCategories.map((category, ind) => (
                                            <div key={ind}>
                                                {
                                                    category?.file ?
                                                        <li  data-bs-dismiss="offcanvas"
                                aria-label="Close" >
                                                            <Link to={`/all-product/0/${category?._id}`} className="dropdown-item" href="#">
                                                                <img src={`${BASE_URL}/category/${category?.file}`||`${BASE_URL}/${category?.file}`} alt={category?.Name} style={{ width: "50px", height: "50px", borderRadius: "50%", border: "2px solid gray", padding: "2px", marginLeft: "10px", marginRight: "20px" }} />
                                                                {category?.Name}
                                                            </Link>
                                                        </li>
                                                        : ""
                                                }

                                            </div>
                                        ))
                                    }
                                        </ul>
                                    </div>
                                </div>
                                
                            </div>
                            <div className="dropdown me-3 d-none d-lg-block">
                                <button className={`btn px-6 d-flex  ${mainBarSetting?.iconBgColor||"btn-primary"}`} style={{backgroundColor:` ${mainBarSetting?.iconBgColor||"btn-primary"}`,color:`${mainBarSetting?.textColor?mainBarSetting?.textColor:"text-light"}`}} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span className="me-2">
                                        <i className={mainBarSetting?.icon||"fa-solid fa-list"}></i>
                                    </span>
                                    All Category
                                </button>

                             <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{ height: "500px", overflow: "auto",width:"350px" }}>
                                    {childCategories && childCategories.length > 0 &&
                                        childCategories.map((category, ind) => (
                                            <div key={ind}>
                                                {
                                                    category?.file ?
                                                        <li >
                                                            <Link to={`/all-product/0/${category?._id}`} className="dropdown-item" href="#">
                                                                <img src={`${BASE_URL}/category/${category?.file}`||`${BASE_URL}/${category?.file}`} alt={category?.Name} style={{ width: "50px", height: "50px", borderRadius: "50%", border: "2px solid gray", padding: "2px", marginLeft: "10px", marginRight: "20px" }} />
                                                                {category?.Name}
                                                            </Link>
                                                        </li>
                                                        : ""
                                                }

                                            </div>
                                        ))
                                    }
                                </ul>

                            </div>

                            <div>
                                {
                                    menuSetting
                                    ?
                                    <ul className="navbar-nav align-items-center">
  {groupedMenus?.map((menu) => (
    <li
      key={menu._id}
      className={`nav-item ${menu.subMenus?.length > 0 ? "dropdown" : ""} me-4`}
    >
      {menu.subMenus?.length > 0 ? (
        <>
          <Link
            className="nav-link dropdown-toggle fs-5"
            to={menu.link || "#"}
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ color: mainBarSetting?.textColor || "#000" }}
          >
            {menu.title}
          </Link>
          <ul className="dropdown-menu">
            {menu.subMenus.map((sub) => (
              <li key={sub._id}>
                <Link className="dropdown-item" to={sub.link || "#"}>
                  {sub.title}
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <Link
          className="nav-link fs-5"
          to={menu.link || "#"}
          style={{ color: mainBarSetting?.textColor || "#000" }}
        >
          {menu.title}
        </Link>
      )}
    </li>
  ))}
</ul>

                                    :
                                
                                
                                <ul className="navbar-nav align-items-center">
                                    <li className="nav-item  me-4 "  data-bs-dismiss="offcanvas"
                                aria-label="Close" >
                                        <Link className="nav-link fs-5" to="/" role="button" style={{ color: mainBarSetting?.textColor || "#000"}} >
                                            Home
                                        </Link>
                                        
                                    </li> 
                                    <li className="nav-item  me-4 "  data-bs-dismiss="offcanvas"
                                aria-label="Close">
                                        <Link className="nav-link fs-5 " to="/about" role="button" style={{ color: mainBarSetting?.textColor || "#000"}} >
                                            About Us
                                        </Link>
                                        
                                    </li>
                                    <li className="nav-item  me-4 " data-bs-dismiss="offcanvas"
                                aria-label="Close" >
                                        <Link className="nav-link fs-5 " to="/all-product/0/all-categories" role="button" style={{ color: mainBarSetting?.textColor || "#000"}} >
                                            Shop
                                        </Link>
                                        
                                    </li>
                                    <li className="nav-item  me-4 "  data-bs-dismiss="offcanvas"
                                aria-label="Close" >
                                        <Link className="nav-link fs-5 " to="/blog" role="button" style={{ color: mainBarSetting?.textColor || "#000"}} >
                                            Blog
                                        </Link>
                                        
                                    </li>
                                    <li className="nav-item  me-4 "  data-bs-dismiss="offcanvas"
                                aria-label="Close">
                                        <Link className="nav-link fs-5 " to="/contact-us" role="button" style={{ color: mainBarSetting?.textColor || "#000"}} >
                                            Contact Us
                                        </Link>
                                        
                                    </li>
                                    
                                    
                                </ul>}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

        </>
    )
}









// <li className="nav-item dropdown w-100 w-lg-auto dropdown-fullwidth">
//                                         <a
//                                             className="nav-link dropdown-toggle"
//                                             href="#"
//                                             role="button"
//                                             data-bs-toggle="dropdown"
//                                             aria-expanded="false"
//                                         >
//                                             Mega menu
//                                         </a>
//                                         <div className="dropdown-menu pb-0">
//                                             <div className="row p-2 p-lg-4">
//                                                 <div className="col-lg-3 col-12 mb-4 mb-lg-0">
//                                                     <h6 className="text-primary ps-3">
//                                                         Dairy, Bread &amp; Eggs
//                                                     </h6>
//                                                     <a
//                                                         className="dropdown-item"
//                                                         href="pages/shop-grid.html"
//                                                     >
//                                                         Butter
//                                                     </a>
//                                                     <a
//                                                         className="dropdown-item"
//                                                         href="pages/shop-grid.html"
//                                                     >
//                                                         Milk Drinks
//                                                     </a>
//                                                     <a
//                                                         className="dropdown-item"
//                                                         href="pages/shop-grid.html"
//                                                     >
//                                                         Curd &amp; Yogurt
//                                                     </a>
//                                                     <a
//                                                         className="dropdown-item"
//                                                         href="pages/shop-grid.html"
//                                                     >
//                                                         Eggs
//                                                     </a>
//                                                     <a
//                                                         className="dropdown-item"
//                                                         href="pages/shop-grid.html"
//                                                     >
//                                                         Buns &amp; Bakery
//                                                     </a>
//                                                     <a
//                                                         className="dropdown-item"
//                                                         href="pages/shop-grid.html"
//                                                     >
//                                                         Cheese
//                                                     </a>
//                                                     <a
//                                                         className="dropdown-item"
//                                                         href="pages/shop-grid.html"
//                                                     >
//                                                         Condensed Milk
//                                                     </a>
//                                                     <a
//                                                         className="dropdown-item"
//                                                         href="pages/shop-grid.html"
//                                                     >
//                                                         Dairy Products
//                                                     </a>
//                                                 </div>
//                                                 <div className="col-lg-3 col-12 mb-4 mb-lg-0">
//                                                     <h6 className="text-primary ps-3">
//                                                         Breakfast &amp; Instant Food
//                                                     </h6>
//                                                     <a
//                                                         className="dropdown-item"
//                                                         href="pages/shop-grid.html"
//                                                     >
//                                                         Breakfast Cereal
//                                                     </a>
//                                                     <a
//                                                         className="dropdown-item"
//                                                         href="pages/shop-grid.html"
//                                                     >
//                                                         Noodles, Pasta &amp; Soup
//                                                     </a>
//                                                     <a
//                                                         className="dropdown-item"
//                                                         href="pages/shop-grid.html"
//                                                     >
//                                                         Frozen Veg Snacks
//                                                     </a>
//                                                     <a
//                                                         className="dropdown-item"
//                                                         href="pages/shop-grid.html"
//                                                     >
//                                                         Frozen Non-Veg Snacks
//                                                     </a>
//                                                     <a
//                                                         className="dropdown-item"
//                                                         href="pages/shop-grid.html"
//                                                     >
//                                                         Vermicelli
//                                                     </a>
//                                                     <a
//                                                         className="dropdown-item"
//                                                         href="pages/shop-grid.html"
//                                                     >
//                                                         Instant Mixes
//                                                     </a>
//                                                     <a
//                                                         className="dropdown-item"
//                                                         href="pages/shop-grid.html"
//                                                     >
//                                                         Batter
//                                                     </a>
//                                                     <a
//                                                         className="dropdown-item"
//                                                         href="pages/shop-grid.html"
//                                                     >
//                                                         Fruit and Juices
//                                                     </a>
//                                                 </div>
//                                                 <div className="col-lg-3 col-12 mb-4 mb-lg-0">
//                                                     <h6 className="text-primary ps-3">
//                                                         Cold Drinks &amp; Juices
//                                                     </h6>
//                                                     <a
//                                                         className="dropdown-item"
//                                                         href="pages/shop-grid.html"
//                                                     >
//                                                         Soft Drinks
//                                                     </a>
//                                                     <a
//                                                         className="dropdown-item"
//                                                         href="pages/shop-grid.html"
//                                                     >
//                                                         Fruit Juices
//                                                     </a>
//                                                     <a
//                                                         className="dropdown-item"
//                                                         href="pages/shop-grid.html"
//                                                     >
//                                                         Coldpress
//                                                     </a>
//                                                     <a
//                                                         className="dropdown-item"
//                                                         href="pages/shop-grid.html"
//                                                     >
//                                                         Water &amp; Ice Cubes
//                                                     </a>
//                                                     <a
//                                                         className="dropdown-item"
//                                                         href="pages/shop-grid.html"
//                                                     >
//                                                         Soda &amp; Mixers
//                                                     </a>
//                                                     <a
//                                                         className="dropdown-item"
//                                                         href="pages/shop-grid.html"
//                                                     >
//                                                         Health Drinks
//                                                     </a>
//                                                     <a
//                                                         className="dropdown-item"
//                                                         href="pages/shop-grid.html"
//                                                     >
//                                                         Herbal Drinks
//                                                     </a>
//                                                     <a
//                                                         className="dropdown-item"
//                                                         href="pages/shop-grid.html"
//                                                     >
//                                                         Milk Drinks
//                                                     </a>
//                                                 </div>
//                                                 <div className="col-lg-3 col-12 mb-4 mb-lg-0">
//                                                     <div className="card border-0">
//                                                         <img
//                                                             src="assets/images/banner/menu-banner.jpg"
//                                                             alt="eCommerce HTML Template"
//                                                             className="img-fluid"
//                                                         />
//                                                         <div className="position-absolute ps-6 mt-8">
//                                                             <h5 className="mb-0">
//                                                                 Dont miss this
//                                                                 <br />
//                                                                 offer today.
//                                                             </h5>
//                                                             <a href="#" className="btn btn-primary btn-sm mt-3">
//                                                                 Shop Now
//                                                             </a>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </li>
                                    
//                                     <li className="nav-item dropdown w-100 w-lg-auto">
//                                         <a
//                                             className="nav-link dropdown-toggle"
//                                             href="#"
//                                             role="button"
//                                             data-bs-toggle="dropdown"
//                                             aria-expanded="false"
//                                         >
//                                             Pages
//                                         </a>
//                                         <ul className="dropdown-menu">
//                                             <li>
//                                                 <a className="dropdown-item" href="pages/blog.html">
//                                                     Blog
//                                                 </a>
//                                             </li>
//                                             <li>
//                                                 <a
//                                                     className="dropdown-item"
//                                                     href="pages/blog-single.html"
//                                                 >
//                                                     Blog Single
//                                                 </a>
//                                             </li>
//                                             <li>
//                                                 <a
//                                                     className="dropdown-item"
//                                                     href="pages/blog-category.html"
//                                                 >
//                                                     Blog Category
//                                                 </a>
//                                             </li>
//                                             <li>
//                                                 <a className="dropdown-item" href="pages/about.html">
//                                                     About us
//                                                 </a>
//                                             </li>
//                                             <li>
//                                                 <a className="dropdown-item" href="pages/404error.html">
//                                                     404 Error
//                                                 </a>
//                                             </li>
//                                             <li>
//                                                 <a className="dropdown-item" href="pages/contact.html">
//                                                     Contact
//                                                 </a>
//                                             </li>
//                                         </ul>
//                                     </li>
//                                     <li className="nav-item dropdown w-100 w-lg-auto">
//                                         <a
//                                             className="nav-link dropdown-toggle"
//                                             href="#"
//                                             role="button"
//                                             data-bs-toggle="dropdown"
//                                             aria-expanded="false"
//                                         >
//                                             Account
//                                         </a>
//                                         <ul className="dropdown-menu">
//                                             <li>
//                                                 <a className="dropdown-item" href="pages/signin.html">
//                                                     Sign in
//                                                 </a>
//                                             </li>
//                                             <li>
//                                                 <a className="dropdown-item" href="pages/signup.html">
//                                                     Signup
//                                                 </a>
//                                             </li>
//                                             <li>
//                                                 <a
//                                                     className="dropdown-item"
//                                                     href="pages/forgot-password.html"
//                                                 >
//                                                     Forgot Password
//                                                 </a>
//                                             </li>
//                                             <li className="dropdown-submenu dropend">
//                                                 <a
//                                                     className="dropdown-item dropdown-list-group-item dropdown-toggle"
//                                                     href="#"
//                                                 >
//                                                     My Account
//                                                 </a>
//                                                 <ul className="dropdown-menu">
//                                                     <li>
//                                                         <a
//                                                             className="dropdown-item"
//                                                             href="pages/account-orders.html"
//                                                         >
//                                                             Orders
//                                                         </a>
//                                                     </li>
//                                                     <li>
//                                                         <a
//                                                             className="dropdown-item"
//                                                             href="pages/account-settings.html"
//                                                         >
//                                                             Settings
//                                                         </a>
//                                                     </li>
//                                                     <li>
//                                                         <a
//                                                             className="dropdown-item"
//                                                             href="pages/account-address.html"
//                                                         >
//                                                             Address
//                                                         </a>
//                                                     </li>
//                                                     <li>
//                                                         <a
//                                                             className="dropdown-item"
//                                                             href="pages/account-payment-method.html"
//                                                         >
//                                                             Payment Method
//                                                         </a>
//                                                     </li>
//                                                     <li>
//                                                         <a
//                                                             className="dropdown-item"
//                                                             href="pages/account-notification.html"
//                                                         >
//                                                             Notification
//                                                         </a>
//                                                     </li>
//                                                 </ul>
//                                             </li>
//                                         </ul>
//                                     </li>
//                                     <li className="nav-item w-100 w-lg-auto">
//                                         <a className="nav-link" href="dashboard/index.html">
//                                             Dashboard
//                                         </a>
//                                     </li>
//                                     <li className="nav-item dropdown w-100 w-lg-auto dropdown-flyout">
//                                         <a
//                                             className="nav-link"
//                                             href="#"
//                                             id="navbarDropdownDocs"
//                                             role="button"
//                                             data-bs-toggle="dropdown"
//                                             aria-haspopup="true"
//                                             aria-expanded="false"
//                                         >
//                                             Docs
//                                         </a>
//                                         <div
//                                             className="dropdown-menu dropdown-menu-lg"
//                                             aria-labelledby="navbarDropdownDocs"
//                                         >
//                                             <a
//                                                 className="dropdown-item align-items-start"
//                                                 href="docs/index.html"
//                                             >
//                                                 <div>
//                                                     <svg
//                                                         xmlns="http://www.w3.org/2000/svg"
//                                                         width={24}
//                                                         height={24}
//                                                         fill="currentColor"
//                                                         className="bi bi-file-text text-primary"
//                                                         viewBox="0 0 16 16"
//                                                     >
//                                                         <path d="M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1H5z" />
//                                                         <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
//                                                     </svg>
//                                                 </div>
//                                                 <div className="ms-3 lh-1">
//                                                     <h6 className="mb-1">Documentations</h6>
//                                                     <p className="mb-0 small">
//                                                         Browse the all documentation
//                                                     </p>
//                                                 </div>
//                                             </a>
//                                             <a
//                                                 className="dropdown-item align-items-start"
//                                                 href="docs/changelog.html"
//                                             >
//                                                 <div>
//                                                     <svg
//                                                         xmlns="http://www.w3.org/2000/svg"
//                                                         width={24}
//                                                         height={24}
//                                                         fill="currentColor"
//                                                         className="bi bi-layers text-primary"
//                                                         viewBox="0 0 16 16"
//                                                     >
//                                                         <path d="M8.235 1.559a.5.5 0 0 0-.47 0l-7.5 4a.5.5 0 0 0 0 .882L3.188 8 .264 9.559a.5.5 0 0 0 0 .882l7.5 4a.5.5 0 0 0 .47 0l7.5-4a.5.5 0 0 0 0-.882L12.813 8l2.922-1.559a.5.5 0 0 0 0-.882l-7.5-4zm3.515 7.008L14.438 10 8 13.433 1.562 10 4.25 8.567l3.515 1.874a.5.5 0 0 0 .47 0l3.515-1.874zM8 9.433 1.562 6 8 2.567 14.438 6 8 9.433z" />
//                                                     </svg>
//                                                 </div>
//                                                 <div className="ms-3 lh-1">
//                                                     <h6 className="mb-1">
//                                                         Changelog
//                                                         <span className="text-primary ms-1">v1.3.0</span>
//                                                     </h6>
//                                                     <p className="mb-0 small">See what's new</p>
//                                                 </div>
//                                             </a>
//                                         </div>
//                                     </li>