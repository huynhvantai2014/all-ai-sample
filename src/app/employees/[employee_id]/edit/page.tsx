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
  Add as AddIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useRouter, useParams } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';

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

interface FormData {
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

export default function EmployeeEditPage() {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [confirmDialog, setConfirmDialog] = useState(false);
  
  const router = useRouter();
  const params = useParams();
  const employee_id = params?.employee_id as string;

  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

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

    if (!employee_id) {
      setError('社員IDが指定されていません');
      return;
    }

    fetchEmployee();
  }, [employee_id, router]);

  const fetchEmployee = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/employee/detail/${employee_id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setEmployee(data);
        
        // フォームに既存データを設定
        reset({
          full_name: data.full_name || '',
          email: data.email || '',
          phone: data.phone || '',
          department: data.department || '',
          position: data.position || '',
          status: data.status || 'active',
          skill: data.skill || [],
          join_date: data.join_date ? data.join_date.split('T')[0] : ''
        });
      } else {
        const errorData = await response.json();
        setError(errorData.message || '社員情報の取得に失敗しました');
      }
    } catch (error) {
      console.error('Error fetching employee:', error);
      setError('社員情報の取得中にエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    setConfirmDialog(true);
  };

  const confirmSave = async () => {
    const formData = control._formValues;
    
    try {
      setSaving(true);
      setError('');
      setSuccess('');
      
      const response = await fetch(`/api/employee/update/${employee_id}`, {
        method: 'PUT',
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
        setSuccess('社員情報を更新しました');
        setTimeout(() => {
          router.push(`/employees/${employee_id}`);
        }, 1500);
      } else {
        const errorData = await response.json();
        setError(errorData.message || '更新に失敗しました');
      }
    } catch (error) {
      console.error('Error updating employee:', error);
      setError('更新中にエラーが発生しました');
    } finally {
      setSaving(false);
      setConfirmDialog(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <Typography>読み込み中...</Typography>
        </Box>
      </Container>
    );
  }

  if (error && !employee) {
    return (
      <Container maxWidth="md">
        <Box sx={{ py: 4 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => router.back()}
          >
            戻る
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        {/* ヘッダー */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => router.push(`/employees/${employee_id}`)}
            >
              詳細画面へ戻る
            </Button>
            <Typography variant="h4" component="h1" color="primary">
              社員情報編集
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
                {/* 社員ID（読み取り専用） */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="社員ID"
                    value={employee?.employee_id || ''}
                    disabled
                    helperText="社員IDは変更できません"
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
                  onClick={() => router.push(`/employees/${employee_id}`)}
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
                  {saving ? '保存中...' : '保存'}
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>

        {/* 確認ダイアログ */}
        <Dialog open={confirmDialog} onClose={() => setConfirmDialog(false)}>
          <DialogTitle>保存確認</DialogTitle>
          <DialogContent>
            <Typography>
              社員情報を更新しますか？
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmDialog(false)}>
              キャンセル
            </Button>
            <Button onClick={confirmSave} variant="contained" disabled={saving}>
              {saving ? '保存中...' : '保存'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
}