import React from "react";
import screenshot from "./assets/new-playlist-screenshot.png";
import redCircle from "./assets/red-circle.gif";

export default function Success() {
  return (
    <div>
      <h1 class="p-20 text-white text-7xl font-bold flex justify-center text-center ... ">
        Go ahead and check your spotify playlists!
      </h1>

      <div class="flex justify-center relative">
        <img
          class="absolute top-5  rounded-lg shadow-2xl flex justify-center"
          src={screenshot}
        />
        <img
          class="absolute  flex justify-center max-w-1/2
          "
          src={redCircle}
        />
      </div>
    </div>
  );
}
