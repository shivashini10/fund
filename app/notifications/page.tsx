"use client";

import { useEffect, useState } from "react";
import "./notifications.css";
import "../../styles/global.css";

export default function NotificationsPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notifications`)
      .then((res) => res.json())
      .then((data) => {
        setNotes(data || []);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="notificationsPage">

      <div className="notificationsContainer">

        <h1 className="pageTitle">
          Notifications 🔔
        </h1>

        {loading ? (
          <p className="emptyText">Loading notifications...</p>
        ) : notes.length === 0 ? (
          <div className="emptyBox">
            <h3>No Notifications</h3>
            <p>You’re all caught up 🎉</p>
          </div>
        ) : (
          <div className="notesWrapper">

            {notes.map((n: any) => (
              <div key={n._id} className="noteCard">

                <div className="iconBox">
                  🔔
                </div>

                <div className="noteContent">
                  <p>{n.message}</p>

                  <small>
                    {n.createdAt
                      ? new Date(n.createdAt).toLocaleString()
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