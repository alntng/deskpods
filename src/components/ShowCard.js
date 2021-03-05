import React from "react";

export default function ShowCard({ name, thumbnail }) {
  return (
    <div>
      <h1>{name}</h1>
      <img src={thumbnail.url} />
    </div>
  );
}
