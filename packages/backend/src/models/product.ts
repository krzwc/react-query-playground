import * as mongoose from 'mongoose';
import * as slug from 'mongoose-slug-updater';
import type { ProductModel } from './types';

mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  images: [{ url: String, name: String }],
  slug: {
    type: String,
    slug: 'name',
    unique: true,
  },
});

const Product = mongoose.model<ProductModel>(
  'Product',
  productSchema,
);

export default Product;
