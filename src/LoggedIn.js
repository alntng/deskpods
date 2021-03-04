import React, { useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { SpotifyApiContext } from "react-spotify-api";

import Episodes from "./Episodes";

export default function LoggedIn(props) {
  const { token } = props;
  const [subscribedPods, setSubscribedPods] = useState([]);

  return (
    <div>
      <SpotifyApiContext.Provider value={token}>
        <button class="bg-gradient-to-r from-green-400 to-green-500 ... hover:bg-green-100 text-white font-bold py-2 px-4 rounded-full">
          Create Playlists
        </button>
        <Episodes
          subscribedPods={subscribedPods}
          setSubscribedPods={setSubscribedPods}
          token={token}
        />
      </SpotifyApiContext.Provider>
    </div>
  );
}
