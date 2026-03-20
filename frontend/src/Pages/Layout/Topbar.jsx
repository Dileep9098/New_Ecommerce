import axios from 'axios';
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../ApiHendler/axiosInstance';
import Config from '../../Config/Config';

export default function Topbar() {
    const [language, setLanguage] = useState("English");
    const [settings, setSettings] = useState({});
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                
                const response = await axiosInstance.get(Config.END_POINT_LIST["GET_THEME_TOPBAR"], { withCredentials: true });
                if (response.data.success && response.data.setting) {
                    if (response.data.setting.status === "Inactive") {
                        setSettings({});
                        return;
                    }
                    setSettings(response.data.setting);
                }
            } catch (error) {
                console.error("Error fetching topbar settings:", error);
            }
        };
        fetchSettings();
    }, []);

    // Gradient or solid background logic
    const topbarStyle = {
        background: settings.backgroundColor
            ? settings.backgroundColor.startsWith("linear-gradient")
                ? settings.backgroundColor
                : settings.backgroundColor
            : '#f1f1f1',
        color: settings.textColor ? settings.textColor : 'black'
    };

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 991);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <div className="py-3" style={topbarStyle}>
                <div className="container-fluid">
                    <div className="row">
                        {/* Render dynamic text columns */}
                        <div className="col-md-10 text-center">
                            <div className="row">
                                {/* ✅ Show only one text on mobile, all texts on desktop */}
                                {Array.isArray(settings.texts) && (
                                    isMobile ? (
                                        <div className="col-12 mb-2">
                                            <span className="text-white">{settings.texts[0]}</span>
                                        </div>
                                    ) : (
                                        settings.texts.map((item, ind) => (
                                            <div
                                                key={ind}
                                                className={`col-lg-${12 / (settings.numberOfColumns || 1)} col-sm-${12 / (settings.numberOfColumns || 1)} col-12 mb-2`}
                                            >
                                                <span className="text-white">{item}</span>
                                            </div>
                                        ))
                                    )
                                )}
                            </div>
                        </div>

                        {/* Language Section */}
                        <div className="col-md-2 d-none d-md-block text-center">
                            <div className="dropdown selectBox">
                                <div className="dropdown">
                                    <button
                                        className="dropdown-toggle"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        {settings.language || "English"}
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <button
                                                className="dropdown-item"
                                                onClick={() => setLanguage("English")}
                                            >
                                                🇬🇧 English
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className="dropdown-item"
                                                onClick={() => setLanguage("Deutsch")}
                                            >
                                                🇩🇪 Deutsch
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className="dropdown-item"
                                                onClick={() => setLanguage("Hindi")}
                                            >
                                                🇮🇳 Hindi
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
