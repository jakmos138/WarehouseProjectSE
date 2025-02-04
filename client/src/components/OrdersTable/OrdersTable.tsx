import Order from './Order/Order'
import './OrdersTable.css'
import axios from 'axios'
import { useEffect, useState } from 'react'

const OrdersTable = () => {

    const [data, setData] = useState(null)

    useEffect(() => {
        axios.get('http://localhost:3000/api/products/')
        .then((response) => {
            setData(response.data)
        })
    }, [])

    console.log(data)

  return (
    <div className="orders-table">
        <table>
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>In stock availability</th>
                    <th>Delivery status</th>
                    <th>Price</th>
                    <th>Processing time</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <Order 
                    orderName = "Product"
                    availability = "In stock"
                    status = "To be delivered"
                    price = "15$"
                    time = "38 hours"/>

<Order 
                    orderName = "Product"
                    availability = "In stock"
                    status = "To be delivered"
                    price = "15$"
                    time = "38 hours"/>
                <Order 
                    orderName = "Product"
                    availability = "In stock"
                    status = "To be delivered"
                    price = "15$"
                    time = "38 hours"/>
                    <Order 
                    orderName = "Product"
                    availability = "In stock"
                    status = "To be delivered"
                    price = "15$"
                    time = "38 hours"/>
                    <Order 
                    orderName = "Product"
                    availability = "In stock"
                    status = "To be delivered"
                    price = "15$"
                    time = "38 hours"/>
                    <Order 
                    orderName = "Product"
                    availability = "In stock"
                    status = "To be delivered"
                    price = "15$"
                    time = "38 hours"/>
                    <Order 
                    orderName = "Product"
                    availability = "In stock"
                    status = "To be delivered"
                    price = "15$"
                    time = "38 hours"/>
                    <Order 
                    orderName = "Product"
                    availability = "In stock"
                    status = "To be delivered"
                    price = "15$"
                    time = "38 hours"/>
                    <Order 
                    orderName = "Product"
                    availability = "In stock"
                    status = "To be delivered"
                    price = "15$"
                    time = "38 hours"/><Order 
                    orderName = "Product"
                    availability = "In stock"
                    status = "To be delivered"
                    price = "15$"
                    time = "38 hours"/>
                
            </tbody>
        </table>
    </div>
  )
}

export default OrdersTable