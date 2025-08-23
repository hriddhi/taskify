import React from "react"
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Divider,
} from "@mui/material"

export default function TaskFilter({
  status,
  setStatus,
  priority,
  setPriority,
}) {
  const statusOptions = ["Pending", "Completed"]
  const priorityOptions = ["Low", "Medium", "High"]

  // Helper to handle status change (single select)
  const handleStatusChange = (option) => {
    setStatus(option)
  }

  // Helper to handle priority change (single select here)
  const handlePriorityChange = (option) => {
    setPriority(option)
  }

  return (
    <Box>
      <Typography variant="subtitle1" gutterBottom>
        Status
      </Typography>
      <FormGroup>
        {statusOptions.map((option) => (
          <FormControlLabel
            key={option}
            control={
              <Checkbox
                checked={status === option}
                onChange={() => handleStatusChange(option)}
              />
            }
            label={option}
          />
        ))}
      </FormGroup>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle1" gutterBottom>
        Priority
      </Typography>
      <FormGroup>
        {priorityOptions.map((option) => (
          <FormControlLabel
            key={option}
            control={
              <Checkbox
                checked={priority === option}
                onChange={() => handlePriorityChange(option)}
              />
            }
            label={option}
          />
        ))}
      </FormGroup>
    </Box>
  )
}
