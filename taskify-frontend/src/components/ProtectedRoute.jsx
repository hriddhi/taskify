import React from "react"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = () => {
  // Simple auth check by token presence in localStorage
  const token = localStorage.getItem("token")
  console.log(token)

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />
  }

  // Otherwise render the child routes (outlet)
  return <Outlet />
}

export default ProtectedRoute
