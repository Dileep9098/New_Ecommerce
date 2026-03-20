import React, { useEffect } from 'react'
import { useState } from 'react';

export default function Dash() {
   const [sidebarSize, setSidebarSize] = useState('condensed');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Handle window resize to change sidebar size
  const handleResize = () => {
    if (window.innerWidth <= 768) { // Mobile or smaller screens
      setSidebarSize('full');
    } else { // Larger screens
      setSidebarSize('condensed');
    }
    if(window.innerWidth>=1130){
      setSidebarSize('default');

    }
   
  };


  useEffect(() => {
    // Run once to set the initial sidebar size
    handleResize();
    // Attach the resize listener
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const htmlElement = document.documentElement;
    htmlElement.setAttribute('data-bs-theme', 'light');
    htmlElement.setAttribute('data-layout-mode', 'fluid');
    htmlElement.setAttribute('data-menu-color', 'dark');
    htmlElement.setAttribute('data-topbar-color', 'light');
    htmlElement.setAttribute('data-layout-position', 'fixed');
    htmlElement.setAttribute('data-sidenav-size', sidebarSize);  // Use sidebarSize dynamically
    // htmlElement.classList.add('sidebar-enable');
    htmlElement.classList.add('menuitem-active');

    // Adjust the class and attributes based on the sidebar size and open state
    if (isSidebarOpen) {
      // Use sidebarSize dynamically
      htmlElement.classList.add('sidebar-enable');
      if(sidebarSize==='full')
      {
       htmlElement.setAttribute('data-sidenav-size', "full");  
      }
      else if(window.innerWidth >= 768 && window.innerWidth<=1130 ){
        setSidebarSize('default');
      }
    else{
      // htmlElement.setAttribute('data-sidenav-size', "condensed");  
      setSidebarSize('condensed');
    }

    } else {
      htmlElement.classList.remove('sidebar-enable');
      if(window.innerWidth>=1130 ){
      setSidebarSize('default');
      }

      
    }
   
  }, [isSidebarOpen, sidebarSize]); 

  // Toggle sidebar visibility
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="wrapper">


        {/* <!-- ========== Topbar Start ========== --> */}
        <div className="navbar-custom">
          <div className="topbar container-fluid">
            <div className="d-flex align-items-center gap-lg-2 gap-1">

              <div className="logo-topbar">
                <a href="index.html" className="logo-light">
                  <span className="logo-lg">
                    <img src="assets1/images/logo.png" alt="logo"/>
                  </span>
                  <span className="logo-sm">
                    <img src="assets1/images/logo-sm.png" alt="small logo"/>
                  </span>
                </a>

                {/* <!-- Logo Dark --> */}
                <a href="index.html" className="logo-dark">
                  <span className="logo-lg">
                    <img src="assets1/images/logo-dark.png" alt="dark logo"/>
                  </span>
                  <span className="logo-sm">
                    <img src="assets1/images/logo-dark-sm.png" alt="small logo"/>
                  </span>
                </a>
              </div>

              <button className="button-toggle-menu" onClick={handleSidebarToggle}>
                <i className="mdi mdi-menu"></i>
              </button>

              <button className="navbar-toggle" data-bs-toggle="collapse" data-bs-target="#topnav-menu-content">
                <div className="lines">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </button>

              <div className="app-search dropdown d-none d-lg-block">
                <form>
                  <div className="input-group">
                    <input type="search" className="form-control dropdown-toggle" placeholder="Search..." id="top-search"/>
                      <span className="mdi mdi-magnify search-icon"></span>
                      <button className="input-group-text btn btn-primary" type="submit">Search</button>
                  </div>
                </form>

                <div className="dropdown-menu dropdown-menu-animated dropdown-lg" id="search-dropdown">
                
                  <div className="dropdown-header noti-title">
                    <h5 className="text-overflow mb-2">Found <span className="text-danger">17</span> results</h5>
                  </div>

                
                  <a href="#" className="dropdown-item notify-item">
                    <i className="uil-notes font-16 me-1"></i>
                    <span>Analytics Report</span>
                  </a>

                
                  <a href="#" className="dropdown-item notify-item">
                    <i className="uil-life-ring font-16 me-1"></i>
                    <span>How can I help you?</span>
                  </a>

                
                  <a href="#" className="dropdown-item notify-item">
                    <i className="uil-cog font-16 me-1"></i>
                    <span>User profile settings</span>
                  </a>

                
                  <div className="dropdown-header noti-title">
                    <h6 className="text-overflow mb-2 text-uppercase">Users</h6>
                  </div>

                  <div className="notification-list">
                  
                    <a href="#" className="dropdown-item notify-item">
                      <div className="d-flex">
                        <img className="d-flex me-2 rounded-circle" src="assets1/images/users/avatar-2.jpg" alt="Generic placeholder image" height="32"/>
                          <div className="w-100">
                            <h5 className="m-0 font-14">Erwin Brown</h5>
                            <span className="font-12 mb-0">UI Designer</span>
                          </div>
                      </div>
                    </a>

                  
                    <a href="#" className="dropdown-item notify-item">
                      <div className="d-flex">
                        <img className="d-flex me-2 rounded-circle" src="assets1/images/users/avatar-5.jpg" alt="Generic placeholder image" height="32"/>
                          <div className="w-100">
                            <h5 className="m-0 font-14">Jacob Deo</h5>
                            <span className="font-12 mb-0">Developer</span>
                          </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <ul className="topbar-menu d-flex align-items-center gap-3">
              <li className="dropdown d-lg-none">
                <a className="nav-link dropdown-toggle arrow-none" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                  <i className="ri-search-line font-22"></i>
                </a>
                <div className="dropdown-menu dropdown-menu-animated dropdown-lg p-0">
                  <form className="p-3">
                    <input type="search" className="form-control" placeholder="Search ..." aria-label="Recipient's username"/>
                  </form>
                </div>
              </li>

              <li className="dropdown">
                <a className="nav-link dropdown-toggle arrow-none" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                  <img src="assets1/images/flags/us.jpg" alt="user-image" className="me-0 me-sm-1" height="12"/>
                    <span className="align-middle d-none d-lg-inline-block">English</span> <i className="mdi mdi-chevron-down d-none d-sm-inline-block align-middle"></i>
                </a>
                <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated">

                
                  <a href="#" className="dropdown-item">
                    <img src="assets1/images/flags/germany.jpg" alt="user-image" className="me-1" height="12"/> <span className="align-middle">German</span>
                  </a>

                
                  <a href="#" className="dropdown-item">
                    <img src="assets1/images/flags/italy.jpg" alt="user-image" className="me-1" height="12"/> <span className="align-middle">Italian</span>
                  </a>

                
                  <a href="#" className="dropdown-item">
                    <img src="assets1/images/flags/spain.jpg" alt="user-image" className="me-1" height="12"/> <span className="align-middle">Spanish</span>
                  </a>

                
                  <a href="#" className="dropdown-item">
                    <img src="assets1/images/flags/russia.jpg" alt="user-image" className="me-1" height="12"/> <span className="align-middle">Russian</span>
                  </a>

                </div>
              </li>

              <li className="dropdown notification-list">
                <a className="nav-link dropdown-toggle arrow-none" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                  <i className="ri-notification-3-line font-22"></i>
                  <span className="noti-icon-badge"></span>
                </a>
                <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated dropdown-lg py-0">
                  <div className="p-2 border-top-0 border-start-0 border-end-0 border-dashed border">
                    <div className="row align-items-center">
                      <div className="col">
                        <h6 className="m-0 font-16 fw-semibold"> Notification</h6>
                      </div>
                      <div className="col-auto">
                        <a href="javascript: void(0);" className="text-dark text-decoration-underline">
                          <small>Clear All</small>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="px-2" style={{maxHeight: "300px"}} data-simplebar>

                    <h5 className="text-muted font-13 fw-normal mt-2">Today</h5>
                  

                    <a href="#" className="dropdown-item p-0 notify-item card unread-noti shadow-none mb-2">
                      <div className="card-body">
                        <span className="float-end noti-close-btn text-muted"><i className="mdi mdi-close"></i></span>
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0">
                            <div className="notify-icon bg-primary">
                              <i className="mdi mdi-comment-account-outline"></i>
                            </div>
                          </div>
                          <div className="flex-grow-1 text-truncate ms-2">
                            <h5 className="noti-item-title fw-semibold font-14">Datacorp <small className="fw-normal text-muted ms-1">1 min ago</small></h5>
                            <small className="noti-item-subtitle text-muted">Caleb Flakelar commented on Admin</small>
                          </div>
                        </div>
                      </div>
                    </a>

                  
                    <a href="#" className="dropdown-item p-0 notify-item card read-noti shadow-none mb-2">
                      <div className="card-body">
                        <span className="float-end noti-close-btn text-muted"><i className="mdi mdi-close"></i></span>
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0">
                            <div className="notify-icon bg-info">
                              <i className="mdi mdi-account-plus"></i>
                            </div>
                          </div>
                          <div className="flex-grow-1 text-truncate ms-2">
                            <h5 className="noti-item-title fw-semibold font-14">Admin <small className="fw-normal text-muted ms-1">1 hours ago</small></h5>
                            <small className="noti-item-subtitle text-muted">New user registered</small>
                          </div>
                        </div>
                      </div>
                    </a>

                    <h5 className="text-muted font-13 fw-normal mt-0">Yesterday</h5>

                  
                    <a href="#" className="dropdown-item p-0 notify-item card read-noti shadow-none mb-2">
                      <div className="card-body">
                        <span className="float-end noti-close-btn text-muted"><i className="mdi mdi-close"></i></span>
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0">
                            <div className="notify-icon">
                              <img src="assets1/images/users/avatar-2.jpg" className="img-fluid rounded-circle" alt="" />
                            </div>
                          </div>
                          <div className="flex-grow-1 text-truncate ms-2">
                            <h5 className="noti-item-title fw-semibold font-14">Cristina Pride <small className="fw-normal text-muted ms-1">1 day ago</small></h5>
                            <small className="noti-item-subtitle text-muted">Hi, How are you? What about our next meeting</small>
                          </div>
                        </div>
                      </div>
                    </a>

                    <h5 className="text-muted font-13 fw-normal mt-0">30 Dec 2021</h5>

                  
                    <a href="#" className="dropdown-item p-0 notify-item card read-noti shadow-none mb-2">
                      <div className="card-body">
                        <span className="float-end noti-close-btn text-muted"><i className="mdi mdi-close"></i></span>
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0">
                            <div className="notify-icon bg-primary">
                              <i className="mdi mdi-comment-account-outline"></i>
                            </div>
                          </div>
                          <div className="flex-grow-1 text-truncate ms-2">
                            <h5 className="noti-item-title fw-semibold font-14">Datacorp</h5>
                            <small className="noti-item-subtitle text-muted">Caleb Flakelar commented on Admin</small>
                          </div>
                        </div>
                      </div>
                    </a>

                  
                    <a href="#" className="dropdown-item p-0 notify-item card read-noti shadow-none mb-2">
                      <div className="card-body">
                        <span className="float-end noti-close-btn text-muted"><i className="mdi mdi-close"></i></span>
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0">
                            <div className="notify-icon">
                              <img src="assets1/images/users/avatar-4.jpg" className="img-fluid rounded-circle" alt="" />
                            </div>
                          </div>
                          <div className="flex-grow-1 text-truncate ms-2">
                            <h5 className="noti-item-title fw-semibold font-14">Karen Robinson</h5>
                            <small className="noti-item-subtitle text-muted">Wow ! this admin looks good and awesome design</small>
                          </div>
                        </div>
                      </div>
                    </a>

                    <div className="text-center">
                      <i className="mdi mdi-dots-circle mdi-spin text-muted h3 mt-0"></i>
                    </div>
                  </div>

                 
                  <a href="#" className="dropdown-item text-center text-primary notify-item border-top py-2">
                    View All
                  </a>

                </div>
              </li>

              <li className="dropdown d-none d-sm-inline-block">
                <a className="nav-link dropdown-toggle arrow-none" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                  <i className="ri-apps-2-line font-22"></i>
                </a>
                <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated dropdown-lg p-0">

                  <div className="p-2">
                    <div className="row g-0">
                      <div className="col">
                        <a className="dropdown-icon-item" href="#">
                          <img src="assets1/images/brands/slack.png" alt="slack"/>
                            <span>Slack</span>
                        </a>
                      </div>
                      <div className="col">
                        <a className="dropdown-icon-item" href="#">
                          <img src="assets1/images/brands/github.png" alt="Github"/>
                            <span>GitHub</span>
                        </a>
                      </div>
                      <div className="col">
                        <a className="dropdown-icon-item" href="#">
                          <img src="assets1/images/brands/dribbble.png" alt="dribbble"/>
                            <span>Dribbble</span>
                        </a>
                      </div>
                    </div>

                    <div className="row g-0">
                      <div className="col">
                        <a className="dropdown-icon-item" href="#">
                          <img src="assets1/images/brands/bitbucket.png" alt="bitbucket"/>
                            <span>Bitbucket</span>
                        </a>
                      </div>
                      <div className="col">
                        <a className="dropdown-icon-item" href="#">
                          <img src="assets1/images/brands/dropbox.png" alt="dropbox"/>
                            <span>Dropbox</span>
                        </a>
                      </div>
                      <div className="col">
                        <a className="dropdown-icon-item" href="#">
                          <img src="assets1/images/brands/g-suite.png" alt="G Suite"/>
                            <span>G Suite</span>
                        </a>
                      </div>
                    </div> 
                  </div>

                </div>
              </li>

              <li className="d-none d-sm-inline-block">
                <a className="nav-link" data-bs-toggle="offcanvas" href="#theme-settings-offcanvas">
                  <i className="ri-settings-3-line font-22"></i>
                </a>
              </li>

              <li className="d-none d-sm-inline-block">
                <div className="nav-link" id="light-dark-mode" data-bs-toggle="tooltip" data-bs-placement="left" title="Theme Mode">
                  <i className="ri-moon-line font-22"></i>
                </div>
              </li>


              <li className="d-none d-md-inline-block">
                <a className="nav-link" href="#" data-toggle="fullscreen">
                  <i className="ri-fullscreen-line font-22"></i>
                </a>
              </li>

              <li className="dropdown">
                <a className="nav-link dropdown-toggle arrow-none nav-user px-2" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                  <span className="account-user-avatar">
                    <img src="assets1/images/users/avatar-1.jpg" alt="user-image" width="32" className="rounded-circle"/>
                  </span>
                  <span className="d-lg-flex flex-column gap-1 d-none">
                    <h5 className="my-0">Dominic Keller</h5>
                    <h6 className="my-0 fw-normal">Founder</h6>
                  </span>
                </a>
                <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated profile-dropdown">
                
                  <div className=" dropdown-header noti-title">
                    <h6 className="text-overflow m-0">Welcome !</h6>
                  </div>

                
                  <a href="#" className="dropdown-item">
                    <i className="mdi mdi-account-circle me-1"></i>
                    <span>My Account</span>
                  </a>

                
                  <a href="#" className="dropdown-item">
                    <i className="mdi mdi-account-edit me-1"></i>
                    <span>Settings</span>
                  </a>

                
                  <a href="#" className="dropdown-item">
                    <i className="mdi mdi-lifebuoy me-1"></i>
                    <span>Support</span>
                  </a>

                
                  <a href="#" className="dropdown-item">
                    <i className="mdi mdi-lock-outline me-1"></i>
                    <span>Lock Screen</span>
                  </a>

                
                  <a href="#" className="dropdown-item">
                    <i className="mdi mdi-logout me-1"></i>
                    <span>Logout</span>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        {/* <!-- ========== Topbar End ========== --> */}

        {/* <!-- ========== Left Sidebar Start ========== --> */}
        <div className="leftside-menu" style={{overflow:"auto"}}>

         
          <a href="index.html" className="logo logo-light">
            <span className="logo-lg">
              <img src="assets1/images/logo.png" alt="logo"/>
            </span>
            <span className="logo-sm">
              <img src="assets1/images/logo-sm.png" alt="small logo"/>
            </span>
          </a>

         
          <a href="index.html" className="logo logo-dark">
            <span className="logo-lg">
              <img src="assets1/images/logo-dark.png" alt="dark logo"/>
            </span>
            <span className="logo-sm">
              <img src="assets1/images/logo-dark-sm.png" alt="small logo"/>
            </span>
          </a>

          <div className="button-sm-hover" data-bs-toggle="tooltip" data-bs-placement="right" title="Show Full Sidebar">
            <i className="ri-checkbox-blank-circle-line align-middle"></i>
          </div>

          <div className="button-close-fullsidebar">
            <i className="ri-close-fill align-middle"></i>
          </div>

          <div className="h-100" id="leftside-menu-container" data-simplebar>
            <div className="leftbar-user">
              <a href="pages-profile.html">
                <img src="assets1/images/users/avatar-1.jpg" alt="user-image" height="42" className="rounded-circle shadow-sm"/>
                  <span className="leftbar-user-name mt-2">Dominic Keller</span>
              </a>
            </div>

            <ul className="side-nav">

              <li className="side-nav-title">Navigation</li>

              <li className="side-nav-item">
                <a data-bs-toggle="collapse" href="#sidebarDashboards" aria-expanded="false" aria-controls="sidebarDashboards" className="side-nav-link">
                  <i className="uil-home-alt"></i>
                  <span className="badge bg-success float-end">5</span>
                  <span> Dashboards </span>
                </a>
                <div className="collapse" id="sidebarDashboards">
                  <ul className="side-nav-second-level">
                    <li>
                      <a href="dashboard-analytics.html">Analytics</a>
                    </li>
                    <li>
                      <a href="index.html">Ecommerce</a>
                    </li>
                    <li>
                      <a href="dashboard-projects.html">Projects</a>
                    </li>
                    <li>
                      <a href="dashboard-crm.html">CRM</a>
                    </li>
                    <li>
                      <a href="dashboard-wallet.html">E-Wallet</a>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="side-nav-title">Apps</li>

              <li className="side-nav-item">
                <a href="apps-calendar.html" className="side-nav-link">
                  <i className="uil-calender"></i>
                  <span> Calendar </span>
                </a>
              </li>

              <li className="side-nav-item">
                <a href="apps-chat.html" className="side-nav-link">
                  <i className="uil-comments-alt"></i>
                  <span> Chat </span>
                </a>
              </li>

              <li className="side-nav-item">
                <a data-bs-toggle="collapse" href="#sidebarCrm" aria-expanded="false" aria-controls="sidebarCrm" className="side-nav-link">
                  <i className="uil uil-tachometer-fast"></i>
                  <span className="badge bg-danger text-white float-end">New</span>
                  <span> CRM </span>
                </a>
                <div className="collapse" id="sidebarCrm">
                  <ul className="side-nav-second-level">
                    <li>
                      <a href="crm-projects.html">Projects</a>
                    </li>
                    <li>
                      <a href="crm-orders-list.html">Orders List</a>
                    </li>
                    <li>
                      <a href="crm-clients.html">Clients</a>
                    </li>
                    <li>
                      <a href="crm-management.html">Management</a>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="side-nav-item">
                <a data-bs-toggle="collapse" href="#sidebarEcommerce" aria-expanded="false" aria-controls="sidebarEcommerce" className="side-nav-link">
                  <i className="uil-store"></i>
                  <span> Ecommerce </span>
                  <span className="menu-arrow"></span>
                </a>
                <div className="collapse" id="sidebarEcommerce">
                  <ul className="side-nav-second-level">
                    <li>
                      <a href="apps-ecommerce-products.html">Products</a>
                    </li>
                    <li>
                      <a href="apps-ecommerce-products-details.html">Products Details</a>
                    </li>
                    <li>
                      <a href="apps-ecommerce-orders.html">Orders</a>
                    </li>
                    <li>
                      <a href="apps-ecommerce-orders-details.html">Order Details</a>
                    </li>
                    <li>
                      <a href="apps-ecommerce-customers.html">Customers</a>
                    </li>
                    <li>
                      <a href="apps-ecommerce-shopping-cart.html">Shopping Cart</a>
                    </li>
                    <li>
                      <a href="apps-ecommerce-checkout.html">Checkout</a>
                    </li>
                    <li>
                      <a href="apps-ecommerce-sellers.html">Sellers</a>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="side-nav-item">
                <a data-bs-toggle="collapse" href="#sidebarEmail" aria-expanded="false" aria-controls="sidebarEmail" className="side-nav-link">
                  <i className="uil-envelope"></i>
                  <span> Email </span>
                  <span className="menu-arrow"></span>
                </a>
                <div className="collapse" id="sidebarEmail">
                  <ul className="side-nav-second-level">
                    <li>
                      <a href="apps-email-inbox.html">Inbox</a>
                    </li>
                    <li>
                      <a href="apps-email-read.html">Read Email</a>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="side-nav-item">
                <a data-bs-toggle="collapse" href="#sidebarProjects" aria-expanded="false" aria-controls="sidebarProjects" className="side-nav-link">
                  <i className="uil-briefcase"></i>
                  <span> Projects </span>
                  <span className="menu-arrow"></span>
                </a>
                <div className="collapse" id="sidebarProjects">
                  <ul className="side-nav-second-level">
                    <li>
                      <a href="apps-projects-list.html">List</a>
                    </li>
                    <li>
                      <a href="apps-projects-details.html">Details</a>
                    </li>
                    <li>
                      <a href="apps-projects-gantt.html">Gantt <span className="badge rounded-pill bg-light text-dark font-10 float-end">New</span></a>
                    </li>
                    <li>
                      <a href="apps-projects-add.html">Create Project</a>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="side-nav-item">
                <a href="apps-social-feed.html" className="side-nav-link">
                  <i className="uil-rss"></i>
                  <span> Social Feed </span>
                </a>
              </li>

              <li className="side-nav-item">
                <a data-bs-toggle="collapse" href="#sidebarTasks" aria-expanded="false" aria-controls="sidebarTasks" className="side-nav-link">
                  <i className="uil-clipboard-alt"></i>
                  <span> Tasks </span>
                  <span className="menu-arrow"></span>
                </a>
                <div className="collapse" id="sidebarTasks">
                  <ul className="side-nav-second-level">
                    <li>
                      <a href="apps-tasks.html">List</a>
                    </li>
                    <li>
                      <a href="apps-tasks-details.html">Details</a>
                    </li>
                    <li>
                      <a href="apps-kanban.html">Kanban Board</a>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="side-nav-item">
                <a href="apps-file-manager.html" className="side-nav-link">
                  <i className="uil-folder-plus"></i>
                  <span> File Manager </span>
                </a>
              </li>

              <li className="side-nav-title">Custom</li>

              <li className="side-nav-item">
                <a data-bs-toggle="collapse" href="#sidebarPages" aria-expanded="false" aria-controls="sidebarPages" className="side-nav-link">
                  <i className="uil-copy-alt"></i>
                  <span> Pages </span>
                  <span className="menu-arrow"></span>
                </a>
                <div className="collapse" id="sidebarPages">
                  <ul className="side-nav-second-level">
                    <li>
                      <a href="pages-profile.html">Profile</a>
                    </li>
                    <li>
                      <a href="pages-profile-2.html">Profile 2</a>
                    </li>
                    <li>
                      <a href="pages-invoice.html">Invoice</a>
                    </li>
                    <li>
                      <a href="pages-faq.html">FAQ</a>
                    </li>
                    <li>
                      <a href="pages-pricing.html">Pricing</a>
                    </li>
                    <li>
                      <a href="pages-maintenance.html">Maintenance</a>
                    </li>
                    <li className="side-nav-item">
                      <a data-bs-toggle="collapse" href="#sidebarPagesAuth" aria-expanded="false" aria-controls="sidebarPagesAuth">
                        <span> Authentication </span>
                        <span className="menu-arrow"></span>
                      </a>
                      <div className="collapse" id="sidebarPagesAuth">
                        <ul className="side-nav-third-level">
                          <li>
                            <a href="pages-login.html">Login</a>
                          </li>
                          <li>
                            <a href="pages-login-2.html">Login 2</a>
                          </li>
                          <li>
                            <a href="pages-register.html">Register</a>
                          </li>
                          <li>
                            <a href="pages-register-2.html">Register 2</a>
                          </li>
                          <li>
                            <a href="pages-logout.html">Logout</a>
                          </li>
                          <li>
                            <a href="pages-logout-2.html">Logout 2</a>
                          </li>
                          <li>
                            <a href="pages-recoverpw.html">Recover Password</a>
                          </li>
                          <li>
                            <a href="pages-recoverpw-2.html">Recover Password 2</a>
                          </li>
                          <li>
                            <a href="pages-lock-screen.html">Lock Screen</a>
                          </li>
                          <li>
                            <a href="pages-lock-screen-2.html">Lock Screen 2</a>
                          </li>
                          <li>
                            <a href="pages-confirm-mail.html">Confirm Mail</a>
                          </li>
                          <li>
                            <a href="pages-confirm-mail-2.html">Confirm Mail 2</a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="side-nav-item">
                      <a data-bs-toggle="collapse" href="#sidebarPagesError" aria-expanded="false" aria-controls="sidebarPagesError">
                        <span> Error </span>
                        <span className="menu-arrow"></span>
                      </a>
                      <div className="collapse" id="sidebarPagesError">
                        <ul className="side-nav-third-level">
                          <li>
                            <a href="pages-404.html">Error 404</a>
                          </li>
                          <li>
                            <a href="pages-404-alt.html">Error 404-alt</a>
                          </li>
                          <li>
                            <a href="pages-500.html">Error 500</a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <a href="pages-starter.html">Starter Page</a>
                    </li>
                    <li>
                      <a href="pages-preloader.html">With Preloader</a>
                    </li>
                    <li>
                      <a href="pages-timeline.html">Timeline</a>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="side-nav-item">
                <a href="landing.html" target="_blank" className="side-nav-link">
                  <i className="uil-globe"></i>
                  <span className="badge text-bg-secondary float-end">New</span>
                  <span> Landing </span>
                </a>
              </li>

              <li className="side-nav-item">
                <a data-bs-toggle="collapse" href="#sidebarLayouts" aria-expanded="false" aria-controls="sidebarLayouts" className="side-nav-link">
                  <i className="uil-window"></i>
                  <span> Layouts </span>
                  <span className="menu-arrow"></span>
                </a>
                <div className="collapse" id="sidebarLayouts">
                  <ul className="side-nav-second-level">
                    <li>
                      <a href="layouts-horizontal.html" target="_blank">Horizontal</a>
                    </li>
                    <li>
                      <a href="layouts-detached.html" target="_blank">Detached</a>
                    </li>
                    <li>
                      <a href="layouts-full.html" target="_blank">Full View</a>
                    </li>
                    <li>
                      <a href="layouts-fullscreen.html" target="_blank">Fullscreen View</a>
                    </li>
                    <li>
                      <a href="layouts-hover.html" target="_blank">Hover Menu</a>
                    </li>
                    <li>
                      <a href="layouts-compact.html" target="_blank">Compact</a>
                    </li>
                    <li>
                      <a href="layouts-icon-view.html" target="_blank">Icon View</a>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="side-nav-title">Components</li>

              <li className="side-nav-item">
                <a data-bs-toggle="collapse" href="#sidebarBaseUI" aria-expanded="false" aria-controls="sidebarBaseUI" className="side-nav-link">
                  <i className="uil-box"></i>
                  <span> Base UI </span>
                  <span className="menu-arrow"></span>
                </a>
                <div className="collapse" id="sidebarBaseUI">
                  <ul className="side-nav-second-level">
                    <li>
                      <a href="ui-accordions.html">Accordions & Collapse</a>
                    </li>
                    <li>
                      <a href="ui-alerts.html">Alerts</a>
                    </li>
                    <li>
                      <a href="ui-avatars.html">Avatars</a>
                    </li>
                    <li>
                      <a href="ui-badges.html">Badges</a>
                    </li>
                    <li>
                      <a href="ui-breadcrumb.html">Breadcrumb</a>
                    </li>
                    <li>
                      <a href="ui-buttons.html">Buttons</a>
                    </li>
                    <li>
                      <a href="ui-cards.html">Cards</a>
                    </li>
                    <li>
                      <a href="ui-carousel.html">Carousel</a>
                    </li>
                    <li>
                      <a href="ui-dropdowns.html">Dropdowns</a>
                    </li>
                    <li>
                      <a href="ui-embed-video.html">Embed Video</a>
                    </li>
                    <li>
                      <a href="ui-grid.html">Grid</a>
                    </li>
                    <li>
                      <a href="ui-list-group.html">List Group</a>
                    </li>
                    <li>
                      <a href="ui-modals.html">Modals</a>
                    </li>
                    <li>
                      <a href="ui-notifications.html">Notifications</a>
                    </li>
                    <li>
                      <a href="ui-offcanvas.html">Offcanvas</a>
                    </li>
                    <li>
                      <a href="ui-placeholders.html">Placeholders</a>
                    </li>
                    <li>
                      <a href="ui-pagination.html">Pagination</a>
                    </li>
                    <li>
                      <a href="ui-popovers.html">Popovers</a>
                    </li>
                    <li>
                      <a href="ui-progress.html">Progress</a>
                    </li>
                    <li>
                      <a href="ui-ribbons.html">Ribbons</a>
                    </li>
                    <li>
                      <a href="ui-spinners.html">Spinners</a>
                    </li>
                    <li>
                      <a href="ui-tabs.html">Tabs</a>
                    </li>
                    <li>
                      <a href="ui-tooltips.html">Tooltips</a>
                    </li>
                    <li>
                      <a href="ui-links.html">Links</a>
                    </li>
                    <li>
                      <a href="ui-typography.html">Typography</a>
                    </li>
                    <li>
                      <a href="ui-utilities.html">Utilities</a>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="side-nav-item">
                <a data-bs-toggle="collapse" href="#sidebarExtendedUI" aria-expanded="false" aria-controls="sidebarExtendedUI" className="side-nav-link">
                  <i className="uil-package"></i>
                  <span> Extended UI </span>
                  <span className="menu-arrow"></span>
                </a>
                <div className="collapse" id="sidebarExtendedUI">
                  <ul className="side-nav-second-level">
                    <li>
                      <a href="extended-dragula.html">Dragula</a>
                    </li>
                    <li>
                      <a href="extended-range-slider.html">Range Slider</a>
                    </li>
                    <li>
                      <a href="extended-ratings.html">Ratings</a>
                    </li>
                    <li>
                      <a href="extended-scrollbar.html">Scrollbar</a>
                    </li>
                    <li>
                      <a href="extended-scrollspy.html">Scrollspy</a>
                    </li>
                    <li>
                      <a href="extended-treeview.html">Treeview</a>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="side-nav-item">
                <a href="widgets.html" className="side-nav-link">
                  <i className="uil-layer-group"></i>
                  <span> Widgets </span>
                </a>
              </li>

              <li className="side-nav-item">
                <a data-bs-toggle="collapse" href="#sidebarIcons" aria-expanded="false" aria-controls="sidebarIcons" className="side-nav-link">
                  <i className="uil-streering"></i>
                  <span> Icons </span>
                  <span className="menu-arrow"></span>
                </a>
                <div className="collapse" id="sidebarIcons">
                  <ul className="side-nav-second-level">
                    <li>
                      <a href="icons-remixicons.html">Remix Icons</a>
                    </li>
                    <li>
                      <a href="icons-mdi.html">Material Design</a>
                    </li>
                    <li>
                      <a href="icons-unicons.html">Unicons</a>
                    </li>
                    <li>
                      <a href="icons-lucide.html">Lucide</a>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="side-nav-item">
                <a data-bs-toggle="collapse" href="#sidebarCharts" aria-expanded="false" aria-controls="sidebarCharts" className="side-nav-link">
                  <i className="uil-chart"></i>
                  <span> Charts </span>
                  <span className="menu-arrow"></span>
                </a>
                <div className="collapse" id="sidebarCharts">
                  <ul className="side-nav-second-level">
                    <li className="side-nav-item">
                      <a data-bs-toggle="collapse" href="#sidebarApexCharts" aria-expanded="false" aria-controls="sidebarApexCharts">
                        <span> Apex Charts </span>
                        <span className="menu-arrow"></span>
                      </a>
                      <div className="collapse" id="sidebarApexCharts">
                        <ul className="side-nav-third-level">
                          <li>
                            <a href="charts-apex-area.html">Area</a>
                          </li>
                          <li>
                            <a href="charts-apex-bar.html">Bar</a>
                          </li>
                          <li>
                            <a href="charts-apex-bubble.html">Bubble</a>
                          </li>
                          <li>
                            <a href="charts-apex-candlestick.html">Candlestick</a>
                          </li>
                          <li>
                            <a href="charts-apex-column.html">Column</a>
                          </li>
                          <li>
                            <a href="charts-apex-heatmap.html">Heatmap</a>
                          </li>
                          <li>
                            <a href="charts-apex-line.html">Line</a>
                          </li>
                          <li>
                            <a href="charts-apex-mixed.html">Mixed</a>
                          </li>
                          <li>
                            <a href="charts-apex-timeline.html">Timeline</a>
                          </li>
                          <li>
                            <a href="charts-apex-boxplot.html">Boxplot</a>
                          </li>
                          <li>
                            <a href="charts-apex-treemap.html">Treemap</a>
                          </li>
                          <li>
                            <a href="charts-apex-pie.html">Pie</a>
                          </li>
                          <li>
                            <a href="charts-apex-radar.html">Radar</a>
                          </li>
                          <li>
                            <a href="charts-apex-radialbar.html">RadialBar</a>
                          </li>
                          <li>
                            <a href="charts-apex-scatter.html">Scatter</a>
                          </li>
                          <li>
                            <a href="charts-apex-polar-area.html">Polar Area</a>
                          </li>
                          <li>
                            <a href="charts-apex-sparklines.html">Sparklines</a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="side-nav-item">
                      <a data-bs-toggle="collapse" href="#sidebarChartJSCharts" aria-expanded="false" aria-controls="sidebarChartJSCharts">
                        <span> ChartJS </span>
                        <span className="menu-arrow"></span>
                      </a>
                      <div className="collapse" id="sidebarChartJSCharts">
                        <ul className="side-nav-third-level">
                          <li>
                            <a href="charts-chartjs-area.html">Area</a>
                          </li>
                          <li>
                            <a href="charts-chartjs-bar.html">Bar</a>
                          </li>
                          <li>
                            <a href="charts-chartjs-line.html">Line</a>
                          </li>
                          <li>
                            <a href="charts-chartjs-other.html">Other</a>
                          </li>

                        </ul>
                      </div>
                    </li>
                    <li>
                      <a href="charts-sparkline.html">Sparklines</a>
                    </li>
                    <li>
                      <a href="charts-brite.html">Britecharts</a>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="side-nav-item">
                <a data-bs-toggle="collapse" href="#sidebarForms" aria-expanded="false" aria-controls="sidebarForms" className="side-nav-link">
                  <i className="uil-document-layout-center"></i>
                  <span> Forms </span>
                  <span className="menu-arrow"></span>
                </a>
                <div className="collapse" id="sidebarForms">
                  <ul className="side-nav-second-level">
                    <li>
                      <a href="form-elements.html">Basic Elements</a>
                    </li>
                    <li>
                      <a href="form-advanced.html">Form Advanced</a>
                    </li>
                    <li>
                      <a href="form-validation.html">Validation</a>
                    </li>
                    <li>
                      <a href="form-wizard.html">Wizard</a>
                    </li>
                    <li>
                      <a href="form-fileuploads.html">File Uploads</a>
                    </li>
                    <li>
                      <a href="form-editors.html">Editors</a>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="side-nav-item">
                <a data-bs-toggle="collapse" href="#sidebarTables" aria-expanded="false" aria-controls="sidebarTables" className="side-nav-link">
                  <i className="uil-table"></i>
                  <span> Tables </span>
                  <span className="menu-arrow"></span>
                </a>
                <div className="collapse" id="sidebarTables">
                  <ul className="side-nav-second-level">
                    <li>
                      <a href="tables-basic.html">Basic Tables</a>
                    </li>
                    <li>
                      <a href="tables-datatable.html">Data Tables</a>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="side-nav-item">
                <a data-bs-toggle="collapse" href="#sidebarMaps" aria-expanded="false" aria-controls="sidebarMaps" className="side-nav-link">
                  <i className="uil-location-point"></i>
                  <span> Maps </span>
                  <span className="menu-arrow"></span>
                </a>
                <div className="collapse" id="sidebarMaps">
                  <ul className="side-nav-second-level">
                    <li>
                      <a href="maps-google.html">Google Maps</a>
                    </li>
                    <li>
                      <a href="maps-vector.html">Vector Maps</a>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="side-nav-item">
                <a data-bs-toggle="collapse" href="#sidebarMultiLevel" aria-expanded="false" aria-controls="sidebarMultiLevel" className="side-nav-link">
                  <i className="uil-folder-plus"></i>
                  <span> Multi Level </span>
                  <span className="menu-arrow"></span>
                </a>
                <div className="collapse" id="sidebarMultiLevel">
                  <ul className="side-nav-second-level">
                    <li className="side-nav-item">
                      <a data-bs-toggle="collapse" href="#sidebarSecondLevel" aria-expanded="false" aria-controls="sidebarSecondLevel">
                        <span> Second Level </span>
                        <span className="menu-arrow"></span>
                      </a>
                      <div className="collapse" id="sidebarSecondLevel">
                        <ul className="side-nav-third-level">
                          <li>
                            <a href="javascript: void(0);">Item 1</a>
                          </li>
                          <li>
                            <a href="javascript: void(0);">Item 2</a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="side-nav-item">
                      <a data-bs-toggle="collapse" href="#sidebarThirdLevel" aria-expanded="false" aria-controls="sidebarThirdLevel">
                        <span> Third Level </span>
                        <span className="menu-arrow"></span>
                      </a>
                      <div className="collapse" id="sidebarThirdLevel">
                        <ul className="side-nav-third-level">
                          <li>
                            <a href="javascript: void(0);">Item 1</a>
                          </li>
                          <li className="side-nav-item">
                            <a data-bs-toggle="collapse" href="#sidebarFourthLevel" aria-expanded="false" aria-controls="sidebarFourthLevel">
                              <span> Item 2 </span>
                              <span className="menu-arrow"></span>
                            </a>
                            <div className="collapse" id="sidebarFourthLevel">
                              <ul className="side-nav-forth-level">
                                <li>
                                  <a href="javascript: void(0);">Item 2.1</a>
                                </li>
                                <li>
                                  <a href="javascript: void(0);">Item 2.2</a>
                                </li>
                              </ul>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>


              <div className="help-box text-white text-center">
                <a href="javascript: void(0);" className="float-end close-btn text-white">
                  <i className="mdi mdi-close"></i>
                </a>
                <img src="assets1/images/svg/help-icon.svg" height="90" alt="Helper Icon Image" />
                <h5 className="mt-3">Unlimited Access</h5>
                <p className="mb-3">Upgrade to plan to get access to unlimited reports</p>
                <a href="javascript: void(0);" className="btn btn-secondary btn-sm">Upgrade</a>
              </div>


            </ul>

            <div className="clearfix"></div>
          </div>
        </div>
        {/* <!-- ========== Left Sidebar End ========== -->

        <!-- ============================================================== -->
        <!-- Start Page Content Here -->
        <!-- ============================================================== -->

        <div className="content-page">
          <div className="content">

            <!-- Start Content-->
            <div className="container-fluid">

              <div className="row">
                <div className="col-12">
                  <div className="page-title-box">
                    <div className="page-title-right">
                      <form className="d-flex">
                        <div className="input-group">
                          <input type="text" className="form-control form-control-light" id="dash-daterange">
                            <span className="input-group-text bg-primary border-primary text-white">
                              <i className="mdi mdi-calendar-range font-13"></i>
                            </span>
                        </div>
                        <a href="javascript: void(0);" className="btn btn-primary ms-2">
                          <i className="mdi mdi-autorenew"></i>
                        </a>
                        <a href="javascript: void(0);" className="btn btn-primary ms-1">
                          <i className="mdi mdi-filter-variant"></i>
                        </a>
                      </form>
                    </div>
                    <h4 className="page-title">Dashboard</h4>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-xl-5 col-lg-6">

                  <div className="row">
                    <div className="col-sm-6">
                      <div className="card widget-flat">
                        <div className="card-body">
                          <div className="float-end">
                            <i className="mdi mdi-account-multiple widget-icon"></i>
                          </div>
                          <h5 className="text-muted fw-normal mt-0" title="Number of Customers">Customers</h5>
                          <h3 className="mt-3 mb-3">36,254</h3>
                          <p className="mb-0 text-muted">
                            <span className="text-success me-2"><i className="mdi mdi-arrow-up-bold"></i> 5.27%</span>
                            <span className="text-nowrap">Since last month</span>
                          </p>
                        </div> <!-- end card-body-->
                      </div> <!-- end card-->
                    </div> <!-- end col-->

                    <div className="col-sm-6">
                      <div className="card widget-flat">
                        <div className="card-body">
                          <div className="float-end">
                            <i className="mdi mdi-cart-plus widget-icon"></i>
                          </div>
                          <h5 className="text-muted fw-normal mt-0" title="Number of Orders">Orders</h5>
                          <h3 className="mt-3 mb-3">5,543</h3>
                          <p className="mb-0 text-muted">
                            <span className="text-danger me-2"><i className="mdi mdi-arrow-down-bold"></i> 1.08%</span>
                            <span className="text-nowrap">Since last month</span>
                          </p>
                        </div> <!-- end card-body-->
                      </div> <!-- end card-->
                    </div> <!-- end col-->
                  </div> <!-- end row -->

                  <div className="row">
                    <div className="col-sm-6">
                      <div className="card widget-flat">
                        <div className="card-body">
                          <div className="float-end">
                            <i className="mdi mdi-currency-usd widget-icon"></i>
                          </div>
                          <h5 className="text-muted fw-normal mt-0" title="Average Revenue">Revenue</h5>
                          <h3 className="mt-3 mb-3">$6,254</h3>
                          <p className="mb-0 text-muted">
                            <span className="text-danger me-2"><i className="mdi mdi-arrow-down-bold"></i> 7.00%</span>
                            <span className="text-nowrap">Since last month</span>
                          </p>
                        </div> <!-- end card-body-->
                      </div> <!-- end card-->
                    </div> <!-- end col-->

                    <div className="col-sm-6">
                      <div className="card widget-flat">
                        <div className="card-body">
                          <div className="float-end">
                            <i className="mdi mdi-pulse widget-icon"></i>
                          </div>
                          <h5 className="text-muted fw-normal mt-0" title="Growth">Growth</h5>
                          <h3 className="mt-3 mb-3">+ 30.56%</h3>
                          <p className="mb-0 text-muted">
                            <span className="text-success me-2"><i className="mdi mdi-arrow-up-bold"></i> 4.87%</span>
                            <span className="text-nowrap">Since last month</span>
                          </p>
                        </div> <!-- end card-body-->
                      </div> <!-- end card-->
                    </div> <!-- end col-->
                  </div> <!-- end row -->

                </div> <!-- end col -->

                <div className="col-xl-7 col-lg-6">
                  <div className="card card-h-100">
                    <div className="d-flex card-header justify-content-between align-items-center">
                      <h4 className="header-title">Projections Vs Actuals</h4>
                      <div className="dropdown">
                        <a href="#" className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                          <i className="mdi mdi-dots-vertical"></i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end">
                        
                          <a href="#" className="dropdown-item">Sales Report</a>
                        
                          <a href="#" className="dropdown-item">Export Report</a>
                        
                          <a href="#" className="dropdown-item">Profit</a>
                        
                          <a href="#" className="dropdown-item">Action</a>
                        </div>
                      </div>
                    </div>
                    <div className="card-body pt-0">
                      <div dir="ltr">
                        <div id="high-performing-product" className="apex-charts" data-colors="#727cf5,#91a6bd40"></div>
                      </div>

                    </div> <!-- end card-body-->
                  </div> <!-- end card-->

                </div> <!-- end col -->
              </div>
              <!-- end row -->

              <div className="row">
                <div className="col-lg-8">
                  <div className="card">
                    <div className="d-flex card-header justify-content-between align-items-center">
                      <h4 className="header-title">Revenue</h4>
                      <div className="dropdown">
                        <a href="#" className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                          <i className="mdi mdi-dots-vertical"></i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end">
                        
                          <a href="#" className="dropdown-item">Sales Report</a>
                        
                          <a href="#" className="dropdown-item">Export Report</a>
                        
                          <a href="#" className="dropdown-item">Profit</a>
                        
                          <a href="#" className="dropdown-item">Action</a>
                        </div>
                      </div>
                    </div>
                    <div className="card-body pt-0">
                      <div className="chart-content-bg">
                        <div className="row text-center">
                          <div className="col-sm-6">
                            <p className="text-muted mb-0 mt-3">Current Week</p>
                            <h2 className="fw-normal mb-3">
                              <small className="mdi mdi-checkbox-blank-circle text-primary align-middle me-1"></small>
                              <span>$58,254</span>
                            </h2>
                          </div>
                          <div className="col-sm-6">
                            <p className="text-muted mb-0 mt-3">Previous Week</p>
                            <h2 className="fw-normal mb-3">
                              <small className="mdi mdi-checkbox-blank-circle text-success align-middle me-1"></small>
                              <span>$69,524</span>
                            </h2>
                          </div>
                        </div>
                      </div>

                      <div className="dash-item-overlay d-none d-md-block" dir="ltr">
                        <h5>Today's Earning: $2,562.30</h5>
                        <p className="text-muted font-13 mb-3 mt-2">Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui.
                          Etiam rhoncus...</p>
                        <a href="javascript: void(0);" className="btn btn-outline-primary">View Statements
                          <i className="mdi mdi-arrow-right ms-2"></i>
                        </a>
                      </div>
                      <div dir="ltr">
                        <div id="revenue-chart" className="apex-charts mt-3" data-colors="#727cf5,#0acf97"></div>
                      </div>
                    </div> <!-- end card-body-->
                  </div> <!-- end card-->
                </div> <!-- end col-->

                <div className="col-lg-4">
                  <div className="card">
                    <div className="d-flex card-header justify-content-between align-items-center">
                      <h4 className="header-title">Revenue By Location</h4>
                      <div className="dropdown">
                        <a href="#" className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                          <i className="mdi mdi-dots-vertical"></i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end">
                        
                          <a href="#" className="dropdown-item">Sales Report</a>
                        
                          <a href="#" className="dropdown-item">Export Report</a>
                          <!-- item-->
                          <a href="#" className="dropdown-item">Profit</a>
                          <!-- item-->
                          <a href="#" className="dropdown-item">Action</a>
                        </div>
                      </div>
                    </div>

                    <div className="card-body pt-0">
                      <div className="mb-4 mt-3">
                        <div id="world-map-markers" style="height: 217px"></div>
                      </div>

                      <h5 className="mb-1 mt-0 fw-normal">New York</h5>
                      <div className="progress-w-percent">
                        <span className="progress-value fw-bold">72k </span>
                        <div className="progress progress-sm">
                          <div className="progress-bar" role="progressbar" style="width: 72%;" aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                      </div>

                      <h5 className="mb-1 mt-0 fw-normal">San Francisco</h5>
                      <div className="progress-w-percent">
                        <span className="progress-value fw-bold">39k </span>
                        <div className="progress progress-sm">
                          <div className="progress-bar" role="progressbar" style="width: 39%;" aria-valuenow="39" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                      </div>

                      <h5 className="mb-1 mt-0 fw-normal">Sydney</h5>
                      <div className="progress-w-percent">
                        <span className="progress-value fw-bold">25k </span>
                        <div className="progress progress-sm">
                          <div className="progress-bar" role="progressbar" style="width: 39%;" aria-valuenow="39" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                      </div>

                      <h5 className="mb-1 mt-0 fw-normal">Singapore</h5>
                      <div className="progress-w-percent mb-0">
                        <span className="progress-value fw-bold">61k </span>
                        <div className="progress progress-sm">
                          <div className="progress-bar" role="progressbar" style="width: 61%;" aria-valuenow="61" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                      </div>
                    </div> <!-- end card-body-->
                  </div> <!-- end card-->
                </div> <!-- end col-->
              </div>
              <!-- end row -->

              <div className="row">
                <div className="col-xl-6 col-lg-12 order-lg-2 order-xl-1">
                  <div className="card">
                    <div className="d-flex card-header justify-content-between align-items-center">
                      <h4 className="header-title">Top Selling Products</h4>
                      <a href="#" className="btn btn-sm btn-light">Export <i className="mdi mdi-download ms-1"></i></a>
                    </div>

                    <div className="card-body pt-0">
                      <div className="table-responsive">
                        <table className="table table-centered table-nowrap table-hover mb-0">
                          <tbody>
                            <tr>
                              <td>
                                <h5 className="font-14 my-1 fw-normal">ASOS Ridley High Waist</h5>
                                <span className="text-muted font-13">07 April 2018</span>
                              </td>
                              <td>
                                <h5 className="font-14 my-1 fw-normal">$79.49</h5>
                                <span className="text-muted font-13">Price</span>
                              </td>
                              <td>
                                <h5 className="font-14 my-1 fw-normal">82</h5>
                                <span className="text-muted font-13">Quantity</span>
                              </td>
                              <td>
                                <h5 className="font-14 my-1 fw-normal">$6,518.18</h5>
                                <span className="text-muted font-13">Amount</span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <h5 className="font-14 my-1 fw-normal">Marco Lightweight Shirt</h5>
                                <span className="text-muted font-13">25 March 2018</span>
                              </td>
                              <td>
                                <h5 className="font-14 my-1 fw-normal">$128.50</h5>
                                <span className="text-muted font-13">Price</span>
                              </td>
                              <td>
                                <h5 className="font-14 my-1 fw-normal">37</h5>
                                <span className="text-muted font-13">Quantity</span>
                              </td>
                              <td>
                                <h5 className="font-14 my-1 fw-normal">$4,754.50</h5>
                                <span className="text-muted font-13">Amount</span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <h5 className="font-14 my-1 fw-normal">Half Sleeve Shirt</h5>
                                <span className="text-muted font-13">17 March 2018</span>
                              </td>
                              <td>
                                <h5 className="font-14 my-1 fw-normal">$39.99</h5>
                                <span className="text-muted font-13">Price</span>
                              </td>
                              <td>
                                <h5 className="font-14 my-1 fw-normal">64</h5>
                                <span className="text-muted font-13">Quantity</span>
                              </td>
                              <td>
                                <h5 className="font-14 my-1 fw-normal">$2,559.36</h5>
                                <span className="text-muted font-13">Amount</span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <h5 className="font-14 my-1 fw-normal">Lightweight Jacket</h5>
                                <span className="text-muted font-13">12 March 2018</span>
                              </td>
                              <td>
                                <h5 className="font-14 my-1 fw-normal">$20.00</h5>
                                <span className="text-muted font-13">Price</span>
                              </td>
                              <td>
                                <h5 className="font-14 my-1 fw-normal">184</h5>
                                <span className="text-muted font-13">Quantity</span>
                              </td>
                              <td>
                                <h5 className="font-14 my-1 fw-normal">$3,680.00</h5>
                                <span className="text-muted font-13">Amount</span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <h5 className="font-14 my-1 fw-normal">Marco Shoes</h5>
                                <span className="text-muted font-13">05 March 2018</span>
                              </td>
                              <td>
                                <h5 className="font-14 my-1 fw-normal">$28.49</h5>
                                <span className="text-muted font-13">Price</span>
                              </td>
                              <td>
                                <h5 className="font-14 my-1 fw-normal">69</h5>
                                <span className="text-muted font-13">Quantity</span>
                              </td>
                              <td>
                                <h5 className="font-14 my-1 fw-normal">$1,965.81</h5>
                                <span className="text-muted font-13">Amount</span>
                              </td>
                            </tr>

                          </tbody>
                        </table>
                      </div> <!-- end table-responsive-->
                    </div> <!-- end card-body-->
                  </div> <!-- end card-->
                </div> <!-- end col-->

                <div className="col-xl-3 col-lg-6 order-lg-1">
                  <div className="card">
                    <div className="d-flex card-header justify-content-between align-items-center">
                      <h4 className="header-title">Total Sales</h4>
                      <div className="dropdown">
                        <a href="#" className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                          <i className="mdi mdi-dots-vertical"></i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end">
                          <!-- item-->
                          <a href="#" className="dropdown-item">Sales Report</a>
                          <!-- item-->
                          <a href="#" className="dropdown-item">Export Report</a>
                          <!-- item-->
                          <a href="#" className="dropdown-item">Profit</a>
                          <!-- item-->
                          <a href="#" className="dropdown-item">Action</a>
                        </div>
                      </div>
                    </div>

                    <div className="card-body pt-0">
                      <div id="average-sales" className="apex-charts mb-4 mt-2" data-colors="#727cf5,#0acf97,#fa5c7c,#ffbc00"></div>


                      <div className="chart-widget-list">
                        <p>
                          <i className="mdi mdi-square text-primary"></i> Direct
                          <span className="float-end">$300.56</span>
                        </p>
                        <p>
                          <i className="mdi mdi-square text-danger"></i> Affilliate
                          <span className="float-end">$135.18</span>
                        </p>
                        <p>
                          <i className="mdi mdi-square text-success"></i> Sponsored
                          <span className="float-end">$48.96</span>
                        </p>
                        <p className="mb-0">
                          <i className="mdi mdi-square text-warning"></i> E-mail
                          <span className="float-end">$154.02</span>
                        </p>
                      </div>
                    </div> <!-- end card-body-->
                  </div> <!-- end card-->
                </div> <!-- end col-->

                <div className="col-xl-3 col-lg-6 order-lg-1">
                  <div className="card">
                    <div className="d-flex card-header justify-content-between align-items-center">
                      <h4 className="header-title">Recent Activity</h4>
                      <div className="dropdown">
                        <a href="#" className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                          <i className="mdi mdi-dots-vertical"></i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end">
                          <!-- item-->
                          <a href="#" className="dropdown-item">Sales Report</a>
                          <!-- item-->
                          <a href="#" className="dropdown-item">Export Report</a>
                          <!-- item-->
                          <a href="#" className="dropdown-item">Profit</a>
                          <!-- item-->
                          <a href="#" className="dropdown-item">Action</a>
                        </div>
                      </div>
                    </div>

                    <div className="card-body py-0 mb-3" data-simplebar style="max-height: 403px;">
                      <div className="timeline-alt py-0">
                        <div className="timeline-item">
                          <i className="mdi mdi-upload bg-info-lighten text-info timeline-icon"></i>
                          <div className="timeline-item-info">
                            <a href="#" className="text-info fw-bold mb-1 d-block">You sold an item</a>
                            <small>Paul Burgess just purchased “Hyper - Admin Dashboard”!</small>
                            <p className="mb-0 pb-2">
                              <small className="text-muted">5 minutes ago</small>
                            </p>
                          </div>
                        </div>

                        <div className="timeline-item">
                          <i className="mdi mdi-airplane bg-primary-lighten text-primary timeline-icon"></i>
                          <div className="timeline-item-info">
                            <a href="#" className="text-primary fw-bold mb-1 d-block">Product on the Bootstrap Market</a>
                            <small>Dave Gamache added
                              <span className="fw-bold">Admin Dashboard</span>
                            </small>
                            <p className="mb-0 pb-2">
                              <small className="text-muted">30 minutes ago</small>
                            </p>
                          </div>
                        </div>

                        <div className="timeline-item">
                          <i className="mdi mdi-microphone bg-info-lighten text-info timeline-icon"></i>
                          <div className="timeline-item-info">
                            <a href="#" className="text-info fw-bold mb-1 d-block">Robert Delaney</a>
                            <small>Send you message
                              <span className="fw-bold">"Are you there?"</span>
                            </small>
                            <p className="mb-0 pb-2">
                              <small className="text-muted">2 hours ago</small>
                            </p>
                          </div>
                        </div>

                        <div className="timeline-item">
                          <i className="mdi mdi-upload bg-primary-lighten text-primary timeline-icon"></i>
                          <div className="timeline-item-info">
                            <a href="#" className="text-primary fw-bold mb-1 d-block">Audrey Tobey</a>
                            <small>Uploaded a photo
                              <span className="fw-bold">"Error.jpg"</span>
                            </small>
                            <p className="mb-0 pb-2">
                              <small className="text-muted">14 hours ago</small>
                            </p>
                          </div>
                        </div>

                        <div className="timeline-item">
                          <i className="mdi mdi-upload bg-info-lighten text-info timeline-icon"></i>
                          <div className="timeline-item-info">
                            <a href="#" className="text-info fw-bold mb-1 d-block">You sold an item</a>
                            <small>Paul Burgess just purchased “Hyper - Admin Dashboard”!</small>
                            <p className="mb-0 pb-2">
                              <small className="text-muted">16 hours ago</small>
                            </p>
                          </div>
                        </div>

                        <div className="timeline-item">
                          <i className="mdi mdi-airplane bg-primary-lighten text-primary timeline-icon"></i>
                          <div className="timeline-item-info">
                            <a href="#" className="text-primary fw-bold mb-1 d-block">Product on the Bootstrap Market</a>
                            <small>Dave Gamache added
                              <span className="fw-bold">Admin Dashboard</span>
                            </small>
                            <p className="mb-0 pb-2">
                              <small className="text-muted">22 hours ago</small>
                            </p>
                          </div>
                        </div>

                        <div className="timeline-item">
                          <i className="mdi mdi-microphone bg-info-lighten text-info timeline-icon"></i>
                          <div className="timeline-item-info">
                            <a href="#" className="text-info fw-bold mb-1 d-block">Robert Delaney</a>
                            <small>Send you message
                              <span className="fw-bold">"Are you there?"</span>
                            </small>
                            <p className="mb-0 pb-2">
                              <small className="text-muted">2 days ago</small>
                            </p>
                          </div>
                        </div>
                      </div>
                      <!-- end timeline -->
                    </div> <!-- end simplebar -->
                  </div>
                  <!-- end card-->
                </div>
                <!-- end col -->

              </div>
              <!-- end row -->

            </div>
            <!-- container -->

          </div>
          <!-- content -->

          <!-- Footer Start -->
          <footer className="footer">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-6">
                  <script>document.write(new Date().getFullYear())</script> © Hyper - Coderthemes.com
                </div>
                <div className="col-md-6">
                  <div className="text-md-end footer-links d-none d-md-block">
                    <a href="javascript: void(0);">About</a>
                    <a href="javascript: void(0);">Support</a>
                    <a href="javascript: void(0);">Contact Us</a>
                  </div>
                </div>
              </div>
            </div>
          </footer>
          <!-- end Footer -->

        </div>

        <!-- ============================================================== -->
        <!-- End Page content -->
        <!-- ============================================================== --> */}

      </div>

    </>
  )
}




