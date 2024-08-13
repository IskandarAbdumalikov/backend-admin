import { Schema, model } from "mongoose";
import Joi from "joi";

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: false,
      default: "title 1",
    },
    desc: {
      type: String,
      required: false,
      default: "description 1",
    },
    price: {
      type: Number,
      required: false,
      default: 0,
    },
    oldPrice: {
      type: Number,
      required: false,
      default: 0,
    },
    stock: {
      type: Number,
      required: false,
      default: 0,
    },
    category: {
      type: String,
      required: false,
      default: "category 1",
    },
    available: {
      type: Boolean,
      required: false,
      default: true,
    },
    rating: {
      type: Number,
      required: false,
      default: 0,
    },
    info: {
      type: Array,
      required: false,
      default: ["info 1", "info 2", "info 3"],
    },
    urls: {
      type: Array,
      required: false,
      default: [],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Products = model("Product", productSchema);

export const validateProduct = (body) => {
  const schema = Joi.object({
    title: Joi.string().allow("title 1"),
    desc: Joi.string().allow("description 1"),
    price: Joi.number().allow(0),
    oldPrice: Joi.number().allow(0),
    stock: Joi.number().allow(0),
    category: Joi.string().allow("category 1"),
    available: Joi.boolean().allow(true),
    rating: Joi.number().allow(0),
    info: Joi.array(),
    urls: Joi.array(),
    userId: Joi.string(),
  });
  return schema.validate(body);
};
