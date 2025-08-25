import React, { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

const ProtectedRoute = () => {
  const { token } = useContext(AuthContext)
  console.log("token from protected route", token)

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />
  }

  // Otherwise render the child routes (outlet)
  return <Outlet />
}

export default ProtectedRoute
