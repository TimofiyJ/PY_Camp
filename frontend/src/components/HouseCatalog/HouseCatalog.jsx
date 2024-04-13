import { HouseBlock } from "../HouseBlock/HouseBlock";
import "./HouseCatalog.css";

export const Catalogue = ({ data }) => {
  return (
    <div>
      <div className="houses-grid">
        {data.map((house, idx) => (
          <HouseBlock key={idx} data={house} />
        ))}
      </div>
    </div>
  );
};
