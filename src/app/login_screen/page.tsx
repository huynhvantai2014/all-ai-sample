import { Button, Container, Typography, TextField } from '@mui/material';

export default function SRC0001Page() {
  return (
    <Container maxWidth="sm" style={{ marginTop: '3rem', textAlign: 'center' }}>
      <Typography variant="h4" color="primary" gutterBottom>
        SRC0001 - 仮販売登録画面
      </Typography>
      <TextField label="販売番号" variant="outlined" fullWidth margin="normal" />
      <TextField label="担当者" variant="outlined" fullWidth margin="normal" />
      <TextField label="金額" variant="outlined" fullWidth margin="normal" type="number" />
      <Button variant="contained" color="primary" size="large" style={{ marginTop: '2rem' }}>
        登録
      </Button>
    </Container>
  );
}
