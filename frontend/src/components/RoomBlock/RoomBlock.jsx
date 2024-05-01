import React from 'react';
import './RoomBlock.css';
import { Link } from "react-router-dom";

export const RoomBlock = ({ data, arrival }) => {
    console.log(data);
    console.log(arrival);

    const { balcony, bedAmount, floor, houseId, id, number } = data;

    return (
        <div className='main-container'>
            <div className='image'/>
            <div className='frame-1'>
                <div className='frame-2'>
                    <div className='button-view-room'>
                        <button>
                        <Link key={data.id} to={`/rooms/${arrival}/${data.houseId}/${data.id}`}>

                        <span className='view-room'>Переглянути</span>
                        </Link>

                        </button>
                    </div>
                    <div className='flex-row-f'>
                        <div className='frame-3'>
                            <span className='room-number'>Кімната {number}</span>
                        </div>
                        <div className='group'>
                            <button className='floor-tag'>
                                <div className='floor-content'>
                                    <span className='floor-number'>{floor} поверх</span>
                                </div>
                            </button>
                            <button className='tag-4'>
                                <div className='content-5'>
                                    <span className='balcony-exist'>{balcony ? 'З балконом' : 'Без балкону'}</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='frame-6'>
                    <div className='frame-7'>
                        <div className='user'>
                            <div className='icon'/>
                        </div>
                        <span className='room-places'>{bedAmount} місць</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
