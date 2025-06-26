import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
import { red } from '@mui/material/colors';

interface ErrorSnackbarProps {
    open: boolean;
    message: string;
    onClose: () => void;
}

const ErrorSnackbar: React.FC<ErrorSnackbarProps> = ({ open, message, onClose }) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={2000}
            onClose={onClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // position
        >
            <SnackbarContent
                sx={{
                    backgroundColor: red[600],
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                }}
                message={
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                        <ErrorIcon sx={{ fontSize: 20, marginRight: 1 }} />
                        {message}
                    </span>
                }
                action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={onClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            />
        </Snackbar>
    );
};

export default ErrorSnackbar;
