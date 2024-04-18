import React from 'react';
import './RoomBlock.css';

    export const RoomBlock = ({data}) => {
        console.log(data);
        return (
            <div className='main-container'>
                <div className='image'/>
                <div className='frame-1'>
                    <div className='frame-2'>
                        <div className='button-view-room'>
                            <span className='view-room'>Переглянути</span>
                        </div>
                        <div className='flex-row-f'>
                            <div className='frame-3'>
                                <span className='room-number'>Кімната {data[1]}</span>
                            </div>
                            <div className='group'>
                                <button className='floor-tag'>
                                    <div className='floor-content'>
                                        <span className='floor-number'>1 поверх</span>
                                    </div>
                                </button>
                                <button className='tag-4'>
                                    <div className='content-5'>
                                        <span className='balcony-exist'>Без балкону</span>
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
                            <span className='room-places'>{data[5]} місць</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }