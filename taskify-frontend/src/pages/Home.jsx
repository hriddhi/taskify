import React, { useState, useEffect } from "react"
import { Box, Typography } from "@mui/material"
import TaskFilter from "../components/TaskFilter"
import TaskList from "../components/TaskList"
import AssignmentIcon from "@mui/icons-material/Task"
import { getTasks, deleteTask } from "../api"

export default function Home() {
  const [status, setStatus] = useState("all")
  const [priority, setPriority] = useState("all")
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const filters = {}
    if (status !== "all") filters.status = status
    if (priority !== "all") filters.priority = priority
    getTasks(filters).then((res) => {
      setTasks(res.data)
    })
  }, [status, priority])

  // Delete handler
  const handleDelete = async (id) => {
    await deleteTask(id)
    setTasks(tasks.filter((task) => task._id !== id))
  }

  return (
    <Box sx={{ display: "flex", height: "100vh", p: 2, gap: 3 }}>
      <Box>
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: 1,
            textDecorationLine: "underline",
          }}
        >
          <AssignmentIcon fontSize="large" color="primary" />
          Taskify
        </Typography>
        <Box
          component="aside"
          sx={{
            width: 280,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 3,
            p: 2,
            flexShrink: 0,
            height: "fit-content",
            position: "sticky",
            top: 16,
          }}
        >
          <TaskFilter
            status={status}
            setStatus={setStatus}
            priority={priority}
            setPriority={setPriority}
          />
        </Box>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, overflowY: "auto" }}>
        <TaskList tasks={tasks} onDelete={handleDelete} />
      </Box>
    </Box>
  )
}
