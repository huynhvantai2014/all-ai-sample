"use client";
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Checkbox, FormControlLabel } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [remember, setRemember] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    const userId = formData.get('userId');
    const password = formData.get('password');
    // Mock: chỉ cho phép userId=admin, password=123456
    setTimeout(() => {
      if (userId === 'admin' && password === '123456') {
        localStorage.setItem('pos_logged_in', 'true');
        router.replace('/');
      } else {
        setError('ユーザーIDまたはパスワードが間違っています');
        setLoading(false);
      }
    }, 1000);
  };

  const handleDevAccount = (user: string) => {
    // Tự động điền userId, password cho dev account
    document.querySelector<HTMLInputElement>('input[name="userId"]')!.value = user;
    document.querySelector<HTMLInputElement>('input[name="password"]')!.value = '123456';
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f4f6fb' }}>
      <header style={{ background: '#1976d2', color: '#fff', padding: '1rem 2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <Typography variant="h5" sx={{ m: 0 }}>POSログイン</Typography>
      </header>
      <Box className="main-content" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', mt: 6 }}>
        <Paper className="login-card" elevation={3} sx={{ borderRadius: 4, p: 4, minWidth: 340, maxWidth: 400 }}>
          <Typography variant="h6" color="primary" gutterBottom>ユーザー認証</Typography>
          <Box component="form" className="login-form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="userId">ユーザー名</label>
              <TextField id="userId" name="userId" variant="outlined" fullWidth required disabled={loading} size="small" />
            </div>
            <div className="form-group">
              <label htmlFor="password">パスワード</label>
              <TextField id="password" name="password" type="password" variant="outlined" fullWidth required disabled={loading} size="small" />
            </div>
            <div className="form-group remember">
              <FormControlLabel
                control={<Checkbox checked={remember} onChange={e => setRemember(e.target.checked)} />}
                label="この端末を記憶する"
              />
            </div>
            <Button type="submit" className="btn-login" variant="contained" color="primary" fullWidth disabled={loading} sx={{ py: 1.2, fontWeight: 'bold', fontSize: '1.1rem', borderRadius: 2 }}>
              {loading ? 'Đang đăng nhập...' : 'ログイン'}
            </Button>
          </Box>
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Box className="dev-accounts" sx={{ mt: 4, bgcolor: '#f0f4fa', borderRadius: 2, p: 2 }}>
            <Typography variant="subtitle2" color="primary" sx={{ mb: 1 }}>テストアカウント (開発環境)</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {['testuser1', 'testuser2', 'admin'].map(user => (
                <Button key={user} className="dev-account-btn" variant="outlined" color="primary" size="small" sx={{ bgcolor: '#e3eaf7', borderRadius: 1, fontWeight: 500 }} onClick={() => handleDevAccount(user)}>
                  {user}
                </Button>
              ))}
            </Box>
          </Box>
        </Paper>
      </Box>
      <footer className="footer" style={{ background: '#f0f4fa', color: '#888', textAlign: 'center', padding: '1rem 0', marginTop: '3rem', fontSize: '0.95rem', borderTop: '1px solid #e0e5ec' }}>
        <small>&copy; 2025 POS System Demo</small>
      </footer>
    </Box>
  );
}
