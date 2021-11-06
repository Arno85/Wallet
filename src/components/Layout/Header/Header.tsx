import { AppBar, styled, Toolbar, Typography } from '@mui/material';
import Navigation from 'components/Layout/Navigation/Navigation';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: 'fixed',
  backgroundColor: theme.palette.primary.main,
  padding: `0 ${theme.spacing(3)}`,
  nav: {
    marginLeft: 'auto',
  },
}));

const Header = () => {
  return (
    <StyledAppBar>
      <Toolbar>
        <Typography variant="h4" component="h1">
          Wallet
        </Typography>
        <Navigation />
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
