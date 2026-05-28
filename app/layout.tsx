import "../styles/global.css";
import "../styles/responsive.css";
import "../styles/dashboard.css";
import "../styles/auth.css";

import { AuthProvider } from "../context/AuthContext";
import { SocketProvider } from "../context/SocketContext";
import { ThemeProvider } from "../context/ThemeContext";

export const metadata = {
  title: "FundLoom",
  description: "FundLoom crowdfunding platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />

        <meta
          name="theme-color"
          content="#FF8A65"
        />

        <link rel="manifest" href="/manifest.json" />
      </head>

      <body>
        <ThemeProvider>
          <AuthProvider>
            <SocketProvider>
              {children}
            </SocketProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}