import { Button, FormControl, IconButton, InputLabel, MenuItem, Select, styled } from '@mui/material';
import WalletModal from 'components/UI/WalletModal/WalletModal';
import DeleteIcon from '@mui/icons-material/Delete';
import { Category } from 'models/category';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory } from 'store/categories/actions';
import { FormEvent, useEffect, useState } from 'react';
import { AppStore } from 'store/appStore';
import { editTransaction } from 'store/transactions/actions';

const StyledForm = styled('form')(({ theme }) => ({
  p: {
    marginBottom: theme.spacing(2),
  },
  '> div': {
    width: '100%',
    marginBottom: theme.spacing(4),
  },
}));

const CategoryDeleteModal: React.FC<{ category: Category; categories: Category[] }> = (props) => {
  const dispatch = useDispatch();
  const [newCategoryId, setNewCategoryId] = useState('');
  const categories = props.categories.filter((c) => c.id !== props.category.id);
  const transactions = useSelector((store: AppStore) => store.transactionsReducer.transactions);
  const transactionsLoaded = useSelector((store: AppStore) => store.transactionsReducer.isLoaded);

  const handleDeleteCategory = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(deleteCategory(props.category));

    transactions
      .filter((t) => t.categoryId === props.category.id)
      .forEach((t) => {
        dispatch(editTransaction({ ...t, categoryId: newCategoryId }, t.id));
      });
  };

  useEffect(() => {}, [transactionsLoaded, dispatch]);

  return (
    <WalletModal
      title="Delete Category"
      openModalButton={
        <IconButton>
          <DeleteIcon />
        </IconButton>
      }
    >
      <StyledForm onSubmit={handleDeleteCategory} noValidate autoComplete="off">
        <p>Are you sure you want to delete the category {props.category.name}?</p>
        <p>Select a new Category for the transactions associated to the old category:</p>
        <FormControl fullWidth required>
          <InputLabel id="type-label">Category</InputLabel>
          <Select labelId="category-label" label="Category" onChange={(e) => setNewCategoryId(e.target.value)} value={newCategoryId}>
            {categories.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" color="primary" variant="contained">
          Save
        </Button>
      </StyledForm>
    </WalletModal>
  );
};

export default CategoryDeleteModal;
