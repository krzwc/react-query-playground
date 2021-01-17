import * as mongoose from 'mongoose';
// @ts-ignore-start
import * as slug from 'mongoose-slug-generator';
// @ts-ignore-end
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
