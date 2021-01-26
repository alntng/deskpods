import { SpotifyAuth, Scopes } from "react-spotify-auth";
import "react-spotify-auth/dist/index.css";

function App() {
  return (
    <SpotifyAuth
      redirectUri="http://localhost.com:8888/callback/"
      clientID="1d54f201e7a04ba689f81a469340ea22"
      scopes={[Scopes.userReadPrivate, Scopes.userReadEmail]}
    />
  );
}

export default App;
