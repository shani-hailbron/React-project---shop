import React, { useState, useContext } from 'react';
import './App.css';
import ShowProduct from './ShowProduct';
import {
    Route,
    Switch,
    Link,
    useRouteMatch
} from "react-router-dom";


function Content(props) {
    let { path, url } = useRouteMatch();

    //show product by category
    const showByCategory = (categ) => {
       
       return (<div className="all-page">
            <div className="prod-container">
                {props.products.map((prod, index) => ((prod.category === categ || categ == "") ? <ul key={prod.name}  >
                    <Link to={`${url}/${categ === '' ? 'all' : categ}/${index}`} className="pictureLink">
                        <img className="pictureLink" src={`./pictures/${prod.name}.jpg`} ></img>
                        {prod.name}
                    </Link>
                </ul> : ''))}
            </div>

            <div className="prod-details">
                <Route path={`${path}/${categ === '' ? 'all' : categ}/:id`}>
                    <ShowProduct setCart={props.setCart} />
                </Route>
            </div>
        </div>
        );
    }
    return (
        <div>

            <Link className="space" to={`${url}/all`}>הכל</Link>
            <Link className="space" to={`${url}/children`}>ילדים</Link>
            <Link className="space" to={`${url}/food`}>אוכל</Link>
            <Link className="space" to={`${url}/electronic`}>אלטרוניקה</Link>
            <Link className="space" to={`${url}/home`}>לבית</Link>

            <Switch>
                <Route path={`${path}/home`}>
                    {showByCategory("home")}
                </Route>
                <Route path={`${path}/food`}>
                    {showByCategory("food")}
                </Route>
                <Route path={`${path}/children`}>
                    {showByCategory("children")}
                </Route>
                <Route path={`${path}/electronic`}>
                    {showByCategory("electronic")}
                </Route>
                <Route path={`${path}/all`}>
                    {showByCategory("")}
                </Route>
                <Route path={`${path}`}>
                    {showByCategory("")}
                </Route>
            </Switch>
        </div>)
}


export default Content;
