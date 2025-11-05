// src/app/user_list/main.js
const userList = document.getElementById('user-list');
const searchInput = document.getElementById('search');
const addUserBtn = document.getElementById('add-user');

// ダミーデータ
let users = [
  { id: '001', name: '田中一郎', role: '管理者', status: '有効' },
  { id: '002', name: '鈴木花子', role: 'スタッフ', status: '無効' },
  { id: '003', name: '佐藤次郎', role: 'スタッフ', status: '有効' }
];

function renderUsers(list) {
  userList.innerHTML = '';
  list.forEach((u, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="px-4 py-2">${u.id}</td>
      <td class="px-4 py-2">${u.name}</td>
      <td class="px-4 py-2">${u.role}</td>
      <td class="px-4 py-2">${u.status}</td>
      <td class="px-4 py-2">
        <button class="edit-btn bg-blue-500 text-white px-2 py-1 rounded" data-idx="${idx}">編集</button>
      </td>
    `;
    tr.addEventListener('click', (e) => {
      if (e.target.classList.contains('edit-btn')) {
        window.location.href = `/user_edit/index.html?id=${u.id}`;
      }
    });
    userList.appendChild(tr);
  });
}

searchInput.addEventListener('input', (e) => {
  const q = e.target.value;
  const filtered = users.filter(u => u.name.includes(q) || u.id.includes(q));
  renderUsers(filtered);
});

addUserBtn.addEventListener('click', () => {
  window.location.href = '/user_edit/index.html?new=1';
});

renderUsers(users);
