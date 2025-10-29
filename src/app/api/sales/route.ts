import { NextResponse } from 'next/server';

// Mock sales data
const mockSalesData = [
  {
    id: '1',
    orderId: '1',
    items: [
      { name: 'コーヒー', price: 300, quantity: 2 },
      { name: 'ハンバーガー', price: 800, quantity: 1 }
    ],
    total: 1400,
    paymentMethod: 'cash',
    customerName: '田中太郎',
    date: new Date('2025-10-26T10:45:00')
  },
  {
    id: '2',
    orderId: '2',
    items: [
      { name: 'サラダ', price: 500, quantity: 1 },
      { name: 'ケーキ', price: 400, quantity: 2 }
    ],
    total: 1300,
    paymentMethod: 'card',
    customerName: '佐藤花子',
    date: new Date('2025-10-26T11:20:00')
  },
  {
    id: '3',
    orderId: '3',
    items: [
      { name: 'お茶', price: 200, quantity: 3 },
      { name: 'アイスクリーム', price: 350, quantity: 1 }
    ],
    total: 950,
    paymentMethod: 'cash',
    customerName: '鈴木一郎',
    date: new Date('2025-10-26T12:15:00')
  },
  {
    id: '4',
    orderId: '4',
    items: [
      { name: 'コーヒー', price: 300, quantity: 1 },
      { name: 'ケーキ', price: 400, quantity: 1 }
    ],
    total: 700,
    paymentMethod: 'bank',
    date: new Date('2025-10-26T13:30:00')
  }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dateFrom = searchParams.get('dateFrom');
  const dateTo = searchParams.get('dateTo');
  const paymentMethod = searchParams.get('paymentMethod');

  let filteredSales = [...mockSalesData];

  // Filter by date range
  if (dateFrom) {
    const fromDate = new Date(dateFrom);
    filteredSales = filteredSales.filter(sale => sale.date >= fromDate);
  }

  if (dateTo) {
    const toDate = new Date(dateTo);
    toDate.setHours(23, 59, 59, 999); // End of day
    filteredSales = filteredSales.filter(sale => sale.date <= toDate);
  }

  // Filter by payment method
  if (paymentMethod && paymentMethod !== '') {
    filteredSales = filteredSales.filter(sale => sale.paymentMethod === paymentMethod);
  }

  // Calculate summary
  const totalSales = filteredSales.reduce((sum, sale) => sum + sale.total, 0);
  const totalOrders = filteredSales.length;
  const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

  // Calculate top items
  const itemStats = new Map<string, { quantity: number; revenue: number }>();
  
  filteredSales.forEach(sale => {
    sale.items.forEach(item => {
      const existing = itemStats.get(item.name) || { quantity: 0, revenue: 0 };
      itemStats.set(item.name, {
        quantity: existing.quantity + item.quantity,
        revenue: existing.revenue + (item.price * item.quantity)
      });
    });
  });

  const topItems = Array.from(itemStats.entries())
    .map(([name, stats]) => ({ name, ...stats }))
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  const summary = {
    totalSales,
    totalOrders,
    averageOrderValue,
    topItems
  };

  return NextResponse.json({
    sales: filteredSales,
    summary
  });
}

// Add new sale (when payment is completed)
export async function POST(request: Request) {
  const { orderId, items, total, paymentMethod, customerName } = await request.json();
  
  const newSale = {
    id: Date.now().toString(),
    orderId,
    items,
    total,
    paymentMethod,
    customerName,
    date: new Date()
  };
  
  mockSalesData.push(newSale);
  
  return NextResponse.json(newSale, { status: 201 });
}