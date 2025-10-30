

"use client";

import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Paper, 
  Container,
  Card,
  CardContent,
  CardActions,
  Chip
} from '@mui/material';
import { 
  People, 
  Dashboard, 
  PersonAdd, 
  Analytics,
  Business,
  Login 
} from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role') || '';
      setIsLoggedIn(!!token);
      setUserRole(role);
      
      if (!token) {
        // ログインしていない場合はwelcome画面を表示
        setIsLoggedIn(false);
      }
    }
  }, []);

  // ログイン済みの場合はダッシュボードにリダイレクト（常に呼び出される）
  useEffect(() => {
    if (isLoggedIn) {
      router.push('/dashboard');
    }
  }, [isLoggedIn, router]);

  // ログインしていない場合のwelcome画面
  if (!isLoggedIn) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ minHeight: '100vh', py: 8 }}>
          {/* Hero Section */}
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h2" component="h1" gutterBottom color="primary">
              HR Management System
            </Typography>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              次世代の人材管理ソリューション
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
              Next.js 16とMaterial UIで構築された、モダンで効率的な人材管理システム。
              社員情報の管理、リソース配分の最適化、リアルタイムダッシュボードで組織運営をサポートします。
            </Typography>
            
            <Button
              variant="contained"
              size="large"
              startIcon={<Login />}
              onClick={() => router.push('/login')}
              sx={{ mt: 2, px: 4, py: 1.5 }}
            >
              ログインして開始
            </Button>
          </Box>

          {/* Features Grid */}
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', textAlign: 'center' }}>
                <CardContent>
                  <People sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    社員管理
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    社員情報の登録、検索、更新。CSVインポート・エクスポート機能で効率的な管理を実現。
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', textAlign: 'center' }}>
                <CardContent>
                  <Dashboard sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    リソースダッシュボード
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    部門別稼働状況、プロジェクト参加状況をリアルタイムで可視化。データドリブンな意思決定をサポート。
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', textAlign: 'center' }}>
                <CardContent>
                  <Analytics sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    分析・レポート
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    詳細な統計情報と分析レポート。組織の生産性向上とリソース最適化を実現。
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Tech Stack */}
          <Box sx={{ mt: 8, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Technology Stack
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1, mt: 2 }}>
              <Chip label="Next.js 16" variant="outlined" />
              <Chip label="React 19" variant="outlined" />
              <Chip label="Material UI" variant="outlined" />
              <Chip label="TypeScript" variant="outlined" />
              <Chip label="MongoDB" variant="outlined" />
              <Chip label="JWT Authentication" variant="outlined" />
            </Box>
          </Box>
        </Box>
      </Container>
    );
  }

  return null;
}
