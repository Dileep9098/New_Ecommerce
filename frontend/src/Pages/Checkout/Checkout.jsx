import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AddressFeild from './AddressFeild'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { makePriceRoundToTwoPlaces } from '../../utils/ConversionHelper';
import axiosInstance from '../../ApiHendler/axiosInstance';
import Config from '../../Config/Config';
import { showErrorMsg, showInfoMsg, showSuccessMsg, showWarningMsg } from '../../utils/ShowMessages';
import AutoCurrencyPrice from '../../Comoponant/CurrencyConvetor/AutoCurrencyPrice';
import { setCustomerCart, SetTotalCartItems } from '../../Store/Feature/cartSlice/cartSlice';
const BASE_URL = import.meta.env.VITE_IMG_URL;

const API_URL = import.meta.env.VITE_API_BASE_URL;
export default function Checkout() {
    const [selectedAddress, setSelectedAddress] = useState(null);

    // const { cartItems } = useSelector((state) => state.cart.cartItems);
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];


    const { isLoading, user } = useSelector((state) => state.auth);
    const { currency, rate } = useSelector((state) => state.currency);

    const [checkPaymentMethod, setCheckPaymentMethod] = useState(null);

    const [OrderNote, setOrderNote] = useState('');
    const [PaymentMethod, setPaymentMethod] = useState(import.meta.env.VITE_APP_STRIPE_PAYMENT_METHOD ?? 5);
    const [showCardSectionStripe, setshowCardSectionStripe] = useState(false);
    const [showCardSectionPaypal, setshowCardSectionPaypal] = useState(false);
    const [CartSubTotal, setCartSubTotal] = useState(0);
    const [ShippingSubTotal, setShippingSubTotal] = useState(0);
    const [InternationalShippingSubTotal, setInsternationalShippingSubTotal] = useState(0);

    const [OrderTotal, setOrderTotal] = useState(0);
    const [TaxTotal, setTaxTotal] = useState(0)

    const [OrderTotalAfterDiscount, setOrderTotalAfterDiscount] = useState(0);
    const [cartProductsData, setCartProductsData] = useState(0);
    const [CouponCode, setCouponCode] = useState('');
    const [afterApplyCouponDiscountValue, setafterApplyCouponDiscountValue] = useState('');
    const [afterApplyCouponDiscountAmount, setafterApplyCouponDiscountAmount] = useState('');
    const [afterApplyCouponProductName, setafterApplyCouponProductName] = useState('');
    const [IsCouponCodeApplied, setIsCouponCodeApplied] = useState(false);
    const [IsAlreadyDiscountApplied, setIsAlreadyDiscountApplied] = useState(false);
    const [CouponCodeCssClass, setCouponCodeCssClass] = useState('cart-coupon-code');
    const [allpaymentMethod, setAllpaymentMethod] = useState([])
    const [shiproketToekn, setShiprocktToken] = useState()
    const [orderData, setOrderData] = useState(null);
    const [isTokenFetched, setIsTokenFetched] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // debugger
        if (!isTokenFetched) {
            const email = "dileepsahu0873@gmail.com";
            const password = "Dileep@0873";

            async function getTokenFromShiprockt() {
                try {
                    const response = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', { email, password });
                    console.log("Shiprocket response: ", response.data);
                    setShiprocktToken(response.data.token);
                    setIsTokenFetched(true); // Once token is fetched, update state
                } catch (error) {
                    console.log("Error fetching token:", error);
                }
            }

            getTokenFromShiprockt();
        }
    }, [isTokenFetched]);

    const calculateItemSubTotal = (item) => {
        return (item.Price) * (item.Quantity ?? 1);
    };

    const calculateItemTaxTotal = (item) => {
        return ((item.Price * ((item.Tax ? item.Tax : 0) / 100)) * (item.Quantity ?? 1)); // Tax % calculate
    };

    const applyShippingCharge = (item, shippingChargeApplied) => {
        if (!shippingChargeApplied && item.ShippingCharges) {
            return { charge: parseInt(item.ShippingCharges), applied: true };
        }
        return { charge: 0, applied: shippingChargeApplied };
    };

    const setCartTotalSubTotalShippingTotalAfterUpdate = () => {
        if (!cartItems || cartItems.length === 0) return;

        let CartSubTotalDummy = 0;
        let ShippingSubTotalDummy = 0;
        let OrderTotalDummy = 0;
        let InternationalShippingSubTotalDummy = 0;

        let TaxTotalDummy = 0;

        let shippingChargeApplied = false;

        cartItems.forEach(item => {
            const itemSubTotal = calculateItemSubTotal(item);
            const itemTaxTotal = calculateItemTaxTotal(item);

            console.log('Item SubTotal:', itemSubTotal);
            console.log('Item Tax Total:', itemTaxTotal);

            CartSubTotalDummy += itemSubTotal;
            TaxTotalDummy += itemTaxTotal || 0; // ✅ Tax ko add kar diya
            InternationalShippingSubTotalDummy += item?.InternationCharge || 0;

            const shipping = applyShippingCharge(item, shippingChargeApplied);
            console.log('Shipping Charge:', shipping.charge);
            ShippingSubTotalDummy = shipping.charge;
            shippingChargeApplied = shipping.applied;
        });

        // Order total me ab subtotal + tax bhi include hoga
        OrderTotalDummy = CartSubTotalDummy + TaxTotalDummy + (currency === "USD" ? InternationalShippingSubTotalDummy : 0);

        console.log('Cart SubTotal:', CartSubTotalDummy);
        console.log('Tax SubTotal:', TaxTotalDummy);
        console.log('Shipping SubTotal:', ShippingSubTotalDummy);
        console.log('Order Total:', OrderTotalDummy);

        // Agar Order Total ₹500 se kam hai to ₹100 shipping charge add hoga
        if (OrderTotalDummy < 500) {
            ShippingSubTotalDummy = ShippingSubTotalDummy > 0 ? ShippingSubTotalDummy : 100; // Add ₹100 shipping charge
            OrderTotalDummy += ShippingSubTotalDummy; // Shipping charge ko Order Total me add karo
            console.log('Order Total after adding shipping charge (if below ₹500):', OrderTotalDummy);
        }

        // Ensure the totals are correctly rounded and updated
        setCartSubTotal(makePriceRoundToTwoPlaces(CartSubTotalDummy));
        setTaxTotal(makePriceRoundToTwoPlaces(TaxTotalDummy)); // ✅ Tax total state me set kar diya
        setShippingSubTotal(makePriceRoundToTwoPlaces(ShippingSubTotalDummy));
        setInsternationalShippingSubTotal(makePriceRoundToTwoPlaces(InternationalShippingSubTotalDummy));
        setOrderTotal(makePriceRoundToTwoPlaces(OrderTotalDummy));
    };

    useEffect(() => {
        setCartTotalSubTotalShippingTotalAfterUpdate();
    }, [cartItems]);

    useEffect(() => {

        const fatchData = async () => {
            try {
                //   debugger
                const response = await axiosInstance.get(Config.END_POINT_LIST["GET_ALL_PAYMENTSMETHOD"], { withCredentials: true })
                console.log("Payment MEthode", response)

                if (response.data.success) {
                    setAllpaymentMethod(response.data.paymentMethod)
                    //   dispatch(getAllSubCategory())
                }
                else {
                    showErrorMsg(response.data.message)
                }
            } catch (error) {
                showErrorMsg(error.response.data.message);

            }
        }

        fatchData();

    }, [dispatch]);


    const activePaymentMethod = Array.isArray(allpaymentMethod) ? allpaymentMethod.filter(paymentMethod => paymentMethod.IsActive === "true") : [];
    console.log("All paymentMethod me kya", activePaymentMethod)

    console.log("🧾 Selected Payment Method:", PaymentMethod);

    const handleCheckoutOnSubmit = async (e) => {
        e.preventDefault();
        // debugger
        try {
            setshowCardSectionStripe(false);
            setshowCardSectionPaypal(false);

            console.log("🧾 Selected Payment Method:", PaymentMethod);

            if (!selectedAddress) {
                showInfoMsg("Please select a shipping address before proceeding.");
                return;
            }

            // 🚀 Payment method handling
            if (PaymentMethod == import.meta.env.VITE_APP_STRIPE_PAYMENT_METHOD) {
                setshowCardSectionStripe(true);
                return;
            }

            if (PaymentMethod == import.meta.env.VITE_APP_PAYPAL_PAYMENT_METHOD) {
                setshowCardSectionPaypal(true);
                return;
            }

            // 💰 Cash on Delivery
            if (PaymentMethod == import.meta.env.VITE_APP_CASH_ON_DELIVERY_PAYMENT_METHOD) {
                if (window.confirm("Do you really want to place the order?")) {
                    setLoading(true);
                    await PlaceAndConfirmCustomerOrder(null);
                    setLoading(false);
                }
                return;
            }

            // 💳 Razorpay Payment
            if (PaymentMethod == import.meta.env.VITE_APP_RAZORPAY_PAYMENT_METHOD) {
                const isYes = window.confirm("Do you really want to place the order?");
                if (!isYes) return;

                setLoading(true);

                const rawAmount = parseFloat(
                    OrderTotalAfterDiscount && OrderTotalAfterDiscount > 0
                        ? OrderTotalAfterDiscount
                        : OrderTotal
                );

                let formattedAmount = 0;

                if (currency === "INR") {
                    formattedAmount = Math.round(rawAmount * 100);
                } else if (currency === "USD") {
                    const usdAmount = rawAmount * rate;
                    formattedAmount = Math.round(usdAmount * 100);
                }

                if (isNaN(formattedAmount) || formattedAmount <= 0) {
                    alert("Invalid amount. Please check your order total.");
                    setLoading(false);
                    return;
                }

                console.log("💵 Razorpay Final Amount:", formattedAmount, currency);

                // 🧾 Combine product info
                const productDetails = cartItems
                    .map((p) => `${p.ProductName} - Qty: ${p.Quantity}`)
                    .join(", ");

                // 🧠 Create Razorpay Order
                const { data } = await axiosInstance.post("/api/v1/create-order-razorpay", {
                    amount: formattedAmount,
                    currency,
                });

                const options = {
                    key: import.meta.env.VITE_APP_RAZORPAY_KEY,
                    amount: data.order.amount,
                    currency: data.order.currency,
                    name: user.name,
                    description: "Order Payment",
                    order_id: data.order.id,
                    handler: async function (response) {
                        try {
                            const verifyRes = await axiosInstance.post("/api/v1/payment/verify", {
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_signature: response.razorpay_signature,
                            });

                            if (verifyRes.data.success) {
                                await PlaceAndConfirmCustomerOrder(response.razorpay_payment_id);
                                alert("✅ Payment Successful & Order Placed!");
                            } else {
                                alert("❌ Payment verification failed.");
                            }
                        } catch (err) {
                            console.error("Payment verification error:", err);
                            alert("Error verifying payment.");
                        }
                    },
                    prefill: {
                        name: user.name,
                        email: user.email,
                        contact: user.phone,
                    },
                    notes: {
                        Address: user.address,
                        City: user.CityName,
                        products: productDetails,
                    },
                    theme: { color: "#3399cc" },
                };

                const rzp = new window.Razorpay(options);
                rzp.open();

                setLoading(false);
                return;
            }

            // 💸 PayU Money
            if (PaymentMethod == import.meta.env.VITE_APP_PAYUMONEY_PAYMENT_METHOD) {
                const formattedAmount = parseFloat(
                    OrderTotalAfterDiscount && OrderTotalAfterDiscount > 0
                        ? OrderTotalAfterDiscount
                        : OrderTotal
                ).toFixed(2);

                if (isNaN(formattedAmount) || formattedAmount <= 0) {
                    alert("Invalid amount. Please check your order total.");
                    return;
                }

                const productDetails = cartItems
                    .map((p) => `${p.ProductName.slice(0, 30)} - Qty: ${p.Quantity}`)
                    .join(", ");

                const response = await axiosInstance.post(
                    Config.END_POINT_LIST["PAY_U_MONEY_PAYMNETS"],
                    {
                        amount: formattedAmount,
                        email: user.email,
                        phone: user.phone,
                        productinfo: productDetails,
                        firstname: user.name,
                        city: user.CityName,
                        state: user.StateName,
                        address1: user.address,
                        udf1: cartItems,
                        udf2: productDetails,
                    }
                );

                const { txnid, hash, merchantKey, surl, furl } = response.data || {};
                if (!txnid || !hash || !merchantKey) {
                    console.error("Invalid PayU response:", response.data);
                    alert("Failed to initiate payment. Please try again.");
                    return;
                }

                const paymentUrl = "https://secure.payu.in/_payment";
                const form = document.createElement("form");
                form.method = "POST";
                form.action = paymentUrl;

                const params = {
                    key: merchantKey,
                    txnid,
                    amount: formattedAmount,
                    email: user.email,
                    phone: user.phone,
                    productinfo: productDetails,
                    firstname: user.name,
                    surl: `${API_URL}api/v1/pay-u-money-payment-success`,
                    furl: `${API_URL}api/v1/pay-u-money-payment-fail`,
                    hash,
                    city: user.CityName,
                    state: user.StateName,
                    address1: user.address,
                };

                Object.entries(params).forEach(([key, val]) => {
                    const input = document.createElement("input");
                    input.type = "hidden";
                    input.name = key;
                    input.value = val;
                    form.appendChild(input);
                });

                document.body.appendChild(form);
                form.submit();
                return;
            }
        } catch (err) {
            console.error("Checkout Error:", err);
            showErrorMsg("An error occurred. Please try again!");

            if (PaymentMethod === import.meta.env.VITE_APP_STRIPE_PAYMENT_METHOD) {
                HandleStripCardModal();
            }
            if (PaymentMethod === import.meta.env.VITE_APP_PAYPAL_PAYMENT_METHOD) {
                HandlePaypalCardModal();
            }

            setLoading(false);
        }
    };

    const PlaceAndConfirmCustomerOrder = async (StripPaymentToken, payPalOrderConfirmJson = "{}") => {
        debugger
        try {
            const headersStrip = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            };

            const paramSrip = {
                UserID: user._id,
                AddressID: selectedAddress,
                OrderNote: OrderNote,
                totalOrderPrice: OrderTotalAfterDiscount != undefined && OrderTotalAfterDiscount > 0 ? OrderTotalAfterDiscount : OrderTotal,
                cartJsonData: JSON.stringify(cartItems),
                CouponCode: IsCouponCodeApplied ? CouponCode : "",
                PaymentMethod: PaymentMethod,
                paymentToken: StripPaymentToken ?? "",
                payPalOrderConfirmJson: payPalOrderConfirmJson ?? "",
                bank_ref_num: StripPaymentToken

            };

            // const stripServerResponse = await MakeApiCallAsync(Config.END_POINT_NAMES['POST_CUSTOMER_ORDER'], Config['COMMON_CONTROLLER_SUB_URL'], paramSrip, headersStrip, "POST", true);
            const stripServerResponse = await axiosInstance.post(Config.END_POINT_LIST["ADD_NEW_ORDER"], paramSrip, { withCredentials: true })
            console.log("Payment MEthode", stripServerResponse)
            // debugger

            if (stripServerResponse != null && stripServerResponse.data != null && stripServerResponse.status === 200) {
                let stripServerResponseDetail = stripServerResponse.data ? stripServerResponse.data : "[]";
                console.log("Order Response", stripServerResponseDetail)

                if (stripServerResponseDetail && stripServerResponseDetail.ResponseMsg === "Order Placed Successfully") {
                    showSuccessMsg("Order Placed Successfully!");

                    setTimeout(() => {
                        // debugger
                        // Send Order to Shiprocket
                        // createShiprocketOrder({
                        //     id: stripServerResponseDetail.order._id,
                        //     customerName: user.name,
                        //     customerLastName: user.lname,
                        //     billingAddress: user.address,
                        //     billingCity: user.CityName,
                        //     billingPincode: user.PostalCode,
                        //     billingState: user.StateName,
                        //     billingCountry: user.CountryName,
                        //     billingEmail: user.email,
                        //     billingPhone: user.phone,
                        //     shippingName: user.name,
                        //     shippingLastName: user.lname,
                        //     shippingAddress: user.address,
                        //     shippingCity: user.CityName,
                        //     shippingPincode: user.PostalCode,
                        //     shippingCountry: user.CountryName,
                        //     shippingState: user.StateName,
                        //     shippingEmail: user.email,
                        //     shippingPhone: user.phone,
                        //     items: cartItems,
                        //     paymentMethod: PaymentMethod,
                        //     subTotal: OrderTotalAfterDiscount != undefined && OrderTotalAfterDiscount > 0 ? OrderTotalAfterDiscount : OrderTotal,
                        //     totalDiscount: IsCouponCodeApplied ? afterApplyCouponDiscountAmount : 0, // Adjust this if necessary
                        //     length: 10,
                        //     breadth: 15,
                        //     height: 20,
                        //     weight: 2.5,
                        // });
                        navigate('/');
                        dispatch(setCustomerCart('[]'));
                        dispatch(SetTotalCartItems(0));
                        localStorage.setItem("cartItems", "[]");
                    }, 1000);

                } else {
                    showErrorMsg("An error occurred. Please try again!");
                }
            } else {
                showErrorMsg("An error occurred. Please try again!");
            }

            if (PaymentMethod === import.meta.env.VITE_APP_STRIPE_PAYMENT_METHOD) {
                HandleStripCardModal();
            } else if (PaymentMethod === import.meta.env.VITE_APP_PAYPAL_PAYMENT_METHOD) {
                HandlePaypalCardModal();
            }
        } catch (err) {
            showErrorMsg("An error occurred. Please try again!");
            console.log(err.message);
            if (PaymentMethod === import.meta.env.VITE_APP_STRIPE_PAYMENT_METHOD) {
                HandleStripCardModal();
            }
            setLoading(false);
        }
    };



    const HandleStripCardModal = () => {
        setshowCardSectionStripe(!showCardSectionStripe);
    }

    const HandlePaypalCardModal = () => {
        setshowCardSectionPaypal(!showCardSectionPaypal);
    }

    return (
        <>

            <section className="mb-lg-14 mb-8 mt-8">
                <div className="container">
                    {/* row */}
                    <div className="row">
                        {/* col */}
                        <div className="col-12">
                            <div>
                                <div className="mb-8">
                                    {/* text */}
                                    <h1 className="fw-bold mb-0">Checkout</h1>
                                    <p className="mb-0">
                                        Already have an account? Click here to
                                        <Link href="/sign-up">Sign in</Link>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {/* row */}
                        <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-12">
                                <div className="accordion accordion-flush" id="accordionFlushExample" >
                                    <AddressFeild setSelectedAddress={setSelectedAddress} />


                                    <div className="accordion-item py-4">
                                        <a href="#" className="text-inherit h5" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree" >
                                            <i className="feather-icon icon-shopping-bag me-2 text-muted" />
                                            Delivery instructions Or Order notes
                                        </a>
                                        <div
                                            id="flush-collapseThree"
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#accordionFlushExample"
                                        >
                                            <div className="mt-5">
                                                <label
                                                    htmlFor="DeliveryInstructions"
                                                    className="form-label sr-only"
                                                >
                                                    Delivery instructions
                                                </label>
                                                <textarea
                                                    className="form-control"
                                                    id="DeliveryInstructions"
                                                    rows={3}
                                                    placeholder="Write delivery instructions "
                                                    defaultValue={""}
                                                    onChange={(e) => setOrderNote(e.target.value)}
                                                />
                                                <p className="form-text">
                                                    Add instructions for how you want your order shopped
                                                    and/or delivered
                                                </p>

                                            </div>
                                        </div>
                                    </div>
                                    {/* accordion item */}
                                    <div className="accordion-item py-4">
                                        <a href="#" className="text-inherit h5" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour" >
                                            <i className="feather-icon icon-credit-card me-2 text-muted" />
                                            Payment Method
                                        </a>
                                        <div id="flush-collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample" >
                                            <div className="mt-5">
                                                <div>
                                                    {activePaymentMethod.length > 0 ?
                                                        <>
                                                            {activePaymentMethod
                                                                .filter(category => category.IsActive === "true")
                                                                .filter(category => !(currency === "USD" && category.name === "Case on delivery"))
                                                                .map((category, index) => (
                                                                    <div className="card card-bordered shadow-none mb-2" key={index}>
                                                                        <div className="card-body p-6">
                                                                            <div className="d-flex">
                                                                                <div className="form-check">
                                                                                    <input className="form-check-input" type="radio" id={`payment_${category._id}`}
                                                                                        value={category.displaySeqNo}
                                                                                        checked={PaymentMethod === category.displaySeqNo}
                                                                                        onChange={(e) => setPaymentMethod(category.displaySeqNo)} />
                                                                                    <label className="form-check-label ms-2" htmlFor={`payment_${category._id}`} />
                                                                                </div>
                                                                                <div>
                                                                                    <h5 className="mb-1 h6"> {category.name}</h5>
                                                                                    <p className="mb-0 small">
                                                                                        You will be redirected to PayPal website to
                                                                                        complete your purchase securely.
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    // <div className="checkout__input__checkbox" key={index}>
                                                                    //     <label htmlFor={`payment_${category._id}`}>
                                                                    //         {category.name}
                                                                    //         <input
                                                                    //             type="checkbox"
                                                                    // id={`payment_${category._id}`}
                                                                    // value={category.displaySeqNo}
                                                                    // checked={PaymentMethod === category.displaySeqNo}
                                                                    // onChange={(e) => setPaymentMethod(category.displaySeqNo)}
                                                                    // />
                                                                    //         <span className="checkmark"></span>
                                                                    //     </label>
                                                                    // </div>
                                                                ))}
                                                        </>


                                                        : ""
                                                    }


                                                    {/* card */}

                                                    {/* <div className="card card-bordered shadow-none mb-2">
                                                        <div className="card-body p-6">
                                                            <div className="d-flex mb-4">
                                                                <div className="form-check">
                                                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="creditdebitcard" />
                                                                    <label
                                                                        className="form-check-label ms-2"
                                                                        htmlFor="creditdebitcard"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <h5 className="mb-1 h6">Credit / Debit Card</h5>
                                                                    <p className="mb-0 small">
                                                                        Safe money transfer using your bank accou k
                                                                        account. We support Mastercard tercard, Visa,
                                                                        Discover and Stripe.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="row g-2">
                                                                <div className="col-12">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="card-mask" className="form-label"  >
                                                                            Card Number
                                                                        </label>
                                                                        <input type="text" className="form-control" id="card-mask" placeholder="xxxx-xxxx-xxxx-xxxx" required=""  />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6 col-12">
                                                                    <div className="mb-3 mb-lg-0">
                                                                        <label
                                                                            className="form-label"
                                                                            htmlFor="nameoncard"
                                                                        >
                                                                            Name on card
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            placeholder="Enter name"
                                                                            id="nameoncard"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-3 col-12">
                                                                    <div className="mb-3 mb-lg-0 position-relative">
                                                                        <label
                                                                            className="form-label"
                                                                            htmlFor="expirydate"
                                                                        >
                                                                            Expiry date
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            id="expirydate"
                                                                            placeholder="MM/YY"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-3 col-12">
                                                                    <div className="mb-3 mb-lg-0">
                                                                        <label
                                                                            htmlFor="digit-mask"
                                                                            className="form-label"
                                                                        >
                                                                            CVV Code
                                                                            <i
                                                                                className="fe fe-help-circle ms-1"
                                                                                data-bs-toggle="tooltip"
                                                                                data-placement="top"
                                                                                title="A 3 - digit number, typically printed on the back of a card."
                                                                            />
                                                                        </label>
                                                                        <input
                                                                            type="password"
                                                                            className="form-control"
                                                                            name="digit-mask"
                                                                            id="digit-mask"
                                                                            placeholder="xxx"
                                                                            maxLength={3}
                                                                            inputMode="numeric"
                                                                            required=""
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> */}


                                                    {/* Button */}
                                                    <div className="mt-5 d-flex justify-content-end">
                                                        <a
                                                            href="#"
                                                            className="btn btn-outline-gray-400 text-muted"
                                                            data-bs-toggle="collapse"
                                                            data-bs-target="#flush-collapseThree"
                                                            aria-expanded="false"
                                                            aria-controls="flush-collapseThree"
                                                        >
                                                            Prev
                                                        </a>
                                                        <a href="#" className="btn btn-primary ms-2" onClick={handleCheckoutOnSubmit}>
                                                            Place Order
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12 offset-xl-1 col-xl-5 col-lg-6">
                                <div className="mt-4 mt-lg-0">
                                    <div className="card shadow-sm">
                                        <h5 className="px-6 py-4 bg-transparent mb-0">Order Details</h5>
                                        <ul className="list-group list-group-flush">
                                            {
                                                cartItems && cartItems.length > 0 ? (

                                                    cartItems.map((item, ind) => (
                                                        <li className="list-group-item px-4 py-3">
                                                            <div className="row align-items-center">
                                                                <div className="col-2 col-md-2">
                                                                    <img
                                                                        src={`${BASE_URL}/${item.DefaultImage}`}
                                                                        alt="Ecommerce"
                                                                        className="img-fluid"
                                                                    />
                                                                </div>
                                                                <div className="col-5 col-md-5">
                                                                    <h6 className="mb-0">{item.ProductName.slice(0, 40)}...</h6>
                                                                    {/* <span>
                                                                        <small className="text-muted">.98 / lb</small>
                                                                    </span> */}
                                                                </div>
                                                                <div className="col-2 col-md-2 text-center text-muted">
                                                                    <span>{item.Quantity}</span>
                                                                </div>
                                                                <div className="col-3 text-lg-end text-start text-md-end col-md-3">
                                                                    <span className="fw-bold"><AutoCurrencyPrice Price={(item.Price) * (item.Quantity)} /></span>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))


                                                ) : (
                                                    <div className="col-sm-12">
                                                        <div className="col-sm-12 empty-cart-cls text-center">
                                                            <img src="/path/to/empty-cart-image.jpg" className="img-fluid mb-4" alt="Empty Cart" />
                                                            <h3>
                                                                <strong>Your Cart is Empty</strong>
                                                            </h3>
                                                            <h4>Explore more and shortlist some items.</h4>
                                                        </div>
                                                    </div>
                                                )
                                            }

                                            {/* list group item */}
                                            <li className="list-group-item px-4 py-3">
                                                <div className="d-flex align-items-center justify-content-between mb-2">
                                                    <div>Item Subtotal</div>
                                                    <div className="fw-bold"><AutoCurrencyPrice Price={CartSubTotal} /></div>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between mb-2">
                                                    <div>Tax</div>
                                                    <div className="fw-bold"><AutoCurrencyPrice Price={TaxTotal} /></div>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <div>
                                                        Service Fee
                                                        <i
                                                            className="feather-icon icon-info text-muted"
                                                            data-bs-toggle="tooltip"
                                                            title="Default tooltip"
                                                        />
                                                    </div>
                                                    <div className="fw-bold">{
                                                        currency === "USD" ? (
                                                            <AutoCurrencyPrice Price={InternationalShippingSubTotal} />
                                                        ) : (
                                                            <AutoCurrencyPrice Price={ShippingSubTotal} />
                                                        )
                                                    }</div>
                                                </div>
                                            </li>
                                            {/* list group item */}
                                            <li className="list-group-item px-4 py-3">
                                                <div className="d-flex align-items-center justify-content-between fw-bold">
                                                    <div>Subtotal</div>
                                                    <div><AutoCurrencyPrice Price={OrderTotalAfterDiscount != undefined && OrderTotalAfterDiscount > 0 ? OrderTotalAfterDiscount : OrderTotal} /></div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Models  */}



        </>

    )
}
