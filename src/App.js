import { SpotifyAuth, Scopes } from "react-spotify-auth";
import { SpotifyApiContext } from "react-spotify-api";
import "react-spotify-auth/dist/index.css";
import SpotifyPlayer from "react-spotify-web-playback";
import Cookies from "js-cookie";

import Episodes from "./Episodes";
import LandingPage from "./LandingPage";
import LoggedIn from "./LoggedIn";

function App() {
  const token = Cookies.get("spotifyAuthToken");

  return (
    <div className="app">
      {token ? (
        <LoggedIn token={token} />
      ) : (
        // Display the login page
        <LandingPage />
      )}
    </div>
  );
}

export default App;
