import { HouseBlock } from "../HouseBlock/HouseBlock";
import "./HouseCatalog.css";
import React, { useState, useEffect } from "react";
import { ArrivalDropdown } from '../Filters/ArrivalFilter';


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
        <div className="houses-container">
            <div className="button-container">
                <button className="button-right-top">Поселити дітей</button>
                <ArrivalDropdown />
            </div>

            <div className="houses-grid">
                {data.map((house, idx) => (
                    <HouseBlock key={idx} data={house}/>
                ))}
            </div>
        </div>
    );
};
