import { Box, Button, Divider, MenuItem, TextField, Typography } from '@mui/material'
import React from 'react'

const OrderSummary: React.FC = () => {

    return (
        <Box sx={{
            width: '100%',
            p: 2,
            height: 'fit-content',
            border: '1px solid #ccc'
        }}>
            <Typography variant="h6" mb={2}>Order Summary</Typography>

            <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography>Items</Typography>
                <Typography>£{'2500'}</Typography>
            </Box>

            <Box display="flex" alignItems={'center'} justifyContent="space-between" mb={2}>
                <Typography>Shipping</Typography>
                <TextField
                    select
                    defaultValue="standard"
                    size="small"
                    sx={{ width: '60%' }}
                >
                    <MenuItem value="standard">Standard Delivery – £{'100'}</MenuItem>
                </TextField>
            </Box>

            <TextField
                fullWidth
                size="small"
                placeholder="Enter your code"
                sx={{ mt: 2 }}
            />
            <Button fullWidth variant="contained" color="error" sx={{ mt: 1 }}>
                APPLY
            </Button>
            <Divider sx={{ my: 2 }} />

            <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography fontWeight="bold">Total Cost</Typography>
                <Typography fontWeight="bold">£{'2500'}</Typography>
            </Box>

            <Button fullWidth variant="contained" sx={{ background: '#5c6bc0' }}>
                CHECKOUT
            </Button>
        </Box>
    )
}

export default OrderSummary