import React, { useEffect } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './containers/Login/Login';
import Home from './containers/Home/Home';
import * as Authenticate from './fakeAuth';

function App() {
  let routes = [];

  const test = () => {
    console.log('test');
  };

  const id = Authenticate.IsAuthenticated();
  if (id) {
    routes.push(<Route key="1" path="/home/:id" exact component={Home} />);
    routes.push(<Route key="2" component={Home} />);
  } else {
    routes.push(
      <Route
        key="1"
        path="/login"
        exact
        render={() => <Login login={Authenticate.Login} />}
      />
    );
    routes.push(
      <Route key="2" render={() => <Login login={Authenticate.Login} />} />
    );
  }

  return (
    <div className="App">
      <Switch>{routes.map(route => route)}</Switch>
    </div>
  );
}

export default App;
