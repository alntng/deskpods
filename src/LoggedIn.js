import React, { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { SpotifyApiContext } from "react-spotify-api";

import Episodes from "./components/Episodes";
import EpisodeModal from "./components/EpisodeModal";
import ShowCard from "./components/ShowCard";

const axios = require("axios");

export default function LoggedIn({ token }) {
  const [subscribedPods, setSubscribedPods] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectShows, setSelectShows] = useState([]);
  const [userId, setUserId] = useState("");

  const axiosHeader = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const userHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const grabUser = async () => {
    const foundUser = await axios.get(
      "https://api.spotify.com/v1/me",
      userHeader
    );
    return foundUser.data;
  };

  const getSubscriptions = async () => {
    const res = await axios.get(
      "https://api.spotify.com/v1/me/shows?limit=50",
      axiosHeader
    );

    const subscriptions = [];

    res.data.items.forEach(async (pod) => {
      subscriptions.push(pod.show);
    });

    console.log("users subscriptions", subscriptions);
    const currUser = await grabUser();
    setUserId(currUser.id);
    setSubscribedPods(subscriptions);
  };

  const createPlaylist = async (user_id) => {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;

    const metaData = {
      name: `Podcasts for ${today}`,
      description: "Latest Podcasts",
      public: false,
    };

    const newPlaylist = await axios.post(
      `https://api.spotify.com/v1/users/${user_id}/playlists`,
      metaData,
      axiosHeader
    );

    console.log(newPlaylist);
    return newPlaylist.data;
  };

  useEffect(getSubscriptions, []);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  console.log(subscribedPods);
  console.log("Selected", selectShows);
  return (
    <div>
      <SpotifyApiContext.Provider value={token}>
        <button
          class="bg-gradient-to-r from-green-400 to-green-500 ... hover:bg-green-100 text-white font-bold py-2 px-4 rounded-full"
          onClick={(userid) => createPlaylist(userId)}
        >
          Create Playlists
        </button>
        {/* <EpisodeModal show={showModal} handleClose={closeModal}>
          <h1>MODAL</h1>
        </EpisodeModal> */}
        <h1>Any shows you want to exlude from your most recent?</h1>
        <div class="flex flex-wrap">
          {subscribedPods.map((show) => {
            return (
              <ShowCard
                name={show.name}
                id={show.id}
                thumbnail={show.images[2]}
                setSelectShows={setSelectShows}
                selectShows={selectShows}
              />
            );
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
