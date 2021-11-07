import { GridColDef } from '@mui/x-data-grid';
import TransactionManageModal from 'components/Transactions/TransactionManageModal/TransactionManageModal';
import WalletList from 'components/UI/WalletList/WalletList';
import { Category } from 'models/category';
import { Transaction } from 'models/transaction';
import moment from 'moment';
import { Fragment } from 'react';
import TransactionDeleteModal from './../TransactionDeleteModal/TransactionDeleteModal';

const TransactionList: React.FC<{ transactions: Transaction[]; categories: Category[] }> = (props) => {
  const getTransaction = (transactionId: string) => {
    return props.transactions.find((c) => c.id === transactionId) || ({} as Transaction);
  };

  const getCategory = (categoryId: string) => {
    return props.categories.find((c) => c.id === categoryId) || ({} as Category);
  };

  const columns = [
    { field: 'description', headerName: 'Description' },
    { field: 'amount', headerName: 'Amount' },
    { field: 'date', headerName: 'Date' },
    { field: 'category', headerName: 'Category' },
    { field: 'type', headerName: 'Type' },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      disableColumnMenu: true,
      cellClassName: 'actions',
      width: 100,
      headerClassName: 'actions',
      renderCell: (params) => (
        <Fragment>
          <TransactionManageModal transaction={getTransaction(params.row.id)} categories={props.categories} />
          <TransactionDeleteModal transaction={getTransaction(params.row.id)} />
        </Fragment>
      ),
    },
  ] as GridColDef[];

  const rows = props.transactions.map((c) => {
    return {
      id: c.id,
      [columns[0].field]: c.description,
      [columns[1].field]: `${c.amount} $`,
      [columns[2].field]: moment(c.date).format('DD/MM/YYYY'),
      [columns[3].field]: getCategory(c.categoryId).name,
      [columns[4].field]: getCategory(c.categoryId).type,
    };
  });

  return <WalletList columns={columns} rows={rows} />;
};

export default TransactionList;
