import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showInfoMsg ,showErrorMsg,showSuccessMsg,showWarningMsg} from './ShowMessages';
// import { showErrorMsg, showInfoMsg, showSuccessMsg } from './ValidationHelper';
// import rootAction from '../stateManagment/actions/rootAction';


export const AddProductToCart = (
    ProductId, Quantity, DefaultImage, Price, ProductName, IsShippingFree, ShippingCharge, OrderMaximumQuantity,Tax,Sku,InternationCharge
) => {
    let cartItems = [];
    
    try {
        // Retrieve cartItems from localStorage and parse it
        cartItems = JSON.parse(localStorage.getItem("cartItems"));
        
        // Fallback to an empty array if cartItems is null or not an array
        if (!Array.isArray(cartItems)) {
            cartItems = [];
        }

        //--check if product already exists
        if (cartItems.filter(obj => obj.ProductId == ProductId).length > 0) {
            showInfoMsg("Product already exists in your cart!");
            return JSON.stringify(cartItems);
        } else {
            // Add new product to the cart
            cartItems.push({
                ProductId: ProductId,
                Quantity: Quantity,
                Price: Price,
                Tax: Tax,
                ProductName: ProductName,
                ShippingCharges: ShippingCharge,
                IsShippingFree: IsShippingFree,
                DefaultImage: DefaultImage,
                OrderMaximumQuantity: OrderMaximumQuantity,
                Sku:Sku,
                InternationCharge:InternationCharge,
            });

            console.log(cartItems);

            //--store updated cartItems in localStorage
            localStorage.setItem("cartItems", JSON.stringify(cartItems));

            showSuccessMsg("Added to the cart!");
            return JSON.stringify(cartItems);
        }
    } catch (err) {
        console.log(err);
        showErrorMsg("An error occurred. Please try again!");
        return JSON.stringify(cartItems);
    }
};


export const AddCustomerWishList = (ProductId, ProductName, Price, IsShippingFree, ShippingCharge, OrderMaximumQuantity,StockQuantity,ProductPictures ,DiscountPrice,CouponCode,Sku,InternationCharge) => {
    let customerWishList = [];
    try {
        
       
        customerWishList = JSON.parse(localStorage.getItem("customerWishList"))
        customerWishList = customerWishList ?? [];

        const Quantity=1
        //--check if product already exists
        if (customerWishList?.filter(obj => obj.ProductId == ProductId).length > 0) {
            showInfoMsg("Product already exists in your wish list!");
            return JSON.stringify(customerWishList);
        } else {

            customerWishList.push({
                ProductId: ProductId,
                ProductName : ProductName,
                Price: Price,
                DiscountedPrice : DiscountPrice, 
                CouponCode :CouponCode ,
                Quantity: Quantity,
                ShippingCharges: ShippingCharge,
                DefaultImage: ProductPictures,
                IsShippingFree:IsShippingFree,
                OrderMaximumQuantity:OrderMaximumQuantity,
                StockQuantity:StockQuantity,
                Sku:Sku,
                InternationCharge:InternationCharge,

            });

            console.log(customerWishList);

            showSuccessMsg("Added to your wish list!");
              return JSON.stringify(customerWishList);;
        }
    }
    catch (err) {
        console.log(err);
        showErrorMsg("An error occured. Please try again!");
          return JSON.stringify(customerWishList);;
    }



};