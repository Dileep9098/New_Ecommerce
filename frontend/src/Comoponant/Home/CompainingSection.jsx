// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axiosInstance from '../../../ApiHendler/axiosInstance';
// import Config from '../../../Config/Config';
// import { showErrorMsg } from '../../../utils/ShowMessages';
// import "./HomePageStyle.css"
// const BASE_URL = import.meta.env.VITE_IMG_URL;



// export default function CampaignSection() {
//     const [allCompaingns, setAllCompaingns] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axiosInstance.get(Config.END_POINT_LIST["GET_ALL_COMPAINGNS"], { withCredentials: true });
//                 if (response.data.success) {
//                     setAllCompaingns(response.data.allCompaingns);
//                 } else {
//                     showErrorMsg(response.data.message);
//                 }
//             } catch (error) {
//                 showErrorMsg(error.response.data.message);
//             }
//         };
//         fetchData();
//     }, []);

//     return (
//         <section className="my-3 py-8 bg-gray-300">
//             <div className="container-fluid">
//                 <div className="row">
//                     {/* Dynamically render the campaigns */}
//                     {allCompaingns.map((campaign) => (
//                         <div key={campaign._id} className="col-lg-4 col-md-4 col-sm-6 col-12 mb-2">
//                             <div className="compaign-banner-main">
//                                 <div className="compaign-img">
//                                     <img src={`${BASE_URL}/banner/${campaign?.file}`} alt={campaign.mainTitle} />
//                                 </div>
//                                 <div className="compaign-title">
//                                     <h3>{campaign.mainTitle}</h3>
//                                     <h4>{campaign.DiscountTitle}</h4>
//                                     <p>{campaign.body}</p>
//                                     <p><Link to={`/campaigns/${campaign._id}`}>View Details <i className="ri-arrow-right-double-line"></i></Link></p>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }



// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axiosInstance from "../../../ApiHendler/axiosInstance";
// import Config from "../../../Config/Config";
// import { showErrorMsg } from "../../../utils/ShowMessages";
// import "./HomePageStyle.css";

// const BASE_URL = import.meta.env.VITE_IMG_URL;

// export default function CampaignSection() {
//   const [allCompaingns, setAllCompaingns] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axiosInstance.get(
//           Config.END_POINT_LIST["GET_ALL_COMPAINGNS"],
//           { withCredentials: true }
//         );
//         if (response.data.success) {
//           setAllCompaingns(response.data.allCompaingns);
//         } else {
//           showErrorMsg(response.data.message);
//         }
//       } catch (error) {
//         showErrorMsg(error.response?.data?.message || "Something went wrong!");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <section className="campaign-section">
//       <div className="container">
//         <h2 className="section-title">Featured Campaigns</h2>

//         {loading ? (
//           <div className="loader-box">
//             <div className="loader"></div>
//             <p>Loading campaigns...</p>
//           </div>
//         ) : allCompaingns.length === 0 ? (
//           <div className="no-data">
//             <p>No active campaigns at the moment.</p>
//           </div>
//         ) : (
//           <div className="campaign-grid">
//             {allCompaingns.map((campaign, index) => (
//               <div
//                 key={campaign._id}
//                 className="campaign-card"
//                 style={{ animationDelay: `${index * 0.15}s` }}
//               >
//                 <div className="card-img">
//                   <img
//                     src={`${BASE_URL}/banner/${campaign?.file}`}
//                     alt={campaign.mainTitle}
//                     loading="lazy"
//                   />
//                   <div className="gradient-overlay"></div>
//                   <div className="card-content">
//                     <h3>{campaign.mainTitle}</h3>
//                     <p className="discount">{campaign.DiscountTitle}</p>
//                     <p className="desc">{campaign.body}</p>
//                     <Link to={`/campaigns/${campaign._id}`} className="view-btn">
//                       Explore <i className="ri-arrow-right-line"></i>
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../ApiHendler/axiosInstance";
import Config from "../../Config/Config";
import { showErrorMsg } from "../../utils/ShowMessages";
import "./HomePageStyle.css";

const BASE_URL = import.meta.env.VITE_IMG_URL;

export default function CampaignSection() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(
          Config.END_POINT_LIST["GET_ALL_COMPAINGNS"],
          { withCredentials: true }
        );
        if (res.data.success) setCampaigns(res.data.allCompaingns);
        else showErrorMsg(res.data.message);
      } catch (err) {
        showErrorMsg(err.response?.data?.message || "Failed to load campaigns");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="premium-campaign-section">
      <div className="container-fluid">
        <div className="section-header">
          <h2>Featured Campaigns</h2>
          <p>Experience the most exclusive offers & stories.</p>
        </div>

        {loading ? (
          <div className="loader-wrapper">
            <div className="loader-circle"></div>
            <p>Loading campaigns...</p>
          </div>
        ) : campaigns.length === 0 ? (
          <div className="no-campaigns">
            <p>No campaigns available currently.</p>
          </div>
        ) : (
          <div className="premium-grid">
            {campaigns.map((item, i) => (
              <div
                key={item._id}
                className="premium-card"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="card-image">
                  <img
                    src={`${BASE_URL}/banner/${item?.file}`}
                    alt={item.mainTitle}
                    loading="lazy"
                  />
                  <div className="card-overlay"></div>
                  <div className="card-info">
                    <h3>{item.mainTitle}</h3>
                    <p className="tagline">{item.DiscountTitle}</p>
                    <p className="excerpt">{item.body}</p>
                    <Link to={`/campaigns/${item._id}`} className="glass-btn">
                      Explore Now <i className="ri-arrow-right-line"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
