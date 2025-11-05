// src/app/login/main.js
const form = document.getElementById('login-form');
const userId = document.getElementById('user-id');
const password = document.getElementById('password');
const errorMsg = document.getElementById('error-msg');
const togglePw = document.getElementById('toggle-pw');

// パスワード表示切替
let pwVisible = false;
togglePw.addEventListener('click', () => {
  pwVisible = !pwVisible;
  password.type = pwVisible ? 'text' : 'password';
  togglePw.textContent = pwVisible ? '非表示' : '表示';
});

// ログイン処理（ダミー: admin/123456のみ成功）
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (userId.value === 'admin' && password.value === '123456') {
    errorMsg.classList.add('hidden');
    window.location.href = '/home/index.html';
  } else {
    errorMsg.classList.remove('hidden');
  }
});
