import { Fragment } from 'react';
import Header from './Header/Header';
import classes from './Layout.module.scss';

const Layout: React.FC = (props) => {
  return (
    <Fragment>
      <Header />
      <main className={classes.main}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
