"use client";
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Paper, 
  Grid, 
  Divider, 
  Chip 
} from '@mui/material';
import { Add, Remove, ShoppingCart } from '@mui/icons-material';

export default function ProvisionalOrderPage() {
  // State cho các trường nhập
  const [barcode, setBarcode] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [delivery, setDelivery] = useState('');
  const [note, setNote] = useState('');
  const [customer, setCustomer] = useState('');
  const [aiRecommend] = useState([
    { name: '冷蔵庫', tag: 'アップセル' },
    { name: '洗濯機', tag: '関連商品' }
  ]);

  // Info panel mock
  const infoPanel = {
    number: 'PROV-20251022-0001',
    stock: 'ホールド中',
    expire: '2025/10/23 23:59'
  };

  const handleScan = () => {
    // Giả lập scan barcode
    setBarcode('4901234567890');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Logic lưu đơn, có thể mock
    alert('仮販売作成・送信しました！');
  };

  return (
    <Box sx={{ bgcolor: '#f4f6fb', minHeight: '100vh' }}>
      <header style={{ background: '#1976d2', color: '#fff', padding: '1rem 2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <Typography variant="h5" sx={{ m: 0 }}>仮販売作成</Typography>
      </header>
      <Box className="main-content" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', mt: 6, maxWidth: 900, mx: 'auto' }}>
        <Paper className="order-card" elevation={3} sx={{ borderRadius: 4, p: 4, minWidth: 360, maxWidth: 500, mr: 4 }}>
          <Typography variant="h6" color="primary" gutterBottom>見積・仮販売入力</Typography>
          <Box component="form" className="order-form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="barcode">商品バーコード/JAN/SKU</label>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField id="barcode" value={barcode} onChange={e => setBarcode(e.target.value)} placeholder="商品コードを入力" size="small" fullWidth />
                <Button type="button" className="btn-scan" variant="outlined" color="primary" onClick={handleScan} sx={{ borderRadius: 1, fontWeight: 500 }}>スキャン</Button>
              </Box>
            </div>
            <div className="form-group">
              <label htmlFor="quantity">数量</label>
              <TextField id="quantity" type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))} size="small" fullWidth inputProps={{ min: 1 }} />
            </div>
            <div className="form-group">
              <label htmlFor="price">価格</label>
              <TextField id="price" value={price} onChange={e => setPrice(e.target.value)} placeholder="価格を入力" size="small" fullWidth />
            </div>
            <div className="form-group">
              <label htmlFor="discount">割引/プロモーション</label>
              <TextField id="discount" value={discount} onChange={e => setDiscount(e.target.value)} placeholder="割引コード等" size="small" fullWidth />
            </div>
            <div className="form-group">
              <label htmlFor="delivery">配送・設置希望</label>
              <TextField id="delivery" value={delivery} onChange={e => setDelivery(e.target.value)} placeholder="配送条件・設置希望" size="small" fullWidth />
            </div>
            <div className="form-group">
              <label htmlFor="note">備考</label>
              <TextField id="note" value={note} onChange={e => setNote(e.target.value)} placeholder="備考を入力" size="small" fullWidth multiline rows={2} />
            </div>
            <div className="form-group">
              <label htmlFor="customer">顧客情報（任意）</label>
              <TextField id="customer" value={customer} onChange={e => setCustomer(e.target.value)} placeholder="顧客名・連絡先等" size="small" fullWidth />
            </div>
            <Button type="submit" className="btn-create" variant="contained" color="primary" fullWidth sx={{ py: 1.2, fontWeight: 'bold', fontSize: '1.1rem', borderRadius: 2 }}>仮販売作成・送信</Button>
          </Box>
          <Box className="ai-recommend" sx={{ mt: 4, bgcolor: '#f0f4fa', borderRadius: 2, p: 2 }}>
            <Typography variant="subtitle2" color="primary" sx={{ mb: 1 }}>AIレコメンド商品</Typography>
            <Box className="recommend-list" sx={{ display: 'flex', gap: 2 }}>
              {aiRecommend.map((item, idx) => (
                <Box key={idx} className="recommend-item" sx={{ bgcolor: '#e8f5e9', color: '#1976d2', borderRadius: 1, px: 2, py: 1, fontWeight: 500, display: 'flex', alignItems: 'center' }}>
                  {item.name} <span className="tag" style={{ background: '#1976d2', color: '#fff', borderRadius: 1, padding: '0.2rem 0.6rem', marginLeft: '0.7rem', fontSize: '0.9rem' }}>{item.tag}</span>
                </Box>
              ))}
            </Box>
          </Box>
        </Paper>
        <Box className="info-panel" sx={{ bgcolor: '#fff', borderRadius: 2, boxShadow: 2, p: 3, minWidth: 200, fontSize: '1rem' }}>
          <div>仮販売番号: <span>{infoPanel.number}</span></div>
          <div>在庫状態: <span>{infoPanel.stock}</span></div>
          <div>有効期限: <span>{infoPanel.expire}</span></div>
        </Box>
      </Box>
      <footer className="footer" style={{ background: '#f0f4fa', color: '#888', textAlign: 'center', padding: '1rem 0', marginTop: '3rem', fontSize: '0.95rem', borderTop: '1px solid #e0e5ec' }}>
        <small>&copy; 2025 POS System Demo</small>
      </footer>
    </Box>
  );
}