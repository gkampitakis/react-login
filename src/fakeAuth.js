const Users = [
  {
    id: 1,
    name: 'George',
    surname: 'Kampitakis',
    imgUrl:
      'https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/67667712_10214749629079255_6092603914752884736_n.jpg?_nc_cat=107&_nc_oc=AQm8O0xn6fFlPg3A9m2gQkTF3OdIYHvxEAdbdQEH66GcqG5TTD8njIGnFaKojRvazGI&_nc_ht=scontent-lhr3-1.xx&oh=1ecf27dc291e23061397386b2aab0f49&oe=5E358695',
    age: 25,
    email: 'admin@mail.com',
    pass: 12345,
    role: 'admin'
  },
  {
    id: 2,
    name: 'George',
    surname: 'Papadopoulos2',
    imgUrl:
      'https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/61076011_10214357548477485_3627020716634800128_n.jpg?_nc_cat=107&_nc_oc=AQlOtVUm-q-TUwJN03YVDCJoW5g1cnwYHAZSSsUlrD-GpnkqonChg9s9QL_DIIkjI9Y&_nc_ht=scontent-lhr3-1.xx&oh=e59e28b532d50ad6be8743478422b01d&oe=5E29DEE1',
    age: 35,
    email: 'user2@mail.com',
    pass: 12345,
    role: 'user'
  },
  {
    id: 3,
    name: 'George',
    surname: 'Papadopoulos3',
    imgUrl:
      'https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/61076011_10214357548477485_3627020716634800128_n.jpg?_nc_cat=107&_nc_oc=AQlOtVUm-q-TUwJN03YVDCJoW5g1cnwYHAZSSsUlrD-GpnkqonChg9s9QL_DIIkjI9Y&_nc_ht=scontent-lhr3-1.xx&oh=e59e28b532d50ad6be8743478422b01d&oe=5E29DEE1',
    age: 35,
    email: 'user3@mail.com',
    pass: 12345,
    role: 'user'
  },
  {
    id: 4,
    name: 'George',
    surname: 'Papadopoulos4',
    imgUrl:
      'https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/61076011_10214357548477485_3627020716634800128_n.jpg?_nc_cat=107&_nc_oc=AQlOtVUm-q-TUwJN03YVDCJoW5g1cnwYHAZSSsUlrD-GpnkqonChg9s9QL_DIIkjI9Y&_nc_ht=scontent-lhr3-1.xx&oh=e59e28b532d50ad6be8743478422b01d&oe=5E29DEE1',
    age: 35,
    email: 'user4@mail.com',
    pass: 12345,
    role: 'user'
  },
  {
    id: 5,
    name: 'George',
    surname: 'Papadopoulos5',
    imgUrl:
      'https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/61076011_10214357548477485_3627020716634800128_n.jpg?_nc_cat=107&_nc_oc=AQlOtVUm-q-TUwJN03YVDCJoW5g1cnwYHAZSSsUlrD-GpnkqonChg9s9QL_DIIkjI9Y&_nc_ht=scontent-lhr3-1.xx&oh=e59e28b532d50ad6be8743478422b01d&oe=5E29DEE1',
    age: 35,
    email: 'user5@mail.com',
    pass: 12345,
    role: 'user'
  }
];

const Login = (email, pass) => {
  const request = fn => setTimeout(() => fn, 5000);

  return new Promise((resolve, reject) => {
    const user = Users.find(user => user.email === email);
    if (!user) request(reject('User not found'));
    else {
      if (user.pass === pass) {
        persist(user);
        request(resolve());
      } else request(reject('Wrong password provided'));
    }
  });
};

const GetUser = userId => {
  const request = cb => setTimeout(cb, 2000);

  return new Promise((resolve, reject) => {
    const id = localStorage.getItem('user');
    const requestedUser = Users.find(user => user.id === userId);
    if (id === userId) request(resolve(requestedUser));

    const registeredUser = Users.find(user => user.id === userId);

    if (registeredUser.role === 'admin') request(resolve(requestedUser));
    else request(reject('Unauthorized Action'));
  });
};

const IsAuthenticated = () => {
  const userId = localStorage.getItem('user');
  return userId;
};

const persist = user => {
  localStorage.setItem('user', user.id);
};

const Logout = () => {
  return new Promise((resolve, rejec) => {
    setTimeout(() => {
      localStorage.removeItem('user');
      resolve();
    }, 2000);
  });
};

export { Login, Logout, IsAuthenticated, GetUser };
