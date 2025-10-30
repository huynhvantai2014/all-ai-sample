'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Paper,
  Chip
} from '@mui/material';
import {
  People,
  Business,
  TrendingUp,
  Assessment
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

interface ResourceData {
  summary: {
    total_employees: number;
    active_employees: number;
    available_employees: number;
    utilization_rate: number;
  };
  departments: Array<{
    department_name: string;
    total_count: number;
    active_count: number;
    available_count: number;
    utilization_rate: number;
  }>;
  projects: Array<{
    project_name: string;
    member_count: number;
  }>;
}

export default function DashboardPage() {
  const [resourceData, setResourceData] = useState<ResourceData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 認証チェック
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetchResourceData();
  }, []);

  const fetchResourceData = async () => {
    try {
      const response = await fetch('/api/resource/status');
      const data = await response.json();
      
      if (data.success) {
        setResourceData(data);
      }
    } catch (error) {
      console.error('リソースデータ取得エラー:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  const StatCard = ({ title, value, icon, color }: any) => (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color="textSecondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4">
              {value}
            </Typography>
          </Box>
          <Box sx={{ color }}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <Typography>読み込み中...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* ヘッダー */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" component="h1">
            リソースダッシュボード
          </Typography>
          <Box>
            <Button 
              variant="outlined" 
              onClick={() => router.push('/employees')}
              sx={{ mr: 2 }}
            >
              人材一覧
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => router.push('/employees/add')}
              sx={{ mr: 2 }}
            >
              社員追加
            </Button>
            <Button variant="outlined" color="error" onClick={handleLogout}>
              ログアウト
            </Button>
          </Box>
        </Box>

        {/* サマリーカード */}
        {resourceData && (
          <>
            <Grid container spacing={3} mb={4}>
              <Grid item xs={12} md={3}>
                <StatCard
                  title="総社員数"
                  value={resourceData.summary.total_employees}
                  icon={<People fontSize="large" />}
                  color="primary.main"
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <StatCard
                  title="稼働中"
                  value={resourceData.summary.active_employees}
                  icon={<TrendingUp fontSize="large" />}
                  color="success.main"
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <StatCard
                  title="空き状況"
                  value={resourceData.summary.available_employees}
                  icon={<Business fontSize="large" />}
                  color="info.main"
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <StatCard
                  title="稼働率"
                  value={`${resourceData.summary.utilization_rate}%`}
                  icon={<Assessment fontSize="large" />}
                  color="warning.main"
                />
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              {/* 部門別状況 */}
              <Grid item xs={12} md={8}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    部門別リソース状況
                  </Typography>
                  {resourceData.departments.map((dept, index) => (
                    <Box key={index} mb={2}>
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography variant="subtitle1">
                          {dept.department_name}
                        </Typography>
                        <Chip 
                          label={`${dept.utilization_rate}%`}
                          color={dept.utilization_rate > 80 ? 'error' : dept.utilization_rate > 60 ? 'warning' : 'success'}
                          size="small"
                        />
                      </Box>
                      <Box display="flex" gap={2}>
                        <Typography variant="body2" color="textSecondary">
                          総数: {dept.total_count}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          稼働中: {dept.active_count}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          空き: {dept.available_count}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Paper>
              </Grid>

              {/* プロジェクト参加状況 */}
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    プロジェクト参加状況
                  </Typography>
                  {resourceData.projects.map((project, index) => (
                    <Box key={index} display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                      <Typography variant="body1">
                        {project.project_name}
                      </Typography>
                      <Chip 
                        label={`${project.member_count}名`}
                        variant="outlined"
                        size="small"
                      />
                    </Box>
                  ))}
                </Paper>
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    </Container>
  );
}