"use client";

import { useEffect, useState } from "react";

export default function WithdrawalsPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/withdrawals`)
      .then((res) => res.json())
      .then((result) => {
        setData(result || []);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "30px 20px",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#FF8A65",
            marginBottom: "30px",
          }}
        >
          Withdrawals
        </h1>

        {/* Loading */}
        {loading && (
          <p
            style={{
              textAlign: "center",
              color: "#666",
            }}
          >
            Loading withdrawals...
          </p>
        )}

        {/* Empty */}
        {!loading && data.length === 0 && (
          <div
            style={{
              background: "#fff",
              padding: "25px",
              borderRadius: "18px",
              textAlign: "center",
              boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
            }}
          >
            <h3>No withdrawals found</h3>
            <p style={{ color: "#777" }}>
              Your withdrawal history will appear here.
            </p>
          </div>
        )}

        {/* List */}
        {data.map((w: any) => (
          <div
            key={w._id}
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "18px",
              marginBottom: "18px",
              boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  color: "#111827",
                }}
              >
                ₹{w.amount}
              </h3>

              <span
                style={{
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "13px",
                  fontWeight: "600",
                  background:
                    w.status === "approved"
                      ? "#dcfce7"
                      : w.status === "pending"
                      ? "#fef3c7"
                      : "#fee2e2",
                  color:
                    w.status === "approved"
                      ? "#166534"
                      : w.status === "pending"
                      ? "#92400e"
                      : "#991b1b",
                }}
              >
                {w.status}
              </span>
            </div>

            <p
              style={{
                margin: "6px 0",
                color: "#666",
                fontSize: "14px",
              }}
            >
              Withdrawal ID: {w._id}
            </p>

            {w.createdAt && (
              <p
                style={{
                  margin: "6px 0",
                  color: "#888",
                  fontSize: "13px",
                }}
              >
                Date: {new Date(w.createdAt).toLocaleDateString()}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}