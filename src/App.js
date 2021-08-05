import React, {useState, useContext} from 'react';
import './App.css';
import Content from './Content.js';
import Cart from './Cart';
import EditProduct from './EditProduct.js';
import EditProduct2 from './EditProduct2.js';
import {productsContext} from './ProductsContext';
// import products from './products';

import Pay from './Pay';
import About from './About';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



function App() {

  const products= useContext(productsContext);
  console.log(products);


  const [allProducts, setAllProducts] = useState(products);
  //add new product
  const addProduct= (name, price, amount, category)=>{
      products.push({name, price, amount, category});
      setAllProducts([...products]);
      console.log("adding");
      localStorage.setItem('products', JSON.stringify(products));
  }


  const [search, setSearch]= useState('');

  const [ifAllProducts, setIfAllProducts]= useState(true);    
  const [resultSearch, setResultSearch]= useState([]);   

  //show pruduct by inner name
  const searchFunc= ()=> {
    setResultSearch([...products.filter(prod=> prod.name.includes(search))]);
    setIfAllProducts(false);   
  };

  //reset data
  const resetFunc= ()=> {
    setSearch('');    
    setIfAllProducts(true);    
  };


const [allCart, setAllCart]= useState((localStorage.getItem('cart')) ? (JSON.parse(localStorage.getItem('cart'))) : []);

//add product to cart
const setCart=(prod) => {
  setAllCart([...allCart, prod]);
};
const setCartAfterPay=() => {
  setAllCart([]);
};

//remove product from cart
const removeProductFromCart= (index)=>{
  let tempCart= allCart;
  console.log(index+'אינדקס: ');
  tempCart.splice(index, 1); 
  setAllCart([...tempCart]);
  console.log("delete");
};


  return (
    <Router>
    <div>

       <ul>
         <li><Link to="/">עמוד הבית</Link></li>
         <li><Link to="/About">אודותינו</Link></li>
         <li><Link to="/products">מוצרים</Link></li>
         <li><Link to="/EditProduct">ניהול הוספת מוצר חדש</Link></li>
         <li><Link to="/shopping">סל קניות</Link></li>
       </ul>


    <Switch>
      <Route path="/" exact>
           <h1>ברוכים הבאים לחנות האינטרנטית הגדולה בישראל</h1>
      </Route>  

      <Route path="/About">
          <About/>
      </Route> 

      <Route path="/products">

          <EditProduct addProduct={addProduct}/>

          <input type="search" value={search} placeholder="הכנס מוצר לחיפוש" onChange={(e)=> setSearch(e.target.value)}/>
          <button onClick={searchFunc}>חפש לי</button>           
          <button onClick={resetFunc}> איפוס חיפוש</button> 
        
         <productsContext> 
            {ifAllProducts ? <Content setCart={setCart}  products={products}/>   : <Content setCart={setCart} products={resultSearch}/> }
        </productsContext>   

      </Route>


      <Route path="/EditProduct">
          <EditProduct2 addProduct={addProduct}/>
      </Route>  


      <Route path="/shopping">
          <Cart allCart={allCart} removeProductFromCart={removeProductFromCart}/>
          <Pay setCartAfterPay={setCartAfterPay}/>
      </Route>  
       
       </Switch>

       </div>
    </Router>
  );
}

export default App;

