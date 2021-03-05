import React from "react";

export default function ShowCard({ name, thumbnail }) {
  return (
    <div class="flex-1...">
      <h1>{name}</h1>
      <img src={thumbnail.url} />
    </div>
  );
}
