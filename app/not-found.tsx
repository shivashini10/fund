export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "#f5f8ff",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "70px",
          margin: 0,
          color: "#FF8A65",
          fontWeight: "700",
        }}
      >
        404
      </h1>

      <h2
        style={{
          marginTop: "10px",
          color: "#222",
        }}
      >
        Page Not Found
      </h2>

      <p
        style={{
          color: "#666",
          maxWidth: "400px",
          lineHeight: "24px",
        }}
      >
        The page you are looking for does not exist or has been moved.
      </p>

      <a
        href="/home"
        style={{
          marginTop: "20px",
          background: "#FF8A65",
          color: "#fff",
          padding: "12px 24px",
          borderRadius: "30px",
          textDecoration: "none",
          fontWeight: "600",
        }}
      >
        Go Back Home
      </a>
    </div>
  );
}