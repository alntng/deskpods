const axios = require("axios");

export const grabLatest = async (pod, headers) => {
  const { id } = pod;
  const episodes = [];
  const res = await axios.get(
    `https://api.spotify.com/v1/shows/${id}/episodes?limit=5`,
    headers
  );

  return res.data.items;
};

module.exports = { grabLatest };
