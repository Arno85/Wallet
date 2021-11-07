import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from 'store/categories/actions';
import { AppStore } from 'store/appStore';
import CategoryList from 'components/Categories/CategoryList/CategoryList';
import CategoryManageModal from 'components/Categories/CategoryManageModal/CategoryManageModal';
import { LinearProgress, styled } from '@mui/material';

const StyledHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(4),
  div: {
    marginLeft: 'auto',
  },
}));

const Categories: React.FC = () => {
  const dispatch = useDispatch();
  const categories = useSelector((store: AppStore) => store.categoriesReducer.categories);
  const categoriesLoaded = useSelector((store: AppStore) => store.categoriesReducer.isLoaded);
  const categoriesLoading = useSelector((store: AppStore) => store.categoriesReducer.isLoading);

  useEffect(() => {
    if (!categoriesLoaded) {
      dispatch(fetchCategories());
    }
  }, [categoriesLoaded, dispatch]);

  return (
    <Fragment>
      <StyledHeader>
        <h1>Categories</h1>
        <CategoryManageModal />
      </StyledHeader>
      {categoriesLoading && <LinearProgress />}
      {!categoriesLoading && <CategoryList categories={categories} />}
    </Fragment>
  );
};

export default Categories;
