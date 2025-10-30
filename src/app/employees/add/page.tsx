"use client";

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
  Autocomplete,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Save as SaveIcon,
  ArrowBack as ArrowBackIcon,
  PersonAdd as PersonAddIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';

interface FormData {
  employee_id: string;
  full_name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  status: 'active' | 'inactive' | 'on_leave';
  skill: string[];
  join_date: string;
}

const departments = [
  '開発部',
  '営業部',
  '人事部',
  '経理部',
  'マーケティング部',
  '品質保証部',
  'システム管理部'
];

const positions = [
  'エンジニア',
  'シニアエンジニア',
  'チームリーダー',
  'マネージャー',
  '部長',
  '課長',
  '主任',
  '一般職'
];

const skillOptions = [
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Python',
  'Java',
  'PHP',
  'SQL',
  'MongoDB',
  'AWS',
  'Docker',
  'Kubernetes',
  'Git',
  'Figma',
  'Photoshop',
  'Excel',
  'PowerPoint',
  'プロジェクト管理',
  '営業'
];

export default function EmployeeAddPage() {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [confirmDialog, setConfirmDialog] = useState(false);
  
  const router = useRouter();

  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      employee_id: '',
      full_name: '',
      email: '',
      phone: '',
      department: '',
      position: '',
      status: 'active',
      skill: [],
      join_date: new Date().toISOString().split('T')[0] // 今日の日付をデフォルト
    }
  });

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
  }, [router]);

  const onSubmit = async (data: FormData) => {
    setConfirmDialog(true);
  };

  const confirmSave = async () => {
    const formData = control._formValues;
    
    try {
      setSaving(true);
      setError('');
      setSuccess('');
      
      const response = await fetch('/api/employee/add', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          join_date: new Date(formData.join_date).toISOString()
        })
      });

      if (response.ok) {
        const result = await response.json();
        setSuccess('社員情報を登録しました');
        reset(); // フォームをクリア
        setTimeout(() => {
          router.push(`/employees/${result.employee_id}`);
        }, 1500);
      } else {
        const errorData = await response.json();
        setError(errorData.message || '登録に失敗しました');
      }
    } catch (error) {
      console.error('Error adding employee:', error);
      setError('登録中にエラーが発生しました');
    } finally {
      setSaving(false);
      setConfirmDialog(false);
    }
  };

  // 社員IDの自動生成関数
  const generateEmployeeId = () => {
    const timestamp = Date.now().toString().slice(-6);
    const randomNum = Math.floor(Math.random() * 999).toString().padStart(3, '0');
    return `EMP${timestamp}${randomNum}`.slice(0, 10);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        {/* ヘッダー */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => router.push('/employees')}
            >
              社員一覧へ戻る
            </Button>
            <Typography variant="h4" component="h1" color="primary">
              新規社員登録
            </Typography>
          </Box>
          <Button
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            ログアウト
          </Button>
        </Box>

        {/* アラート */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        {/* フォーム */}
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                {/* 社員ID */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="employee_id"
                    control={control}
                    rules={{ required: '社員IDは必須です' }}
                    render={({ field }) => (
                      <Box>
                        <TextField
                          {...field}
                          fullWidth
                          label="社員ID"
                          error={!!errors.employee_id}
                          helperText={errors.employee_id?.message || "例: EMP001"}
                          InputProps={{
                            endAdornment: (
                              <Button
                                size="small"
                                onClick={() => field.onChange(generateEmployeeId())}
                                sx={{ ml: 1 }}
                              >
                                自動生成
                              </Button>
                            )
                          }}
                        />
                      </Box>
                    )}
                  />
                </Grid>

                {/* 氏名 */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="full_name"
                    control={control}
                    rules={{ required: '氏名は必須です' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="氏名"
                        error={!!errors.full_name}
                        helperText={errors.full_name?.message}
                      />
                    )}
                  />
                </Grid>

                {/* メールアドレス */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="email"
                    control={control}
                    rules={{ 
                      required: 'メールアドレスは必須です',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'メールアドレスの形式が正しくありません'
                      }
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="メールアドレス"
                        type="email"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                    )}
                  />
                </Grid>

                {/* 電話番号 */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="電話番号"
                        placeholder="090-1234-5678"
                      />
                    )}
                  />
                </Grid>

                {/* 部門 */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="department"
                    control={control}
                    rules={{ required: '部門は必須です' }}
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.department}>
                        <InputLabel>部門</InputLabel>
                        <Select {...field} label="部門">
                          {departments.map((dept) => (
                            <MenuItem key={dept} value={dept}>
                              {dept}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.department && (
                          <Typography variant="caption" color="error" sx={{ mt: 1, ml: 2 }}>
                            {errors.department.message}
                          </Typography>
                        )}
                      </FormControl>
                    )}
                  />
                </Grid>

                {/* 職位 */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="position"
                    control={control}
                    rules={{ required: '職位は必須です' }}
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.position}>
                        <InputLabel>職位</InputLabel>
                        <Select {...field} label="職位">
                          {positions.map((pos) => (
                            <MenuItem key={pos} value={pos}>
                              {pos}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.position && (
                          <Typography variant="caption" color="error" sx={{ mt: 1, ml: 2 }}>
                            {errors.position.message}
                          </Typography>
                        )}
                      </FormControl>
                    )}
                  />
                </Grid>

                {/* ステータス */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="status"
                    control={control}
                    rules={{ required: 'ステータスは必須です' }}
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.status}>
                        <InputLabel>ステータス</InputLabel>
                        <Select {...field} label="ステータス">
                          <MenuItem value="active">在職</MenuItem>
                          <MenuItem value="inactive">退職</MenuItem>
                          <MenuItem value="on_leave">休暇中</MenuItem>
                        </Select>
                        {errors.status && (
                          <Typography variant="caption" color="error" sx={{ mt: 1, ml: 2 }}>
                            {errors.status.message}
                          </Typography>
                        )}
                      </FormControl>
                    )}
                  />
                </Grid>

                {/* 入社日 */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="join_date"
                    control={control}
                    rules={{ required: '入社日は必須です' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="入社日"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.join_date}
                        helperText={errors.join_date?.message}
                      />
                    )}
                  />
                </Grid>

                {/* スキル */}
                <Grid item xs={12}>
                  <Controller
                    name="skill"
                    control={control}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        multiple
                        options={skillOptions}
                        freeSolo
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <Chip
                              variant="outlined"
                              label={option}
                              {...getTagProps({ index })}
                              key={index}
                            />
                          ))
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="スキル"
                            placeholder="スキルを選択または入力"
                            helperText="複数選択可能。新しいスキルは直接入力できます。"
                          />
                        )}
                        onChange={(_, value) => field.onChange(value)}
                        value={field.value || []}
                      />
                    )}
                  />
                </Grid>
              </Grid>

              {/* ボタン */}
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
                <Button
                  variant="outlined"
                  onClick={() => router.push('/employees')}
                  disabled={saving}
                >
                  キャンセル
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<SaveIcon />}
                  disabled={saving}
                >
                  {saving ? '登録中...' : '登録'}
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>

        {/* 確認ダイアログ */}
        <Dialog open={confirmDialog} onClose={() => setConfirmDialog(false)}>
          <DialogTitle>登録確認</DialogTitle>
          <DialogContent>
            <Typography>
              新規社員情報を登録しますか？
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmDialog(false)}>
              キャンセル
            </Button>
            <Button onClick={confirmSave} variant="contained" disabled={saving}>
              {saving ? '登録中...' : '登録'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
}