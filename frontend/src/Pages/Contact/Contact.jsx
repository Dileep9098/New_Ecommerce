import React from 'react'
import { Link } from 'react-router-dom'
import "./contact.css"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import axiosInstance from '../../ApiHendler/axiosInstance';
import Config from '../../Config/Config';
import { showErrorMsg, showSuccessMsg } from '../../utils/ShowMessages';
// import MetaData from '../Layout/MetaData';
export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axiosInstance.post(`${Config.END_POINT_LIST["ADD_CONTACT"]}`, formData,{withCredentials:true});
            showSuccessMsg(res.data.message);
            setFormData({ name: "", phone: "", email: "", subject: "", message: "", });
        } catch (error) {
            console.error(error);
            showErrorMsg(error.response?.data?.message || "Failed to send message");
        }
    };
    return (
        <>
            {/* <MetaData title={"Contact"}/>
         */}
            <section className="">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="">
                                {/* <h2>Contact Us</h2> */}
                                <div class="premium-heading">
                                    <div class="lines top-line"></div>
                                    <h2>Contact Us </h2>
                                    <div class="lines bottom-line"></div>
                                    {/* <span class="view-all">View All →</span> */}
                                </div>
                                {/* <div className="">
                                    <Link to="/">Home</Link>/
                                    <span>Contact Us</span>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section id="contact" className="contact section">

                <div className="container section-title">
                    <h2 id='size1'>Contact</h2>
                </div>

                <div className="container my-10">

                    <div className="row gy-4">

                        <div className="col-lg-5">

                            <div className="">

                                <div className="info-item d-flex">
                                    <i className="ri-map-pin-fill"></i>
                                    <div>
                                        <h3>Parmanent Address</h3>
                                        <p>Address: SHOP NO-27GF, GDA SHOPPING COMPLEX NYAY KHAND-1, INDIRAPURAM, GHAZIABAD-201014, UTTAR PRADESH
                                        </p>
                                    </div>
                                </div>

                                <div className="info-item d-flex" >
                                    <i className="ri-phone-fill"></i>
                                    <div>
                                        <h3>Call Us</h3>
                                        <p>+91 9953567333</p>
                                    </div>
                                </div>

                                <div className="info-item d-flex" >
                                    <i className="ri-mail-send-line"></i>
                                    <div>
                                        <h3>Email Us</h3>
                                        <p><Link to="mailto:info@parijathandicraft.com">info@parijathandicraft.com</Link></p>
                                    </div>
                                </div>


                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d28348.070657870883!2d77.329476!3d28.612317!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce9f5bc80c859%3A0x46e441c83b8c4222!2sSHOP%20NO-27GF%2C%20GDA%20SHOPPING%20COMPLEX%20NYAY%20KHAND-1%2C%20INDIRAPURAM%2C%20GHAZIABAD-201014%2C%20UTTAR%20PRADESH!5e0!3m2!1sen!2sus!4v1673448000000!5m2!1sen!2sus"

                                    frameBorder="0"
                                    style={{ border: "0", width: "100%", height: "270px" }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade">
                                </iframe>

                                {/* <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d48389.78314118045!2d77.391026!3d28.576623!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf1ebcf42e3b9%3A0x9b95b5a5f59bbf0d!2sSector%2015%20Naya%20Bans%2C%20Noida%2C%20Uttar%20Pradesh%2C%20India!5e0!3m2!1sen!2sus!4v1676961268712!5m2!1sen!2sus"
                    frameBorder="0"
                    style={{ border: "0", width: "100%", height: "270px" }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade">
                </iframe> */}


                            </div>
                        </div>

                        <div className="col-lg-7">
                            <form className="php-email-form" onSubmit={handleSubmit}>
                                <div className="row gy-4">
                                    <div className="col-md-6">
                                        <TextField
                                            name="name"
                                            label="Name"
                                            placeholder="Enter Full Name"
                                            className="w-100"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-md-6 ">
                                        <TextField
                                            name="phone"
                                            label="Number"
                                            type="number"
                                            placeholder="Enter Mobile Number"
                                            value={formData.number}
                                            onChange={handleChange}
                                            className="w-100"
                                        />
                                    </div>

                                    <div className="col-md-12">
                                        <TextField
                                            name="email"
                                            label="Email"
                                            type="email"
                                            className="w-100"
                                            placeholder="Email Address"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-md-12">
                                        <TextField
                                            name="subject"
                                            label="Subject"
                                            type="text"
                                            className="w-100"
                                            placeholder="Enter Subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-md-12">
                                        <TextField
                                            name="message"
                                            label="Your Message"
                                            type="text"
                                            multiline
                                            rows={4}
                                            className="w-100"
                                            placeholder="Enter your Message"
                                            value={formData.message}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-md-12 text-center">
                                        <button type="submit" className="sendmessage">
                                            Send Message
                                        </button>
                                    </div>
                                </div>
                            </form>

                        </div>

                    </div>

                </div>

            </section>


        </>
    )
}
