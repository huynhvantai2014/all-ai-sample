import mongoose, { Schema, Document } from 'mongoose';

// Item Model
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

export const Item = mongoose.models.Item || mongoose.model<IItem>('Item', ItemSchema);

// Customer Model
export interface ICustomer extends Document {
  name: string;
  phone?: string;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CustomerSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
}, {
  timestamps: true
});

export const Customer = mongoose.models.Customer || mongoose.model<ICustomer>('Customer', CustomerSchema);

// Provisional Order Model
export interface IProvisionalOrder extends Document {
  items: Array<{
    itemId: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  status: 'saved' | 'processing' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

const ProvisionalOrderSchema = new Schema({
  items: [{
    itemId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
  }],
  total: { type: Number, required: true },
  status: { type: String, enum: ['saved', 'processing', 'completed'], default: 'saved' },
}, {
  timestamps: true
});

export const ProvisionalOrder = mongoose.models.ProvisionalOrder || 
  mongoose.model<IProvisionalOrder>('ProvisionalOrder', ProvisionalOrderSchema);

// Payment Model
export interface IPayment extends Document {
  orderId: string;
  method: 'cash' | 'card' | 'bank';
  amount: number;
  cashAmount?: number;
  change?: number;
  cardInfo?: {
    lastFourDigits: string;
    cardType: string;
  };
  bankAccount?: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema({
  orderId: { type: String, required: true },
  method: { type: String, enum: ['cash', 'card', 'bank'], required: true },
  amount: { type: Number, required: true },
  cashAmount: { type: Number },
  change: { type: Number },
  cardInfo: {
    lastFourDigits: { type: String },
    cardType: { type: String }
  },
  bankAccount: { type: String },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
}, {
  timestamps: true
});

export const Payment = mongoose.models.Payment || mongoose.model<IPayment>('Payment', PaymentSchema);

// Sale Model
export interface ISale extends Document {
  orderId: string;
  items: Array<{
    itemId: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  customerId?: string;
  customerName?: string;
  paymentId: string;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

const SaleSchema = new Schema({
  orderId: { type: String, required: true, unique: true },
  items: [{
    itemId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
  }],
  customerId: { type: Schema.Types.ObjectId, ref: 'Customer' },
  customerName: { type: String },
  paymentId: { type: Schema.Types.ObjectId, ref: 'Payment', required: true },
  total: { type: Number, required: true },
}, {
  timestamps: true
});

export const Sale = mongoose.models.Sale || mongoose.model<ISale>('Sale', SaleSchema);