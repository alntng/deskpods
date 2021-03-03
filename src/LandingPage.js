import React from "react";
import { SpotifyAuth, Scopes } from "react-spotify-auth";
export default function LandingPage() {
  return (
    <div class="flex justify-center ...">
      <div class="w-96">
        <h1 class="text-xl">Listen to your favorite pods now </h1>
        <SpotifyAuth
          redirectUri="http://localhost:3000/callback/"
          clientID="1d54f201e7a04ba689f81a469340ea22"
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
