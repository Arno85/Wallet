import { Suspense, lazy, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { AppStore } from 'store/appStore';
import Layout from './components/Layout/Layout';
import WalletSnackBar from 'components/UI/WalletSnackbar/WalletSnackBar';
import routes from './routes';

const Categories = lazy(() => import('./pages/Categories/Categories'));
const Transactions = lazy(() => import('./pages/Transactions/Transactions'));

const App = () => {
  const notification = useSelector((store: AppStore) => store.rootReducer.notification);

  return (
    <Fragment>
      {notification && <WalletSnackBar status={notification.status} message={notification.message} />}
      <Layout>
        <Suspense fallback="loading...">
          <Switch>
            <Route path="/" exact>
              <Redirect to={routes.categories.baseUrl} />
            </Route>
            <Route path={routes.categories.baseUrl} exact component={Categories} />
            <Route path={routes.transactions.baseUrl} exact component={Transactions} />
          </Switch>
        </Suspense>
      </Layout>
    </Fragment>
  );
};

export default App;
