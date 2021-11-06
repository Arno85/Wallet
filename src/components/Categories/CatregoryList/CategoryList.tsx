import { GridColDef } from '@mui/x-data-grid';
import WalletList from 'components/UI/WalletList/WalletList';
import { Category } from 'models/category';

const CategoryList: React.FC<{ categories: Category[] }> = (props) => {
  const columns = [
    { field: 'name', headerName: 'Name' },
    { field: 'type', headerName: 'Type' },
  ] as GridColDef[];

  const rows = props.categories.map((c) => {
    return {
      id: c.id,
      [columns[0].field]: c.name,
      [columns[1].field]: c.type,
    };
  });

  return <WalletList columns={columns} rows={rows} />;
};

export default CategoryList;
