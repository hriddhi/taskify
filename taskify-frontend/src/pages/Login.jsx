import React, { useState, useContext } from "react"
import { login } from "../api"
import { useNavigate, Link } from "react-router-dom"
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Stack,
} from "@mui/material"
import { AuthContext } from "../context/AuthContext"

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" })
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const { login } = useContext(AuthContext)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await login(form)
      login(data.token, data.user)
      navigate("/") // Redirect on success
    } catch (err) {
      setError(err.response?.data?.message || "Login failed")
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" mb={3}>
        Login
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
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
          Log In
        </Button>
      </Box>

      <Stack direction="row" justifyContent="center" spacing={1} sx={{ mt: 2 }}>
        <Typography>Don't have an account?</Typography>
        <Button component={Link} to="/signup" variant="outlined" size="small">
          Sign Up
        </Button>
      </Stack>
    </Container>
  )
}
