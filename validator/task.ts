import { body } from "express-validator";

export const validateTask = [
  body("title").isLength({ min: 2 }).withMessage("Title is required"),
  body("status").isIn(["ACTIVE", "INACTIVE"]).withMessage("Status must be ACTIVE or INACTIVE"),
];
