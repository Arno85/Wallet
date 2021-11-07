import { Button, TextField, Select, MenuItem, styled, IconButton, FormControl, InputLabel } from '@mui/material';
import { FormEvent, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import WalletModal from 'components/UI/WalletModal/WalletModal';
import { useDispatch } from 'react-redux';
import { addCategory, editCategory } from 'store/categories/actions';
import { Category } from 'models/category';

const CategoryForm = styled('form')(({ theme }) => ({
  '> div': {
    width: '100%',
    marginBottom: theme.spacing(4),
  },
}));

const CategoryManageModal: React.FC<{ category?: Category }> = (props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(props.category?.name || '');
  const [type, setType] = useState(props.category?.type || 'Expense');
  const [nameError, setNameError] = useState('');

  const onNameChange = (e: any) => setName(e.target.value);
  const onTypeChange = (e: any) => setType(e.target.value);

  const handleAddCategory = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name) {
      setNameError('Name is required');
      return;
    }

    dispatch(addCategory({ name, type }));
  };

  const handleEditCategory = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name) {
      setNameError('Name is required');
      return;
    }

    dispatch(editCategory({ name, type }, props.category!.id));
  };

  let modalTitle = 'Add Category';
  let formSubmit = handleAddCategory;
  let openButton = (
    <Button color="primary" variant="contained">
      <AddIcon />
    </Button>
  );

  if (props.category) {
    modalTitle = 'Edit Category';
    formSubmit = handleEditCategory;
    openButton = (
      <IconButton>
        <EditIcon />
      </IconButton>
    );
  }

  return (
    <WalletModal title={modalTitle} openModalButton={openButton}>
      <CategoryForm onSubmit={formSubmit} noValidate autoComplete="off">
        <TextField error={!name} required label="Name" onChange={onNameChange} value={name} helperText={nameError} />
        <FormControl fullWidth required>
          <InputLabel id="type-label">Type</InputLabel>
          <Select value={type} label="Type" onChange={onTypeChange}>
            <MenuItem value="Expense">Expense</MenuItem>
            <MenuItem value="Income">Income</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" color="primary" variant="contained">
          Save
        </Button>
      </CategoryForm>
    </WalletModal>
  );
};

export default CategoryManageModal;
