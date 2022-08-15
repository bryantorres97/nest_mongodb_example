import { Schema } from 'mongoose';

export const productSchema = new Schema(
  {
    name: { type: String },
    price: { type: Number },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const productModelName = 'products';
