import Task from "../models/Task"

// Create a task
const createTask = async (req: any, res: any) => {
  try {
    const task = new Task({
      ...req.body,
      createdBy: req.user._id, // authenticated user's ID
    })
    await task.save()
    res.status(201).json(task)
  } catch (err: any) {
    console.log(err)
    res.status(400).json({ error: err.message })
  }
}

// Get all tasks (with optional filters)
const getTask = async (req: any, res: any) => {
  try {
    const { status, priority } = req.query
    let filters: any = { createdBy: req.user._id }
    if (status) filters.status = status
    if (priority) filters.priority = priority

    const tasks = await Task.find(filters)
    res.json(tasks)
  } catch (err: any) {
    console.log(err)
    res.status(400).json({ error: err.message })
  }
}

// Get a task by ID
const getTaskById = async (req: any, res: any) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    })
    if (task) res.json(task)
    else res.status(404).json({ error: "Not found" })
  } catch (err: any) {
    res.status(400).json({ error: err.message })
  }
}

// Update a task
const updateTask = async (req: any, res: any) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.json(task)
  } catch (err: any) {
    res.status(400).json({ error: err.message })
  }
}

// Delete a task
const deleteTask = async (req: any, res: any) => {
  try {
    await Task.findByIdAndDelete(req.params.id)
    res.json({ message: "Task deleted" })
  } catch (err: any) {
    res.status(400).json({ error: err.message })
  }
}

export { createTask, getTask, getTaskById, updateTask, deleteTask }
