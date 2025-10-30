"use client";
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, FormControl, InputLabel, Select, MenuItem, Alert, Container, Card, CardContent } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    user_id: '',
    password: '',
    userType: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // トークンをlocalStorageに保存
        localStorage.setItem('token', data.token);
        localStorage.setItem('user_id', data.user_id);
        localStorage.setItem('role', data.role);
        
        // ダッシュボードへリダイレクト
        router.push('/dashboard');
      } else {
        setError(data.message || 'ログインに失敗しました');
      }
    } catch (error) {
      setError('システムエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Card sx={{ width: '100%', maxWidth: 400 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
              HR システム
            </Typography>
            <Typography variant="h6" component="h2" gutterBottom align="center" color="text.secondary">
              ログイン
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="ユーザーID"
                name="user_id"
                value={formData.user_id}
                onChange={handleChange}
                margin="normal"
                required
                autoFocus
              />
              
              <TextField
                fullWidth
                label="パスワード"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                required
              />

              {process.env.NODE_ENV === 'development' && (
                <FormControl fullWidth margin="normal">
                  <InputLabel>ユーザー種別（テスト用）</InputLabel>
                  <Select
                    name="userType"
                    value={formData.userType}
                    onChange={handleChange}
                    label="ユーザー種別（テスト用）"
                  >
                    <MenuItem value="">通常ログイン</MenuItem>
                    <MenuItem value="admin">管理者</MenuItem>
                    <MenuItem value="manager">マネージャー</MenuItem>
                    <MenuItem value="general">一般社員</MenuItem>
                  </Select>
                </FormControl>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{ mt: 3, mb: 2 }}
              >
                {loading ? 'ログイン中...' : 'ログイン'}
              </Button>
            </Box>

            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
              テスト用アカウント: admin / 123456
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
