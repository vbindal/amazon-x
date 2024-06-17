import React, { useEffect, useState } from 'react';
import './Orders.css';
import { db, doc, setDoc, addDoc, collection, query, orderBy, onSnapshot } from "./firebase";
import { useStateValue } from './StateProvider';
import Order from "./Order";

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [{ basket, user }, dispatch] = useStateValue();

    useEffect(() => {
        const fetchOrders = async () => {
            if (user) {
                const ordersRef = collection(db, 'users', user.uid, 'orders');
                const q = query(ordersRef, orderBy('created', 'desc'));

                const unsubscribe = onSnapshot(q, (snapshot) => {
                    setOrders(snapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data()
                    })));
                });

                return () => unsubscribe(); // Cleanup function
            } else {
                setOrders([]); // Clear orders if user is null
            }
        };
        fetchOrders();
    }, [user]);
    return (
        <div className='orders'>
            <h1>Your Orders</h1>
            <div className='orders_order'>
                {orders?.map(order => (
                    <Order order={order} />
                ))}
            </div>
        </div>
    )
}

export default Orders
