import React from "react";
import logo from "./logo.svg";
import axios from "axios";

function App() {
  return (
    <div className="App">
      <a
        className="button github-button"
        href={`https://github.com/login/oauth/authorize?client_id=${"163f2f2581d8325b42b4"}&scope=repo`}
      >
        Test Github Login
      </a>
    </div>
  );
}

export default App;
