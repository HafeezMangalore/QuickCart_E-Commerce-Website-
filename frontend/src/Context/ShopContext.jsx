import React, { createContext, useState,useEffect } from "react";


export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300+1; index++) {
        cart[[index]] = 0;  // Assuming each product has a unique id
    }
    return cart;
}

const ShopContextProvider = (props) => {

    const [all_product,setAll_Product]=useState([]);


    const [cartItems, setCartItems] = useState(getDefaultCart()); // Correct useState destructuring

    useEffect(()=>{
        fetch('http://localhost:4000/allproducts').then((response)=>response.json())
        .then((data)=>setAll_Product(data))
    },[])
    
    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/addtocart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`Rs{localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',

                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response=>response.json)).then((data)=>console.log(data));
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item))
                totalAmount += itemInfo.new_price * cartItems[item]
            }
        }
        return totalAmount;
    }

    const getTotalCartItems =()=>{
        let totalItem = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                totalItem+=cartItems[item];

            }
        }
        return totalItem;
    }

    const contextValue = { getTotalCartItems, getTotalCartAmount, all_product, cartItems, setCartItems, addToCart, removeFromCart }; // Include setCartItems in contextValue
  
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;
