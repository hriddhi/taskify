import express from "express"

import Task from "../models/Task"

const router = express.Router()

// Create a task
router.post("/", async (req, res) => {
  console.log(req.body)
  try {
    const task = new Task(req.body)
    await task.save()
    res.status(201).json(task)
  } catch (err: any) {
    console.log(err)
    res.status(400).json({ error: err.message })
  }
})

// Get all tasks (with optional filters)
router.get("/", async (req, res) => {
  const { status, priority } = req.query
  let filters: any = {}
  if (status) filters.status = status
  if (priority) filters.priority = priority

  const tasks = await Task.find(filters)
  res.json(tasks)
})

// Get a task by ID
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
    if (task) res.json(task)
    else res.status(404).json({ error: "Not found" })
  } catch (err: any) {
    res.status(400).json({ error: err.message })
  }
})

// Update a task
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.json(task)
  } catch (err: any) {
    res.status(400).json({ error: err.message })
  }
})

// Delete a task
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id)
    res.json({ message: "Task deleted" })
  } catch (err: any) {
    res.status(400).json({ error: err.message })
  }
})

export default router
