import { GridColDef } from '@mui/x-data-grid';
import WalletList from 'components/UI/WalletList/WalletList';
import { Category } from 'models/category';
import { Fragment } from 'react';
import CategoryManageModal from '../CategoryManageModal/CategoryManageModal';
import CategoryDeleteModal from '../CategoryDeleteModal/CategoryDeleteModal';

const CategoryList: React.FC<{ categories: Category[] }> = (props) => {
  const columns = [
    { field: 'name', headerName: 'Name' },
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
          <CategoryManageModal category={getCategory(params.row.id)} />
          <CategoryDeleteModal category={getCategory(params.row.id)} categories={props.categories} />
        </Fragment>
      ),
    },
  ] as GridColDef[];

  const rows = props.categories.map((c) => {
    return {
      id: c.id,
      [columns[0].field]: c.name,
      [columns[1].field]: c.type,
    };
  });

  const getCategory = (categoryId: string) => {
    return props.categories.find((c) => c.id === categoryId) || ({} as Category);
  };

  return <WalletList columns={columns} rows={rows} />;
};

export default CategoryList;
