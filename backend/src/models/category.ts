import * as mongoose from "mongoose";
import * as slug from "mongoose-slug-generator";
import { CategoryModel } from "./types";

mongoose.plugin(slug);

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  slug: {
    type: String,
    slug: "name",
    unique: true,
  },
});

categorySchema.pre("remove", function (next) {
  this.model("Product").deleteMany({ product: this._id }, next);
});

const Category = mongoose.model<CategoryModel>("Category", categorySchema);

export default Category;
