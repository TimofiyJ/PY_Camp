import {HouseBlock} from "../House Block/HouseBlock";
import './HouseCatalog.css';

export const Catalogue = ({data}) => {

    return (
        <div className="catalogue-container">
            <div className="houses-grid">
                {data.map((house, idx) => (
                    <HouseBlock
                        key={idx}
                        data={house}
                    />
                ))}
            </div>
        </div>
    );
}