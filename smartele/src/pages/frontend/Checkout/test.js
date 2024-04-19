import React, { useState } from 'react';
import axios from 'axios';

const PaypalPayment = () => {
    const [paymentUrl, setPaymentUrl] = useState('');

    const initiatePayment = async () => {
        try {
            const response = await axios.post('http://localhost:8082/api/add', {
                "idProduct": "SampleProduct",
                "amount": "10.00",
                "quantity": "1",
                "currency": "USD",
                "method": "paypal",
                "intent": "sale",
                "idUser": "SampleUser"
            });
    
            if (response.data.approvalUrl) {
                window.location.href = response.data.approvalUrl;
            }
        } catch (error) {
            console.error('Error initiating payment:', error);
        }
    };
    

    return (
        <div>
            <h2>Pay with PayPal</h2>
            <button onClick={initiatePayment}>Proceed to PayPal</button>
        </div>
    );
};

export default PaypalPayment;
