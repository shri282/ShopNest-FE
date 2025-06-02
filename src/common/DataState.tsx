import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';

interface DataStateProps<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
    render: (data: T) => React.ReactElement;
    fallback?: React.ReactElement;
}

const DataState = <T,>({
    data,
    loading,
    error,
    render,
    fallback = <Typography>No data found.</Typography>,
}: DataStateProps<T>) => {
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Typography color="error">{error.message}</Typography>;
    }

    if (!data) {
        return fallback;
    }

    return render(data);
}

export default DataState;