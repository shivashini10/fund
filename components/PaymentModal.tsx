// "use client";

// import { useState } from "react";

// export default function PaymentModal({ campaignId }) {
//   const [loading, setLoading] = useState(false);

//   const loadRazorpay = () => {
//     return new Promise((resolve) => {
//       if (window.Razorpay) {
//         resolve(true);
//         return;
//       }

//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);

//       document.body.appendChild(script);
//     });
//   };

//   const handleDonate = async () => {
//     try {
//       setLoading(true);

//       const isLoaded = await loadRazorpay();

//       if (!isLoaded) {
//         alert("Razorpay SDK failed to load");
//         return;
//       }

//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/payments/create-order`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             campaignId,
//             amount: 500,
//           }),
//         }
//       );

//       const data = await res.json();

//       const options = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//         amount: data.order.amount,
//         currency: data.order.currency,
//         name: "FundLoom",
//         description: "Donation",
//         order_id: data.order.id,

//         handler: function (response) {
//           alert("Payment successful 🎉");
//         },
//       };

//       const razor = new window.Razorpay(options);
//       razor.open();

//     } catch (err) {
//       console.error(err);
//       alert("Payment failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <button onClick={handleDonate} disabled={loading}>
//       {loading ? "Loading..." : "Donate ₹500"}
//     </button>
//   );
// }