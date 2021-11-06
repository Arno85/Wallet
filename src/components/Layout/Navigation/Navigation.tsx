import { styled } from '@mui/material';
import { NavLink } from 'react-router-dom';
import routes from 'routes';

const StyledNav = styled('nav')(({ theme }) => ({
  a: {
    color: theme.palette.primary.contrastText,
    padding: `0 ${theme.spacing(2)}`,
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },
}));

const Navigation: React.FC = () => {
  return (
    <StyledNav>
      <NavLink to={routes.categories.baseUrl}>Categories</NavLink>
    </StyledNav>
  );
};

export default Navigation;
