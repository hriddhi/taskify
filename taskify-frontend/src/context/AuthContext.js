import React, { createContext, useContext, useState, useEffect } from "react"

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user")
    console.log("storedUser", storedUser)
    return storedUser ? JSON.parse(storedUser) : null
  })

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token")
  })

  useEffect(() => {
    if (token) {
      localStorage.setItem("user", JSON.stringify(user))
      localStorage.setItem("token", token)
    } else {
      localStorage.removeItem("user")
      localStorage.removeItem("token")
    }
  }, [token, user])

  // Login function to update user state
  const login = (token, user) => {
    setToken(token)
    setUser(user)
  }

  // Logout function to clear user state
  const logout = () => {
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
