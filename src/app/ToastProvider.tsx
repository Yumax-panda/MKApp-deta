"use client"

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <ToastContainer theme="colored" />
      {children}
    </div>
  )
}
