import { AppBar, Toolbar, Typography } from '@mui/material';
import Navigation from 'components/Layout/Navigation/Navigation';

const Header = () => {
  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        <Typography variant="h4">Wallet</Typography>
        <Navigation />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
