import React from "react";
import { Link } from "react-router-dom";
import "./HouseBlock.css";
export const HouseBlock = ({ data }) => {
  return (
    <div className="main-container">
      {/* <div className='image-block'> */}
      <img
        src={data.img}
        alt={data.id}
        style={{ width: "340px", height: "218px" }}
      />
      {/* </div> */}
      <div className="frame-house-info">
        <div className="frame-house-name-places">
          <div className="frame-house-name">
            <span className="trembita">{data.houseName}</span>
          </div>

          <hr className="hr-divider" />

          <div className="frame-house-places">
            <div className="frame-house-places-divider">
              <div className="user">
                <div className="icon" />
              </div>
              <span className="span-misc">{data.housePlaces} місць</span>
            </div>
          </div>
        </div>

          <hr className="hr-divider" />
        <div className="button-frame">
            <Link to={`/rooms/${data.id}`}>
            <div className="button">
                <button className="view-text">Переглянути</button>
            </div>
            </Link>
        </div>
      </div>
    </div>
  );
};
