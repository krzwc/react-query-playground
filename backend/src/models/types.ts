import * as mongoose from "mongoose";

export type CategoryModel = mongoose.Document & {
  name: string;
  slug?: string;
};

export type ProductModel = mongoose.Document & {
  name: string;
  number: string;
  description: string;
  category: Id;
  images: [{ url: string; name: string }];
  slug?: string;
};

export type Id = typeof mongoose.Schema.Types.ObjectId;
