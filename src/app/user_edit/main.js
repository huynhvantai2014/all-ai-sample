// src/app/user_edit/main.js
const params = new URLSearchParams(window.location.search);
const isNew = params.get('new');
const userIdInput = document.getElementById('user-id');
const nameInput = document.getElementById('name');
const roleInput = document.getElementById('role');
const statusInput = document.getElementById('status');
const passwordInput = document.getElementById('password');
const resetPwBtn = document.getElementById('reset-pw');
const form = document.getElementById('edit-form');
const errorMsg = document.getElementById('error-msg');
const cancelBtn = document.getElementById('cancel');

// ダミーデータ取得
let user = { id: '', name: '', role: 'スタッフ', status: '有効', password: '' };
if (!isNew) {
  // 本来はAPI等で取得。ここではURLのidでダミー値
  user = { id: params.get('id') || '001', name: '田中一郎', role: '管理者', status: '有効', password: '' };
}
userIdInput.value = isNew ? '自動発番' : user.id;
nameInput.value = user.name;
roleInput.value = user.role;
statusInput.value = user.status;

resetPwBtn.addEventListener('click', () => {
  passwordInput.value = '';
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!nameInput.value) {
    errorMsg.classList.remove('hidden');
    return;
  }
  // 保存処理（ダミー）
  alert('保存しました');
  window.location.href = '/user_list/index.html';
});

cancelBtn.addEventListener('click', () => {
  window.location.href = '/user_list/index.html';
});
