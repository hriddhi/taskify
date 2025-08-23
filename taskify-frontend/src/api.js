import axios from "axios"

const API = axios.create({ baseURL: "http://localhost:8000/api" })

// Attach token to requests if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Auth API calls
export const signup = (data) => API.post("/auth/signup", data)
export const login = (data) => API.post("/auth/login", data)

export const getTasks = (filters) => API.get("/tasks", { params: filters })
export const createTask = (task) => API.post("/tasks", task)
export const updateTask = (id, task) => API.put(`/tasks/${id}`, task)
export const deleteTask = (id) => API.delete(`/tasks/${id}`)
export const getTask = (id) => API.get(`/tasks/${id}`)
