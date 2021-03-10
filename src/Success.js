import React from "react";
import screenshot from "./assets/new-playlist-screenshot.png";
import redCircle from "./assets/red-circle.gif";

export default function Success() {
  return (
    <div>
      <h1 class="p-20 text-white text-7xl font-bold flex justify-center text-center ... ">
        Go ahead and check your spotify playlists!
      </h1>
      <div class="">
        <div class="relative flex justify-center">
          <img
            class="absolute top-9 left-0  rounded-lg shadow-2xl  object-none object-center"
            src={screenshot}
          />
          <img class="max-w-1/2  absolute top-0 left-0" src={redCircle} />
        </div>
      </div>
    </div>
  );
}
