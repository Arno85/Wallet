import { styled } from '@mui/material';
import { Fragment } from 'react';
import Header from './Header/Header';

const StyledMain = styled('main')(({ theme }) => ({
  marginTop: '64px',
  padding: theme.spacing(4),
  minHeight: 'calc(100% - 64px)',
}));

const Layout: React.FC = (props) => {
  return (
    <Fragment>
      <Header />
      <StyledMain>{props.children}</StyledMain>
    </Fragment>
  );
};

export default Layout;
