const API_URL = 'https://todo-hu1y.onrender.com'; // Replace with your Render backend URL

async function loadTasks() {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/admin/tasks`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const tasks = await response.json();
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `
      <span>${task.title} - ${task.description || ''} (by ${task.email})</span>
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

async function loadUsers() {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/admin/users`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const users = await response.json();
  const userList = document.getElementById('user-list');
  userList.innerHTML = '';
  users.forEach(user => {
    const li = document.createElement('li');
    li.className = 'user-item';
    li.innerHTML = `<span>${user.email} ${user.is_admin ? '(Admin)' : ''}</span>`;
    userList.appendChild(li);
  });
}

async function deleteTask(id) {
  const token = localStorage.getItem('token');
  await fetch(`${API_URL}/admin/tasks/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  loadTasks();
}

function logout() {
  localStorage.removeItem('token');
  window.location.href = 'index.html';
}

loadTasks();
loadUsers();
