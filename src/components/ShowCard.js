import { set } from "js-cookie";
import React from "react";

export default function ShowCard({
  selectShows,
  setSelectShows,
  id,
  name,
  thumbnail,
}) {
  const checkOff = (e) => {
    const { checked, name } = e.target;
    if (checked) {
      setSelectShows([...selectShows, name]);
    } else {
      setSelectShows(selectShows.filter((id) => id === name));
    }
  };

  return (
    <div class="sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 hover:bg-gray-300 p-3">
      <h1 class="break-words  mx-auto">{name}</h1>
      <img class="mx-auto" src={thumbnail.url} />
      <input name={id} class="mx-auto" type="checkbox" onChange={checkOff} />
    </div>
  );
}
