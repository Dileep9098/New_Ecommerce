// import React, { useEffect } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import "./HomePageStyle.css";

// export default function HotDealBanner() {
//   useEffect(() => {
//     AOS.init({ duration: 1000, once: true });
//   }, []);


// const banners = [
//   {
//     title: "Exclusive Deals Tailored Just for You",
//     subtitle:
//       "Discover top-quality products from trusted brands — designed to make your lifestyle smarter, easier, and more stylish.",
//     offer: "Up to 50% Off on Select Items",
//     buttonText: "Shop Now",
//           image: "assets/images/banner/b1.jpg",

//     link: "#",
//     animation: "fade-right",
//   },
//   {
//     title: "Your Favorites Are Back with Big Savings",
//     subtitle:
//       "From daily essentials to trending must-haves, enjoy exciting discounts and limited-time offers you won’t want to miss.",
//     offer: "Save Big — Limited Time Only!",
//     buttonText: "Explore Deals",
//     image:
//       "assets/images/banner/b3.jpg",
//     link: "#",
//     animation: "fade-left",
//   },
// ];

//   return (
//     <section className="hotdeal-section py-5">
//       <div className="container">
//         <div className="row g-4">
//           {banners.map((item, index) => (
//             <div
//               key={index}
//               className="col-12 col-md-6"
//               data-aos={item.animation}
//             >
//               <div
//                 className="hotdeal-banner d-flex flex-column justify-content-center rounded text-white"
//                 style={{ backgroundImage: `url(${item.image})`,backgroundSize: "cover", backgroundPosition: "center", borderRadius: "0.5rem",}}
//               >
//                 <div className="banner-content text-center text-md-start">
//                   <h3 className="fw-bold mb-1 animate-text">{item.title}</h3>
//                   <p className="mb-4 animate-text">
//                     {item.subtitle} – <span className="fw-bold">{item.offer}</span>
//                   </p>
//                   <a href={item.link} className="btn btn-light fw-bold">
//                     {item.buttonText}
//                   </a>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }



import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./HomePageStyle.css";

export default function HotDealBanner() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const banners = [
    {
      title: "Exclusive Deals Tailored Just for You",
      subtitle:
        "Discover top-quality products from trusted brands — designed to make your lifestyle smarter, easier, and more stylish.",
      offer: "Up to 50% Off on Select Items",
      buttonText: "Shop Now",
      image: "assets/images/banner/b5.jpg",
      link: "#",
      animation: "fade-right",
    },
    {
      title: "Your Favorites Are Back with Big Savings",
      subtitle:
        "From daily essentials to trending must-haves, enjoy exciting discounts and limited-time offers you won’t want to miss.",
      offer: "Save Big — Limited Time Only!",
      buttonText: "Explore Deals",
      image: "assets/images/banner/b3.jpg",
      link: "#",
      animation: "fade-left",
    },
  ];

  return (
    <section className="hotdeal-section py-5">
      <div className="container">
        <div className="row g-4">
          {banners.map((item, index) => (
            <div
              key={index}
              className="col-12 col-md-6"
              data-aos={item.animation}
            >
              <div
                className="hotdeal-banner position-relative overflow-hidden rounded"
                style={{
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",

                }}
              >
                {/* Overlay */}
                <div className="banner-overlay"></div>

                <div className="banner-content position-relative text-white p-4 p-md-5">
                  <h3 className="fw-bold mb-3">{item.title}</h3>
                  <p className="mb-4">
                    {item.subtitle} –{" "}
                    <span className="fw-bold text-warning">{item.offer}</span>
                  </p>
                  <a href={item.link} className="btn btn-warning fw-bold shadow-sm px-4 py-2">
                    {item.buttonText}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
