

"use client";

"use client";
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loggedIn = !!localStorage.getItem('pos_logged_in');
      setIsLoggedIn(loggedIn);
      if (!loggedIn) {
        router.replace('/login');
      }
    }
  }, [router]);

  if (!isLoggedIn) {
    // Trả về null hoặc loading trong khi chuyển hướng
    return null;
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', p: 4 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h3" color="primary" gutterBottom>
          POS Demo ホーム
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          こちらはPOSシステムのデモ画面です。ログイン後、各 chức năng sẽ được hiển thị.
        </Typography>
      </Paper>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">仮注文作成</Typography>
            <Link href="/provisional_order" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary" sx={{ mt: 2 }} fullWidth>
                仮注文画面へ
              </Button>
            </Link>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">売上レポート</Typography>
            <Link href="/sales_report" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary" sx={{ mt: 2 }} fullWidth>
                レポート画面へ
              </Button>
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
