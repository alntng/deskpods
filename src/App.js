import { SpotifyAuth, Scopes } from "react-spotify-auth";
import { SpotifyApiContext } from "react-spotify-api";
import "react-spotify-auth/dist/index.css";
import SpotifyPlayer from "react-spotify-web-playback";
import Cookies from "js-cookie";

import Episodes from "./Episodes";

function App() {
  // const [global, setGlobal] = useState({})
  const token = Cookies.get("spotifyAuthToken");
  const domWindow = window;
  console.log("Spotify Auth", token);
  console.log("window Object", domWindow);
  console.log("Spotify in the window??", domWindow.Spotify);
  return (
    <div className="app">
      {token ? (
        <div>
          <SpotifyPlayer
            token={token}
            uris={["spotify:artist:6HQYnRM4OzToCYPpVBInuU"]}
          />
          <SpotifyApiContext.Provider value={token}>
            <Episodes token={token} />
          </SpotifyApiContext.Provider>
        </div>
      ) : (
        // Display the login page
        <SpotifyAuth
          redirectUri="http://localhost:3000/callback/"
          clientID="1d54f201e7a04ba689f81a469340ea22"
          scopes={[
            Scopes.streaming,
            Scopes.userReadEmail,
            Scopes.userReadPrivate,
            Scopes.userLibraryRead,
            Scopes.userLibraryModify,
            Scopes.userModifyPlaybackState,
            Scopes.userFollowModify,
            Scopes.userReadPlaybackState,
          ]}
        />
      )}
    </div>
  );
}

export default App;
