import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { CreditCard, AccountBalance, Money } from '@mui/icons-material';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  customerInfo?: {
    name: string;
    phone: string;
  };
}

export default function CheckoutPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);

  useEffect(() => {
    // Get order data from URL params or state
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('orderId');
    
    if (orderId) {
      // In real app, fetch order by ID
      // For demo, use mock data
      const mockOrder: Order = {
        id: orderId,
        items: [
          { id: '1', name: 'コーヒー', price: 300, quantity: 2 },
          { id: '2', name: 'ハンバーガー', price: 800, quantity: 1 }
        ],
        total: 1400
      };
      setOrder(mockOrder);
    }
  }, []);

  const handleProceedToPayment = () => {
    if (order) {
      const updatedOrder = {
        ...order,
        customerInfo: {
          name: customerName,
          phone: customerPhone
        }
      };
      setOrder(updatedOrder);
      setPaymentDialogOpen(true);
    }
  };

  const handlePaymentMethod = (method: string) => {
    setPaymentDialogOpen(false);
    // Navigate to payment method screen
    window.location.href = `/payment_method?method=${method}&orderId=${order?.id}`;
  };

  if (!order) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h5">注文が見つかりません</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" color="primary" gutterBottom>
        レジ・決済
      </Typography>

      <Grid container spacing={3}>
        {/* Order Summary */}
        <Grid item xs={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              注文内容確認
            </Typography>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>商品名</TableCell>
                    <TableCell align="right">単価</TableCell>
                    <TableCell align="right">数量</TableCell>
                    <TableCell align="right">小計</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell align="right">¥{item.price}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">¥{(item.price * item.quantity).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" align="right">
              合計: ¥{order.total.toLocaleString()}
            </Typography>
          </Paper>
        </Grid>

        {/* Customer Info & Payment */}
        <Grid item xs={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              お客様情報
            </Typography>
            
            <TextField
              fullWidth
              label="お名前"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              sx={{ mb: 2 }}
            />
            
            <TextField
              fullWidth
              label="電話番号"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              sx={{ mb: 3 }}
            />
            
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleProceedToPayment}
            >
              決済に進む
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Payment Method Selection Dialog */}
      <Dialog open={paymentDialogOpen} onClose={() => setPaymentDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>お支払い方法を選択してください</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <Card 
                sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
                onClick={() => handlePaymentMethod('cash')}
              >
                <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                  <Money sx={{ mr: 2, fontSize: 40, color: 'primary.main' }} />
                  <Box>
                    <Typography variant="h6">現金</Typography>
                    <Typography variant="body2" color="text.secondary">
                      現金でのお支払い
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12}>
              <Card 
                sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
                onClick={() => handlePaymentMethod('card')}
              >
                <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                  <CreditCard sx={{ mr: 2, fontSize: 40, color: 'primary.main' }} />
                  <Box>
                    <Typography variant="h6">クレジットカード</Typography>
                    <Typography variant="body2" color="text.secondary">
                      各種クレジットカード対応
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12}>
              <Card 
                sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
                onClick={() => handlePaymentMethod('bank')}
              >
                <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccountBalance sx={{ mr: 2, fontSize: 40, color: 'primary.main' }} />
                  <Box>
                    <Typography variant="h6">銀行振込</Typography>
                    <Typography variant="body2" color="text.secondary">
                      銀行振込でのお支払い
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPaymentDialogOpen(false)}>キャンセル</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}