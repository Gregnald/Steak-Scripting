const users = {
  user1: 'password1',
  user2: 'password2',
  user3: 'password3'
};

function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username in users && users[username] === password) {
    window.location.href = 'index.html';
  } else {
    alert('Invalid username or password');
  }
}




/*const loginForm = document.querySelector('form');
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
        window.location.href = 'assets/main.html';
      } else {
        alert('Invalid username or password. Please try again.');
      }
    })
    .catch(error => console.error(error));
});
*/