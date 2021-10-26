import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from 'store/categories/actions';
import { AppStore } from 'store/appStore';
import CategoryList from 'components/Categories/CatregoryList/CategoryList';
import CategoryAdd from 'components/Categories/CategoryAdd/CategoryAdd';

const Categories: React.FC = () => {
  const dispatch = useDispatch();
  const categories = useSelector((store: AppStore) => store.categoriesReducer.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <Fragment>
      <h1>Categories</h1>
      <CategoryAdd />
      <CategoryList categories={categories} />
    </Fragment>
  );
};

export default Categories;
