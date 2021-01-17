import { Request, Response, NextFunction } from "express";
import Category from "../models/category";
import Product from "../models/product";
import { check, validationResult } from "express-validator";

export default {
  async findAll(req: Request, res: Response) {
    const categories = await Category.find().sort({ name: "desc" });
    const products = await Product.find();

    return res.status(200).send({ categories, products });
  },
  async findOne(req: Request, res: Response, next: NextFunction) {
    const category = await Category.findOne({ slug: req.params.slug });
    const products = await Product.find({
      category: category._id,
    });
    if (!category) return next();

    return res.status(200).send({ category, products });
  },
  async update(req: Request, res: Response, next: NextFunction) {
    const category = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name: req.body.name },
      { new: true }
    );
    if (!category) return next();

    return res.status(200).send({ category, message: "Category was updated" });
  },
  validate: [check("name").isLength({ min: 1 })],
  verifyValidation(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
};
