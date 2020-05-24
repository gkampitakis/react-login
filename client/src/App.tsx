import React, { useMemo } from "react";
import configuration from "./configuration";
import { stringify } from "query-string";

function App() {
  const fbParams = useMemo(() => {
    return stringify({
      client_id: configuration.fb.clientId,
      redirect_uri: "http://localhost/api/auth/fb/callback",
      scope: ["email"].join(","),
      response_type: "code",
      auth_type: "rerequest",
    });
  }, []);

  return (
    <div className="App">
      <a
        href={`https://github.com/login/oauth/authorize?client_id=${configuration.gh.clientId}&scope=user:read,user:email`}
      >
        Test Github Login
      </a>
      <a href={`https://www.facebook.com/v4.0/dialog/oauth?${fbParams}`}>
        Test Facebook Login
      </a>
    </div>
  );
}

export default App;
