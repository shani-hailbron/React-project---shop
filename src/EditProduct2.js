import React from 'react';
import './App.css';
import PropTypes from 'prop-types';


class EditProduct2 extends React.Component {
    constructor(props) {
        super();
        this.state = {
            name: '',
            price: '',
            amount: '',
            category: '',
        };
    }

    saveNewProduct = (event) => {
        event.preventDefault();
        console.log("נוסף מוצר חדש");
        if (typeof this.props.addProduct === 'function') {
            this.props.addProduct(this.state.name, this.state.price, this.state.amount, this.state.category);
            this.setState({
                ...this.state,
                name: '',
                price: '',
                amount: '',
                category: '',
            })
            alert('המוצר נוסף בהצלחה!!');
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.name !== this.state.name) {
            console.log('name changed');
        }
    }

    componentDidMount() {
        console.log('להוספת מוצר ישנם 2 אפשרויות');
    }



    render() {
        return (
            <div>
                <form name="form1" onSubmit={this.saveNewProduct}>
                    <label>שם מוצר:</label>
                    <input value={this.state.name} type="text" onChange={(e) => this.setState({ ...this.state, name: e.target.value, })} />
                    <label>מחיר מוצר:</label>
                    <input value={this.state.price} type="number" onChange={(e) => this.setState({ ...this.state, price: e.target.value, })} />
                    <label>כמות במלאי:</label>
                    <input value={this.state.amount} type="number" onChange={(e) => this.setState({ ...this.state, amount: e.target.value, })} />
                    <label>קטגורייה: </label>
                    <select name="categ" value={this.state.category} onChange={(e) => this.setState({ ...this.state, category: e.target.value, })}>
                        <option> children </option>
                        <option> home </option>
                        <option> electronic </option>
                        <option> food </option>
                    </select>
                    <button type="submit">add product</button>
                </form>
            </div>
        )
    }
}

export default EditProduct2;
