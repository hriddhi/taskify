import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"

import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import AddTask from "./pages/AddTask"
import TaskList from "./components/TaskList"
import EditTask from "./pages/EditTask"
import ProtectedRoute from "./routes/ProtectedRoute"

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/tasks/new" element={<AddTask />} />
        <Route path="/tasks/:id" element={<EditTask />} />
      </Route>

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
