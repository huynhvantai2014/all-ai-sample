import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  user_id: string;
  password: string;
  role: 'admin' | 'manager' | 'user';
  email?: string;
  full_name?: string;
  last_login?: Date;
  created_at: Date;
  updated_at: Date;
}

const UserSchema: Schema = new Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['admin', 'manager', 'user'],
    default: 'user',
    required: true
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'メールアドレスの形式が正しくありません']
  },
  full_name: {
    type: String,
    trim: true,
    maxlength: 100
  },
  last_login: {
    type: Date
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// インデックスの作成（uniqueオプションで既に作成されているため、追加のインデックスは不要）

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);