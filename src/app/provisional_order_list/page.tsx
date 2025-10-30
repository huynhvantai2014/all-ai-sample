"use client";

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { Delete, Visibility, ShoppingCart } from '@mui/icons-material';

interface ProvisionalOrder {
  id: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  createdAt: Date;
  status: string;
}

export default function ProvisionalOrderListPage() {
  const [orders, setOrders] = useState<ProvisionalOrder[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<ProvisionalOrder | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/provisional-orders');
      const data = await response.json();
      setOrders(data.map((order: any) => ({
        ...order,
        createdAt: new Date(order.createdAt)
      })));
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  const deleteOrder = async (id: string) => {
    try {
      await fetch(`/api/provisional-orders?id=${id}`, {
        method: 'DELETE'
      });
      fetchOrders();
    } catch (error) {
      console.error('Failed to delete order:', error);
    }
  };

  const viewOrder = (order: ProvisionalOrder) => {
    setSelectedOrder(order);
    setViewDialogOpen(true);
  };

  const proceedToCheckout = (order: ProvisionalOrder) => {
    // Navigate to checkout with order data
    // In a real app, you'd use Next.js router
    window.location.href = `/checkout?orderId=${order.id}`;
  };

  return (
    <Box sx={{ p: 2, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" color="primary" gutterBottom>
        仮注文一覧
      </Typography>

      <Paper sx={{ mt: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>注文ID</TableCell>
                <TableCell>作成日時</TableCell>
                <TableCell>商品数</TableCell>
                <TableCell>合計金額</TableCell>
                <TableCell>ステータス</TableCell>
                <TableCell>操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>
                    {order.createdAt.toLocaleDateString()} {order.createdAt.toLocaleTimeString()}
                  </TableCell>
                  <TableCell>{order.items.reduce((sum, item) => sum + item.quantity, 0)}</TableCell>
                  <TableCell>¥{order.total.toLocaleString()}</TableCell>
                  <TableCell>
                    <Chip label={order.status} color="primary" size="small" />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => viewOrder(order)} color="primary">
                      <Visibility />
                    </IconButton>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      startIcon={<ShoppingCart />}
                      onClick={() => proceedToCheckout(order)}
                      sx={{ mx: 1 }}
                    >
                      レジへ
                    </Button>
                    <IconButton onClick={() => deleteOrder(order.id)} color="error">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* View Order Dialog */}
      <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>注文詳細</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Box>
              <Typography variant="h6" gutterBottom>
                注文ID: {selectedOrder.id}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                作成日時: {selectedOrder.createdAt.toLocaleString()}
              </Typography>
              
              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>商品名</TableCell>
                      <TableCell>単価</TableCell>
                      <TableCell>数量</TableCell>
                      <TableCell>小計</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedOrder.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>¥{item.price}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>¥{(item.price * item.quantity).toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
              <Typography variant="h6" sx={{ mt: 2, textAlign: 'right' }}>
                合計: ¥{selectedOrder.total.toLocaleString()}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)}>閉じる</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}