import axios from 'axios';

function authHeader() {
  const { token } = JSON.parse(localStorage.getItem('token'));
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
        'http://localhost:2000/auth',
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
  return axios.get('http://localhost:2000/users');
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

const createAccount = () => {};

export { Login, Logout, IsAuthenticated, GetUser, createAccount };
