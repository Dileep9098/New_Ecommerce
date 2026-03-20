// import React, { useState } from 'react'

// export default function FilterProduct({handleShowColunm,showProduct,productSearch,setProductSearch,setSortByFilter,setPageSizeFromProductFilter,setFilterValueInParent,setNewArrivals}) {
//      const [selectedValue, setSelectedValue] = useState('');  // Initialize with an empty string or a default value

//   const handleChange = (event) => {
//     debugger
//         const value = event.target.value;
//         setSelectedValue(value);
//         if (setSortByFilter) {
//             setSortByFilter(value);
//         }
//     };
//   return (
//     <>
//     <div className="card mb-4 bg-light border-0">

//                 <div className="card-body p-4">
//                   <h2 className="product-category-title mb-0 fs-1">Featured Products</h2>
//                   <p className="category-description">
//                     Discover our best picks from top brands. Shop quality products at great prices — all in one place.
//                   </p>
//                 </div>

//               </div>

//               <div className="d-lg-flex justify-content-between align-items-center">
//                 <div className="mb-3 mb-lg-0">
//                   <p className="mb-0">
//                     <span className="text-dark">24</span>
//                     Products found
//                   </p>
//                 </div>
//                 {/* icon */}
//                 <div className="d-md-flex justify-content-between align-items-center">
//                   <div className="d-flex align-items-center justify-content-between">
//                     <div>
//                       <a href="#" onClick={()=>handleShowColunm(1)} className={`me-3 ${showProduct=="1"?"":"text-muted"}`}>
//                         <i className="bi bi-list-ul" />
//                       </a>
//                      <a href="#" onClick={()=>handleShowColunm(3)} className={`me-3 ${showProduct=="3"?"":"text-muted"}`}>
//                         <i className="bi bi-grid"  />
//                       </a>
//                       <a href="#" onClick={()=>handleShowColunm(4)} className={`me-3 ${showProduct=="4"?"":"text-muted"}`}>
//                         <i className="bi bi-grid-3x3-gap" />
//                       </a>
//                     </div>
//                     <div className="ms-2 d-lg-none">
//                       <a
//                         className="btn btn-outline-gray-400 text-muted"
//                         data-bs-toggle="offcanvas"
//                         href="#offcanvasCategory"
//                         role="button"
//                         aria-controls="offcanvasCategory"
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           width={14}
//                           height={14}
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           stroke="currentColor"
//                           strokeWidth={2}
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           className="feather feather-filter me-2"
//                         >
//                           <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
//                         </svg>
//                         Filters
//                       </a>
//                     </div>
//                   </div>
//                   <div className="d-flex mt-2 mt-lg-0">
//                     <div className="me-2 flex-grow-1">
//                       {/* select option */}
//                       <select className="form-select">
//                         <option selected="">Show: 50</option>
//                         <option value={10}>10</option>
//                         <option value={20}>20</option>
//                         <option value={30}>30</option>
//                       </select>
//                     </div>
//                     <div>
//                       {/* select option */}
//                       <select className="form-select">
//                         <option selected="">Sort by: Featured</option>
//                         <option value="Price ASC" onChange={()=>handleChange}>Price: Low to High</option>
//                         <option value="Price DESC"onChange={handleChange}>Price: High to Low</option>
//                         <option value="Date ASC"onChange={handleChange}>Release Date</option>
//                         <option value="Date DESC"onChange={handleChange}>Avg. Rating</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//               </div>
      
//     </>
//   )
// }



import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export default function FilterProduct({ handleShowColunm, showProduct, productSearch, setProductSearch, setSortByFilter, setPageSizeFromProductFilter, setFilterValueInParent, setNewArrivals}) {
  const [selectedValue, setSelectedValue] = useState('');
    const {  productCount } = useSelector((state) => state.product)


  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    if (setSortByFilter) {
      setSortByFilter(value);
    }
  };

  const handlePageSizeChange = (event) => {
    // debugger
    const value = event.target.value;
    if (setPageSizeFromProductFilter) {
      setPageSizeFromProductFilter(value);
    }
  };

  return (
    <>
      {/* <div className="card mb-4 bg-light border-0">
        <div className="card-body p-4">
          <h2 className="product-category-title mb-0 fs-1">Featured Products</h2>
          <p className="category-description">
            Discover our best picks from top brands. Shop quality products at great prices — all in one place.
          </p>
        </div>
      </div> */}

      <div className="d-lg-flex justify-content-between align-items-center">
        <div className="mb-3 mb-lg-0">
          <p className="mb-0">
            {/* <span className="text-dark">{productCount}</span> Products found */}
          </p>
        </div>

        <div className="d-md-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <a
                href="#"
                onClick={() => handleShowColunm(1)}
                className={`me-3 ${showProduct === '1' ? '' : 'text-muted'}`}
              >
                <i className="bi bi-list-ul" />
              </a>
              <a
                href="#"
                onClick={() => handleShowColunm(3)}
                className={`me-3 ${showProduct === '3' ? '' : 'text-muted'}`}
              >
                <i className="bi bi-grid" />
              </a>
              <a
                href="#"
                onClick={() => handleShowColunm(5)}
                className={`me-3 ${showProduct === '5' ? '' : 'text-muted'}`}
              >
                <i className="bi bi-grid-3x3-gap" />
              </a>
            </div>

            <div className="ms-2 d-lg-none">
              <a
                className="btn btn-outline-gray-400 text-muted"
                data-bs-toggle="offcanvas"
                href="#offcanvasCategory"
                role="button"
                aria-controls="offcanvasCategory"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={14}
                  height={14}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-filter me-2"
                >
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
                Filters
              </a>
            </div>
          </div>

          <div className="d-flex mt-2 mt-lg-0">
            {/* <div className="me-2 flex-grow-1">
              <select className="form-select" onChange={handlePageSizeChange}>
                <option value="50">Show: 50</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </select>
            </div> */}

            <div>
              {/* ✅ Sort dropdown */}
              <select
                className="form-select"
                value={selectedValue}
                onChange={handleChange}
              >
                <option value="">Sort by: Featured</option>
                <option value="Price ASC">Price: Low to High</option>
                <option value="Price DESC">Price: High to Low</option>
                <option value="Date ASC">Release Date</option>
                <option value="Date DESC">Avg. Rating</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
