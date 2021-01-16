import Department from "../models/department";
import Product from "../models/product";
import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

export default {
  async findOneByDepartment(req: Request, res: Response, next: NextFunction) {
    const department = await Department.findOne({ slug: req.params.slug1 });
    const product = await Product.findOne({
      department: department._id,
      slug: req.params.slug2,
    });
    if (!department) return next();

    return res.status(200).send({ product });
  },
  async update(req: Request, res: Response, next: NextFunction) {
    const department = await Department.findOne({ slug: req.params.slug1 });
    const product = await Product.findOneAndUpdate(
      { slug: req.params.slug2 },
      {
        name: req.body.name,
        description: req.body.description,
        number: req.body.number,
        images: req.body.images,
        department: department.id,
      },
      { new: true }
    );
    if (!product) return next();

    return res.status(200).send({ product, message: "Product was updated" });
  },
  validate: [
    check("name").isLength({ min: 1 }),
    check("description").isLength({ min: 1 }),
    check("number").isLength({ min: 1 }),
  ],
  verifyValidation(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
};
