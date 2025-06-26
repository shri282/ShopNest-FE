import { Box, CircularProgress } from '@mui/material';
import React from 'react'

interface LoadingOverlayProps {
  loading: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ loading }) => {
  if (loading) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          zIndex: 1300,
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  return null;
}

export default LoadingOverlay;