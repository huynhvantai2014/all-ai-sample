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
  TextField,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert
} from '@mui/material';
import { CreditCard, Money, AccountBalance, CheckCircle } from '@mui/icons-material';

interface PaymentInfo {
  method: string;
  orderId: string;
  amount: number;
}

export default function PaymentMethodPage() {
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const [cashAmount, setCashAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [change, setChange] = useState(0);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const method = urlParams.get('method');
    const orderId = urlParams.get('orderId');
    
    if (method && orderId) {
      // In real app, fetch order amount
      setPaymentInfo({
        method,
        orderId,
        amount: 1400 // Mock amount
      });
    }
  }, []);

  const processPayment = async () => {
    if (!paymentInfo) return;
    
    let isValid = false;
    let calculatedChange = 0;

    switch (paymentInfo.method) {
      case 'cash':
        const cash = parseFloat(cashAmount);
        if (cash >= paymentInfo.amount) {
          isValid = true;
          calculatedChange = cash - paymentInfo.amount;
        }
        break;
      case 'card':
        if (cardNumber && expiryDate && cvv) {
          isValid = true;
        }
        break;
      case 'bank':
        if (bankAccount) {
          isValid = true;
        }
        break;
    }

    if (isValid) {
      // Process payment via API
      try {
        await fetch('/api/payments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: paymentInfo.orderId,
            method: paymentInfo.method,
            amount: paymentInfo.amount,
            cashAmount: paymentInfo.method === 'cash' ? parseFloat(cashAmount) : undefined,
            cardInfo: paymentInfo.method === 'card' ? { cardNumber, expiryDate, cvv } : undefined,
            bankAccount: paymentInfo.method === 'bank' ? bankAccount : undefined
          })
        });
        
        setChange(calculatedChange);
        setPaymentComplete(true);
      } catch (error) {
        console.error('Payment failed:', error);
      }
    }
  };

  const finishTransaction = () => {
    // Navigate to sales report or main menu
    window.location.href = '/sales_report';
  };

  if (!paymentInfo) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h5">決済情報が見つかりません</Typography>
      </Box>
    );
  }

  if (paymentComplete) {
    return (
      <Box sx={{ p: 2, bgcolor: '#f5f5f5', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Paper sx={{ p: 4, textAlign: 'center', maxWidth: 400 }}>
          <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
          <Typography variant="h4" color="success.main" gutterBottom>
            決済完了
          </Typography>
          <Typography variant="h6" gutterBottom>
            お支払い金額: ¥{paymentInfo.amount.toLocaleString()}
          </Typography>
          {paymentInfo.method === 'cash' && change > 0 && (
            <Typography variant="h6" color="primary" gutterBottom>
              お釣り: ¥{change.toLocaleString()}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={finishTransaction}
            sx={{ mt: 2 }}
          >
            取引完了
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" color="primary" gutterBottom>
        お支払い - {paymentInfo.method === 'cash' ? '現金' : paymentInfo.method === 'card' ? 'クレジットカード' : '銀行振込'}
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              お支払い金額: ¥{paymentInfo.amount.toLocaleString()}
            </Typography>
            <Divider sx={{ my: 2 }} />

            {paymentInfo.method === 'cash' && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  <Money sx={{ mr: 1 }} />
                  現金でのお支払い
                </Typography>
                <TextField
                  fullWidth
                  label="お預かり金額"
                  type="number"
                  value={cashAmount}
                  onChange={(e) => setCashAmount(e.target.value)}
                  sx={{ mb: 2 }}
                />
                {parseFloat(cashAmount) > 0 && parseFloat(cashAmount) >= paymentInfo.amount && (
                  <Alert severity="success" sx={{ mb: 2 }}>
                    お釣り: ¥{(parseFloat(cashAmount) - paymentInfo.amount).toLocaleString()}
                  </Alert>
                )}
                {parseFloat(cashAmount) > 0 && parseFloat(cashAmount) < paymentInfo.amount && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    金額が不足しています
                  </Alert>
                )}
              </Box>
            )}

            {paymentInfo.method === 'card' && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  <CreditCard sx={{ mr: 1 }} />
                  クレジットカード情報
                </Typography>
                <TextField
                  fullWidth
                  label="カード番号"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="有効期限 (MM/YY)"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="CVV"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}

            {paymentInfo.method === 'bank' && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  <AccountBalance sx={{ mr: 1 }} />
                  銀行振込情報
                </Typography>
                <TextField
                  fullWidth
                  label="振込先口座番号"
                  value={bankAccount}
                  onChange={(e) => setBankAccount(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Alert severity="info">
                  振込確認後、決済が完了します。
                </Alert>
              </Box>
            )}

            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={processPayment}
              sx={{ mt: 3 }}
              disabled={
                (paymentInfo.method === 'cash' && (parseFloat(cashAmount) < paymentInfo.amount)) ||
                (paymentInfo.method === 'card' && (!cardNumber || !expiryDate || !cvv)) ||
                (paymentInfo.method === 'bank' && !bankAccount)
              }
            >
              決済実行
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}