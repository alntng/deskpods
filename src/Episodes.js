import React, { useState } from "react";
const axios = require("axios");

export default function Episodes(props) {
  const token = props.token;
  const [subscribedPods, setSubscribedPods] = useState([]);

  const getSubscriptions = async () => {
    const pods = await axios.get(
      "https://api.spotify.com/v1/me/shows?limit=50",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(pods.data.items);
  };

  getSubscriptions();

  return (
    <div>
      <h1>TEST</h1>
      <p>{subscribedPods}</p>
    </div>
  );
}
