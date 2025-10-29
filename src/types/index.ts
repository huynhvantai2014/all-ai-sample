export interface Item {
  id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem extends Item {
  quantity: number;
}

export interface ProvisionalOrder {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'saved' | 'processing' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

export interface Customer {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  createdAt: Date;
}

export interface Payment {
  id: string;
  orderId: string;
  method: 'cash' | 'card' | 'bank';
  amount: number;
  cashAmount?: number;
  change?: number;
  cardInfo?: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  };
  bankAccount?: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
}

export interface Sale {
  id: string;
  orderId: string;
  items: OrderItem[];
  customer?: Customer;
  payment: Payment;
  total: number;
  createdAt: Date;
}