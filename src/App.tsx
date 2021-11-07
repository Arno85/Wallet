import { Suspense, lazy, Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { AppStore } from 'store/appStore';
import Layout from './components/Layout/Layout';
import WalletSnackBar from 'components/UI/WalletSnackbar/WalletSnackBar';
import routes from './routes';
import { fetchCategories } from 'store/categories/actions';
import { fetchTransactions } from 'store/transactions/actions';

const Categories = lazy(() => import('./pages/Categories/Categories'));
const Transactions = lazy(() => import('./pages/Transactions/Transactions'));

const App = () => {
  const dispatch = useDispatch();
  const transactionsLoaded = useSelector((store: AppStore) => store.transactionsReducer.isLoaded);
  const categoriesLoaded = useSelector((store: AppStore) => store.categoriesReducer.isLoaded);
  const notification = useSelector((store: AppStore) => store.rootReducer.notification);

  useEffect(() => {
    if (!transactionsLoaded) {
      dispatch(fetchTransactions());
    }

    if (!categoriesLoaded) {
      dispatch(fetchCategories());
    }
  }, [transactionsLoaded, categoriesLoaded, dispatch]);

  return (
    <Fragment>
      {notification && <WalletSnackBar status={notification.status} message={notification.message} />}
      <Layout>
        <Suspense fallback="loading...">
          <Switch>
            <Route path="/" exact>
              <Redirect to={routes.transactions.baseUrl} />
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
