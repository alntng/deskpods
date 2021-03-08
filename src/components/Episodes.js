// import { grabLatest } from "./utils";
import React, { useState, useEffect } from "react";
const axios = require("axios");

export default function Episodes(props) {
  const { subscribedPods, setSubscribedPods, token } = props;

  console.log(token);

  // const [userId, setUserId] = useState("");

  //grab userId
  const userHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // const grabUser = async () => {
  //   const foundUser = await axios.get(
  //     "https://api.spotify.com/v1/me",
  //     userHeader
  //   );
  //   return foundUser.data;
  // };

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
    console.log("new podcasts", episodesAdded);

    await axios.post(
      `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?uris=${episodesAdded}`,
      {},
      axiosHeader
    );

    console.log("added new episodes to playlist");
  };

  // const getSubscriptions = async () => {
  //   const res = await axios.get(
  //     "https://api.spotify.com/v1/me/shows?limit=50",
  //     axiosHeader
  //   );

  //   const subscriptions = [];

  //   res.data.items.forEach(async (pod) => {
  //     subscriptions.push(pod.show);
  //   });

  //   console.log("users subscriptions", subscriptions);
  //   const currUser = await grabUser();
  //   setUserId(currUser.id);
  //   setSubscribedPods(subscriptions);
  // };

  // let allEpisodes = [];

  // for (const pod of subscriptions) {
  //   let currList = grabLatest(pod, axiosHeader);
  //   allEpisodes = [...allEpisodes, grabLatest(pod)];
  // }

  // allEpisodes = await Promise.all(allEpisodes);

  // let flatList = [];
  // allEpisodes.forEach((list) => {
  //   list.forEach((episode) => {
  //     flatList.push(episode);
  //   });
  // });
  // flatList.sort(
  //   (a, b) => Date.parse(b.release_date) - Date.parse(a.release_date)
  // );

  // const newPlaylist = await createPlaylist(currUser.id);
  // addToPlaylist(newPlaylist.id, flatList);
  // console.log(newPlaylist.id);
  // console.log(flatList);

  // useEffect(getSubscriptions, []);

  // console.log(userId, subscribedPods.length);

  return (
    <div>
      <h1> Latest Podcast Episdoes</h1>

      {/* {subscribedPods.map((pod) => {
        return (
          <div>
            <p>{pod.name}</p>
            <img src={pod.images[2].url} />
          </div>
        );
      })} */}
    </div>
  );
}
