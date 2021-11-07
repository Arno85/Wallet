import { Button, IconButton } from '@mui/material';
import WalletModal from 'components/UI/WalletModal/WalletModal';
import DeleteIcon from '@mui/icons-material/Delete';
import { Category } from 'models/category';
import { useDispatch } from 'react-redux';
import { deleteCategory } from 'store/categories/actions';

const CategoryDeleteModal: React.FC<{ category: Category }> = (props) => {
  const dispatch = useDispatch();

  const handleDeleteCategory = () => {
    dispatch(deleteCategory(props.category));
  };

  return (
    <WalletModal
      title="Delete Category"
      openModalButton={
        <IconButton>
          <DeleteIcon />
        </IconButton>
      }
    >
      <p>Are you sure you want to delete the category {props.category.name}?</p>
      <br />
      <Button type="submit" color="primary" variant="contained" onClick={handleDeleteCategory}>
        Save
      </Button>
    </WalletModal>
  );
};

export default CategoryDeleteModal;
