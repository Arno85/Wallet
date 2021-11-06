import { Button, TextField, Select, MenuItem, styled } from '@mui/material';
import { FormEvent, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import WalletModal from 'components/UI/WalletModal/WalletModal';
import { useDispatch } from 'react-redux';
import { addCategory } from 'store/categories/actions';

const CategoryForm = styled('form')(({ theme }) => ({
  '> div': {
    width: '100%',
    marginBottom: theme.spacing(4),
  },
}));

const CategoryAdd: React.FC = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [type, setType] = useState('expense');

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

  return (
    <WalletModal title="Add Category" openModalButton={<AddIcon />}>
      <CategoryForm onSubmit={handleAddCategory} noValidate>
        <TextField error={!name} required label="Name" variant="standard" onChange={onNameChange} value={name} helperText={nameError} />
        <Select variant="standard" value={type} label="Category" onChange={onTypeChange}>
          <MenuItem value="Expense">Expense</MenuItem>
          <MenuItem value="Income">Income</MenuItem>
          <MenuItem value="Both">Both</MenuItem>
        </Select>
        <Button type="submit" color="primary" variant="contained">
          Save
        </Button>
      </CategoryForm>
    </WalletModal>
  );
};

export default CategoryAdd;
