import mongoose, { Schema, Document } from 'mongoose';

export interface IEmployee extends Document {
  employee_id: string;
  full_name: string;
  email: string;
  phone?: string;
  department: string;
  position: string;
  status: 'active' | 'inactive' | 'on_leave';
  skill?: string[];
  join_date: Date;
  created_at: Date;
  updated_at: Date;
}

const EmployeeSchema: Schema = new Schema({
  employee_id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 20
  },
  full_name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'メールアドレスの形式が正しくありません']
  },
  phone: {
    type: String,
    trim: true,
    match: [/^[\d-+().\s]+$/, '電話番号の形式が正しくありません']
  },
  department: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
    index: true
  },
  position: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'on_leave'],
    default: 'active',
    required: true,
    index: true
  },
  skill: [{
    type: String,
    trim: true,
    maxlength: 50
  }],
  join_date: {
    type: Date,
    required: true
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// テキスト検索用インデックス（uniqueオプションで既に作成されている基本インデックスは除く）
EmployeeSchema.index({ full_name: 'text', email: 'text' });

export default mongoose.models.Employee || mongoose.model<IEmployee>('Employee', EmployeeSchema);