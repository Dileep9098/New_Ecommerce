import React, { useEffect } from 'react'
import {  useNavigate } from 'react-router-dom'; // If you're using React Router for navigation


export default function PayUSuccessResponse() {
    const navigate = useNavigate();

    useEffect(() => {
        // Set a timeout to redirect the user after a few seconds
        const timer = setTimeout(() => {
           navigate('/'); // Redirect to home or another desired route
        }, 5000); // Redirect after 5 seconds

        // Cleanup the timer on component unmount
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>Payment Successfull</h1>
            <p>  your payment is successfull please check your order Status</p>
            <p>You will be redirected shortly. If not, click <button onClick={() => navigate('/')}>here</button>.</p>
        </div>
    );
}
