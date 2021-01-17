import Category from '../models/category';
import Product from '../models/product';
import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

export default {
  async findOneByCategory(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const category = await Category.findOne({
        slug: req.params.slug1,
      });
      const product = await Product.findOne({
        category: category && category._id,
        slug: req.params.slug2,
      });
      if (!category) return next();

      return res.status(200).send({ product });
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await Category.findOne({
        slug: req.params.slug1,
      });
      const product = await Product.findOneAndUpdate(
        { slug: req.params.slug2 },
        {
          name: req.body.name,
          description: req.body.description,
          number: req.body.number,
          images: req.body.images,
          category: category && category.id,
        },
        { new: true },
      );
      if (!product) return next();

      return res
        .status(200)
        .send({ product, message: 'Product was updated' });
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
  },
  validate: [
    check('name').isLength({ min: 1 }),
    check('description').isLength({ min: 1 }),
    check('number').isLength({ min: 1 }),
  ],
  verifyValidation(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    return next();
  },
};
