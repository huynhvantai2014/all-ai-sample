// Database connection utility for MongoDB
// This is a placeholder - in real implementation, you would use MongoDB connection

export class DatabaseService {
  private static instance: DatabaseService;
  
  static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  async connect(): Promise<void> {
    // Connect to MongoDB
    console.log('Connected to database');
  }

  async disconnect(): Promise<void> {
    // Disconnect from MongoDB
    console.log('Disconnected from database');
  }
}

// API Response utilities
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export function successResponse<T>(data: T, message?: string): ApiResponse<T> {
  return {
    success: true,
    data,
    message
  };
}

export function errorResponse(error: string, data?: any): ApiResponse {
  return {
    success: false,
    error,
    data
  };
}

// Date utilities
export function formatDate(date: Date | string | null | undefined, locale: string = 'ja-JP'): string {
  if (!date) return '未設定';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    // Check if date is valid
    if (isNaN(dateObj.getTime())) {
      return '無効な日付';
    }
    
    return dateObj.toLocaleDateString(locale);
  } catch (error) {
    console.error('Date formatting error:', error);
    return '無効な日付';
  }
}

export function formatDateTime(date: Date | string | null | undefined, locale: string = 'ja-JP'): string {
  if (!date) return '未設定';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    // Check if date is valid
    if (isNaN(dateObj.getTime())) {
      return '無効な日付';
    }
    
    return dateObj.toLocaleString(locale);
  } catch (error) {
    console.error('DateTime formatting error:', error);
    return '無効な日付';
  }
}

export function formatCurrency(amount: number): string {
  return `¥${amount.toLocaleString()}`;
}

// Validation utilities
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[\d\-\s\+\(\)]+$/;
  return phoneRegex.test(phone);
}

// Business logic utilities
export function calculateOrderTotal(items: Array<{price: number, quantity: number}>): number {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
}

export function calculateChange(paid: number, total: number): number {
  return Math.max(0, paid - total);
}