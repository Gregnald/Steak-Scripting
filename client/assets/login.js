let users = [
  {username: "user1", password: "pass1"},
  {username: "user2", password: "pass2"},
  {username: "user3", password: "pass3"}
];

function login() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  for (let i = 0; i < users.length; i++) {
    if (username === users[i].username && password === users[i].password) {
      console.log("Login successful!");
      window.location.href = "main.html";
      return;
    }
  }

  console.log("Login failed. Please check your username and password.");
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