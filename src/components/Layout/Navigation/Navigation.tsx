import { NavLink } from 'react-router-dom';
import routes from 'routes';

const Navigation: React.FC = () => {
  return <NavLink to={routes.categories.baseUrl}>Categories</NavLink>;
};

export default Navigation;
