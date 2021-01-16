import * as mongoose from "mongoose";

export type DepartmentModel = mongoose.Document & {
  name: string;
  slug?: string;
};

export type ProductModel = mongoose.Document & {
  name: string;
  number: string;
  description: string;
  department: Id;
  images: [{ url: string; name: string }];
  slug?: string;
};

export type Id = typeof mongoose.Schema.Types.ObjectId;
