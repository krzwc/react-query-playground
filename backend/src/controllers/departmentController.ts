import { Request, Response, NextFunction } from "express";
import Department from "../models/department";
import Product from "../models/product";
import { check, validationResult } from "express-validator";

export default {
  async findAll(req: Request, res: Response) {
    const departments = await Department.find().sort({ name: "desc" });
    const products = await Product.find();

    return res.status(200).send({ departments, products });
  },
  async findOne(req: Request, res: Response, next: NextFunction) {
    const department = await Department.findOne({ slug: req.params.slug });
    const products = await Product.find({
      department: department._id,
    });
    if (!department) return next();

    return res.status(200).send({ department, products });
  },
  async update(req: Request, res: Response, next: NextFunction) {
    const department = await Department.findOneAndUpdate(
      { slug: req.params.slug },
      { name: req.body.name },
      { new: true }
    );
    if (!department) return next();

    return res
      .status(200)
      .send({ department, message: "Department was updated" });
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
