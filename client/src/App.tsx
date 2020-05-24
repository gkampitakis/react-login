import React from "react";
import configuration from "./configuration";

function App() {
  return (
    <div className="App">
      <a
        className="button github-button"
        href={`https://github.com/login/oauth/authorize?client_id=${configuration.gh.clientId}&scope=user:read,user:email`}
      >
        Test Github Login
      </a>
    </div>
  );
}

export default App;
