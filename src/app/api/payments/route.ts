import { NextResponse } from 'next/server';

// Mock payments data
let mockPayments = [
  {
    id: '1',
    orderId: '1',
    method: 'cash',
    amount: 1400,
    cashAmount: 1500,
    change: 100,
    status: '完了',
    createdAt: new Date('2025-10-26T10:45:00')
  }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('orderId');
  
  if (orderId) {
    const payment = mockPayments.find(p => p.orderId === orderId);
    if (payment) {
      return NextResponse.json(payment);
    }
    return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
  }
  
  return NextResponse.json(mockPayments);
}

export async function POST(request: Request) {
  const { orderId, method, amount, cashAmount, cardInfo, bankAccount } = await request.json();
  
  let change = 0;
  let status = '完了';
  
  if (method === 'cash' && cashAmount) {
    change = cashAmount - amount;
  }
  
  if (method === 'bank') {
    status = '振込確認待ち';
  }
  
  const newPayment = {
    id: Date.now().toString(),
    orderId,
    method,
    amount,
    cashAmount: method === 'cash' ? cashAmount : undefined,
    cardInfo: method === 'card' ? cardInfo : undefined,
    bankAccount: method === 'bank' ? bankAccount : undefined,
    change,
    status,
    createdAt: new Date()
  };
  
  mockPayments.push(newPayment);
  
  return NextResponse.json(newPayment, { status: 201 });
}

export async function PUT(request: Request) {
  const { id, status } = await request.json();
  
  const paymentIndex = mockPayments.findIndex(p => p.id === id);
  if (paymentIndex === -1) {
    return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
  }
  
  mockPayments[paymentIndex] = {
    ...mockPayments[paymentIndex],
    status,
    updatedAt: new Date()
  } as any;
  
  return NextResponse.json(mockPayments[paymentIndex]);
}