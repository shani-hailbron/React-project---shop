import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const productsContext = createContext([]);

export default function ProductsContext(props) {
    console.log('in render context');
    const [products, setProducts] = useState([]);
    console.log(products);

    useEffect(() => {
        axios.get('/products.json')
            .then((data) => {
                setProducts(data.data);
            })
    }, [])

    return (
        <productsContext.Provider value={products}>
            {props.children}
        </productsContext.Provider>
    );
}