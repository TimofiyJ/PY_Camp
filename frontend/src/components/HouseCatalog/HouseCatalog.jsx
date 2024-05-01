import { HouseBlock } from "../HouseBlock/HouseBlock";
import "./HouseCatalog.css";
import React, { useState, useEffect } from "react";
import { ArrivalDropdown } from '../Filters/ArrivalFilter';
import { useLocation } from "react-router-dom"; // Import useLocation hook


  
export const HouseCatalogue = () => {
    const [responseData, setResponseData] = useState(null);
    const location = useLocation(); // Initialize useLocation hook

    const handleClick = () => {
        fetch('http://localhost:5000/relocate')
          .then(response => response.json())
          .then(data => {
            // Update state with response data
            setResponseData(data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      };

    const [data, setData] = useState([{}]);
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const arrival = params.get('arrival');
        fetch(`http://localhost:5000/houses?arrival=${arrival}`)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                console.log(data);
            });
    }, [location.search]);

    return (
        <div className="houses-container">
            <div className="button-container">
                <button className="button-right-top" onClick={handleClick}>Поселити дітей</button>
                <ArrivalDropdown/>
            </div>

            <div className="houses-grid">
                {data.map((house, idx) => (
                    <HouseBlock key={idx} data={house}/>
                ))}
            </div>
        </div>
    );
};
