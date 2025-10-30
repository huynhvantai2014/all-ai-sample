import mongoose, { Schema, Document } from 'mongoose';

export interface IResource extends Document {
  resource_id: string;
  employee_id: string;
  project_name: string;
  department: string;
  status: 'assigned' | 'available' | 'busy' | 'on_leave';
  start_date: Date;
  end_date?: Date;
  workload_percentage: number;
  created_at: Date;
  updated_at: Date;
}

const ResourceSchema: Schema = new Schema({
  resource_id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 20
  },
  employee_id: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20
  },
  project_name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  department: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  status: {
    type: String,
    enum: ['assigned', 'available', 'busy', 'on_leave'],
    default: 'available',
    required: true
  },
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date
  },
  workload_percentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
    default: 0
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// インデックスの作成
ResourceSchema.index({ resource_id: 1 });
ResourceSchema.index({ employee_id: 1 });
ResourceSchema.index({ department: 1 });
ResourceSchema.index({ status: 1 });
ResourceSchema.index({ start_date: 1, end_date: 1 });

export default mongoose.models.Resource || mongoose.model<IResource>('Resource', ResourceSchema);