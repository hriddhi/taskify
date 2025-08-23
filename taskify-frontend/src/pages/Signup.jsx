import React, { useState } from "react"
import { signup } from "../api"
import { useNavigate } from "react-router-dom"
import { TextField, Button, Container, Typography, Box } from "@mui/material"

export default function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" })
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await signup(form)
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))
      navigate("/") // Redirect on success
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed")
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" mb={3}>
        Sign Up
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Username"
          variant="outlined"
          name="username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <TextField
          label="Email"
          variant="outlined"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <TextField
          label="Password"
          variant="outlined"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <Button variant="contained" type="submit">
          Sign Up
        </Button>
      </Box>
    </Container>
  )
}
