import { HouseBlock } from "../HouseBlock/HouseBlock";
import "./HouseCatalog.css";
import React, { useState, useEffect, useRef } from "react";


export const HouseCatalogue = () => {
  const [data, setData] = useState([{}]);
  useEffect(() => {
    fetch("http://localhost:5000/houses?arrival=1")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, []);

  return (
    <div>
      <div className="houses-grid">
        {data.map((house, idx) => (
          <HouseBlock key={idx} data={house} />
        ))}
      </div>
    </div>
  );
};
