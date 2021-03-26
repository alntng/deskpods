import React, { useState, useEffect } from "react";
import { SpotifyApiContext } from "react-spotify-api";
import ShowCard from "./components/ShowCard";
import { withRouter, Route, Switch } from "react-router-dom";

import Success from "./Success";

const axios = require("axios");

export default function LoggedIn({ history, token }) {
  const [subscribedPods, setSubscribedPods] = useState([]);
  const [selectShows, setSelectShows] = useState([]);
  const [userId, setUserId] = useState("");
  const [totalEps, setTotalEps] = useState(0);

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

    return newPlaylist.data;
  };

  const grabLatest = async (pod) => {
    const { id } = pod;
    const episodes = [];
    const res = await axios.get(
      `https://api.spotify.com/v1/shows/${id}/episodes?limit=5`,
      axiosHeader
    );
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
  };

  useEffect(getSubscriptions, []);

  // console.log("Is threre a token?????", token);
  return (
    <div class="min-h-screen  bg-gradient-to-b from-purple-900 via-gray-500 to-green-400 ... ">
      <Switch>
        <Route path="/success" component={Success} />
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
          <div class="relative inline-block text-left">
            <div>
              <button
                type="button"
                class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                id="options-menu"
                aria-expanded="true"
                aria-haspopup="true"
              >
                Options
                <svg
                  class="-mr-1 ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <div
              class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div class="py-1" role="none">
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Account settings
                </a>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Support
                </a>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  License
                </a>
                <form method="POST" action="#" role="none">
                  <button
                    type="submit"
                    class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    Sign out
                  </button>
                </form>
              </div>
            </div>
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
      </Switch>
    </div>
  );
}
