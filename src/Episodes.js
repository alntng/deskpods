import React, { useState } from "react";
const axios = require("axios");

export default function Episodes(props) {
  const token = props.token;
  const [subscribedPods, setSubscribedPods] = useState([]);

  const getSubscriptions = async () => {
    const res = await axios.get(
      "https://api.spotify.com/v1/me/shows?limit=50",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const podList = [];
    res.data.items.forEach((pod) => {
      let { name, id, uri, external_urls } = pod.show;
      //   console.log(pod);

      podList.push({
        name,
        id,
        uri,
        external_urls,
      });
    });

    console.log(podList);
  };

  getSubscriptions();

  return (
    <div>
      <h1>TEST</h1>
      <p>{subscribedPods}</p>
    </div>
  );
}
