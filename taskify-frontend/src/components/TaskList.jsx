import React, { useState } from "react"
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Chip,
  Box,
  Divider,
  Button,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty"
import AssignmentIcon from "@mui/icons-material/Assignment"
import LogoutIcon from "@mui/icons-material/Logout"

import { useNavigate } from "react-router-dom"
import TaskDetail from "./TaskDetail"

export default function TaskList({ tasks, onDelete }) {
  const navigate = useNavigate()

  const [selectedTask, setSelectedTask] = useState()

  return (
    <>
      <Container
        sx={{
          minWidth: 300,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            p: 0,
          }}
        >
          {tasks.length === 0 ? (
            <Typography variant="body1">No tasks found.</Typography>
          ) : (
            tasks.map((task) => (
              <Card
                key={task._id}
                sx={{
                  width: 320,
                  minHeight: 180,
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: 2,
                  borderRadius: 2,
                  backgroundColor: "background.paper",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: 2,
                    cursor: "pointer",
                  },
                }}
              >
                <CardContent
                  sx={{ flexGrow: 1 }}
                  onClick={() => setSelectedTask(task._id)}
                >
                  <Typography variant="h6" noWrap sx={{ fontWeight: "bold" }}>
                    {task.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1, minHeight: 52 }}
                  >
                    {task.description || "No description"}
                  </Typography>
                  <Chip
                    label={task.status}
                    color={task.status === "Completed" ? "success" : "warning"}
                    icon={
                      task.status === "Completed" ? (
                        <CheckCircleIcon />
                      ) : (
                        <HourglassEmptyIcon />
                      )
                    }
                    size="small"
                    sx={{ mb: 1 }}
                  />
                  <Typography
                    variant="caption"
                    display="block"
                    color="text.primary"
                  >
                    Priority: {task.priority}
                  </Typography>
                </CardContent>

                <Divider />

                <CardActions sx={{ justifyContent: "flex-end" }}>
                  <IconButton
                    color="primary"
                    onClick={() => navigate(`/tasks/${task._id}`)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => onDelete(task._id)}>
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            ))
          )}
        </Box>
      </Container>
      <TaskDetail
        open={!!selectedTask}
        taskId={selectedTask}
        handleClose={() => setSelectedTask(null)}
      />
    </>
  )
}
