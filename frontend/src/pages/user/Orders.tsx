import React, { useEffect, useState } from "react";
import { AJAX } from "../../utils/getJson";
import { API_URL } from "../../config";
import Order from "../../components/Order";
import "../../assets/styles/Orders.scss";

type Positsion = {
  quantity: number;
  product_id: number;
  product_brand: string;
  product_name: string;
  product_img: string;
  price: number;
};
type Order = {
  order_id: number;
  positions: Positsion[];
};

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    const data = await AJAX(`${API_URL}/cart/order`);
    console.log(data);
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <div className="orders-page">
        {orders.map((order, index) => (
          <div key={order.order_id}>
            <h2>Order {index + 1}</h2>
            {order.positions.map((position: Positsion) => (
              <Order
                productImg={position.product_img}
                productBrand={position.product_brand}
                key={position.product_id}
                productPrice={position.price}
                productName={position.product_name}
                quantity={position.quantity}
              ></Order>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Orders;
