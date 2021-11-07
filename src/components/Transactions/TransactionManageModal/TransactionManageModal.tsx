import { Button, TextField, Select, MenuItem, styled, IconButton, InputLabel, FormControl } from '@mui/material';
import { FormEvent, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import WalletModal from 'components/UI/WalletModal/WalletModal';
import { useDispatch } from 'react-redux';
import { Transaction } from 'models/transaction';
import { Category } from 'models/category';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import frLocale from 'date-fns/locale/fr';
import { addTransaction } from 'store/transactions/actions';
import { editTransaction } from './../../../store/transactions/actions';

const TransactionForm = styled('form')(({ theme }) => ({
  '> div': {
    width: '100%',
    marginBottom: theme.spacing(4),
  },
}));

const TransactionManageModal: React.FC<{ transaction?: Transaction; categories: Category[] }> = (props) => {
  const dispatch = useDispatch();
  const [description, setDesc] = useState(props.transaction?.description || '');
  const [amount, setAmount] = useState(props.transaction?.amount || '');
  const [date, setDate] = useState(props.transaction?.date || new Date());
  const [categoryId, setCategoryId] = useState(props.transaction?.categoryId || '');

  const handleAddTransaction = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(addTransaction({ description, amount: +amount, date, categoryId }));
  };

  const handleEditTransaction = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(editTransaction({ description, amount: +amount, date, categoryId }, props.transaction!.id));
  };

  let modalTitle = 'Add Transaction';
  let formSubmit = handleAddTransaction;
  let openButton = (
    <Button color="primary" variant="contained">
      <AddIcon />
    </Button>
  );

  if (props.transaction) {
    modalTitle = 'Edit Transaction';
    formSubmit = handleEditTransaction;
    openButton = (
      <IconButton>
        <EditIcon />
      </IconButton>
    );
  }

  return (
    <WalletModal title={modalTitle} openModalButton={openButton}>
      <TransactionForm onSubmit={formSubmit} noValidate autoComplete="off">
        <TextField required label="Description" onChange={(e) => setDesc(e.target.value)} value={description} />
        <TextField required label="Amount" onChange={(e) => setAmount(e.target.value)} value={amount} />
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
          <DatePicker
            label="Date"
            value={date}
            onChange={(newValue) => {
              if (newValue) {
                setDate(newValue);
              }
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <FormControl fullWidth required>
          <InputLabel id="category-label">Category</InputLabel>
          <Select labelId="category-label" label="Category" onChange={(e) => setCategoryId(e.target.value)} value={categoryId}>
            {props.categories.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" color="primary" variant="contained">
          Save
        </Button>
      </TransactionForm>
    </WalletModal>
  );
};

export default TransactionManageModal;