// import React, { useEffect, useState } from 'react';

// export default function Dashboard() {

//   const [sidebarSize, setSidebarSize] = useState('condensed');
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   // Handle window resize to change sidebar size
//   const handleResize = () => {
//     if (window.innerWidth <= 768) { // Mobile or smaller screens
//       setSidebarSize('full');
//     } else { // Larger screens
//       setSidebarSize('condensed');
//     }
//   };

//   useEffect(() => {
//     // Run once to set the initial sidebar size
//     handleResize();
//     // Attach the resize listener
//     window.addEventListener('resize', handleResize);
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   useEffect(() => {
//     const htmlElement = document.documentElement;
//     htmlElement.setAttribute('data-bs-theme', 'light');
//     htmlElement.setAttribute('data-layout-mode', 'fluid');
//     htmlElement.setAttribute('data-menu-color', 'dark');
//     htmlElement.setAttribute('data-topbar-color', 'light');
//     htmlElement.setAttribute('data-layout-position', 'fixed');
//     htmlElement.setAttribute('data-sidenav-size', sidebarSize);  // Use sidebarSize dynamically
//     // htmlElement.classList.add('sidebar-enable');
//     htmlElement.classList.add('menuitem-active');

//     // Adjust the class and attributes based on the sidebar size and open state
//     if (isSidebarOpen) {
//       // Use sidebarSize dynamically
//       htmlElement.classList.add('sidebar-enable');
//     } else {
     
//       htmlElement.classList.remove('sidebar-enable');
//     }
   
//   }, [isSidebarOpen, sidebarSize]); 

//   // Toggle sidebar visibility
//   const handleSidebarToggle = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };


//   return (
//     <>
//       <div className="wrapper">
//         {/* <!-- ========== Topbar Start ========== --> */}
//         <div className="navbar-custom">
//           <div className="topbar container-fluid">
//             <div className="d-flex align-items-center gap-lg-2 gap-1">

//               <div className="logo-topbar">
//                 <a href="index.html" className="logo-light">
//                   <span className="logo-lg">
//                     <img src="assets1/images/logo.png" alt="logo" />
//                   </span>
//                   <span className="logo-sm">
//                     <img src="assets1/images/logo-sm.png" alt="small logo" />
//                   </span>
//                 </a>

//                 {/* Logo Dark */}
//                 <a href="index.html" className="logo-dark">
//                   <span className="logo-lg">
//                     <img src="assets1/images/logo-dark.png" alt="dark logo" />
//                   </span>
//                   <span className="logo-sm">
//                     <img src="assets1/images/logo-dark-sm.png" alt="small logo" />
//                   </span>
//                 </a>
//               </div>

//               <button className="button-toggle-menu" onClick={handleSidebarToggle}>
//                 <i className="mdi mdi-menu"></i>
//               </button>

//               <button className="navbar-toggle" data-bs-toggle="collapse" data-bs-target="#topnav-menu-content">
//                 <div className="lines">
//                   <span></span>
//                   <span></span>
//                   <span></span>
//                 </div>
//               </button>

//               <div className="app-search dropdown d-none d-lg-block">
//                 <form>
//                   <div className="input-group">
//                     <input type="search" className="form-control dropdown-toggle" placeholder="Search..." id="top-search" />
//                     <span className="mdi mdi-magnify search-icon"></span>
//                     <button className="input-group-text btn btn-primary" type="submit">Search</button>
//                   </div>
//                 </form>

//                 <div className="dropdown-menu dropdown-menu-animated dropdown-lg" id="search-dropdown">

//                   <div className="dropdown-header noti-title">
//                     <h5 className="text-overflow mb-2">Found <span className="text-danger">17</span> results</h5>
//                   </div>

//                   <a href="#" className="dropdown-item notify-item">
//                     <i className="uil-notes font-16 me-1"></i>
//                     <span>Analytics Report</span>
//                   </a>

//                   <a href="#" className="dropdown-item notify-item">
//                     <i className="uil-life-ring font-16 me-1"></i>
//                     <span>How can I help you?</span>
//                   </a>

//                   <a href="#" className="dropdown-item notify-item">
//                     <i className="uil-cog font-16 me-1"></i>
//                     <span>User profile settings</span>
//                   </a>

//                   <div className="dropdown-header noti-title">
//                     <h6 className="text-overflow mb-2 text-uppercase">Users</h6>
//                   </div>

//                   <div className="notification-list">
//                     <a href="#" className="dropdown-item notify-item">
//                       <div className="d-flex">
//                         <img className="d-flex me-2 rounded-circle" src="assets1/images/users/avatar-2.jpg" alt="Generic placeholder image" height="32" />
//                         <div className="w-100">
//                           <h5 className="m-0 font-14">Erwin Brown</h5>
//                           <span className="font-12 mb-0">UI Designer</span>
//                         </div>
//                       </div>
//                     </a>

//                     <a href="#" className="dropdown-item notify-item">
//                       <div className="d-flex">
//                         <img className="d-flex me-2 rounded-circle" src="assets1/images/users/avatar-5.jpg" alt="Generic placeholder image" height="32" />
//                         <div className="w-100">
//                           <h5 className="m-0 font-14">Jacob Deo</h5>
//                           <span className="font-12 mb-0">Developer</span>
//                         </div>
//                       </div>
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* <!-- ========== Topbar End ========== --> */}

//         {/* <!-- ========== Left Sidebar Start ========== --> */}
//         <div className={`leftside-menu ${sidebarSize === 'full' ? 'full-sidebar' : 'condensed-sidebar'}`}>

//           <a href="index.html" className="logo logo-light">
//             <span className="logo-lg">
//               <img src="assets1/images/logo.png" alt="logo" />
//             </span>
//             <span className="logo-sm">
//               <img src="assets1/images/logo-sm.png" alt="small logo" />
//             </span>
//           </a>

//           <a href="index.html" className="logo logo-dark">
//             <span className="logo-lg">
//               <img src="assets1/images/logo-dark.png" alt="dark logo" />
//             </span>
//             <span className="logo-sm">
//               <img src="assets1/images/logo-dark-sm.png" alt="small logo" />
//             </span>
//           </a>

//           <div className="button-sm-hover" data-bs-toggle="tooltip" data-bs-placement="right" title="Show Full Sidebar">
//             <i className="ri-checkbox-blank-circle-line align-middle"></i>
//           </div>

//           <div className="button-close-fullsidebar">
//             <i className="ri-close-fill align-middle"></i>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


// // import React, { useEffect, useState } from 'react';

// // export default function Dashboard() {
// //   // State to manage sidebar size (condensed or full)
// //   const [sidebarSize, setSidebarSize] = useState('condensed');
  
// //   // State to manage sidebar toggle
// //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

// //   // Function to handle button click
// //   const handleSidebarToggle = () => {
// //     setIsSidebarOpen(!isSidebarOpen);
// //   };


// //   // Applying the classes conditionally to the <html> tag based on sidebar toggle and screen size
// //   useEffect(() => {
// //     const htmlElement = document.documentElement;

// //     // Set data-sidenav-size dynamically
// //     htmlElement.setAttribute('data-sidenav-size', sidebarSize);

// //     // Applying other classes when sidebar is open
// //     if (isSidebarOpen) {
// //       htmlElement.setAttribute('data-bs-theme', 'light');
// //       htmlElement.setAttribute('data-layout-mode', 'fluid');
// //       htmlElement.setAttribute('data-menu-color', 'dark');
// //       htmlElement.setAttribute('data-topbar-color', 'light');
// //       htmlElement.setAttribute('data-layout-position', 'fixed');
// //       htmlElement.classList.add('sidebar-enable');
// //       htmlElement.classList.add('menuitem-active');
// //     } else {
// //       htmlElement.removeAttribute('data-bs-theme');
// //       htmlElement.removeAttribute('data-layout-mode');
// //       htmlElement.removeAttribute('data-menu-color');
// //       htmlElement.removeAttribute('data-topbar-color');
// //       htmlElement.removeAttribute('data-layout-position');
// //       htmlElement.removeAttribute('data-sidenav-size');
// //       htmlElement.classList.remove('sidebar-enable');
// //     }
// //   }, [isSidebarOpen, sidebarSize]);

// //   return (
// //     <>
// //       <div className="wrapper">
// //         {/* ========== Topbar Start ========== */}
// //         <div className="navbar-custom">
// //           <div className="topbar container-fluid">
// //             <div className="d-flex align-items-center gap-lg-2 gap-1">

// //               <div className="logo-topbar">
// //                 <a href="index.html" className="logo-light">
// //                   <span className="logo-lg">
// //                     <img src="assets1/images/logo.png" alt="logo" />
// //                   </span>
// //                   <span className="logo-sm">
// //                     <img src="assets1/images/logo-sm.png" alt="small logo" />
// //                   </span>
// //                 </a>

// //                 {/* Logo Dark */}
// //                 <a href="index.html" className="logo-dark">
// //                   <span className="logo-lg">
// //                     <img src="assets1/images/logo-dark.png" alt="dark logo" />
// //                   </span>
// //                   <span className="logo-sm">
// //                     <img src="assets1/images/logo-dark-sm.png" alt="small logo" />
// //                   </span>
// //                 </a>
// //               </div>

// //               <button className="button-toggle-menu" onClick={handleSidebarToggle}>
// //                 <i className="mdi mdi-menu"></i>
// //               </button>

// //               <button className="navbar-toggle" data-bs-toggle="collapse" data-bs-target="#topnav-menu-content">
// //                 <div className="lines">
// //                   <span></span>
// //                   <span></span>
// //                   <span></span>
// //                 </div>
// //               </button>

// //               <div className="app-search dropdown d-none d-lg-block">
// //                 <form>
// //                   <div className="input-group">
// //                     <input type="search" className="form-control dropdown-toggle" placeholder="Search..." id="top-search" />
// //                     <span className="mdi mdi-magnify search-icon"></span>
// //                     <button className="input-group-text btn btn-primary" type="submit">Search</button>
// //                   </div>
// //                 </form>

// //                 <div className="dropdown-menu dropdown-menu-animated dropdown-lg" id="search-dropdown">

// //                   <div className="dropdown-header noti-title">
// //                     <h5 className="text-overflow mb-2">Found <span className="text-danger">17</span> results</h5>
// //                   </div>

// //                   <a href="#" className="dropdown-item notify-item">
// //                     <i className="uil-notes font-16 me-1"></i>
// //                     <span>Analytics Report</span>
// //                   </a>

// //                   <a href="#" className="dropdown-item notify-item">
// //                     <i className="uil-life-ring font-16 me-1"></i>
// //                     <span>How can I help you?</span>
// //                   </a>

// //                   <a href="#" className="dropdown-item notify-item">
// //                     <i className="uil-cog font-16 me-1"></i>
// //                     <span>User profile settings</span>
// //                   </a>

// //                   <div className="dropdown-header noti-title">
// //                     <h6 className="text-overflow mb-2 text-uppercase">Users</h6>
// //                   </div>

// //                   <div className="notification-list">
// //                     <a href="#" className="dropdown-item notify-item">
// //                       <div className="d-flex">
// //                         <img className="d-flex me-2 rounded-circle" src="assets1/images/users/avatar-2.jpg" alt="Generic placeholder image" height="32" />
// //                         <div className="w-100">
// //                           <h5 className="m-0 font-14">Erwin Brown</h5>
// //                           <span className="font-12 mb-0">UI Designer</span>
// //                         </div>
// //                       </div>
// //                     </a>

// //                     <a href="#" className="dropdown-item notify-item">
// //                       <div className="d-flex">
// //                         <img className="d-flex me-2 rounded-circle" src="assets1/images/users/avatar-5.jpg" alt="Generic placeholder image" height="32" />
// //                         <div className="w-100">
// //                           <h5 className="m-0 font-14">Jacob Deo</h5>
// //                           <span className="font-12 mb-0">Developer</span>
// //                         </div>
// //                       </div>
// //                     </a>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //         {/* ========== Topbar End ========== */}

// //         {/* ========== Left Sidebar Start ========== */}
// //         <div className="leftside-menu">
// //           <a href="index.html" className="logo logo-light">
// //             <span className="logo-lg">
// //               <img src="assets1/images/logo.png" alt="logo" />
// //             </span>
// //             <span className="logo-sm">
// //               <img src="assets1/images/logo-sm.png" alt="small logo" />
// //             </span>
// //           </a>

// //           <a href="index.html" className="logo logo-dark">
// //             <span className="logo-lg">
// //               <img src="assets1/images/logo-dark.png" alt="dark logo" />
// //             </span>
// //             <span className="logo-sm">
// //               <img src="assets1/images/logo-dark-sm.png" alt="small logo" />
// //             </span>
// //           </a>

// //           <div className="button-sm-hover" data-bs-toggle="tooltip" data-bs-placement="right" title="Show Full Sidebar">
// //             <i className="ri-checkbox-blank-circle-line align-middle"></i>
// //           </div>

// //           <div className="button-close-fullsidebar">
// //             <i className="ri-close-fill align-middle"></i>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }
