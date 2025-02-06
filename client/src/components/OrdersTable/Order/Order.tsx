import './Order.css';
import remove from '../../../assets/remove.png';
import EditIcon from '../../../assets/edit.png';

interface OrderProps {
  orderName: string;
  description: string;
  price: string | number;
  location: string;
  deleteItem: () => void;  // The delete function is passed as a prop
}

const Order: React.FC<OrderProps> = (props) => {
  return (
    <tr>
      <td>{props.orderName}</td>
      <td>{props.description}</td>
      <td>{props.location}</td>
      <td>{props.price}</td>
      <td>
        <button className='delete-btn' onClick={props.deleteItem}>
          <img src={remove} alt="Delete" />
        </button>
      </td>
      <td>
        <button className='update-btn' onClick={props.updateItem}>
          <img src={EditIcon} alt="" />
        </button>
      </td>
    </tr>
  );
};

export default Order;
