import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import ErrorIcon from '@mui/icons-material/Error';
import { blue, red } from '@mui/material/colors';
import { ISnackbarState } from './types';

interface SnackBarProps {
    state: ISnackbarState;
    onClose: () => void;
}

const SnackBar: React.FC<SnackBarProps> = ({ state, onClose }) => {
    const getConfig = () => {
        switch (state.status) {
            case "Error":
                return { bgColor: red[600], icon: <ErrorIcon sx={{ fontSize: 20, mr: 1 }} /> };
            case "Info":
            default:
                return { bgColor: blue[600], icon: <InfoIcon sx={{ fontSize: 20, mr: 1 }} /> };
        }
    };

    const { bgColor, icon } = getConfig();

    return (
        <Snackbar
            open={state.open}
            autoHideDuration={1500}
            onClose={onClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <SnackbarContent
                sx={{
                    backgroundColor: bgColor,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                }}
                message={
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                        {icon}
                        {state.message}
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

export default SnackBar;