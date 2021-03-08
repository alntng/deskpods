import React from "react";
import { SpotifyAuth, Scopes } from "react-spotify-auth";

export default function LandingPage() {
  return (
    <div class="min-h-screen  bg-gradient-to-b from-purple-900 via-gray-500 to-green-400 ... ">
      <div class="p-52">
        <h1 class="text-white text-9xl font-bold flex justify-center ... ">
          Spotify’s Desktop App doesn’t allow you to view your latest podcasts
          by episode, only show...
        </h1>
      </div>
      <br></br>
      <br></br>
      <div class="flex justify-center ... ">
        <SpotifyAuth
          class="min-h-500..."
          redirectUri="http://localhost:3000/callback/"
          clientID="1d54f201e7a04ba689f81a469340ea22"
          title="Login with Spotify"
          scopes={[
            Scopes.playlistModifyPublic,
            Scopes.playlistModifyPrivate,
            Scopes.userReadEmail,
            Scopes.userReadPrivate,
            Scopes.userLibraryRead,
            Scopes.userLibraryModify,
            Scopes.userModifyPlaybackState,
            Scopes.userFollowModify,
            Scopes.streaming,
            Scopes.userReadPlaybackState,
          ]}
        />
      </div>
    </div>
  );
}
