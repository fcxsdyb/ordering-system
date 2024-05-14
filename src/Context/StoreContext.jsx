import { createContext, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    };

    const removeFromCart = (itemId) => {
        if (cartItems[itemId] > 0) {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        }
    };

    const getTotalCartAmount = () => {
        return Object.entries(cartItems).reduce((total, [id, quantity]) => {
            const itemInfo = food_list.find(product => product.food_id === Number(id));
            return itemInfo ? total + (itemInfo.food_price * quantity) : total;
        }, 0);
    };

    const clearInfo = () => {
        setCartItems({});
        alert("Order completed successfully. Your cart is now empty.");
    }

    const addCustomer = async (customerData) => {
        try {
            const response = await fetch('http://localhost:8080/customer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(customerData)
            });
            if (!response.ok) {
                throw new Error('Failed to add customer');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error adding customer:", error);
        }
    };

    const placeOrder = async (user) => {
        if (user.name && user.email) {
            try {
                const customer = await addCustomer(user);
                const orderTotal = getTotalCartAmount() * 1.018;
                const orderDetails = Object.entries(cartItems).map(([id, quantity]) => ({
                    dishId: id,
                    quantity: quantity,
                    amount: food_list.find(item => item.food_id === parseInt(id)).food_price * quantity,
                    desc: food_list.find(item => item.food_id === parseInt(id)).name
                }));

                // Sending order to backend
                const response = await fetch('http://localhost:8080/order', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        tableId: 2,
                        customerId: customer.id,
                        price: orderTotal,
                        details: orderDetails
                    })
                });

                if (!response.ok) throw new Error('Failed to place order');

                console.log('Order placed successfully');

                clearInfo();
            } catch (error) {
                console.error("Error placing order:", error);
            }
        } else {
            alert("You have to input name and email to complete an order");
        }
    };

    const contextValue = {
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
        placeOrder,
        clearInfo
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
