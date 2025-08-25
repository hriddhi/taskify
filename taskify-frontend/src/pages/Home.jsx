import React, { useState, useEffect, useContext } from "react"
import { Box, Typography, Button } from "@mui/material"
import TaskFilter from "../components/TaskFilter"
import TaskList from "../components/TaskList"
import AssignmentIcon from "@mui/icons-material/Assignment"
import TaskIcon from "@mui/icons-material/Task"
import LogoutIcon from "@mui/icons-material/Logout"
import AddIcon from "@mui/icons-material/Add"
import { AuthContext } from "../context/AuthContext"
import { getTasks, deleteTask } from "../api"
import { useNavigate } from "react-router-dom"

export default function Home() {
  const navigate = useNavigate()
  const [status, setStatus] = useState("all")
  const [priority, setPriority] = useState("all")
  const [tasks, setTasks] = useState([])

  const { user, logout } = useContext(AuthContext)

  useEffect(() => {
    const filters = {}
    if (status !== "all") filters.status = status
    if (priority !== "all") filters.priority = priority
    getTasks(filters).then((res) => {
      setTasks(res.data)
    })
  }, [status, priority])

  // Logout handler
  const handleLogout = () => {
    logout()
    navigate("/login") // Redirect to login page
  }

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
          <TaskIcon fontSize="large" color="primary" />
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
        <Box
          sx={{
            height: "42px",
            px: 3,
            mb: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <AssignmentIcon fontSize="medium" color="primary" />
            My Tasks
          </Typography>

          <Box display="flex" columnGap={2} sx={{ alignItems: "center" }}>
            {user ? (
              <Typography mr={1}>Hello, {user.username}</Typography>
            ) : null}
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate("/tasks/new")}
            >
              New Task
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{ mr: 1 }}
            >
              Logout
            </Button>
          </Box>
        </Box>
        <TaskList tasks={tasks} onDelete={handleDelete} />
      </Box>
    </Box>
  )
}
