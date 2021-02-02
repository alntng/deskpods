import { SpotifyAuth, Scopes } from "react-spotify-auth";
import { SpotifyApiContext } from "react-spotify-api";
import "react-spotify-auth/dist/index.css";
import Cookies from "js-cookie";

import Episodes from "./Episodes";

function App() {
  const token = Cookies.get("spotifyAuthToken");
  console.log("Spotify OAuth", token);
  return (
    // <SpotifyAuth
    //   redirectUri="http://localhost:3000/callback"
    //   clientID="your client id from spotify here"
    //   scopes={[Scopes.userReadPrivate, Scopes.userReadEmail]}
    // />
    <div className="app">
      {token ? (
        <SpotifyApiContext.Provider value={token}>
          <Episodes token={token} />
        </SpotifyApiContext.Provider>
      ) : (
        // Display the login page
        <SpotifyAuth
          redirectUri="http://localhost:3000/callback/"
          clientID="1d54f201e7a04ba689f81a469340ea22"
          scopes={[
            Scopes.userReadPrivate,
            Scopes.userReadEmail,
            Scopes.userLibraryRead,
            Scopes.userReadPlaybackPosition,
          ]}
        />
      )}
    </div>
  );
}

export default App;
