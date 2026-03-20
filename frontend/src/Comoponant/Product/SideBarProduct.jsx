

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllParentCategory, getAllSubCategory } from '../../Store/Feature/category/categorySlice';
import axiosInstance from '../../ApiHendler/axiosInstance';
import Config from '../../Config/Config';
import { showErrorMsg } from '../../utils/ShowMessages';

export default function SideBarProduct(props) {
  const { childCategories, parentCategories } = useSelector((state) => state.category);
  // debugg
  const { currency, rate } = useSelector((state) => state.currency);

  const dispatch = useDispatch();

  const [allMenufactures, setAllMenufactures] = useState([]);
  const [allProductSize, setAllProductSize] = useState([]);
  const [allLatestProduct, setAllLatestProduct] = useState([]);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(10000);

  const PriceValuesArray = useMemo(() => {
    const ranges = [
      [10, 100],
      [100, 200],
      [200, 300],
      [300, 400],
      [400, 500],
      [500, 600],
      [600, 1000000000],
    ];

    return ranges.map(([min, max]) => {
      if (max === 1000000000) {
        return {
          id: `${min}-${max}`,
          name: `Above ${currency === 'USD' ? '$' : '₹'}${(min * rate).toFixed(0)}`,
        };
      }
      return {
        id: `${min}-${max}`,
        name: `${currency === 'USD' ? '$' : '₹'}${(min * rate).toFixed(0)} - ${currency === 'USD' ? '$' : '₹'}${(max * rate).toFixed(0)}`,
      };
    });

  }, [currency, rate]);


  const handleRangeChange = (e, type) => {
    const value = Number(e.target.value);
    if (type === "min") {
      setMinPrice(Math.min(value, maxPrice - 100)); // avoid overlap
    } else {
      setMaxPrice(Math.max(value, minPrice + 100));
    }
  };
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const position = window.pageYOffset;
        if (position > 100) {
          headerRef.current.classList.add('FilterShowInButtom');
        } else {
          headerRef.current.classList.remove('FilterShowInButtom');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    props.setProductSearch(search);
  };

  useEffect(() => {
    dispatch(getAllParentCategory());
    dispatch(getAllSubCategory());

    const fetchData = async () => {
      try {
        const menufacturesRes = await axiosInstance.get(Config.END_POINT_LIST.GET_ALL_MENUFACTURES, { withCredentials: true });
        const productSizeRes = await axiosInstance.get(Config.END_POINT_LIST.GET_ALL_PRODUCT_SIZE, { withCredentials: true });
        const latestProductsRes = await axiosInstance.get(Config.END_POINT_LIST.GET_ALL_PRODUCTS, { withCredentials: true });

        if (menufacturesRes.data.success) {
          setAllMenufactures(menufacturesRes.data.menufactures.filter((m) => m.IsActive));
        }

        if (productSizeRes.data.success) {
          setAllProductSize(productSizeRes.data.ProdcutSizes);
        }

        if (latestProductsRes.data.success) {
          setAllLatestProduct(latestProductsRes.data.allProductsFeatures.filter((p) => p.IsActive));
        }
      } catch (error) {
        showErrorMsg(error);
      }
    };

    fetchData();
  }, [dispatch]);

  const clearAllFilter = (e) => {
    e.preventDefault();
    window.location.reload();
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    props.setSortByFilter && props.setSortByFilter(value);
  };
  const handleApply = (e) => {
    e.preventDefault();
    debugger
    props.setFilterValueInParent(e,
      {min: minPrice, max: maxPrice },
      "price"
    );
  };
  return (
    <aside className="col-lg-3 col-md-4 mb-6 mb-md-0">
      <div className="offcanvas offcanvas-start offcanvas-collapse w-md-50" tabIndex={-1} id="offcanvasCategory" aria-labelledby="offcanvasCategoryLabel">
        <div className="offcanvas-header d-lg-none">
          <h5 className="offcanvas-title" id="offcanvasCategoryLabel">Filter</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
        </div>

        <div className="offcanvas-body ps-lg-2 pt-lg-0">
          <div className="mb-8">
            <h5 className="mb-3">Categories</h5>
            <ul className="nav nav-category" style={{ height: '250px', overflow: 'auto' }}>
              {parentCategories.map((parent, index) => {
                const relatedChildren = childCategories?.filter((child) => child.parentCategory?._id === parent._id) || [];

                return (
                  <li className="nav-item border-bottom w-100" key={parent._id || index}>
                    <a
                      href="#"
                      className="nav-link collapsed d-flex justify-content-between align-items-center"
                      data-bs-toggle="collapse"
                      data-bs-target={`#categoryFlush${index}`}
                      aria-expanded="false"
                      aria-controls={`categoryFlush${index}`}
                    >
                      {parent.Name} <i className="feather-icon icon-chevron-right" />
                    </a>

                    <div id={`categoryFlush${index}`} className="accordion-collapse collapse">
                      <div>
                        {relatedChildren.map((child) => (
                          <div className="form-check mb-2" key={child._id}>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={child._id}
                              onChange={(e) => {
                                setCount((prev) => prev + (e.target.checked ? 1 : -1));
                                props.setFilterValueInParent(e, child._id, 'category');
                              }}
                            />
                            <label className="form-check-label" htmlFor={child._id}>{child.Name}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mb-8">
            <h5 className="mb-3">Brand</h5>
            {allMenufactures.map((m) => (
              <div className="form-check mb-2" key={m._id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={m._id}
                  onChange={(e) => {
                    setCount((prev) => prev + (e.target.checked ? 1 : -1));
                    props.setFilterValueInParent(e, m._id, 'brand');
                  }}
                />
                <label className="form-check-label text-dark" htmlFor={m._id}>{m.name}</label>
              </div>
            ))}
          </div>

          {/* <div className="mb-8">
            <h5 className="mb-3">Size</h5>
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {allProductSize.map((s) => (
                <div className="form-check mb-2" key={s._id}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={s._id}
                    onChange={(e) => {
                      setCount((prev) => prev + (e.target.checked ? 1 : -1));
                      props.setFilterValueInParent(e, s._id, 'size');
                    }}
                  />
                  <label className="form-check-label text-dark" htmlFor={s._id}>{s.name}</label>
                </div>
              ))}
            </div>
          </div> */}

          {/* Price & Rating sections can be added similarly */}

          {/* <div className="mb-8">
            <h5 className="mb-3">Price</h5>

            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {PriceValuesArray.map((price) => (
                <div className="form-check mb-2" key={price.id}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={price.id}
                    onChange={(e) => {
                      setCount((prev) => prev + (e.target.checked ? 1 : -1));
                      props.setFilterValueInParent(e, price.id, 'price');
                    }}
                  />
                  <label className="form-check-label text-dark" htmlFor={price.id}>
                    {price.name}
                  </label>
                </div>
              ))}
            </div>
          </div> */}

          <div className="mb-8">
            <h5 className="mb-3 fw-semibold">Price</h5>

            {/* Scrollable preset checkboxes */}
            <div
              style={{
                maxHeight: "180px",
                overflowY: "auto",
                border: "1px solid #eee",
                borderRadius: "8px",
                padding: "10px",
                background: "#fff",
              }}
            >
              {PriceValuesArray.map((price) => (
                <div className="form-check mb-2" key={price.id}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={price.id}
                    onChange={(e) => {
                      props.setFilterValueInParent(e, price.id, "price");
                    }}
                  />
                  <label
                    className="form-check-label text-dark"
                    htmlFor={price.id}
                    style={{ fontSize: "0.95rem" }}
                  >
                    {price.name}
                  </label>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="text-center my-3 text-muted small">— or set custom range —</div>

            {/* Dual range slider */}
            <div className="price-slider position-relative p-3 rounded border bg-light">
              <div className="d-flex justify-content-between mb-2">
                <span>
                  {currency === "USD" ? "$" : "₹"}
                  {minPrice}
                </span>
                <span>
                  {currency === "USD" ? "$" : "₹"}
                  {maxPrice}
                </span>
              </div>

              <div className="range-container position-relative" style={{ height: "40px" }}>
                <input type="range" min="0" max="10000" step="100" value={minPrice} onChange={(e) => handleRangeChange(e, "min")} className="range-thumb" style={{ zIndex: minPrice > maxPrice - 100 ? "5" : "1" }}/>
                
                <input type="range" min="0" max="10000" step="100" value={maxPrice} onChange={(e) => handleRangeChange(e, "max")} className="range-thumb" />
              </div>

              <div className="text-center mt-3">
                <button className="btn btn-sm btn-dark" onClick={handleApply}>
                  Apply Range
                </button>
              </div>
            </div>
          </div>

          <div className="Clera-all-filter bg-primary text-center text-white" ref={headerRef} style={{ borderRadius: "5px", cursor: "pointer" }}>

            <p className='p-2' onClick={clearAllFilter}>
              <i class="fa-solid fa-arrows-rotate me-2"></i> Clear All Filter
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
