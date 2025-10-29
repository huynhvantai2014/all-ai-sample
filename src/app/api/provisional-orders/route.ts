import { NextResponse } from 'next/server';

// Mock provisional orders data
let mockProvisionalOrders = [
  {
    id: '1',
    items: [
      { id: '1', name: 'コーヒー', price: 300, quantity: 2 },
      { id: '2', name: 'ハンバーガー', price: 800, quantity: 1 }
    ],
    total: 1400,
    createdAt: new Date('2025-10-26T10:30:00'),
    status: '保存済み'
  },
  {
    id: '2',
    items: [
      { id: '3', name: 'サラダ', price: 500, quantity: 1 },
      { id: '5', name: 'ケーキ', price: 400, quantity: 2 }
    ],
    total: 1300,
    createdAt: new Date('2025-10-26T11:15:00'),
    status: '保存済み'
  }
];

export async function GET() {
  return NextResponse.json(mockProvisionalOrders);
}

export async function POST(request: Request) {
  const { items } = await request.json();
  
  const total = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
  
  const newOrder = {
    id: Date.now().toString(),
    items,
    total,
    createdAt: new Date(),
    status: '保存済み'
  };
  
  mockProvisionalOrders.push(newOrder);
  
  return NextResponse.json(newOrder, { status: 201 });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }
  
  mockProvisionalOrders = mockProvisionalOrders.filter(order => order.id !== id);
  
  return NextResponse.json({ success: true });
}