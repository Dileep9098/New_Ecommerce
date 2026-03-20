import React from 'react'
import { Link } from 'react-router-dom'

export default function SideBar() {
	return (
		<>

			<nav className="navbar-vertical-nav d-none d-xl-block">
				<div className="navbar-vertical">
					<div className="px-4 py-5">
						<Link to="/admin/dashboard" className="navbar-brand">
							<img src="../assets/images/logo/freshcart-logo.svg" alt="" />
						</Link>
					</div>
					<div className="navbar-vertical-content flex-grow-1" data-simplebar="">
						<ul className="navbar-nav flex-column" id="sideNavbar">
							<li className="nav-item">
								<Link className="nav-link  active " to="/admin/dashboard">
									<div className="d-flex align-items-center">
										<span className="nav-link-icon"><i className="bi bi-house"></i></span>
										<span className="nav-link-text">Dashboard</span>
									</div>
								</Link>
							</li>
							<li className="nav-item mt-6 mb-3">
								<span className="nav-label">Theme Managements</span>
							</li>

							<li className="nav-item">
								<Link className="nav-link  collapsed " to="#" data-bs-toggle="collapse"
									data-bs-target="#navCategoriesOrders" aria-expanded="false"
									aria-controls="navCategoriesOrders">
									<div className="d-flex align-items-center">
										<span className="nav-link-icon"><i className="bi bi-bag"></i></span>
										<span className="nav-link-text">Theme</span>
									</div>
								</Link>
								<div id="navCategoriesOrders" className="collapse " data-bs-parent="#sideNavbar">
									<ul className="nav flex-column">
										<li className="nav-item">
											<Link className="nav-link " to="/admin/topbar-manage">Nav Bar</Link>
										</li>
										<li className="nav-item">
											<Link className="nav-link " to="/admin/main-banner">Main Banner</Link>
										</li>
									</ul>
								</div>
							</li>

							<li className="nav-item">
								<Link className="nav-link  collapsed " data-bs-toggle="collapse"
									data-bs-target="#navProduct" aria-expanded="false"
									aria-controls="navProduct">
									<div className="d-flex align-items-center">
										<span className="nav-link-icon"><i className="bi bi-list-task"></i></span>
										<span className="nav-link-text">Product Catalog </span>
									</div>
								</Link>
								<div id="navProduct" className="collapse " data-bs-parent="#sideNavbar">
									<ul className="nav flex-column">
										<li className="nav-item">
											<Link className="nav-link " to="/admin/product">Products</Link>
										</li>
										<li className="nav-item">
											<Link className="nav-link " to="/admin/product-review">Product Reviews</Link>
										</li>
										<li className="nav-item">
											<Link className="nav-link " to="/admin/product-bulk-upload">Product Bulk Upload</Link>
										</li>
										<li className="nav-item">
											<Link className="nav-link " to="/admin/product-bulk-upload">image Upload</Link>
										</li>
										<li className="nav-item">
											<Link className="nav-link " to="/admin/product-variants">Product Variants</Link>
										</li>
									</ul>
								</div>
							</li>

							<li className="nav-item">
								<Link className="nav-link  collapsed " data-bs-toggle="collapse"
									data-bs-target="#navSale" aria-expanded="false"
									aria-controls="navSale">
									<div className="d-flex align-items-center">
										<span className="nav-link-icon"><i className="bi bi-cart"></i></span>
										<span className="nav-link-text">Sales </span>
									</div>
								</Link>
								<div id="navSale" className="collapse " data-bs-parent="#sideNavbar">
									<ul className="nav flex-column">
										<li className="nav-item">
											<Link className="nav-link " to="/admin/order-list">Orders</Link>
										</li>

									</ul>
								</div>
							</li>


							<li className="nav-item">
								<Link className="nav-link  collapsed " data-bs-toggle="collapse"
									data-bs-target="#navUserManagement" aria-expanded="false"
									aria-controls="navUserManagement">
									<div className="d-flex align-items-center">
										<span className="nav-link-icon"><i className="bi bi-people"></i></span>
										<span className="nav-link-text">Users Management </span>
									</div>
								</Link>
								<div id="navUserManagement" className="collapse " data-bs-parent="#sideNavbar">
									<ul className="nav flex-column">
										<li className="nav-item">
											<Link className="nav-link " to="/admin/user-management">Users</Link>
										</li>
										<li className="nav-item">
											<Link className="nav-link " to="/admin/user-role">Role</Link>
										</li>
										<li className="nav-item">
											<Link className="nav-link " to="/admin/user-address">Address Type</Link>
										</li>

									</ul>
								</div>
							</li>
							<li className="nav-item">
								<Link className="nav-link  collapsed " data-bs-toggle="collapse"
									data-bs-target="#navBasicData" aria-expanded="false"
									aria-controls="navBasicData">
									<div className="d-flex align-items-center">
										<span className="nav-link-icon"><i className="bi bi-grid-fill"></i></span>
										<span className="nav-link-text">Basic Data </span>
									</div>
								</Link>
								<div id="navBasicData" className="collapse " data-bs-parent="#sideNavbar">
									<ul className="nav flex-column">
										<li className="nav-item">
											<Link className="nav-link " to="/page-not-found">Colors</Link>
										</li>
										<li className="nav-item">
											<Link className="nav-link " to="/admin/category">Categories</Link>
										</li>
										<li className="nav-item">
											<Link className="nav-link " to="/page-not-found">Tags</Link>
										</li>
										<li className="nav-item">
											<Link className="nav-link " to="/admin/product-size">Size</Link>
										</li>
										<li className="nav-item">
											<Link className="nav-link " to="/admin/tax">Tax</Link>
										</li>
										<li className="nav-item">
											<Link className="nav-link " to="/admin/manufactures">Manufacturers</Link>
										</li>
										<li className="nav-item">
											<Link className="nav-link " to="/page-not-found">Currencies</Link>
										</li>
										<li className="nav-item">
											<Link className="nav-link " to="/page-not-found">Attachment Type</Link>
										</li>
										<li className="nav-item">
											<Link className="nav-link " to="/admin/payments-method">Paument Methods</Link>
										</li>

									</ul>
								</div>
							</li>

							<li className="nav-item">
								<Link className="nav-link  collapsed " data-bs-toggle="collapse"
									data-bs-target="#navPromotions" aria-expanded="false"
									aria-controls="navPromotions">
									<div className="d-flex align-items-center">
										<span className="nav-link-icon"><i className="bi bi-graph-up-arrow"></i></span>
										<span className="nav-link-text">Promotions </span>
									</div>
								</Link>
								<div id="navPromotions" className="collapse " data-bs-parent="#sideNavbar">
									<ul className="nav flex-column">
										<li className="nav-item">
											<Link className="nav-link " to="/admin/discount-details">Discount</Link>
										</li>
										<li className="nav-item">
											<Link className="nav-link " to="/admin/contact-details">Contact Us</Link>
										</li>
										<li className="nav-item">
											<Link className="nav-link " to="/admin/subscriber-details">Subscribers</Link>
										</li>
										<li className="nav-item">
											<Link className="nav-link " to="/admin/hot-deal-banner-dashboard">Hot Deal Banners</Link>
										</li>
										<li className="nav-item">
											<Link className="nav-link " to="/admin/compaingns-dashboard">Compaigns</Link>
										</li>


									</ul>
								</div>
							</li>
							<li className="nav-item">
								<Link className="nav-link  collapsed " data-bs-toggle="collapse"
									data-bs-target="#navConfiguration" aria-expanded="false"
									aria-controls="navConfiguration">
									<div className="d-flex align-items-center">
										<span className="nav-link-icon"><i className="bi bi-tools"></i></span>
										<span className="nav-link-text">Configuration </span>
									</div>
								</Link>
								<div id="navConfiguration" className="collapse " data-bs-parent="#sideNavbar">
									<ul className="nav flex-column">
										<li className="nav-item">
											<Link className="nav-link " to="/page-not-found">Role Rights Setting</Link>
										</li>
										<li className="nav-item">
											<Link className="nav-link " to="/page-not-found">
												Screen Localization</Link>
										</li>
										<li className="nav-item">
											<Link className="nav-link " to="/page-not-found">Menu Localization</Link>
										</li>


									</ul>
								</div>
							</li>


							<li className="nav-item">
								<Link className="nav-link " to="/admin/Blogs-dashboard">
									<div className="d-flex align-items-center">
										<span className="nav-link-icon"><i className="bi bi-substack"></i></span>
										<span className="nav-link-text">Blog</span>
									</div>
								</Link>
							</li>

							<li className="nav-item">
								<Link className="nav-link  collapsed " data-bs-toggle="collapse"
									data-bs-target="#navNotification" aria-expanded="false"
									aria-controls="navNotification">
									<div className="d-flex align-items-center">
										<span className="nav-link-icon"><i className="bi bi-bell-fill"></i></span>
										<span className="nav-link-text">Notification </span>
									</div>
								</Link>
								<div id="navNotification" className="collapse " data-bs-parent="#sideNavbar">
									<ul className="nav flex-column">
										<li className="nav-item">
											<Link className="nav-link " to="/page-not-found">Admin Notification</Link>
										</li>
										
									</ul>
								</div>
							</li>
							<li className="nav-item">
								<Link className="nav-link  collapsed " data-bs-toggle="collapse"
									data-bs-target="#navTaskManagement" aria-expanded="false"
									aria-controls="navTaskManagement">
									<div className="d-flex align-items-center">
										<span className="nav-link-icon"><i className="bi bi-kanban"></i></span>
										<span className="nav-link-text"> Task Management </span>
									</div>
								</Link>
								<div id="navTaskManagement" className="collapse " data-bs-parent="#sideNavbar">
									<ul className="nav flex-column">
										<li className="nav-item">
											<Link className="nav-link " to="/page-not-found">Requests Queue</Link>
										</li>
										
									</ul>
								</div>
							</li>


							
						</ul>
					</div>
				</div>
			</nav>
		</>
	)
}
