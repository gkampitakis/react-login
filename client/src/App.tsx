import React, { useMemo } from "react";
import configuration from "./configuration";
import { stringify } from "query-string";

function App() {
  const { twitter, fb, gh, google } = configuration;

  const fb_params = useMemo(() => {
    return stringify({
      client_id: configuration.fb.client_id,
      redirect_uri: fb.callback,
      scope: fb.scope,
      response_type: "code",
      auth_type: "rerequest",
    });
  }, []);

  const google_params = useMemo(() => {
    return stringify({
      client_id: configuration.google.client_id,
      redirect_uri: google.callback,
      scope: google.scope,
      response_type: "code",
      access_type: "offline",
      prompt: "consent",
    });
  }, []);

  return (
    <div className="App">
      <a href={gh.url()}>Test Github Login</a>
      <a href={fb.url(fb_params)}>Test Facebook Login</a>
      <a href={twitter.url}>Test Twitter Login</a>
      <a href={google.url(google_params)}>Test Google Login</a>
    </div>
  );
}

export default App;
