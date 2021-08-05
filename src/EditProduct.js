import React, { useState } from 'react';
import './App.css';
import { Button, TextField, Fade, Modal } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import Backdrop from '@material-ui/core/Backdrop';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: '#5ec581',
    '&:hover': {
      backgroundColor: purple[700],
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: '#fff',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  margin: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


//Component to add new product
function EditProduct(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');


  //saved new product
  const saveNewProduct = (event) => {
    event.preventDefault();
    if (typeof props.addProduct === 'function') {
      props.addProduct(name, price, amount, category);
      setName('');
      setPrice('');
      setAmount('');
      setCategory('');
    }
    console.log("נוסף מוצר חדש");
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        להוספת מוצר חדש
      </button>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <form id="productForm" onSubmit={saveNewProduct} className={classes.paper}>
            <button onClick={handleClose} type="button">X</button><br />
            <TextField id="name" label="product name" required
              value={name} name="prodName" onChange={e => setName(e.target.value)} /><br />
            <TextField id="price" label="price" name="prodPrice" type="number" required
              value={price} onChange={e => setPrice(e.target.value)} /><br />
            <TextField id="amount" label="amount" name="prodAmount" type="number" required
              value={amount} onChange={e => setAmount(e.target.value)} /><br />
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">קטגורייה</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                name="categ"
                onChange={e => setCategory(e.target.value)}
              >
                <MenuItem value="children">children</MenuItem>
                <MenuItem value="home">home</MenuItem>
                <MenuItem value="electronic">electronic</MenuItem>
                <MenuItem value="food">food</MenuItem>
              </Select>
            </FormControl>

            <ColorButton variant="contained" color="primary" className={classes.margin} type="submit">
              הוסף מוצר חדש
            </ColorButton>
          </form>
        </Fade>
      </Modal>
    </div>
  )
}


export default EditProduct;

