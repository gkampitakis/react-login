import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './containers/Login/Login';
import Home from './containers/Home/Home';
import Register from './containers/Register/Register';
import * as Authenticate from './authService';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [IsAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(Authenticate.IsAuthenticated());
  }, []);

  const logoutComp = () => {
    setAuthenticated(false);
    Authenticate.Logout();
  };

  return (
    <div className="App">
      {IsAuthenticated ? (
        <Switch>
          <Route
            key="1"
            render={() => <Home auth={logoutComp} />}
            path="/home"
            exact
          />
          <Route key="2" render={() => <Home auth={logoutComp} />} />
        </Switch>
      ) : (
        <Switch>
          <Route
            key="1"
            path="/login"
            exact
            render={() => (
              <Login login={Authenticate.Login} auth={setAuthenticated} />
            )}
          />
          <Route
            key="2"
            path="/register"
            exact
            render={() => (
              <Register createAccount={Authenticate.createAccount} />
            )}
          />
          <Route
            key="3"
            render={() => (
              <Login login={Authenticate.Login} auth={setAuthenticated} />
            )}
          />
        </Switch>
      )}
    </div>
  );
}

export default App;
