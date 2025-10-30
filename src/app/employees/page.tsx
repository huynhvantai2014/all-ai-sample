"use client";

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Grid,
  Container,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
  GetApp as ExportIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Employee {
  employee_id: string;
  full_name: string;
  email: string;
  phone?: string;
  department: string;
  position: string;
  status: 'active' | 'inactive' | 'on_leave';
  skill?: string[];
  join_date: string;
}

export default function EmployeePage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    router.push('/login');
  };

  useEffect(() => {
    // 認証チェック
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetchEmployees();
  }, [router]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/employee/search', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setEmployees(data.employees || []);
      } else {
        console.error('Failed to fetch employees');
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'default';
      case 'on_leave': return 'warning';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return '在職';
      case 'inactive': return '退職';
      case 'on_leave': return '休暇中';
      default: return status;
    }
  };

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.employee_id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || emp.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || emp.status === statusFilter;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const departments = [...new Set(employees.map(emp => emp.department))];

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" color="primary">
            社員管理
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<ExportIcon />}
              onClick={() => {/* CSV export logic */}}
            >
              CSV出力
            </Button>
            <Link href="/employees/add" style={{ textDecoration: 'none' }}>
              <Button variant="contained" startIcon={<AddIcon />}>
                新規社員登録
              </Button>
            </Link>
            <Button
              variant="outlined"
              color="error"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
            >
              ログアウト
            </Button>
          </Box>
        </Box>

        {/* 検索・フィルター */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="社員名、メール、社員IDで検索"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>部門</InputLabel>
                <Select
                  value={departmentFilter}
                  label="部門"
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                >
                  <MenuItem value="all">すべて</MenuItem>
                  {departments.map(dept => (
                    <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>ステータス</InputLabel>
                <Select
                  value={statusFilter}
                  label="ステータス"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="all">すべて</MenuItem>
                  <MenuItem value="active">在職</MenuItem>
                  <MenuItem value="inactive">退職</MenuItem>
                  <MenuItem value="on_leave">休暇中</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="contained"
                onClick={fetchEmployees}
                disabled={loading}
              >
                検索
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* 結果統計 */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {filteredEmployees.length}件の社員が見つかりました（全{employees.length}件中）
          </Typography>
        </Box>

        {/* 社員一覧テーブル */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>社員ID</TableCell>
                <TableCell>氏名</TableCell>
                <TableCell>メール</TableCell>
                <TableCell>部門</TableCell>
                <TableCell>職位</TableCell>
                <TableCell>ステータス</TableCell>
                <TableCell>入社日</TableCell>
                <TableCell align="center">操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    読み込み中...
                  </TableCell>
                </TableRow>
              ) : filteredEmployees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    社員データが見つかりません
                  </TableCell>
                </TableRow>
              ) : (
                filteredEmployees.map((employee) => (
                  <TableRow key={employee.employee_id} hover>
                    <TableCell>{employee.employee_id}</TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {employee.full_name}
                      </Typography>
                    </TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>
                      <Chip
                        label={getStatusLabel(employee.status)}
                        color={getStatusColor(employee.status) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(employee.join_date).toLocaleDateString('ja-JP')}
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                        <Tooltip title="詳細表示">
                          <IconButton
                            size="small"
                            onClick={() => router.push(`/employees/${employee.employee_id}`)}
                          >
                            <ViewIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="編集">
                          <IconButton
                            size="small"
                            onClick={() => router.push(`/employees/${employee.employee_id}/edit`)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}