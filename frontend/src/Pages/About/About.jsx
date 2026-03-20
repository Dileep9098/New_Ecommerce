import React, { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./About.css"
export default function About() {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);
    const progressRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const section = document.querySelector(".journey-section");
            const progress = progressRef.current;
            if (!section || !progress) return;

            const rect = section.getBoundingClientRect();
            const winHeight = window.innerHeight;
            const visible = Math.min(
                Math.max((winHeight - rect.top) / (rect.height + winHeight), 0),
                1
            );
            progress.style.height = `${visible * 100}%`;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const steps = [
        {
            year: "2016",
            title: "The Beginning",
            desc: "Started with a bold idea to revolutionize online shopping and bring convenience to every home.",
            icon: "bi bi-lightbulb",
        },
        {
            year: "2019",
            title: "Expansion & Innovation",
            desc: "Scaled operations, built partnerships with top brands, and introduced express delivery nationwide.",
            icon: "bi bi-graph-up-arrow",
        },
        {
            year: "2022",
            title: "Global Recognition",
            desc: "Reached 3M+ happy users worldwide, redefining digital retail with speed, trust, and innovation.",
            icon: "bi bi-globe2",
        },
        {
            year: "2025",
            title: "The Future of eCommerce",
            desc: "Embracing AI, sustainability, and immersive experiences to shape the next decade of shopping.",
            icon: "bi bi-rocket-takeoff",
        },
    ];

    return (
        <>
            {/* Hero Banner */}
            <section className="py-5 text-center text-white" style={{ backgroundImage: "linear-gradient(#accbee 0%, #e7f0fd 100%)", minHeight: "60vh", display: "flex", alignItems: "center", }} >
                <div className="container">
                    <h1 data-aos="fade-down" className="display-4 fw-bold mb-3">
                        Redefining the Future of Online Shopping
                    </h1>
                    <p data-aos="fade-up" className="lead text-black-50 mx-auto" style={{ maxWidth: "800px" }}>
                        From groceries to gadgets, fashion to furniture — we’re not just an
                        eCommerce platform. We’re a digital ecosystem built to connect
                        people, products, and possibilities.
                    </p>
                    <img data-aos="zoom-in" src="/assets/images/banner/b1.jpg" alt="Ecommerce Future" className="img-fluid rounded shadow-lg mt-4 w-100" style={{ maxHeight: "450px" }} />
                </div>
            </section>

            {/* Who We Are */}
            <section className="py-5 bg-light">
                <div className="container">
                    <div className="row align-items-center gy-4">
                        <div className="col-md-6" data-aos="fade-right">
                            <img src="/assets/images/banner/b2.jpg" alt="Who we are" className="img-fluid rounded shadow w-100" style={{ height: "400px" }} />
                        </div>
                        <div className="col-md-6" data-aos="fade-left">
                            <h2 className="fw-bold mb-3">Who We Are</h2>
                            <p className="text-muted mb-3">
                                We’re a passionate team of innovators, technologists, and
                                dreamers, united by a mission to make online shopping effortless
                                and exciting. From small startups to global brands, we empower
                                businesses to sell smarter and customers to shop better.
                            </p>
                            <p className="text-muted">
                                Every click, every order, and every smile matters to us. Our
                                platform blends technology, trust, and human touch — ensuring
                                fast delivery, secure payments, and an experience you’ll love
                                coming back to.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section
                className="py-5 text-white"
                style={{ backgroundImage: "linear-gradient(#accbee 0%, #e7f0fd 100%)" }}
            >
                <div className="container text-center">
                    <h2 className="fw-bold mb-5">Trusted by Millions </h2>
                    <div className="row gy-4">
                        {[
                            { value: "1M+", label: "Happy Customers" },
                            { value: "5k+", label: "Brands & Sellers" },
                            { value: "+", label: "Cities & Countries" },
                            { value: "20k+", label: "Daily Orders" },
                        ].map((stat, index) => (
                            <div className="col-6 col-md-3" data-aos="zoom-in" key={index}>
                                <h3 className="display-5 fw-bold">{stat.value}</h3>
                                <p className="text-dark">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Mission */}
            <section className="mission-vision-section py-5 position-relative overflow-hidden mt-5">
                <div className="container text-center position-relative">
                    {/* Header */}
                    <h2 data-aos="fade-up" className="fw-bold display-5 text-dark mb-4">
                        Our Mission & Vision
                    </h2>
                    <p
                        data-aos="fade-up"
                        className="text-muted mx-auto mb-5"
                        style={{ maxWidth: "800px" }}
                    >
                        We believe shopping should be more than a transaction — it should be
                        an experience. Our goal is to blend innovation, trust, and global reach
                        to make online commerce effortless and inspiring for everyone.
                    </p>

                    {/* Cards */}
                    <div className="row gy-4 justify-content-center">
                        {[
                            {
                                icon: "bi bi-lightning-charge-fill",
                                title: "Innovation First",
                                desc: "We constantly evolve with technology — delivering AI-driven personalization, predictive search, and faster checkout experiences.",
                                delay: "100",
                            },
                            {
                                icon: "bi bi-people-fill",
                                title: "Customer Centric",
                                desc: "Our foundation is built on customer trust. Every feature, product, and service is designed with you at the heart of it.",
                                delay: "200",
                            },
                            {
                                icon: "bi bi-globe2",
                                title: "Global Vision",
                                desc: "We’re building a borderless eCommerce ecosystem — connecting buyers, sellers, and creators around the world.",
                                delay: "300",
                            },
                        ].map((item, i) => (
                            <div key={i} className="col-md-4" data-aos="fade-up" data-aos-delay={item.delay}>
                                <div className="mv-card h-100 position-relative">
                                    <div className="mv-icon-wrapper mb-3 mx-auto">
                                        <i className={`${item.icon} mv-icon`}></i>
                                    </div>
                                    <h5 className="fw-bold mb-2">{item.title}</h5>
                                    <p className="text-muted small">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Premium Gradient Background */}
                <div className="mv-bg-gradient"></div>  </section>

            {/* Journey Timeline */}
            <section className="journey-section py-5 position-relative">
                <div className="container">
                    {/* Header */}
                    <div className="text-center mb-5">
                        <h2 className="fw-bold display-5 text-dark">Our Journey </h2>
                        <p className="text-muted mx-auto" style={{ maxWidth: "720px" }}>
                            Every chapter of our story reflects our passion for innovation,
                            customer trust, and building something timeless.
                        </p>
                    </div>

                    {/* Timeline */}
                    <div className="timeline-container position-relative">
                        <div className="timeline-line-bg"></div>
                        <div ref={progressRef} className="timeline-line-progress"></div>

                        {steps.map((step, i) => (
                            <div
                                key={i}
                                className={`timeline-step d-flex flex-column flex-md-row align-items-center ${i % 2 === 0 ? "flex-md-row-reverse" : ""
                                    }`}
                            >
                                <div className="timeline-icon shadow-lg">
                                    <i className={`${step.icon}`}></i>
                                </div>
                                <div className="timeline-card rounded-4 shadow-sm bg-white p-4">
                                    <h5 className="fw-bold text-success mb-1">{step.year}</h5>
                                    <h4 className="fw-semibold mb-2">{step.title}</h4>
                                    <p className="text-muted small">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div> </section>
            {/* Testimonials */}

            <section className="testimonials-section py-5 position-relative overflow-hidden">
                <div className="container text-center position-relative">
                    {/* Header */}
                    <h2 data-aos="fade-up" className="fw-bold display-5 mb-4 text-dark">
                        What People Say 💬
                    </h2>
                    <p
                        data-aos="fade-up"
                        className="text-muted mx-auto mb-5"
                        style={{ maxWidth: "750px" }}
                    >
                        Hear from our amazing customers and partners who’ve experienced the
                        difference — where innovation meets reliability.
                    </p>

                    {/* Reviews */}
                    <div className="row gy-4 justify-content-center">
                        {[
                            {
                                quote:
                                    "Shopping here feels premium! The packaging, speed, and quality are top-notch.",
                                name: "Aarav Verma",
                                location: "Delhi, India",
                                avatar: "https://randomuser.me/api/portraits/men/32.jpg",
                            },
                            {
                                quote:
                                    "I love how quick the delivery is. Customer support is super friendly too!",
                                name: "Sophia Brown",
                                location: "London, UK",
                                avatar: "https://randomuser.me/api/portraits/women/45.jpg",
                            },
                            {
                                quote:
                                    "As a seller, this platform gave my business a new life. The dashboard is easy to use!",
                                name: "Ankit Shah",
                                location: "Ahmedabad, India",
                                avatar: "https://randomuser.me/api/portraits/men/22.jpg",
                            },
                        ].map((review, i) => (
                            <div className="col-md-4" key={i} data-aos="zoom-in" data-aos-delay={i * 150}>
                                <div className="review-card bg-white shadow-sm rounded-4 p-4 h-100 position-relative">
                                    <i className="bi bi-quote text-success fs-1 opacity-25 position-absolute top-0 start-0 m-3"></i>
                                    <p className="text-muted fst-italic mt-4 mb-4 lh-lg">
                                        “{review.quote}”
                                    </p>
                                    <div className="d-flex align-items-center justify-content-center gap-3 mt-auto">
                                        <img
                                            src={review.avatar}
                                            alt={review.name}
                                            className="rounded-circle shadow-sm"
                                            width="55"
                                            height="55"
                                        />
                                        <div className="text-start">
                                            <h6 className="fw-bold mb-0">{review.name}</h6>
                                            <small className="text-muted">{review.location}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Background Glow */}
                <div className="testimonial-bg-glow"></div>  </section>

            {/* CTA */}
            <section
                className="py-5 text-white text-center"
                style={{
                    background: "linear-gradient(135deg, #198754, #0f5132)",
                }}
            >
                <div className="container">
                    <h2 className="fw-bold mb-3">Be Part of Our Journey</h2>
                    <p
                        className="text-white-50 mb-4"
                        style={{ maxWidth: "700px", margin: "auto" }}
                    >
                        Whether you’re a shopper, a seller, or a dreamer — let’s grow
                        together. Because when we connect, the world shops better.
                    </p>
                    <a href="/contact" className="btn btn-light btn-lg fw-bold">
                        Join Us Now
                    </a>
                </div>
            </section>
        </>
    );
}
