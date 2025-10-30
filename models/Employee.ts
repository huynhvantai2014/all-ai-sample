import mongoose, { Schema, Document } from 'mongoose';

export interface IEmployee extends Document {
  employee_id: string;
  full_name: string;
  email: string;
  phone?: string;
  department: string;
  position?: string;
  status: 'active' | 'inactive' | 'pending';
  skill?: string;
  join_date: Date;
  created_at: Date;
  updated_at: Date;
}

const EmployeeSchema: Schema = new Schema({
  employee_id: {
    type: String,
    required: true,
    unique: true,
    maxlength: 20
  },
  full_name: {
    type: String,
    required: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 255
  },
  phone: {
    type: String,
    maxlength: 20
  },
  department: {
    type: String,
    required: true,
    maxlength: 50
  },
  position: {
    type: String,
    maxlength: 50
  },
  status: {
    type: String,
    required: true,
    enum: ['active', 'inactive', 'pending'],
    default: 'active'
  },
  skill: {
    type: String,
    maxlength: 500
  },
  join_date: {
    type: Date,
    required: true
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export default mongoose.models.Employee || mongoose.model<IEmployee>('Employee', EmployeeSchema);