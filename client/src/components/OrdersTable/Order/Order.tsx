import './Order.css';
import remove from '../../../assets/remove.png';
import EditIcon from '../../../assets/edit.png';

interface OrderProps {
  orderName: string;
  location: string;
  details: string;
  quantity: number;
  deleteItem: () => void;  // The delete function is passed as a prop
  updateItem: () => void;
}

const Order: React.FC<OrderProps> = (props) => {
  return (
    <tr>
      <td>{props.orderName}</td>
      <td>{props.location}</td>
      <td>{props.details}</td>
      <td>{props.quantity}</td>
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

export default Order;
