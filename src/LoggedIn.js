import React, { useState, useEffect } from "react";
import { SpotifyApiContext } from "react-spotify-api";
import ShowCard from "./components/ShowCard";

const axios = require("axios");

export default function LoggedIn({ history, token }) {
  const [subscribedPods, setSubscribedPods] = useState([]);
  // const [showModal, setShowModal] = useState(false);
  const [selectShows, setSelectShows] = useState([]);
  const [userId, setUserId] = useState("");

  console.log("browser history", history);

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
      name: `Pods for ${today}`,
      description: "Latest podcasts from your subscriptions",
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

  const grabLatest = async (pod) => {
    const { id } = pod;
    const episodes = [];
    const res = await axios.get(
      `https://api.spotify.com/v1/shows/${id}/episodes?limit=5`,
      axiosHeader
    );
    console.log(res);
    return res.data.items;
  };

  const addToPlaylist = async (playlist_id, episodes) => {
    const convertURI = (uri) => {
      return uri.split(":").join("%3A");
    };

    let episodesAdded = [];
    for (let i = 0; i < 50; i++) {
      const currEp = convertURI(episodes[i].uri);

      episodesAdded.push(currEp);
    }
    episodesAdded = episodesAdded.join("%2C");

    await axios.post(
      `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?uris=${episodesAdded}`,
      {},
      axiosHeader
    );

    console.log("added new episodes to playlist");
  };

  const createUpdated = async () => {
    const keptPods = subscribedPods.filter((show) => {
      return !selectShows.includes(show.id);
    });

    let allEpisodes = [];

    keptPods.map((show) => {
      allEpisodes.push(grabLatest(show));
    });

    allEpisodes = await Promise.all(allEpisodes);

    let flatList = [];
    allEpisodes.forEach((list) => {
      list.forEach((episode) => {
        flatList.push(episode);
      });
    });
    flatList.sort(
      (a, b) => Date.parse(b.release_date) - Date.parse(a.release_date)
    );

    const newPlaylist = await createPlaylist(userId);
    addToPlaylist(newPlaylist.id, flatList);

    history.push("/success");
    // console.log(flatList);
    // console.log(keptPods.length, keptPods);
  };

  useEffect(getSubscriptions, []);

  // const openModal = () => setShowModal(true);
  // const closeModal = () => setShowModal(false);

  console.log(subscribedPods);
  console.log("Selected", selectShows);
  return (
    <div class="min-h-screen  bg-gradient-to-b from-purple-900 via-gray-500 to-green-400 ... ">
      <SpotifyApiContext.Provider value={token}>
        <h1 class="p-20 text-white text-7xl font-bold flex justify-center ... ">
          Any shows you want to exlude?
        </h1>
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
        <div class="p-20 flex justify-center">
          <button
            class="animate-bounce h-25 px-15 m-2 bg-gradient-to-r from-green-400 to-green-500 ... hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full "
            onClick={createUpdated}
          >
            + Create Playlist
          </button>
        </div>
      </SpotifyApiContext.Provider>
    </div>
  );
}
