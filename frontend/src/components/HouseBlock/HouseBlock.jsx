import React from "react";
import "./HouseBlock.css";
import { Link } from "react-router-dom";

export const HouseBlock = ({ data, arrival}) => {
  return (
    <div className="main-container-house">
      {/*<div className='image-block'></div>*/}
      <img
        src={data.img}
        alt={data.id}
        style={{ width: "340px", height: "218px" }}
      />
      <div className="frame-house-info-house">
        <div className="frame-house-name-places-house">
          <div className="frame-house-name-house">
            <span className="trembita-house">{data.houseName}</span>
          </div>

          <hr className="hr-divider-house" />

          <div className="frame-house-places-house">
            <div className="frame-house-places-divider-house">
              <div className="user-house">
                <div className="icon-house" />
              </div>
              <span className="span-misc-house">{data.housePlaces} місць</span>
            </div>
          </div>
        </div>
        <hr className="hr-divider-house" />
        <Link key={data.id} to={`/rooms/${arrival}/${data.id}`}>
          <button className="button-frame-house">
            <div className="button-house">
              <span className="view-text-house">Переглянути</span>
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
};
