import React from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import "./shere.css"
import Config from '../Config/Config';
import { replaceWhiteSpacesWithDashSymbolInUrl } from '../utils/ConversionHelper';

export default function Shere(props) {
    const [showPopover, setShowPopover] = useState(false);
    const [copyurl, setCopyUrl] = useState(false);
    const popoverRef = useRef(null);

    const togglePopover = () => {
        setShowPopover(!showPopover);
    };

    const handleCopy = async () => {
        const urlViewDetailImage = `${Config.WEBSITE_IBASE_URL}product-details/${props.ProductId}/${props.ProductsCategoriesMappings.map((category) => replaceWhiteSpacesWithDashSymbolInUrl(category.Name)).join('-') ?? "shop"}/${replaceWhiteSpacesWithDashSymbolInUrl(props.ProductName)}`;

        try {
            await navigator.clipboard.writeText(urlViewDetailImage);
            setCopyUrl(true);
            setTimeout(() => {
                setCopyUrl(false);
                setShowPopover(false);
            }, 1500);
        } catch (err) {
            console.error('Failed to copy: ', err);
            alert('Failed to copy link. Please try again.');
        }
    };

    //  {
    //     const urlViewDetailImage = `${Config.WEBSITE_IBASE_URL}product-details/${products._id}/${products.ProductsCategoriesMappings.map((category) => replaceWhiteSpacesWithDashSymbolInUrl(category.Name)).join('-') ?? "shop"}/${replaceWhiteSpacesWithDashSymbolInUrl(products.ProductName)}`
    return (
        <>
            <div className="shareBox">
                <span className="material-icons" onClick={togglePopover}>
                    <span className="material-symbols-outlined">ios_share</span>
                </span>
                <div className="boxshare">
                    <span>share</span>
                </div>
            </div>
            {showPopover && (
                <div ref={popoverRef} className="popover">
                    <header>
                        <button className="close-button" onClick={togglePopover} aria-label="Close Share Popup">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                        <span className="material-symbols-outlined">share</span>
                    </header>
                    <div className="popover-body">
                        <ul className="share-options">
                            <li>
                                <a className="share-option email" href="mailto:info@parijathandicraft.com" onClick={togglePopover}>
                                    <span className="material-symbols-outlined text-dark me-2">mail</span>
                                    <span className="label">Email</span>
                                </a>
                            </li>
                            <li>
                                <a className="share-option pinterest" href="https://in.pinterest.com/handicraftparijat/" onClick={togglePopover}>
                                  <i class="bi bi-pinterest me-2 fs-4 text-red-500"></i>
                                    <span className="label">Pinterest</span>
                                </a>
                            </li>
                            <li>
                                <a className="share-option facebook" href="https://www.facebook.com/prijathandicraft/" onClick={togglePopover}>
                                    <i class="bi bi-facebook me-2 fs-4 text-blue-500"></i>
                                    <span className="label">Facebook</span>
                                </a>
                            </li>
                            <li>
                                <a className="share-option twitter" href="https://x.com/handicraftpari1" onClick={togglePopover}>
                                   <i class="bi bi-twitter-x me-2 fs-4 text-dark"></i>
                                    <span className="label">X</span>
                                </a>
                            </li>
                            <li>
                                <a className="share-option copy" href="#" onClick={(e) => { e.preventDefault(); handleCopy(); }}>
                                    <span className="material-symbols-outlined text-dark me-2">{copyurl ? <span style={{ color: "green" }}>done_all</span> : "content_copy"}</span>
                                    <span className="label">{copyurl ? <span style={{ color: "green" }}>Link Copied!</span> : "Copy Link"}</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    {/* <div className="arrow"></div> */}
                </div>
            )}

        </>
    )
}
