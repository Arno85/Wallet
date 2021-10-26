import styled from '@emotion/styled';
import { Box, Button, ModalUnstyled, TextField } from '@mui/material';
import { FormEvent, FormEventHandler, Fragment, useRef, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 600,
  bgcolor: 'background.paper',
  p: 2,
  px: 4,
  pb: 3,
};

const CategoryAdd: React.FC = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState();

  const onTextChange = (e: any) => setName(e.target.value);

  const handleAddCategory = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(name);
  };

  return (
    <Fragment>
      <Button color="primary" variant="contained" onClick={handleOpen}>
        <AddIcon />
      </Button>
      <StyledModal aria-labelledby="unstyled-modal-title" aria-describedby="unstyled-modal-description" open={open} onClose={handleClose} BackdropComponent={Backdrop}>
        <Box sx={style}>
          <h2 id="unstyled-modal-title">Add Category</h2>
          <Box
            component="form"
            onSubmit={handleAddCategory}
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField error required id="categoryName" label="Name" variant="standard" onChange={onTextChange} helperText="Please add a name!" value={name} />
            <Button type="submit" color="primary" variant="contained">
              Save
            </Button>
          </Box>
        </Box>
      </StyledModal>
    </Fragment>
  );
};

export default CategoryAdd;
