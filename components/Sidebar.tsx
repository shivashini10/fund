"use client";

import { useRouter, usePathname } from "next/navigation";

import "./Sidebar.css";

export default function Sidebar() {

  const router = useRouter();

  const pathname = usePathname();

  const menuItems = [

    {
      label: "User Dashboard",
      path: "/dashboard/user",
      icon: "👤",
    },

    {
      label: "Admin Dashboard",
      path: "/dashboard/admin",
      icon: "🛡️",
    },

    {
      label: "Campaigns",
      path: "/campaigns",
      icon: "🎯",
    },

    {
      label: "Payments",
      path: "/payments",
      icon: "💳",
    },

    {
      label: "Withdrawals",
      path: "/withdrawals",
      icon: "💸",
    },

    {
      label: "Notifications",
      path: "/notifications",
      icon: "🔔",
    },

    {
      label: "Profile",
      path: "/profile",
      icon: "🙍",
    },

    {
      label: "Settings",
      path: "/settings",
      icon: "⚙️",
    },

  ];

  return (

    <div className="sidebar">

      {/* LOGO */}
      <h2 className="logo">
        ❤️ FundLoom
      </h2>

      {/* MENU */}
      <div className="menuWrapper">

        {menuItems.map((item) => (

          <button
            key={item.path}
            className={`sidebarBtn ${
              pathname === item.path
                ? "activeSidebarBtn"
                : ""
            }`}
            onClick={() => router.push(item.path)}
          >

            <span className="menuIcon">
              {item.icon}
            </span>

            {item.label}

          </button>

        ))}

      </div>

      {/* LOGOUT */}
      <button
        className="logoutBtn"
        onClick={() => {

          localStorage.removeItem("token");

          router.push("/login");

        }}
      >

        🚪 Logout

      </button>

    </div>

  );
}