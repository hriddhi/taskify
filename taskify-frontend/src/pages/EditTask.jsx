// pages/EditTask.jsx
import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import TaskForm from "../components/TaskForm"
import { getTask, updateTask } from "../api"

export default function EditTask() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTask(id)
      .then((res) => {
        setTask(res.data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [id])

  const handleUpdate = async (updatedTask) => {
    await updateTask(id, updatedTask)
    navigate("/")
  }

  if (loading) return <p>Loading...</p>
  if (!task) return <p>Task not found.</p>

  return <TaskForm initialTask={task} onSubmit={handleUpdate} />
}
