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
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const terminalId = formData.get('terminalId') as string;
    const rememberDevice = formData.get('rememberDevice') === 'on';
    // Validate đầu vào
    if (!username || !password || !terminalId) {
      setError('必須項目が入力されていません');
      setLoading(false);
      return;
    }
    // Mock: chỉ cho phép username=admin, password=123456, terminalId=POS01
    setTimeout(() => {
      if (username === 'admin' && password === '123456' && terminalId === 'POS01') {
        localStorage.setItem('pos_logged_in', 'true');
        router.replace('/');
      } else {
        setError('ユーザー名・パスワード・端末IDが正しくありません');
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
    <React.Fragment>
      <Box sx={{ minHeight: '100vh', bgcolor: '#f4f6fb' }}>
        <header style={{ background: '#1976d2', color: '#fff', padding: '1rem 2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <Typography variant="h5" sx={{ m: 0 }}>POSログイン</Typography>
        </header>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
          <Paper elevation={3} sx={{ p: 4, minWidth: 340, maxWidth: 400 }}>
            <form onSubmit={handleSubmit}>
              <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>ログイン画面</Typography>
              <TextField
                label="ユーザー名"
                name="username"
                variant="outlined"
                fullWidth
                margin="normal"
                autoFocus
              />
              <TextField
                label="パスワード"
                name="password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <TextField
                label="端末ID"
                name="terminalId"
                variant="outlined"
                fullWidth
                margin="normal"
                placeholder="POS01"
              />
              <FormControlLabel
                control={<Checkbox name="rememberDevice" />}
                label="デバイス記憶（Remember device）"
              />
              {error && (
                <Typography color="error" sx={{ mt: 1, mb: 1 }}>{error}</Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                disabled={loading}
                sx={{ mt: 2 }}
              >
                ログイン
              </Button>
            </form>
          </Paper>
        </Box>
      </Box>
    </React.Fragment>
  );
}
