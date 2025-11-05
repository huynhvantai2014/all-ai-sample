// src/app/home/main.js

// POSレジ画面への遷移
const gotoPosBtn = document.getElementById('goto-pos');
if (gotoPosBtn) {
  gotoPosBtn.addEventListener('click', () => {
    window.location.href = '/src/app/pos/index.html';
  });
}

// 権限に応じたメニュー表示（ダミー実装）
// 本来はログイン情報やAPI連携で制御
function showMenuByRole(role) {
  // 例: 管理者なら追加メニュー表示
  // 今回は情報不足のため省略
}

// レスポンシブ対応・アクセシビリティはTailwind CSSで実装済み
