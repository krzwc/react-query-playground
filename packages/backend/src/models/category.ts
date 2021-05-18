import * as mongoose from 'mongoose';
import * as slug from 'mongoose-slug-updater';
import { CategoryModel } from './types';

mongoose.plugin(slug);

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  slug: {
    type: String,
    slug: 'name',
    unique: true,
  },
});

const Category = mongoose.model<CategoryModel>(
  'Category',
  categorySchema,
);

export default Category;
