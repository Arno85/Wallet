import { LinearProgress, styled } from '@mui/material';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppStore } from 'store/appStore';
import { fetchTransactions } from 'store/transactions/actions';
import TransactionList from 'components/Transactions/TransactionList/TransactionList';
import { fetchCategories } from 'store/categories/actions';
import TransactionManageModal from 'components/Transactions/TransactionManageModal/TransactionManageModal';

const StyledHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(4),
  div: {
    marginLeft: 'auto',
  },
}));

const Transactions: React.FC = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((store: AppStore) => store.transactionsReducer.transactions);
  const transactionsLoaded = useSelector((store: AppStore) => store.transactionsReducer.isLoaded);
  const transactionLoading = useSelector((store: AppStore) => store.transactionsReducer.isLoading);
  const categories = useSelector((store: AppStore) => store.categoriesReducer.categories);
  const categoriesLoaded = useSelector((store: AppStore) => store.categoriesReducer.isLoaded);
  const categoriesLoading = useSelector((store: AppStore) => store.categoriesReducer.isLoading);

  useEffect(() => {
    if (!transactionsLoaded) {
      dispatch(fetchTransactions());
    }

    if (!categoriesLoaded) {
      dispatch(fetchCategories());
    }
  }, [transactionsLoaded, categoriesLoaded, dispatch]);

  return (
    <Fragment>
      <StyledHeader>
        <h1>Transactions</h1>
        <TransactionManageModal categories={categories} />
      </StyledHeader>
      {transactionLoading && categoriesLoading && <LinearProgress />}
      {!transactionLoading && !categoriesLoading && <TransactionList transactions={transactions} categories={categories} />}
    </Fragment>
  );
};

export default Transactions;
