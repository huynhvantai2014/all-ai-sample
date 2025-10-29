"use client";
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  MenuItem,
  Chip,
  Divider
} from '@mui/material';
import { BarChart, Download, TrendingUp, AttachMoney } from '@mui/icons-material';

interface SalesData {
  id: string;
  orderId: string;
  items: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  paymentMethod: string;
  customerName?: string;
  date: Date;
}

interface SalesSummary {
  totalSales: number;
  totalOrders: number;
  averageOrderValue: number;
  topItems: Array<{
    name: string;
    quantity: number;
    revenue: number;
  }>;
}

export default function SalesReportPage() {
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [summary, setSummary] = useState<SalesSummary | null>(null);
  const [dateFrom, setDateFrom] = useState('2025-10-26');
  const [dateTo, setDateTo] = useState('2025-10-26');
  const [filterMethod, setFilterMethod] = useState('all');

  useEffect(() => {
    fetchSalesData();
  }, [dateFrom, dateTo, filterMethod]);

  const fetchSalesData = async () => {
    try {
      const params = new URLSearchParams({
        dateFrom,
        dateTo,
        paymentMethod: filterMethod !== 'all' ? filterMethod : ''
      });
      
      const response = await fetch(`/api/sales?${params}`);
      const data = await response.json();
      
      setSalesData(data.sales.map((sale: any) => ({
        ...sale,
        date: new Date(sale.date)
      })));
      setSummary(data.summary);
    } catch (error) {
      console.error('Failed to fetch sales data:', error);
    }
  };

  const exportToCSV = () => {
    const headers = ['注文ID', '日時', '顧客名', '支払方法', '合計金額'];
    const csvContent = [
      headers.join(','),
      ...salesData.map(sale => [
        sale.orderId,
        sale.date.toLocaleString(),
        sale.customerName || 'N/A',
        sale.paymentMethod,
        sale.total
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `sales_report_${dateFrom}_${dateTo}.csv`;
    link.click();
  };

  const getPaymentMethodColor = (method: string) => {
    switch (method) {
      case 'cash': return 'success';
      case 'card': return 'primary';
      case 'bank': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 2, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" color="primary" gutterBottom>
        売上レポート
      </Typography>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="開始日"
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="終了日"
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              select
              label="支払方法"
              value={filterMethod}
              onChange={(e) => setFilterMethod(e.target.value)}
            >
              <MenuItem value="all">すべて</MenuItem>
              <MenuItem value="cash">現金</MenuItem>
              <MenuItem value="card">クレジットカード</MenuItem>
              <MenuItem value="bank">銀行振込</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              startIcon={<Download />}
              onClick={exportToCSV}
              fullWidth
            >
              CSV出力
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Summary Cards */}
      {summary && (
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AttachMoney sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                  <Box>
                    <Typography variant="h6">総売上</Typography>
                    <Typography variant="h4" color="primary">
                      ¥{summary.totalSales.toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <BarChart sx={{ fontSize: 40, color: 'success.main', mr: 2 }} />
                  <Box>
                    <Typography variant="h6">注文数</Typography>
                    <Typography variant="h4" color="success.main">
                      {summary.totalOrders}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUp sx={{ fontSize: 40, color: 'warning.main', mr: 2 }} />
                  <Box>
                    <Typography variant="h6">平均注文額</Typography>
                    <Typography variant="h4" color="warning.main">
                      ¥{Math.round(summary.averageOrderValue).toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>人気商品</Typography>
                {summary.topItems.slice(0, 3).map((item, index) => (
                  <Typography key={index} variant="body2">
                    {index + 1}. {item.name} ({item.quantity}個)
                  </Typography>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Sales Table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>注文ID</TableCell>
                <TableCell>日時</TableCell>
                <TableCell>顧客名</TableCell>
                <TableCell>商品</TableCell>
                <TableCell>支払方法</TableCell>
                <TableCell align="right">合計金額</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salesData.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>{sale.orderId}</TableCell>
                  <TableCell>
                    {sale.date.toLocaleDateString()} {sale.date.toLocaleTimeString()}
                  </TableCell>
                  <TableCell>{sale.customerName || 'N/A'}</TableCell>
                  <TableCell>
                    {sale.items.map((item, index) => (
                      <Typography key={index} variant="body2">
                        {item.name} × {item.quantity}
                      </Typography>
                    ))}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={sale.paymentMethod === 'cash' ? '現金' : 
                             sale.paymentMethod === 'card' ? 'カード' : '銀行振込'}
                      color={getPaymentMethodColor(sale.paymentMethod) as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="h6">
                      ¥{sale.total.toLocaleString()}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}