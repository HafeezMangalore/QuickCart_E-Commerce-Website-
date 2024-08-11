import React from 'react';
import './OrderConfirmation.css';
import online_shopping_image from '../Assets/online_shopping.png';

const OrderConfirmation = ({ orderDetails }) => {
    return (
        <div className='order-confirmation'>
            <div className='order-confirmation-header'>
                <h2>Order Confirmed</h2>
            </div>
            <div className='order-confirmation-content'>
                <img src={online_shopping_image} alt='Online Shopping' className='order-confirmation-image' />
                <p>Your order has been placed successfully!</p>
                <p>Details will be emailed to you shortly.</p>
                <p>Thank You. Shop Again ..</p>
            </div>
        </div>
    );
}

export default OrderConfirmation;
