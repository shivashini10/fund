"use client";

import {
  createContext,
  useContext,
} from "react";

export const SocketContext = createContext();

export function SocketProvider({ children }) {
  return (
    <SocketContext.Provider value={{}}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () =>
  useContext(SocketContext);