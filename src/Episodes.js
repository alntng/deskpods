import React, { useState } from "react";
const axios = require("axios");

export default function Episodes(props) {
  const token = props.token;
  const [subscribedPods, setSubscribedPods] = useState([]);

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

    // console.log("episode list", res);
    // res.data.items.forEach((episode) => {
    //   episodes.push(episode);
    // });

    return res.data.items;
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
    console.log(flatList);
  };

  getSubscriptions();

  return (
    <div>
      <h1> Latest Podcast Episdoes</h1>
      {subscribedPods.map((pod) => {
        return <p>{pod.name}</p>;
      })}
    </div>
  );
}
