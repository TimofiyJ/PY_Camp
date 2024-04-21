import React, { useState, useEffect, useRef } from "react";
import { HouseBlock } from "../HouseBlock/HouseBlock";
import "./HouseCatalog.css";

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

    // Функція, яка буде викликатися при кліці на кнопку
    const handleButtonClick = () => {
        // Ваш код для обробки кліку на кнопку тут
        console.log("Кнопка була натиснута");
    };

    return (
        <div>
            {/* Кнопка у правому верхньому кутку */}
            <button className="button-right-top" onClick={handleButtonClick}>
                Натисни мене
            </button>

            <div className="houses-grid">
                {data.map((house, idx) => (
                    <HouseBlock key={idx} data={house} />
                ))}
            </div>
        </div>
    );
};
