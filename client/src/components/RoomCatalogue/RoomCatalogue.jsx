import {RoomBlock} from "../RoomBlock/RoomBlock";
import './RoomCatalogue.css';

export const Catalogue = ({data}) => {

    return (
        <div>
            <div className="rooms-grid">
                {data.map((room, idx) => (
                    <RoomBlock
                        key={idx}
                        data={room}
                    />
                ))}
            </div>
        </div>
    );
}