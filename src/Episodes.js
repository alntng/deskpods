import React, { useState, useEffect } from "react";
const axios = require("axios");

export default function Episodes(props) {
  const token = props.token;
  console.log(token);
  const [subscribedPods, setSubscribedPods] = useState([]);
  const [userId, setUserId] = useState("");

  //grab userId
  const userHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const grabUser = async () => {
    const foundUser = await axios.get(
      "https://api.spotify.com/v1/me",
      userHeader
    );
    // console.log("SPOTIFY USER", foundUser.data.id);

    return foundUser.data;
  };

  //grab users'podcasts
  const axiosHeader = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
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

  const createPlaylist = async (user_id) => {
    const metaData = {
      name: "New Pods",
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

  const addToPlaylist = async (playlist_id) => {
    const episodesAdded = {
      uris: "spotify%3Aepisode%3A4cPEJLaOuG7de0Ei860yZj",
    };
    await axios.post(
      `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?uris=spotify%3Aepisode%3A4cPEJLaOuG7de0Ei860yZj`,
      {},
      axiosHeader
    );

    console.log("added new episodes to playlist");
  };

  const getSubscriptions = async () => {
    const res = await axios.get(
      "https://api.spotify.com/v1/me/shows?limit=50",
      axiosHeader
    );

    const podList = [];
    const episodes = [];

    res.data.items.forEach(async (pod) => {
      let { name, id, uri, external_urls } = pod.show;

      podList.push({
        name,
        id,
        uri,
        external_urls,
      });
    });

    console.log(podList);

    let allEpisodes = [];

    for (const pod of podList) {
      let currList = grabLatest(pod);
      allEpisodes = [...allEpisodes, grabLatest(pod)];
    }

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

    setSubscribedPods(flatList);

    const currUser = await grabUser();
    setUserId(currUser.id);

    const newPlaylist = await createPlaylist(currUser.id);

    addToPlaylist(newPlaylist.id);
    console.log(newPlaylist.id);
    console.log(flatList);
  };

  useEffect(getSubscriptions, []);

  console.log(userId, subscribedPods.length);

  return (
    <div>
      <h1> Latest Podcast Episdoes</h1>
      <h5>{userId}</h5>
      {subscribedPods.map((pod) => {
        return (
          <div>
            <p>{pod.name}</p>
            <img src={pod.images[2].url} />
          </div>
        );
      })}
    </div>
  );
}
