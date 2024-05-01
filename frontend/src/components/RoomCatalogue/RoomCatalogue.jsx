import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { RoomBlock } from "../RoomBlock/RoomBlock";
import "./RoomCatalogue.css";

export const RoomCatalogue = () => {
  const [roomdata, setData] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const arrival = searchParams.get("arrival");
  const house_id = searchParams.get("house_id");

  useEffect(() => {
    fetch(`http://localhost:5000/rooms?house=${house_id}&arrival=${arrival}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) =>
        console.error("Error fetching room data:", error)
      );
  }, [house_id, arrival]);

  return (
    <div>
      <div className="rooms-grid">
        {roomdata.map((room, idx) => (
          <RoomBlock key={idx} data={room} arrival={arrival} />
        ))}
      </div>
    </div>
  );
};
