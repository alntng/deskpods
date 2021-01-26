import { SpotifyAuth, Scopes } from "react-spotify-auth";
import { SpotifyApiContext } from "react-spotify-api";
import "react-spotify-auth/dist/index.css";
import Cookies from "js-cookie";

function App() {
  const token = Cookies.get("spotifyAuthToken");
  return (
    // <SpotifyAuth
    //   redirectUri="http://localhost:3000/callback"
    //   clientID="your client id from spotify here"
    //   scopes={[Scopes.userReadPrivate, Scopes.userReadEmail]}
    // />
    <div className="app">
      {token ? (
        <SpotifyApiContext.Provider value={token}>
          {/* Your Spotify Code here */}
          <p>You are authorized with token: {token}</p>
        </SpotifyApiContext.Provider>
      ) : (
        // Display the login page
        <SpotifyAuth
          redirectUri="http://localhost:3000/callback/"
          clientID="1d54f201e7a04ba689f81a469340ea22"
          scopes={[Scopes.userReadPrivate, Scopes.userReadEmail]}
        />
      )}
    </div>
  );
}

export default App;
