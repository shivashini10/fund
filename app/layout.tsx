import "../styles/style.css";
import "../styles/global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#FF8A65" />
      </head>

      <body>
        {children}
      </body>
    </html>
  );
}