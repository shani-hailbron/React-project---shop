import React, {useState, useContext} from 'react';
import { useParams } from 'react-router-dom';
import './App.css';
import {productsContext} from './ProductsContext';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


function ShowProduct(props){
  const classes = useStyles();
  const products= useContext(productsContext);
  const {id}= useParams();
  const product= products[id];


  const addToCart= ()=> {
      const fromLocal= localStorage.getItem('cart');
      const cartProducts= fromLocal ? JSON.parse(fromLocal) : [];
      cartProducts.push(product);  
      props.setCart(product);     
      localStorage.setItem('cart', JSON.stringify([...cartProducts]));  
  }


  //show details a product
  return (
      product ? <div>
      name: {product.name} <br/>
      price: {product.price} <br/>
      amount: {product.amount} <br/>
      category: {product.category} <br/>


      <div className={classes.root}>
          <Button onClick={addToCart} variant="contained" color="primary">
              הוסף לסל
          </Button>
      </div>
      </div> : ' '
  )
}


export default ShowProduct;