import { Category } from 'models/category';
import { Fragment } from 'react';

const CategoryList: React.FC<{ categories: Category[] }> = (props) => {
  return (
    <Fragment>
      {props.categories.map((c) => (
        <p>{c.name}</p>
      ))}
    </Fragment>
  );
};

export default CategoryList;
