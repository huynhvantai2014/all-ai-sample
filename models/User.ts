import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  user_id: string;
  username: string;
  password: string;
  role: 'admin' | 'manager' | 'general';
  department: string;
  last_login?: Date;
  created_at: Date;
  updated_at: Date;
}

const UserSchema: Schema = new Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
    maxlength: 20
  },
  username: {
    type: String,
    required: true,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    maxlength: 100
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'manager', 'general'],
    default: 'general'
  },
  department: {
    type: String,
    required: true,
    maxlength: 50
  },
  last_login: {
    type: Date
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);