import axios from 'axios';

const serverUrl = 'http://localhost:2000/';

function authHeader() {
  const token = JSON.parse(localStorage.getItem('token'));

  if (token) return { 'Authorization': 'Bearer ' + token };
  else return {};
}

const Login = (email, pass) => {
  const headers = {
    'Content-Type': 'application/json'
  };
  return new Promise((resolve, reject) => {
    axios
      .post(
        serverUrl + 'auth',
        {
          password: pass,
          email
        },
        headers
      )
      .then(data => {
        persist(data.data.token);
        resolve();
      })
      .catch(err => reject(err));
  });
};

const GetUser = () => {
  const headers = {
    ...authHeader()
  };

  return axios.get(serverUrl + 'users', { headers: headers });
};

const IsAuthenticated = () => {
  const token = localStorage.getItem('token');
  return token;
};

const persist = token => {
  localStorage.setItem('token', JSON.stringify(token));
};

const Logout = () => {
  localStorage.removeItem('token');
};

const createAccount = (name, email, image, password) => {
  return axios.post(serverUrl + 'users', {
    name,
    email,
    image,
    password
  });
};

export { Login, Logout, IsAuthenticated, GetUser, createAccount };
