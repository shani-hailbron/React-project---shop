import React from 'react';
import './App.css';

//show product from cart
function Cart(props) {

    return (
        <div>
            <ul>
                {/* remove product from the cart by index */}
                {props.allCart.map((prod, index) => (<li key={prod.name}>
                    <button value={index} onClick={() => {
                        const fromLocal = localStorage.getItem('cart');
                        const cartProducts = fromLocal ? JSON.parse(fromLocal) : [];
                        cartProducts.splice(index, 1)
                        props.removeProductFromCart(index);
                        localStorage.setItem('cart', JSON.stringify([...cartProducts]));
                        console.log('מחיקה');

                    }} type="button" > X </button>
                    {prod.name} price: {prod.price}
                </li>))}
            </ul>
        </div>
    )
}

export default Cart;