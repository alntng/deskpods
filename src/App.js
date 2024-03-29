import { SpotifyAuth, Scopes } from "react-spotify-auth";
import { SpotifyApiContext } from "react-spotify-api";
import "react-spotify-auth/dist/index.css";
import SpotifyPlayer from "react-spotify-web-playback";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
// import Routes from "./routes";

import LandingPage from "./LandingPage";
import LoggedIn from "./LoggedIn";

function App() {
  const history = useHistory();
  const token = Cookies.get("spotifyAuthToken");
  console.log("Is there a token???", token);
  // console.log("app history", history);

  return (
    <div
      className="app"
      class="--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(0, 0, 0, 0));"
    >
      {token ? (
        <SpotifyApiContext.Provider value={token}>
          <LoggedIn history={history} token={token} />
        </SpotifyApiContext.Provider>
      ) : (
        // Display the login page
        <LandingPage />
      )}
    </div>
  );
}

export default App;
