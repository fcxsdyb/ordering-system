import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {

    const [user, setUser] = useState({
        name: "",
        email: ""
    })

    const [data, setData] = useState({
        name: "",
        email: ""
    })

    const { cartItems, food_list, getTotalCartAmount, placeOrder } = useContext(StoreContext);

    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setUser(user => ({ ...user, [name]: value }))
    }

    useEffect(() => {
        // Redirect if cart is empty
        if (getTotalCartAmount() === 0) {
            navigate('/');
        }
        // Load name and email from localStorage if available
        const storedName = localStorage.getItem('name');
        const storedEmail = localStorage.getItem('email');
        if (storedName && storedEmail) {
            setUser({ name: storedName, email: storedEmail });
        }
    }, [navigate, getTotalCartAmount]);


    return (
        <div className='place-order'>
            <div className="place-order-left">
                <p className='title'>User Information</p>
                <input type="name" name='name' onChange={onChangeHandler} value={user.name} placeholder='Name' />
                <input type="email" name='email' onChange={onChangeHandler} value={user.email} placeholder='Email address' />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details"><p>Subtotal</p><p>${getTotalCartAmount()}</p></div>
                        <hr />
                        <div className="cart-total-details"><p>Tax Fee</p><p>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() * 0.018}</p></div>
                        <hr />
                        <div className="cart-total-details"><b>Total</b><b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() * 1.018}</b></div>
                    </div>
                </div>
                <div className="payment-options">
                    <h2>Select Payment Method</h2>
                    <div className="payment-option">
                        <img src={assets.selector_icon} alt="" />
                        <p>COD ( Cash On Delivery )</p>
                    </div>
                    <button onClick={() => placeOrder(user, data)}>PLACE ORDER</button>
                </div>

            </div>
        </div>
    )
}

export default PlaceOrder
