// pages/EditTask.jsx
import React, { useState, useEffect } from "react"
import { getTask, updateTask } from "../api"
import Modal from "@mui/material/Modal"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import TaskForm from "./TaskForm"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  py: 4,
  px: 1,
}

export default function TaskDetail({ taskId, open, handleClose }) {
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (taskId) {
      getTask(taskId)
        .then((res) => {
          setTask(res.data)
          setLoading(false)
        })
        .catch(() => {
          setLoading(false)
        })
    }
  }, [taskId])

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {!loading ? (
            <TaskForm initialTask={task} hideHeader hideFooter />
          ) : null}
        </Box>
      </Modal>
    </div>
  )
}
