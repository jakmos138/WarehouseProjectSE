import { useState } from "react";
import "./EditItemDropdown.css";

const EditItemDropdown = ({locations, initialLocation, onLocationIdUpdate}) => {
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  return (
    <div className="dropdown-container">
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

export default EditItemDropdown;
