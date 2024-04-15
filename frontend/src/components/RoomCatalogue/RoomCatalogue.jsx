import {RoomBlock} from "../RoomBlock/RoomBlock";
import './RoomCatalogue.css';
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

export const RoomCatalogue = ({}) => {
    const [roomdata, setData] = useState([]);
    let { house } = useParams(); // Get houseId from URL
    console.log(house)
    console.log("hello from rooms")
    useEffect(() => {
        fetch(`http://localhost:5000/rooms?house=${house}`)
          .then((res) => {
            if (!res.ok) {
              throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
          })
          .then((roomdata) => {
            setData(roomdata);
            console.log(roomdata);
          })
          .catch((error) => {
            console.error("Fetch error:", error);
          });
    }, [house]); // Re-run effect when houseId changes

    return (
        <div>
            <div className="rooms-grid">
                {roomdata.map((room, idx) => (
                    <RoomBlock
                        key={idx}
                        data={room}
                    />
                ))}
            </div>
        </div>
    );
}
