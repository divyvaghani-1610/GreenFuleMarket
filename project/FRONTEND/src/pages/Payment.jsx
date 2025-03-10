import { useEffect } from "react";

const Payment = () => {
    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const displayRazorpay = async () => {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const response = await fetch("http://localhost:5000/api/payment/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: 500, currency: "INR" }),
        });

        const order = await response.json();

        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Use environment variable
            amount: order.amount,
            currency: order.currency,
            name: "VahanSuvidha",
            description: "Payment for Vehicle Rental",
            order_id: order.id,
            handler: function (response) {
                alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
            },
            prefill: {
                name: "Deep",
                email: "deep@example.com",
                contact: "9876543210",
            },
            theme: { color: "#3399cc" },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    return (
        <div>
            <h2>Razorpay Payment Integration</h2>
            <button onClick={displayRazorpay}>Pay ₹500</button>
        </div>
    );
};

export default Payment;
