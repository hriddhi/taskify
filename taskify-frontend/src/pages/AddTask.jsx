import React from "react"
import TaskForm from "../components/TaskForm"

import { createTask } from "../api"
import { useNavigate } from "react-router-dom"

export default function AddTask() {
  const navigate = useNavigate()

  const handleSubmit = async (taskData) => {
    await createTask(taskData)
    navigate("/")
  }

  return (
    <div>
      <TaskForm onSubmit={handleSubmit} />
    </div>
  )
}
