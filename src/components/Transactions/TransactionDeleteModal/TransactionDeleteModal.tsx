import { Button, IconButton } from '@mui/material';
import WalletModal from 'components/UI/WalletModal/WalletModal';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { deleteTransaction } from 'store/transactions/actions';
import { Transaction } from 'models/transaction';

const TransactionDeleteModal: React.FC<{ transaction: Transaction }> = (props) => {
  const dispatch = useDispatch();

  const handleDeleteTransaction = () => {
    dispatch(deleteTransaction(props.transaction));
  };

  return (
    <WalletModal
      title="Delete Transaction"
      openModalButton={
        <IconButton>
          <DeleteIcon />
        </IconButton>
      }
    >
      <p>Are you sure you want to delete the transaction {props.transaction.description}?</p>
      <br />
      <Button type="submit" color="primary" variant="contained" onClick={handleDeleteTransaction}>
        Save
      </Button>
    </WalletModal>
  );
};

export default TransactionDeleteModal;
