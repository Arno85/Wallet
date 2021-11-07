import { LinearProgress, styled } from '@mui/material';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { AppStore } from 'store/appStore';
import TransactionList from 'components/Transactions/TransactionList/TransactionList';
import TransactionManageModal from 'components/Transactions/TransactionManageModal/TransactionManageModal';

const StyledHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(4),
  div: {
    marginLeft: 'auto',
  },
}));

const Transactions: React.FC = () => {
  const transactions = useSelector((store: AppStore) => store.transactionsReducer.transactions);
  const transactionLoading = useSelector((store: AppStore) => store.transactionsReducer.isLoading);
  const categories = useSelector((store: AppStore) => store.categoriesReducer.categories);
  const categoriesLoading = useSelector((store: AppStore) => store.categoriesReducer.isLoading);

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
