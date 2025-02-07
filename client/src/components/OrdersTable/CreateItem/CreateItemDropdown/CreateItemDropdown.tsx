import { useState } from "react";
import "./CreateItemDropdown.css";

const CreateItemDropdown = () => {
  const [selectedType, setSelectedType] = useState("Choose a type");
  const [selectedLocation, setSelectedLocation] = useState("Choose a location");
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  const types = ["Type 1", "Type 2", "Type 3"];
  const locations = ["Location 1", "Location 2", "Location 3"];

  return (
    <div className="dropdown-container">
      <div className="dropdown">
        <button className="dropdown-button" onClick={() => setIsTypeOpen(!isTypeOpen)}>
          {selectedType}
        </button>
        {isTypeOpen && (
          <ul className="dropdown-list">
            {types.map((type) => (
              <li
                key={type}
                className="dropdown-item"
                onClick={() => {
                  setSelectedType(type);
                  setIsTypeOpen(false);
                }}
              >
                {type}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="dropdown">
        <button className="dropdown-button" onClick={() => setIsLocationOpen(!isLocationOpen)}>
          {selectedLocation}
        </button>
        {isLocationOpen && (
          <ul className="dropdown-list">
            {locations.map((location) => (
              <li
                key={location}
                className="dropdown-item"
                onClick={() => {
                  setSelectedLocation(location);
                  setIsLocationOpen(false);
                }}
              >
                {location}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CreateItemDropdown;
