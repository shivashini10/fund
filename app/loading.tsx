export default function Loading() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #fff4ef, #ffe0d6)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div
        style={{
          textAlign: "center",
          background: "#fff",
          padding: "35px 45px",
          borderRadius: "24px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        }}
      >
        {/* Spinner */}
        <div
          style={{
            width: "55px",
            height: "55px",
            border: "5px solid #f3f3f3",
            borderTop: "5px solid #FF8A65",
            borderRadius: "50%",
            margin: "0 auto 20px",
            animation: "spin 1s linear infinite",
          }}
        />

        <h2
          style={{
            margin: 0,
            color: "#FF8A65",
            fontSize: "24px",
          }}
        >
          Loading FundLoom...
        </h2>

        <p
          style={{
            marginTop: "10px",
            color: "#666",
            fontSize: "14px",
          }}
        >
          Please wait a moment
        </p>

        <style>
          {`
            @keyframes spin {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
          `}
        </style>
      </div>
    </div>
  );
}