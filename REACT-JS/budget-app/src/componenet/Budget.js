
import * as React from 'react';
import { useState } from 'react';
import { Grid, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Icon from '@mui/material/Icon';
import styled from 'styled-components';
import { blue } from '@mui/material/colors';
function Budget() {

  const [Value, setValue] = useState('');
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [selectedtransactions, setSelectedtransactions] = useState('Income');

  const handleDeleteNumber = () => {
    setValue("");
  };

  const handleNumberClick = (number) => {
    setValue((prevValue) => prevValue + number);
  };


  const handleAddTransaction = () => {
    const amount = parseFloat(Value);
    if (!isNaN(amount)) {
      const category = selectedtransactions;
      const transaction = {
        category,
        amount,
        label: getSelectedTransaction(),

      };

      if (category === "Income") {
        setIncome((prevIncome) => prevIncome + amount);

      } else {
        setExpense((prevExpense) => prevExpense + amount);
      }

      setBalance((prevBalance) => prevBalance + (category === "Income" ? amount : -amount));
      setTransactions((prevTransactions) => [...prevTransactions, transaction]);
      setValue('');
    } else {
      alert('Please enter a valid number.');
    }
  };

  function getSelectedTransaction() {
    const ButtonName = selectedtransactions === 'Income' ? 'radio-2' : 'radio-3';
    const selectedButton = document.querySelector(`input[name="${ButtonName}"]:checked`);
    return selectedButton ? selectedButton.nextElementSibling.textContent : '';

  }
  const handleDeleteTransaction = (index) => {
    const updatedTransactions = [...transactions];
    const deletedTransaction = updatedTransactions.splice(index, 1)[0];

    if (deletedTransaction.category === 'Income') {
      setIncome((prevIncome) => prevIncome - deletedTransaction.amount);
    } else {
      setExpense((prevExpense) => prevExpense - deletedTransaction.amount);
    }
    setBalance((prevBalance) => prevBalance + (deletedTransaction.category === "Expense" ?deletedTransaction. amount : -deletedTransaction.amount));
    setTransactions(updatedTransactions);
    // const updatedBalance =
    //   deletedTransaction.category === 'Income'
    //     ? balance - deletedTransaction.amount
    //     : balance + deletedTransaction.amount;

    // setBalance(updatedBalance);
    // setTransactions(updatedTransactions);

  };

  const AllIconMap = {
    Salary: 'fa-dollar-sign',
    Gift: 'fa-cake-candles',
    Refund: 'fa-reply',
    Rent: 'fa-house',
    Shopping: 'fa-cart-shopping',
    Transport: 'fa-car',

  };

  function getTransactionIcon(transaction) {
    const iconsName = AllIconMap[transaction.label];

    return (
      <span className={`material-icons ${iconsName}`}>
        <i className={`fa-solid {iconsName}`} />
      </span>
    );
  }



  function handlerIncome() {

    setSelectedtransactions('Income');
    let item = document.getElementById("tab-1")
    console.log(item.value)
    if (item.value === "option1") {
      let first = document.querySelector(".type__categories--inc")
      first.setAttribute("style", "display : flex")
      let last = document.querySelector(".type__categories--exp")
      last.setAttribute("style", "display : none")
    } else {
      alert("slect gender")
    }
  }
  function handlerExpense() {
    setSelectedtransactions('Expense');
    let item = document.getElementById("tab-2")
    console.log(item)
    if (item.value === "option2") {
      let last = document.querySelector(".type__categories--exp")
      last.setAttribute("style", "display : flex")
      let first = document.querySelector(".type__categories--inc")
      first.setAttribute("style", "display : none")
    } else {
      alert("slect gender")
    }
  }
  return (
    <>
      <Grid className='app'>
        <Grid className='ms-5 me-4'>
          <Grid className="container ">
            <Grid className="balance">
              <Grid className="balance__total">
                <Typography variant="h5" color="light" margin={1}>
                  Balance
                </Typography>
                <Typography variant="h5">$ &nbsp;{balance}</Typography>
              </Grid>
              <Grid className="balance__type balance__income">
                <div className="balance__group ">
                  <h2>Income</h2>
                  <p> {`$ ${income}`}</p>
                </div>
                <span className="material-icons">
                  <Icon sx={{ fontSize: 25 }}>transit_enterexit</Icon>
                </span>
              </Grid>
              <Grid className="balance__type balance__expense ">
                <div className="balance__group">
                  <h2>Expenses</h2>
                  <p>{`$ ${expense}`}  </p>
                </div>
                <span className="material-icons">
                  <Icon sx={{ fontSize: 25 }}>transit_enterexit</Icon>
                </span>
              </Grid>
            </Grid>
            <div className="balance__details">
              <Typography variant="h6">Recent Transactions</Typography>
              {transactions.length > 0 ? (
                <ul>
                  {transactions.map((transaction, index) => (
                    <li key={index} className="transaction">
                      <Grid className='transaction__type icon-1'>
                        <span>{getTransactionIcon(transaction)}</span>
                        <p className='ps-1'>{transaction.label}</p>
                      </Grid>
                      <Grid className={`transaction__price ${transaction.category === 'Expense' ? 'expense' : ''}`}>
                      <p>{transaction.category === 'Income' ? `+${transaction.amount}` : `-${transaction.amount}`}</p><IconButton onClick={() => handleDeleteTransaction(index)} >
                          <DeleteIcon className='trash' sx={{ fontSize: 20 }} />
                        </IconButton>
                      </Grid>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="balance__empty">
                  <span className="material-icons">
                    <Icon sx={{ fontSize: 30 }}>loyalty</Icon>
                  </span>
                  <p>
                    Start adding <br />a new transaction
                  </p>
                </div>
              )}
            </div>
          </Grid>
        </Grid>
        <Grid className='ms-5'>
          <Grid className="section">
            <Grid className="type">
              <Grid className="type__transection ">
                <input type="radio" name="radio" id="tab-1" defaultValue="option1" onChange={handlerIncome} />
                <label htmlFor="tab-1">Income</label>
                <input type="radio" name="radio" id="tab-2" defaultValue="option2" onChange={handlerExpense} />
                <label htmlFor="tab-2">Expense</label>
                <Grid className="type__color" />
              </Grid>
              <Grid className="type__categories">
                <Grid className="type__categories--inc">
                  <input
                    type="radio"
                    name="radio-2"
                    id="tab-3"
                    checked="checked"
                  />
                  <label htmlFor="tab-3" className="icon-1" >
                    <span className="material-icons">
                      <i className="fa-solid fa-dollar-sign icn" />
                    </span>
                    <p>Salary</p>
                  </label>
                  <input type="radio" name="radio-2" id="tab-4" />
                  <label htmlFor="tab-4" className="icon-2">
                    <span className="material-icons">
                      <i className="fa-solid fa-cake-candles" />
                    </span>
                    <p>Gift</p>
                  </label>
                  <input type="radio" name="radio-2" id="tab-5" />
                  <label htmlFor="tab-5" className="icon-3">
                    <span className="material-icons">
                      <i className="fa-solid fa-reply" />
                    </span>
                    <p>Refund</p>
                  </label>
                </Grid>
                <div className="type__categories--exp" style={{ display: "none" }}>
                  <input
                    type="radio"
                    name="radio-3"
                    id="tab-7"
                    checked="checked"
                  />
                  <label htmlFor="tab-7" className="icon-1">
                    <span className="material-icons">
                      <i className="fa-solid fa-house" />
                    </span>
                    <p>Rent</p>
                  </label>
                  <input type="radio" name="radio-3" id="tab-8" />
                  <label htmlFor="tab-8" className="icon-2">
                    <span className="material-icons">
                      <i className="fa-solid fa-cart-shopping" />
                    </span>
                    <p>Shopping</p>
                  </label>
                  <input type="radio" name="radio-3" id="tab-9" />
                  <label htmlFor="tab-9" className="icon-4">
                    <span className="material-icons">
                      <i className="fa-solid fa-car" />
                    </span>
                    <p>Transport</p>
                  </label>
                </div>
             </Grid>
            </Grid>
            <Grid className="type__amount">
              <input type="text" value={`$ ${Value || '0.00'}`} readOnly className='w-100 ms-3' />
              <button className="type__add" onClick={handleAddTransaction}>
                <span className="material-icons">
                  <Icon sx={{ fontSize: 40 }}>add_circle</Icon>
                </span>
              </button>
            </Grid>
            <Grid className='calculater_main'>
              <Grid className="calculator">

                {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0].map((number) => (
                  <Grid
                    key={number}
                    className="calculator__number"
                    onClick={() => handleNumberClick(number)} >
                    {number}
                  </Grid>
                ))}
                <div className="calculator__cancel_button" onClick={() => handleDeleteNumber()} >
                  <span className="material-icons">
                    <Icon sx={{ fontSize: 25 }}>backspace</Icon>
                  </span>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default Budget;






