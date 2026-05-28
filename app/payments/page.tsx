"use client";

import { useEffect, useState } from "react";
import "./payments.css";
import "../../styles/global.css";

type Payment = {
  _id: string;
  amount: number;
  status: "success" | "pending" | "failed" | string;
  createdAt?: string;
};

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/payments`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch payments");
        }

        const data = await res.json();
        setPayments(data || []);
      } catch (err) {
        console.error(err);
        setError("Unable to load payments");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="paymentsPage">
      <div className="paymentsContainer">
        <h1 className="pageTitle">Payments 💳</h1>

        {loading ? (
          <p className="loadingText">Loading payments...</p>
        ) : error ? (
          <p className="errorText">{error}</p>
        ) : payments.length === 0 ? (
          <div className="emptyBox">
            <h3>No Payments Yet</h3>
            <p>Your transactions will appear here.</p>
          </div>
        ) : (
          <div className="paymentsWrapper">
            {payments.map((p) => (
              <div key={p._id} className="paymentCard">
                <div className="amountBox">
                  ₹{p.amount.toLocaleString()}
                </div>

                <div className="paymentInfo">
                  <p className="status">
                    Status:{" "}
                    <span className={`statusBadge ${p.status}`}>
                      {p.status}
                    </span>
                  </p>

                  <small>
                    {p.createdAt
                      ? new Date(p.createdAt).toLocaleString()
                      : "Recently"}
                  </small>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}