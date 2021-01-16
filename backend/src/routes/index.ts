import { Router } from "express";
import departmentController from "../controllers/departmentController";
import productController from "../controllers/productController";
import { catchAsyncDecorator } from "../middleware/errorHandlers";

const routes = () => {
  const api: Router = Router();
  //GET all
  api.get("/", catchAsyncDecorator(departmentController.findAll));
  //GET one department
  api.get("/:slug", catchAsyncDecorator(departmentController.findOne));
  //UPDATE one department
  api.put(
    "/:slug",
    departmentController.validate,
    departmentController.verifyValidation,
    catchAsyncDecorator(departmentController.update)
  );
  //GET one product
  api.get(
    "/:slug1/:slug2",
    catchAsyncDecorator(productController.findOneByDepartment)
  );
  //UPDATE one product
  api.put(
    "/:slug1/:slug2",
    productController.validate,
    productController.verifyValidation,
    catchAsyncDecorator(productController.update)
  );

  return api;
};

export default routes;
