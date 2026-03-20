import React from 'react'
import { useSelector } from 'react-redux'
import AddressFeild from '../../Pages/Checkout/AddressFeild'
import { useState } from 'react';

export default function AddressSetting() {
        const { user, error, isLoading, isAuthentication } = useSelector((state) => state.auth)
    const [selectedAddress, setSelectedAddress] = useState(null);

    return (
        <>
        <AddressFeild setSelectedAddress={setSelectedAddress}/>
          

        </>
    )
}
