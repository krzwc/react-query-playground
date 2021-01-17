import { Router } from 'express';
import categoryController from '../controllers/category-controller';
import productController from '../controllers/product-controller';
import { catchAsyncDecorator } from '../middleware/error-handlers';

const routes = () => {
  const api: Router = Router();
  //GET all
  api.get('/', catchAsyncDecorator(categoryController.findAll));
  //GET one category
  api.get('/:slug', catchAsyncDecorator(categoryController.findOne));
  //UPDATE one category
  api.put(
    '/:slug',
    categoryController.validate,
    categoryController.verifyValidation,
    catchAsyncDecorator(categoryController.update),
  );
  //GET one product
  api.get(
    '/:slug1/:slug2',
    catchAsyncDecorator(productController.findOneByCategory),
  );
  //UPDATE one product
  api.put(
    '/:slug1/:slug2',
    productController.validate,
    productController.verifyValidation,
    catchAsyncDecorator(productController.update),
  );

  return api;
};

export default routes;
