import { useState } from "react";
import "./CreateItemDropdown.css";

const CreateItemDropdown = ({types, locations, onTypeIdUpdate, onLocationIdUpdate}) => {
  const [selectedType, setSelectedType] = useState({id: 0, name: "Select type"});
  const [selectedLocation, setSelectedLocation] = useState({id: 0, name: "Select location"});
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  return (
    <div className="dropdown-container">
      <div className="dropdown">
        <button type="button" className="dropdown-button" onClick={(e) => {
          e.preventDefault();
          setIsTypeOpen(!isTypeOpen)}
          }>
          {selectedType.name}
        </button>
        {isTypeOpen && (
          <ul className="dropdown-list">
            {types.map((type) => (
              <li
                key={type.item_id}
                className="dropdown-item"
                onClick={() => {
                  setSelectedType(type);
                  setIsTypeOpen(false);
                  onTypeIdUpdate(type.item_id); // to update hidden input
                }}
              >
                {type.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="dropdown">
        <button type="button" className="dropdown-button" onClick={(e) => {
          e.preventDefault();
          setIsLocationOpen(!isLocationOpen)}
          }>
          {selectedLocation.name}
        </button>
        {isLocationOpen && (
          <ul className="dropdown-list">
            {locations.map((location) => (
              <li
                key={location.location_id}
                className="dropdown-item"
                onClick={() => {
                  setSelectedLocation(location);
                  setIsLocationOpen(false);
                  onLocationIdUpdate(location.location_id); // to update hidden input
                }}
              >
                {location.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CreateItemDropdown;
