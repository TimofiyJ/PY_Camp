import React from 'react';
import './HouseBlock.css';
export const HouseBlock = ({data}) => {
    return (
        <div className='main-container'>
            {/*<div className='image-block'></div>*/}
            <img src={data.img} alt={data.id} style={{width: "340px", height: "218px"}}/>
            <div className='frame-house-info'>

                <div className='frame-house-name-places'>
                    <div className='frame-house-name'>
                        <span className='trembita'>{data.houseName}</span>
                    </div>

                    <hr className="hr-divider"/>

                    <div className='frame-house-places'>
                        <div className='frame-house-places-divider'>
                            <div className='user'>
                                <div className='icon'/>
                            </div>
                            <span className='span-misc'>{data.housePlaces} місць</span>
                        </div>
                    </div>
                </div>
                <hr className="hr-divider"/>
                <button className='button-frame'>
                    <div className='button'>
                        <span className='view-text'>Переглянути</span>
                    </div>
                </button>
            </div>
        </div>
    );
}
