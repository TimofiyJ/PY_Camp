import {RoomBlock} from "../RoomBlock/RoomBlock";
import './RoomCatalogue.css';
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

export const RoomCatalogue = () => {
    const [roomdata, setData] = useState([]);
    const { arrival, house_id } = useParams();

    console.log(arrival)
    console.log(house_id)

    console.log("hello from rooms")
    useEffect(() => {
        fetch(`http://localhost:5000/rooms?house=${house_id}&arrival=${arrival}`)
        .then((res) => res.json())
        .then((data) => {
            setData(data);
            console.log(data);
        })
        .catch((error) => console.error('Error fetching room data:', error));
}, [house_id, arrival]);// Re-run effect when houseId changes

    return (
        <div>
            <div className="rooms-grid">
                {roomdata.map((room, idx) => (
                    <RoomBlock
                        key={idx}
                        data={room}
                        arrival={arrival}
                    />
                ))}
            </div>
        </div>
    );
}
