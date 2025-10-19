const API_URL = 'https://todo-hu1y.onrender.com'; // Replace with your Render backend URL

document.getElementById('auth').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const isSignup = document.getElementById('form-title').textContent === 'Signup';
  
  try {
    const response = await fetch(`${API_URL}/${isSignup ? 'signup' : 'login'}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    
    if (data.error) {
      document.getElementById('error').textContent = data.error;
      return;
    }
    
    localStorage.setItem('token', data.token);
    window.location.href = data.is_admin ? 'admin.html' : 'dashboard.html';
  } catch (err) {
    document.getElementById('error').textContent = 'Something went wrong';
  }
});

document.getElementById('toggle-form').addEventListener('click', (e) => {
  e.preventDefault();
  const isSignup = document.getElementById('form-title').textContent === 'Signup';
  document.getElementById('form-title').textContent = isSignup ? 'Login' : 'Signup';
  document.getElementById('auth').querySelector('button').textContent = isSignup ? 'Login' : 'Signup';
  document.getElementById('toggle-form').textContent = isSignup ? 'New user? Signup' : 'Already have an account? Login';
});
