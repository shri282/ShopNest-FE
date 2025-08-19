import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';

interface DataStateLoaderStyle {
    width?: string;
    height?: string;
    backgroundColor?: string;
}

interface DataStateProps<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
    loaderStyle?: DataStateLoaderStyle;
    render: (data: T) => React.ReactElement;
    fallback?: React.ReactElement;
}

const DataState = <T,>({
    data,
    loading,
    loaderStyle = {},
    error,
    render,
    fallback = <Typography>No data found.</Typography>,
}: DataStateProps<T>) => {
    if (loading) {
        return (
            <Box sx={{
                height: '70vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mt: 4,
                ...loaderStyle
            }}>
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