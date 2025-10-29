import { NextResponse } from 'next/server';

// Mock checkout data
let mockCheckouts = [
  {
    id: '1',
    orderId: '1',
    customerInfo: {
      name: '田中太郎',
      phone: '090-1234-5678'
    },
    items: [
      { id: '1', name: 'コーヒー', price: 300, quantity: 2 },
      { id: '2', name: 'ハンバーガー', price: 800, quantity: 1 }
    ],
    total: 1400,
    status: '決済待ち',
    createdAt: new Date('2025-10-26T10:30:00')
  }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('orderId');
  
  if (orderId) {
    const checkout = mockCheckouts.find(c => c.orderId === orderId);
    if (checkout) {
      return NextResponse.json(checkout);
    }
    return NextResponse.json({ error: 'Checkout not found' }, { status: 404 });
  }
  
  return NextResponse.json(mockCheckouts);
}

export async function POST(request: Request) {
  const { orderId, customerInfo, items, total } = await request.json();
  
  const newCheckout = {
    id: Date.now().toString(),
    orderId,
    customerInfo,
    items,
    total,
    status: '決済待ち',
    createdAt: new Date()
  };
  
  mockCheckouts.push(newCheckout);
  
  return NextResponse.json(newCheckout, { status: 201 });
}

export async function PUT(request: Request) {
  const { id, status, paymentMethod } = await request.json();
  
  const checkoutIndex = mockCheckouts.findIndex(c => c.id === id);
  if (checkoutIndex === -1) {
    return NextResponse.json({ error: 'Checkout not found' }, { status: 404 });
  }
  
  mockCheckouts[checkoutIndex] = {
    ...mockCheckouts[checkoutIndex],
    status,
    paymentMethod,
    updatedAt: new Date()
  } as any;
  
  return NextResponse.json(mockCheckouts[checkoutIndex]);
}