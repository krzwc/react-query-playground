import { Request, Response, NextFunction } from 'express';
import Category from '../models/category';
import Product from '../models/product';
import { check, validationResult } from 'express-validator';

export default {
  async findAll(req: Request, res: Response) {
    try {
      const categories = await Category.find().sort({ name: 'desc' });
      const products = await Product.find();

      return res.status(200).send({ categories, products });
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
    return;
  },
  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await Category.findOne({
        slug: req.params.slug,
      });
      const products = await Product.find({
        category: category && category._id,
      });
      if (!category) return next();

      return res.status(200).send({ category, products });
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await Category.findOneAndUpdate(
        { slug: req.params.slug },
        { name: req.body.name },
        { new: true },
      );
      if (!category) return next();

      return res
        .status(200)
        .send({ category, message: 'Category was updated' });
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
  },
  validate: [check('name').isLength({ min: 1 })],
  verifyValidation(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    return next();
  },
};
