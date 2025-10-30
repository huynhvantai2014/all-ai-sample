import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Employee from '@/models/Employee';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get('keyword') || '';
    const department = searchParams.get('department') || '';
    const status = searchParams.get('status') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
    const sort = searchParams.get('sort') || 'created_at_desc';

    // 検索条件組み立て
    const filter: any = {};
    
    if (keyword) {
      filter.$or = [
        { full_name: { $regex: keyword, $options: 'i' } },
        { email: { $regex: keyword, $options: 'i' } }
      ];
    }
    
    if (department) {
      filter.department = department;
    }
    
    if (status) {
      filter.status = status;
    }

    // ソート条件
    const sortOptions: any = {};
    switch (sort) {
      case 'created_at_desc':
        sortOptions.created_at = -1;
        break;
      case 'created_at_asc':
        sortOptions.created_at = 1;
        break;
      case 'name_asc':
        sortOptions.full_name = 1;
        break;
      case 'name_desc':
        sortOptions.full_name = -1;
        break;
      default:
        sortOptions.created_at = -1;
    }

    // 総件数取得
    const total = await Employee.countDocuments(filter);
    
    // データ取得
    const employees = await Employee.find(filter)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(limit)
      .select('employee_id full_name email department status created_at');

    return NextResponse.json({
      success: true,
      total,
      page,
      limit,
      employees
    });

  } catch (error) {
    console.error('Employee search error:', error);
    return NextResponse.json({
      success: false,
      error: 'E201',
      message: 'データ取得失敗'
    }, { status: 500 });
  }
}