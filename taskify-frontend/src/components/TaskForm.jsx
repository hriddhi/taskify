// components/TaskForm.jsx
import React, { useState, useEffect } from "react"
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Typography,
  Box,
} from "@mui/material"

export default function TaskForm({ onSubmit, initialTask = {} }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
    status: "Pending",
    ...initialTask,
  })

  useEffect(() => {
    if (initialTask) {
      setTask({
        title: initialTask.title || "",
        description: initialTask.description || "",
        dueDate: initialTask.dueDate ? initialTask.dueDate.slice(0, 10) : "", // format yyyy-mm-dd
        priority: initialTask.priority || "Low",
        status: initialTask.status || "Pending",
      })
    }
  }, [])

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(task)
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" sx={{ mb: 3, mt: 2 }}>
        {initialTask._id ? "Edit Task" : "Add New Task"}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Title"
          name="title"
          value={task.title}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Description"
          name="description"
          value={task.description}
          onChange={handleChange}
          multiline
          rows={6}
          fullWidth
        />
        <TextField
          label="Due Date"
          name="dueDate"
          type="date"
          value={task.dueDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          select
          name="priority"
          label="Priority"
          value={task.priority}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </TextField>
        <TextField
          select
          name="status"
          label="Status"
          value={task.status}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </TextField>
        <Button type="submit" variant="contained" color="primary">
          {initialTask._id ? "Update Task" : "Save Task"}
        </Button>
      </Box>
    </Container>
  )
}
