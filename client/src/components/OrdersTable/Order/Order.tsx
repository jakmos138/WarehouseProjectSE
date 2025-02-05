import './Order.css'
import remove from '../../../assets/remove.png'

interface OrderProps {
  orderName: string;
  availability: string;
  status: string;
  price: string | number;
  time: string;
}



const Order: React.FC<OrderProps> = (props) => {

    const availabilityClass = props.availability === 'In stock' ? 'status-in-stock' : 'status-out-stock';

  return (
    <tr>
      <td>{props.orderName}</td>
      <td className={availabilityClass}>{props.availability}</td>
      <td>{props.status}</td>
      <td>{props.price}</td>
      <td>{props.time}</td>
      <td><button className='delete-btn'><img src={remove} alt="" /></button></td>
    </tr>
  );
};

export default Order;
