import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Resource from '@/models/Resource';
import Employee from '@/models/Employee';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const department = searchParams.get('department') || '';
    const period = searchParams.get('period') || 'monthly';
    const date_from = searchParams.get('date_from');
    const date_to = searchParams.get('date_to');

    // リソース状況データ取得
    const filter: any = {};
    if (department) {
      filter.department = department;
    }

    // 全体サマリー計算
    const totalEmployees = await Employee.countDocuments(filter);
    const activeEmployees = await Employee.countDocuments({
      ...filter,
      status: 'active'
    });
    const availableEmployees = await Employee.countDocuments({
      ...filter,
      status: 'active'
      // 実際にはプロジェクト参加状況も考慮する必要があります
    });

    const utilizationRate = totalEmployees > 0 ? 
      Math.round((activeEmployees / totalEmployees) * 100) : 0;

    // 部門別データ取得
    const departmentStats = await Employee.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$department',
          total_count: { $sum: 1 },
          active_count: {
            $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] }
          }
        }
      }
    ]);

    const departments = departmentStats.map(dept => ({
      department_name: dept._id,
      total_count: dept.total_count,
      active_count: dept.active_count,
      available_count: dept.active_count, // 簡略化
      utilization_rate: dept.total_count > 0 ? 
        Math.round((dept.active_count / dept.total_count) * 100) : 0
    }));

    // プロジェクト参加状況（モックデータ）
    const projects = [
      { project_name: 'プロジェクトA', member_count: 5 },
      { project_name: 'プロジェクトB', member_count: 8 },
      { project_name: 'プロジェクトC', member_count: 3 }
    ];

    return NextResponse.json({
      success: true,
      summary: {
        total_employees: totalEmployees,
        active_employees: activeEmployees,
        available_employees: availableEmployees,
        utilization_rate: utilizationRate
      },
      departments,
      projects,
      updated_at: new Date().toISOString()
    });

  } catch (error) {
    console.error('Resource status error:', error);
    return NextResponse.json({
      success: false,
      error: 'E601',
      message: 'データ取得失敗'
    }, { status: 500 });
  }
}