import { Button, ModalUnstyled, styled } from '@mui/material';
import { Fragment, useState } from 'react';

const Backdrop = styled('div')(
  () => `
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`,
);

const StyledModal = styled(ModalUnstyled)(() => ({
  position: 'fixed',
  zIndex: 1300,
  right: 0,
  bottom: 0,
  top: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledModalBody = styled('div')(({ theme }) => ({
  minWidth: 600,
  maxWidth: '80%',
  borderRadius: '10px',
  backgroundColor: theme.palette.primary.contrastText,
  padding: theme.spacing(4),
  h2: {
    marginBottom: theme.spacing(2),
  },
}));

const WalletModal: React.FC<{ title: string; openModalButton: JSX.Element }> = (props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Fragment>
      <Button color="primary" variant="contained" onClick={handleOpen}>
        {props.openModalButton}
      </Button>
      <StyledModal aria-labelledby="unstyled-modal-title" aria-describedby="unstyled-modal-description" open={open} onClose={handleClose} BackdropComponent={Backdrop}>
        <StyledModalBody>
          <h2 id="unstyled-modal-title">{props.title}</h2>
          {props.children}
        </StyledModalBody>
      </StyledModal>
    </Fragment>
  );
};

export default WalletModal;
