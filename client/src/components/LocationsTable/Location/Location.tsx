import './Location.css';
import remove from '../../../assets/remove.png';
import EditIcon from '../../../assets/edit.png';

interface LocationProps {
  name: string;
  description: string;
  deleteItem: () => void;  // The delete function is passed as a prop
  updateItem: () => void;
}

const Location: React.FC<LocationProps> = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.description}</td>
      <td>
        <button className='delete-btn' onClick={props.deleteItem}>
          <img src={remove} alt="Delete" />
        </button>
      </td>
      <td>
        <button className='update-btn' onClick={props.updateItem}>
          <img src={EditIcon} alt="Update" />
        </button>
      </td>
    </tr>
  );
};

export default Location;
