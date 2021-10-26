import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetNotification } from 'store/root/actions';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const WalletSnackBar: React.FC<{ status: 'success' | 'error'; message: string }> = (props) => {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    dispatch(resetNotification());
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
      <Alert onClose={handleClose} severity={props.status} sx={{ width: '100%' }}>
        {props.message}
      </Alert>
    </Snackbar>
  );
};

export default WalletSnackBar;
