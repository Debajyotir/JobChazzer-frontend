import { CircularProgress } from '@mui/material'
import React from 'react'

const Loading = () => {
  return (
    <div className="h-screen flex justify-center items-center">
        <CircularProgress />
    </div>
  )
}

export default Loading