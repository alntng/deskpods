import React from "react";

export default function ShowCard({ name, thumbnail }) {
  return (
    <div class="sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-3">
      <h1 class="break-words  mx-auto">{name}</h1>
      <img class="mx-auto" src={thumbnail.url} />
    </div>
  );
}
