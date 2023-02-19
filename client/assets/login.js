const loginForm = document.querySelector('form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const username = usernameInput.value;
  const password = passwordInput.value;
  
  fetch('assets/log.json')
    .then(response => response.json())
    .then(data => {
      const storedPassword = data[username];
      
      if (storedPassword === password) {
        window.location.href = 'main.html';
      } else {
        alert('Invalid username or password. Please try again.');
      }
    })
    .catch(error => console.error(error));
});
