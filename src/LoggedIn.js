import React, { useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { SpotifyApiContext } from "react-spotify-api";

import Episodes from "./components/Episodes";
import EpisodeModal from "./components/EpisodeModal";
import ShowCard from "./components/ShowCard";

export default function LoggedIn({ token }) {
  const [subscribedPods, setSubscribedPods] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const createPlaylist = () => {
    console.log(subscribedPods);
  };
  console.log(subscribedPods);
  return (
    <div>
      <SpotifyApiContext.Provider value={token}>
        <button
          class="bg-gradient-to-r from-green-400 to-green-500 ... hover:bg-green-100 text-white font-bold py-2 px-4 rounded-full"
          onClick={(e) => openModal(e)}
        >
          Create Playlists
        </button>
        <EpisodeModal show={showModal} handleClose={closeModal}>
          <h1>MODAL</h1>
        </EpisodeModal>
        <h1>Any shows you want to exlude from your most recent?</h1>
        <div class="flex flex-wrap justify-center">
          {subscribedPods.map((show) => {
            return <ShowCard name={show.name} thumbnail={show.images[2]} />;
          })}
        </div>
        <Episodes
          subscribedPods={subscribedPods}
          setSubscribedPods={setSubscribedPods}
          token={token}
        />
      </SpotifyApiContext.Provider>
    </div>
  );
}
