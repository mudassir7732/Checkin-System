import React, { useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { SnackbarProps } from '@/app/types/snackbar';

const CustomSnackbar: React.FC<SnackbarProps> = ({ message }) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    useEffect(() => {
        setIsOpen(true);
        setTimeout(() => {
            setIsOpen(false);
        }, 6000);
    }, [message]);

    return (
        <Snackbar
            open={isOpen}
            autoHideDuration={6000}
            message={message}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        />
    );
};

export default CustomSnackbar;
