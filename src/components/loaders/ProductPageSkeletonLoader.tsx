import { Box, Skeleton, Stack } from '@mui/material'
import React from 'react'

function ProductPageSkeletonLoader() {
  return (
      <Box
          width="100%"
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          gap={4}
          p={2}
      >
          {/* Left Skeleton - Product Image */}
          <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{
                  width: { xs: "100%", md: "40%" },
                  height: 350,
                  aspectRatio: "1 / 1",
                  borderRadius: 2,
              }}
          />

          {/* Right Skeleton - Product Details */}
          <Box
              flex={1}
              display="flex"
              flexDirection="column"
              gap={2}
              width={{ xs: "100%", md: "60%" }}
          >
              {/* title */}
              <Skeleton variant="text" width="70%" height={40} />
              <Skeleton variant="text" width="40%" height={30} />

              {/* Description lines */}
              {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} variant="text" width={`${90 - i * 10}%`} height={20} />
              ))}

              {/* Buttons */}
              <Stack direction="row" spacing={2} mt={2} flexWrap="wrap">
                  <Skeleton variant="rectangular" width={140} height={45} />
                  <Skeleton variant="rectangular" width={140} height={45} />
              </Stack>
          </Box>
      </Box>
  )
}

export default ProductPageSkeletonLoader