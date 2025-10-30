import mongoose, { Schema, Document } from 'mongoose';

export interface IResource extends Document {
  resource_id: string;
  resource_name: string;
  department: string;
  status: 'available' | 'busy' | 'offline';
  project_name?: string;
  utilization_rate: number;
  created_at: Date;
  updated_at: Date;
}

const ResourceSchema: Schema = new Schema({
  resource_id: {
    type: String,
    required: true,
    unique: true,
    maxlength: 20
  },
  resource_name: {
    type: String,
    required: true,
    maxlength: 100
  },
  department: {
    type: String,
    required: true,
    maxlength: 50
  },
  status: {
    type: String,
    required: true,
    enum: ['available', 'busy', 'offline'],
    default: 'available'
  },
  project_name: {
    type: String,
    maxlength: 100
  },
  utilization_rate: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export default mongoose.models.Resource || mongoose.model<IResource>('Resource', ResourceSchema);