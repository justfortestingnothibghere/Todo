const API_URL = 'https://your-backend.onrender.com/api'; // Replace with your Render backend URL

async function loadTasks() {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/tasks`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const tasks = await response.json();
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `
      <span>${task.title} - ${task.description || ''}</span>
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

document.getElementById('task-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('task-title').value;
  const description = document.getElementById('task-description').value;
  const token = localStorage.getItem('token');
  
  await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ title, description })
  });
  
  document.getElementById('task-form').reset();
  loadTasks();
});

async function deleteTask(id) {
  const token = localStorage.getItem('token');
  await fetch(`${API_URL}/tasks/${id}`, {
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
