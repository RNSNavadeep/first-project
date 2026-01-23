'use client';

import { useState, useEffect } from 'react';

export default function PaymentPage() {
  const [order, setOrder] = useState(null);
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  // ADMIN UPI (CHANGE THIS)
  const ADMIN_UPI = 'admin@upi';

  useEffect(() => {
    const savedOrder = JSON.parse(localStorage.getItem('buyNowOrder'));
    const savedUser = JSON.parse(localStorage.getItem('registeredUser'));

    if (savedOrder) setOrder(savedOrder);
    if (savedUser) {
      setMobile(savedUser.mobile || '');
      setAddress(savedUser.address || '');
    }
  }, []);

  /* ✅ SUCCESS SCREEN (ADDED AT END) */
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-[#F2E9E4] flex items-center justify-center p-6">
        <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl p-10 text-center">
          <h1 className="text-3xl font-extrabold text-[#7B2CBF] mb-4">
            ✅ Order Placed Successfully
          </h1>

          <p className="text-gray-800 text-lg mb-6">
            Your order has been placed and will be processed shortly.
          </p>

          <a
            href="/"
            className="inline-block bg-[#7B2CBF] text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-800 transition"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <h1 className="text-center mt-20 text-xl font-semibold">
        No order found
      </h1>
    );
  }

  const handleCOD = () => {
    if (!mobile || !address) {
      alert('Please fill mobile number and address');
      return;
    }

    const codOrder = {
      ...order,
      mobile,
      address,
      paymentMode: 'COD',
      status: 'Pending',
      time: new Date().toISOString(),
    };

    localStorage.setItem('lastOrder', JSON.stringify(codOrder));
    localStorage.removeItem('buyNowOrder');

    setOrderPlaced(true);
  };

  const handleUPIPayment = () => {
    if (!mobile || !address) {
      alert('Please fill mobile number and address');
      return;
    }

    const upiURL = `upi://pay?pa=${ADMIN_UPI}&pn=Admin&am=${order.price}&cu=INR`;

    const onlineOrder = {
      ...order,
      mobile,
      address,
      paymentMode: 'Online',
      status: 'Initiated',
    };

    localStorage.setItem('lastOrder', JSON.stringify(onlineOrder));
    localStorage.removeItem('buyNowOrder');

    setOrderPlaced(true);

    window.location.href = upiURL;
  };

  return (
    <div className="min-h-screen bg-[#F2E9E4] flex items-center justify-center p-6">
      <div className="bg-white max-w-2xl w-full rounded-2xl shadow-2xl border border-[#7B2CBF]/30 p-8">
        <h1 className="text-3xl font-bold text-[#7B2CBF] mb-8 text-center">
          PLACE ORDER
        </h1>

        {/* PRODUCT */}
        <div className="flex gap-6 border-b pb-6 mb-6">
          <img
            src={order.image}
            alt={order.name}
            className="w-32 h-40 object-cover rounded-xl border"
          />
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {order.name}
            </h2>

            <p className="mt-2 text-gray-800">
              <strong>Size:</strong> {order.size}
            </p>
            <p className="mt-2 text-2xl font-bold text-[#7B2CBF]">
              ₹{order.price}
            </p>
          </div>
        </div>

        {/* USER DETAILS */}
        <div className="space-y-5 mb-8">
          <h3 className="text-xl font-semibold text-gray-900">
            Delivery Details
          </h3>

          <input
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Mobile Number"
            className="w-full p-4 border-2 border-gray-800 rounded-lg font-medium text-gray-900 focus:border-[#7B2CBF]"
          />

          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Full Delivery Address"
            rows={3}
            className="w-full p-4 border-2 border-gray-800 rounded-lg font-medium text-gray-900 focus:border-[#7B2CBF]"
          />
        </div>

        {/* PAYMENT MODE */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Payment Method
          </h3>

          <div className="flex gap-4">
            <button
              onClick={() => setPaymentMode('COD')}
              className={`flex-1 p-4 rounded-lg border-2 font-semibold transition
                ${
                  paymentMode === 'COD'
                    ? 'bg-[#7B2CBF] text-white border-[#7B2CBF]'
                    : 'border-gray-800 text-gray-800 hover:bg-gray-100'
                }`}
            >
              Cash on Delivery
            </button>

            <button
              onClick={() => setPaymentMode('ONLINE')}
              className={`flex-1 p-4 rounded-lg border-2 font-semibold transition
                ${
                  paymentMode === 'ONLINE'
                    ? 'bg-[#7B2CBF] text-white border-[#7B2CBF]'
                    : 'border-gray-800 text-gray-800 hover:bg-gray-100'
                }`}
            >
              Online UPI
            </button>
          </div>
        </div>

        {/* ACTION */}
        {paymentMode === 'COD' && (
          <button
            onClick={handleCOD}
            className="w-full bg-green-600 text-white py-4 rounded-lg font-bold hover:bg-green-700 transition"
          >
            Place Order (COD)
          </button>
        )}

        {paymentMode === 'ONLINE' && (
          <button
            onClick={handleUPIPayment}
            className="w-full bg-[#7B2CBF] text-white py-4 rounded-lg font-bold hover:bg-purple-800 transition"
          >
            Pay ₹{order.price} via UPI
          </button>
        )}
      </div>
    </div>
  );
}


