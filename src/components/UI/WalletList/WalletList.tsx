import { styled } from '@mui/material/styles';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import theme from 'core/theme/theme.config';

const WalletList: React.FC<{
  columns: GridColDef[];
  rows: { [x: string]: string; id: string }[];
  rowClickedHandler?: (rowId: string) => void;
}> = (props) => {
  const columnWidth = 100 / (props.columns.length - 1);
  const actionWidth = 100 / (props.columns.length - 1);

  const StyledDataGrid = styled(DataGrid)(() => ({
    width: '100%',
    border: 0,
    '.MuiDataGrid-columnsContainer': {
      border: `1px solid ${theme.palette.grey[300]}`,
      borderRadius: '10px 10px 0 0',
    },
    '.MuiDataGrid-virtualScrollerContent': {
      border: `1px solid ${theme.palette.grey[300]}`,
      borderTop: 0,
      borderRadius: '0 0 10px 10px',
    },
    '.MuiDataGrid-columnHeaderWrapper, .MuiDataGrid-virtualScrollerRenderZone': {
      width: '100%',
    },
    '.MuiDataGrid-row': {
      width: '100%',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: theme.palette.grey[100],
      },
    },
    '.MuiDataGrid-columnHeader:not(.actions), .MuiDataGrid-cell:not(.actions)': {
      outline: 'none !important',
      width: `calc(${columnWidth}% - ${actionWidth}px) !important`,
      minWidth: `calc(${columnWidth}% - ${actionWidth}px) !important`,
      maxWidth: `calc(${columnWidth}% - ${actionWidth}px) !important`,
      borderRight: `1px solid ${theme.palette.grey[300]}`,
    },
    '.MuiDataGrid-columnHeader.actions, .MuiDataGrid-cell.actions': {
      outline: 'none !important',
    },
    '.MuiDataGrid-columnHeaderTitleContainer': {
      padding: 0,
    },
    '.MuiDataGrid-columnSeparator': {
      display: 'none',
    },
  }));

  const handleRowClick = (rowId: GridRowId) => {
    if (props.rowClickedHandler) {
      props.rowClickedHandler(rowId.toString());
    }
  };

  return <StyledDataGrid autoHeight rows={props.rows} columns={props.columns} hideFooter onRowClick={(params) => handleRowClick(params.id)} />;
};

export default WalletList;
