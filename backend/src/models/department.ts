import * as mongoose from "mongoose";
import * as slug from "mongoose-slug-generator";
import { DepartmentModel } from "./types";

mongoose.plugin(slug);

const departmentSchema = new mongoose.Schema({
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

// technologySchema.statics.findTechnologyNameById = function(id: Id) {
//   return mongoose
//     .model("Technology")
//     .findById(id, async (err, obj: TechnologyModel) => {
//       return await obj.name;
//     });
// };

departmentSchema.pre("remove", function (next) {
  this.model("Product").deleteMany({ technology: this._id }, next);
});

const Department = mongoose.model<DepartmentModel>(
  "Technology",
  departmentSchema
);

export default Department;
