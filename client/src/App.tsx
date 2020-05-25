import React, { useMemo } from "react";
import configuration from "./configuration";
import { stringify } from "query-string";

function App() {
  const { twitter, fb, gh } = configuration;

  const fb_params = useMemo(() => {
    return stringify({
      client_id: configuration.fb.clientId,
      redirect_uri: fb.callback,
      scope: fb.scope,
      response_type: "code",
      auth_type: "rerequest",
    });
  }, []);

  return (
    <div className="App">
      <a href={gh.url()}>Test Github Login</a>
      <a href={fb.url(fb_params)}>Test Facebook Login</a>
      <a href={twitter.url}>Test Twitter Login</a>
    </div>
  );
}

export default App;
