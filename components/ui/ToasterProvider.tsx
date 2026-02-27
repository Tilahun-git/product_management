"use client";

import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 2000,
        style: {
          borderRadius: "10px",
          fontSize: "14px",
        },
      }}
    />
  );
}