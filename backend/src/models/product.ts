import * as mongoose from "mongoose";
import * as slug from "mongoose-slug-generator";
import { ProductModel } from "./types";

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
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
  },
  images: [{ url: String, name: String }],
  slug: {
    type: String,
    slug: "name",
    unique: true,
  },
});

const Product = mongoose.model<ProductModel>("Product", productSchema);

export default Product;
