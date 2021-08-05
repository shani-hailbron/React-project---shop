import React, { useState } from 'react';
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
  }, selectEmpty: {
    marginTop: theme.spacing(2),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


function Pay(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [numOfCard, setNumOfCard] = useState('');
  const [validity, setValidity] = useState('');
  const [digitFromCardBack, setDigitFromCardBack] = useState('');

  const ToPay = (event) => {
    event.preventDefault();
    console.log("תשלום התבצע");
    setName('');
    setAddress('');
    setNumOfCard('');
    setValidity('');
    setDigitFromCardBack('');
  };

  const payying = () => {
    alert("תשלום בוצע בהצלחה!!");
    localStorage.setItem('cart', []);
    props.setCartAfterPay();
  }


  let totalSum = 0;
  if (localStorage.getItem('cart')) {
    const products = JSON.parse(localStorage.getItem('cart'));
    console.log(products);
    products.forEach(p => {
      totalSum = totalSum + p.price
      console.log(p.price)
    });
  }

  return (
    <div>
      <h2>Pay</h2>
      <button type="button" onClick={handleOpen}>
        לתשלום עבור הקניה
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
          <form id="customerForm" onSubmit={ToPay} className={classes.paper}>
            <button onClick={handleClose} type="button">X</button>
            <p>סה"כ לתשלום: {totalSum} ש"ח</p>
            <TextField name="customerFullName" label="customer full name" required
              value={name} onChange={(e) => setName(e.target.value)} /><br />
            <TextField name="FullAddressOfTheCustomer" label="address of the customer" required
              value={address} onChange={(e) => setAddress(e.target.value)} /><br />
            <TextField name="customerCreditCardNumber" label="customer credit number" type="number" required
              value={numOfCard} onChange={(e) => setNumOfCard(e.target.value)} maxLength={16} minLength={12} /><br />
            <TextField name="digitFromCardBack" label="digit From Card Back" type="number" required
              value={digitFromCardBack} onChange={(e) => setDigitFromCardBack(e.target.value)} minLength={12} /><br />
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">validity</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={validity}
                onChange={e => setValidity(e.target.value)}
                name="CrediCardValidity"
              >
                <MenuItem value="2020">2020</MenuItem>
                <MenuItem value="2021">2021</MenuItem>
                <MenuItem value="2022">2022</MenuItem>
                <MenuItem value="2023">2023</MenuItem>
                <MenuItem value="2023">2024</MenuItem>
                <MenuItem value="2023">2025</MenuItem>
                <MenuItem value="2023">2026</MenuItem>
              </Select>
            </FormControl><br></br>
            <ColorButton variant="contained" color="primary" className={classes.margin} type="submit" onClick={payying}>
              לתשלום כעת
            </ColorButton>
          </form>
        </Fade>
      </Modal>

    </div>
  )
}

export default Pay;