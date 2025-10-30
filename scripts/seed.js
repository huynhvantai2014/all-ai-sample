const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// MongoDB接続設定
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/all-ai-hr';

// Models
const UserSchema = new mongoose.Schema({
  user_id: { type: String, required: true, unique: true, maxlength: 20 },
  username: { type: String, required: true, maxlength: 50 },
  password: { type: String, required: true, maxlength: 100 },
  role: { type: String, required: true, enum: ['admin', 'manager', 'general'], default: 'general' },
  department: { type: String, required: true, maxlength: 50 },
  last_login: { type: Date }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const EmployeeSchema = new mongoose.Schema({
  employee_id: { type: String, required: true, unique: true, maxlength: 20 },
  full_name: { type: String, required: true, maxlength: 100 },
  email: { type: String, required: true, unique: true, maxlength: 255 },
  phone: { type: String, maxlength: 20 },
  department: { type: String, required: true, maxlength: 50 },
  position: { type: String, maxlength: 50 },
  status: { type: String, required: true, enum: ['active', 'inactive', 'pending'], default: 'active' },
  skill: { type: String, maxlength: 500 },
  join_date: { type: Date, required: true }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const ResourceSchema = new mongoose.Schema({
  resource_id: { type: String, required: true, unique: true, maxlength: 20 },
  resource_name: { type: String, required: true, maxlength: 100 },
  department: { type: String, required: true, maxlength: 50 },
  status: { type: String, required: true, enum: ['available', 'busy', 'offline'], default: 'available' },
  project_name: { type: String, maxlength: 100 },
  utilization_rate: { type: Number, default: 0, min: 0, max: 100 }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// Sample data
const sampleUsers = [
  {
    user_id: 'admin',
    username: '管理者',
    password: '123456',
    role: 'admin',
    department: '管理部'
  },
  {
    user_id: 'manager01',
    username: 'マネージャー田中',
    password: '123456',
    role: 'manager',
    department: '営業部'
  },
  {
    user_id: 'emp001',
    username: '社員佐藤',
    password: '123456',
    role: 'general',
    department: '技術部'
  }
];

const sampleEmployees = [
  {
    employee_id: 'EMP001',
    full_name: '田中太郎',
    email: 'tanaka@company.com',
    phone: '090-1234-5678',
    department: '営業部',
    position: '課長',
    status: 'active',
    skill: '営業、マネジメント',
    join_date: new Date('2020-04-01')
  },
  {
    employee_id: 'EMP002',
    full_name: '佐藤花子',
    email: 'sato@company.com',
    phone: '090-2345-6789',
    department: '技術部',
    position: 'エンジニア',
    status: 'active',
    skill: 'JavaScript、React、Node.js',
    join_date: new Date('2021-07-15')
  },
  {
    employee_id: 'EMP003',
    full_name: '鈴木一郎',
    email: 'suzuki@company.com',
    phone: '090-3456-7890',
    department: '技術部',
    position: 'シニアエンジニア',
    status: 'active',
    skill: 'Python、AI、機械学習',
    join_date: new Date('2019-01-10')
  },
  {
    employee_id: 'EMP004',
    full_name: '高橋美咲',
    email: 'takahashi@company.com',
    phone: '090-4567-8901',
    department: '人事部',
    position: '人事担当',
    status: 'active',
    skill: '採用、労務管理',
    join_date: new Date('2022-03-01')
  },
  {
    employee_id: 'EMP005',
    full_name: '山田次郎',
    email: 'yamada@company.com',
    phone: '090-5678-9012',
    department: '営業部',
    position: '営業担当',
    status: 'pending',
    skill: '新規開拓、顧客管理',
    join_date: new Date('2023-10-01')
  }
];

const sampleResources = [
  {
    resource_id: 'RES001',
    resource_name: '営業チームA',
    department: '営業部',
    status: 'busy',
    project_name: 'プロジェクトA',
    utilization_rate: 85
  },
  {
    resource_id: 'RES002',
    resource_name: '開発チームB',
    department: '技術部',
    status: 'busy',
    project_name: 'プロジェクトB',
    utilization_rate: 95
  },
  {
    resource_id: 'RES003',
    resource_name: '人事チーム',
    department: '人事部',
    status: 'available',
    project_name: null,
    utilization_rate: 60
  }
];

async function seedDatabase() {
  try {
    console.log('MongoDB接続中...');
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB接続成功');

    // Models定義
    const User = mongoose.models.User || mongoose.model('User', UserSchema);
    const Employee = mongoose.models.Employee || mongoose.model('Employee', EmployeeSchema);
    const Resource = mongoose.models.Resource || mongoose.model('Resource', ResourceSchema);

    // 既存データクリア
    console.log('既存データをクリア中...');
    await User.deleteMany({});
    await Employee.deleteMany({});
    await Resource.deleteMany({});

    // パスワードハッシュ化
    console.log('ユーザーデータ作成中...');
    for (let user of sampleUsers) {
      user.password = await bcrypt.hash(user.password, 10);
    }

    // データ挿入
    await User.insertMany(sampleUsers);
    console.log(`${sampleUsers.length}件のユーザーデータを挿入しました`);

    await Employee.insertMany(sampleEmployees);
    console.log(`${sampleEmployees.length}件の社員データを挿入しました`);

    await Resource.insertMany(sampleResources);
    console.log(`${sampleResources.length}件のリソースデータを挿入しました`);

    console.log('サンプルデータの作成が完了しました！');
    console.log('テスト用アカウント:');
    console.log('- 管理者: admin / 123456');
    console.log('- マネージャー: manager01 / 123456');
    console.log('- 一般社員: emp001 / 123456');

  } catch (error) {
    console.error('エラーが発生しました:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB接続を終了しました');
  }
}

// スクリプト実行
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase };