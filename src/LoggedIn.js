import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { SpotifyApiContext } from "react-spotify-api";

import Episodes from "./Episodes";

export default function LoggedIn(props) {
  const { token } = props;

  return (
    <div>
      <SpotifyPlayer
        token={token}
        uris={["spotify:playlist:2aD5lcpbnhN0PBs4XcdFyu"]}
      />
      <SpotifyApiContext.Provider value={token}>
        <Episodes token={token} />
      </SpotifyApiContext.Provider>
    </div>
  );
}
