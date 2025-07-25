import React from 'react'

function LoadingSpiner() {
  return (
    <div className="d-flex justify-content-center">
    <div className="spinner-border LoadingSpiner" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
  )
}

export default LoadingSpiner