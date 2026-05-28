export default function Notification({ message }: any) {
  return (
    <div style={{ background: "#eee", padding: 10 }}>
      🔔 {message}
    </div>
  );
}