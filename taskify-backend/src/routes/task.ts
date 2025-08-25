import express from "express"

import { createTask, deleteTask, getTask, getTaskById, updateTask } from "../controllers/task"

const router = express.Router()

// Create a task
router.post("/", createTask)

// Get all tasks (with optional filters)
router.get("/", getTask)

// Get a task by ID
router.get("/:id", getTaskById)

// Update a task
router.put("/:id", updateTask)

// Delete a task
router.delete("/:id", deleteTask)

export default router
