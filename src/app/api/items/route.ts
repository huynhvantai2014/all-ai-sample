import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Item from '@/models/Item';

// Mock data cho GET
const mockItems = [
  { id: '1', name: 'コーヒー', price: 300, category: '飲み物' },
  { id: '2', name: 'ハンバーガー', price: 800, category: '食べ物' },
  { id: '3', name: 'サラダ', price: 500, category: '食べ物' },
  { id: '4', name: '紅茶', price: 350, category: '飲み物' },
];

export async function GET(request: NextRequest) {
  return NextResponse.json(mockItems);
}

export async function POST(request: NextRequest) {
  await dbConnect();
  const body = await request.json();
  const { number, staff, price } = body;
  const newItem = await Item.create({ name: number, price, staff });
  return NextResponse.json(newItem);
}
