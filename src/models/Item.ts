import mongoose, { Schema, Document } from 'mongoose';

export interface IItem extends Document {
  name: string;
  price: number;
  category: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ItemSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String },
  isActive: { type: Boolean, default: true },
}, {
  timestamps: true
});

const Item = mongoose.models.Item || mongoose.model<IItem>('Item', ItemSchema);
export default Item;
