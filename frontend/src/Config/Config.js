const Config = {
    ADMIN_BASE_URL: "http://localhost:5000",
    WEBSITE_IBASE_URL: "http://localhost:5173/",

    END_POINT_LIST: {

        // ------------------|| Theme Settings ||---------------------------

        TOPBAR_SETTING: "/api/v1/theme/topbar",
        GET_THEME_TOPBAR: "/api/v1/get-theme/topbar",
        SEARCHBAR_SETTING: "/api/v1/theme/searchbar",
        GET_THEME_SEARCHBAR: "/api/v1/get-theme/searchbar",


        // Menu
        GET_MENUS: "/api/v1/menu",
        ADD_MENU: "/api/v1/menu/add",
        DELETE_MENU: "/api/v1/menu-delete", // :id lagana hai
        UPDATE_MENU: "/api/v1/menu-update", // :id lagana hai
        // Main Bar Settings
        GET_MAIN_BAR_SETTINGS: "/api/v1/main-bar",
        UPDATE_MAIN_BAR_SETTINGS: "/api/v1/main-bar/update",

        //Banner
        ADD_HOME_BANNER: "/api/v1/admin/add-home-banner/",
        GET_ALL_HOME_BANNER: "/api/v1/admin/get-home-banner",
        DELETE_HOME_BANNER: "/api/v1/admin/delete-home-banner",
        UPDATE_HOME_BANNER: "/api/v1/admin/update-home-banner",
        UPDATE_BANNER_STYLE: "/api/v1/admin-select-slider-style",

        ADD_MENUFATURES: "/api/v1/admin/add-menufatures/",
        GET_ALL_MENUFACTURES: "/api/v1/admin/get-all-menufatures",
        DELETE_MENUFACTURES: "/api/v1/admin/delete-menufatures",
        UPDATE_MENUFACTURES: "/api/v1/admin/update-menufatures",

        ADD_PAYMENTSMETHOD: "/api/v1/admin/add-payments-method",
        GET_ALL_PAYMENTSMETHOD: "/api/v1/admin/get-all-payments-method",
        DELETE_PAYMENTSMETHOD: "/api/v1/admin/delete-payments-method",
        UPDATE_PAYMENTSMETHOD: "/api/v1/admin/update-payments-method",

        ADD_DISCOUNT_DETAILS: "/api/v1/admin/add-discout-data/",
        GET_ALL_DISCOUNT_DETAILS: "/api/v1/admin/get-all-discout-data",
        DELETE_DISCOUNT_DETAILS: "/api/v1/admin/delete-discout-data",
        UPDATE_DISCOUNT_DETAILS: "/api/v1/admin/update-discout-data",

        ADD_CONTACT: "/api/v1/send-contaction",
        GET_ALL_CONTACT: "/api/v1/admin/get-all-contaction",
        DELETE_CONTACT: "/api/v1/admin/delete-contact",

        ADD_SUBSCRIBERS: "/api/v1/send-subscriber",
        GET_ALL_SUBSCRIBERS: "/api/v1/admin/get-all-subscriber",
        DELETE_SUBSCRIBERS: "/api/v1/admin/delete-subscriber",

        ADD_HOT_DEAL_BANNER: "/api/v1/admin/add-hot-deal-banner/",
        GET_ALL_HOT_DEAL_BANNER: "/api/v1/admin/get-hot-deal-banner",
        DELETE_HOT_DEAL_BANNER: "/api/v1/admin/delete-hot-deal-banner",
        UPDATE_HOT_DEAL_BANNER: "/api/v1/admin/update-hot-deal-banner",

        ADD_COMPAINGNS: "/api/v1/admin/add-compaingns/",
        GET_ALL_COMPAINGNS: "/api/v1/admin/get-compaingns",
        DELETE_COMPAINGNS: "/api/v1/admin/delete-compaingns",
        UPDATE_COMPAINGNS: "/api/v1/admin/update-compaingns",
        UPDATE_ISACTIVE_COMPAINGNS: "/api/v1/admin/update-IsActive-compaingns",


        ADD_SITE_LOGO: "/api/v1/admin/add-siteLogo/",
        GET_ALL_SITE_LOGO: "/api/v1/admin/get-siteLogo",
        DELETE_SITE_LOGO: "/api/v1/admin/delete-siteLogo",
        UPDATE_SITE_LOGO: "/api/v1/admin/update-siteLogo",

        GET_ALL_PRODUCTS: "/api/v1/admin/get-all-product-data-featured",

        ADD_BLOGS: "/api/v1/admin/add-blog/",
        GET_ALL_BLOGS: "/api/v1/admin/get-blog",
        DELETE_BLOGS: "/api/v1/admin/delete-blog",
        UPDATE_BLOGS: "/api/v1/admin/update-blog",

        ADD_PRODUCT_SIZE: "/api/v1/admin/add-productSize/",
        GET_ALL_PRODUCT_SIZE: "/api/v1/admin/get-all-productSize",
        DELETE_PRODUCT_SIZE: "/api/v1/admin/delete-productSize",
        UPDATE_PRODUCT_SIZE: "/api/v1/admin/update-productSize",

        ADD_TAX_DETAILS: "/api/v1/admin/add-tax-details/",
        GET_ALL_TAX_DETAILS: "/api/v1/admin/get-all-tax-details",
        DELETE_TAX_DETAILS: "/api/v1/admin/delete-tax-details",
        UPDATE_TAX_DETAILS: "/api/v1/admin/update-tax-details",

        ADD_PRODUCT_REVIEWS: "/api/v1/add-productReview",
        GET_SIGNLE_PRODUCT: "/admin/get-single-product/",

        GET_COUPON_CODE_DISCOUNT: "/api/v1/get-coupon-code-despount/",

        ADD_NEW_ORDER: "/api/v1/add-new-order/",
        GET_ALL_ORDERS: "/api/v1/admin/get-all-order-data/",
        GET_SINGLE_ORDER: "/api/v1/admin/get-single-order-details",
        GET_ORDER_SHIPPING_DEATILS: "/api/v1/admin/get-shipping-order-details",
        UPDATE_ORDER_SHIPPING_DEATILS: "/api/v1/admin/update-shipping-order-details",



        UPDATE_USER_DETAILS: "/api/v1/me/update",
        UPDATE_USER_DETAILS_DATA: "/api/v1/update-user-data",
        UPDATE_USER_PASSWORD: "/api/v1/password/update",

        PAY_U_MONEY_PAYMNETS: "/api/v1/pay-u-money-payment",
        PAY_U_MONEY_PAYMNETS_SUCCESS: "/api/v1/pay-u-money-payment-success",
        PAY_U_MONEY_PAYMNETS_FAIL: "/api/v1/pay-u-money-payment-fail",


        GET_ALL_MY_ORDERS: "/api/v1/get-all-my-orders",
        DELETE_MY_ORDERS: "/api/v1/delete-my-orders",


        GET_ADMIN_USER_DETAILS: "/api/v1/admin/user",
        UPDATE_ADMIN_USER_DEATAILS: "/api/v1/admin/update-user",



        UPLOAD_BULK_EXCEL_FILE: "/api/v1/admin/bulk-upload-excel",

        ADD_ADDRESS: "/api/v1/add-address",
        ADD_MY_ADDRESS: "/api/v1/my-address",
        ADD_DEFAULT_ADDRESS: "/api/v1/default-address",




    },
    APP_SETTING: {
        DefaultCurrencyCode: "INR",
        DefaultCurrencySymbol: "₹"
    },
}

export default Config; 