// import React, { useState } from 'react';
// import { Button, Grid, Typography, Paper, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, IconButton } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/Add';
// import { Autocomplete } from '@mui/material';

// const labelToIconMap = {
//   Salary: 'fa-dollar-sign',
//   Gift: 'fa-cake-candles',
//   Refund: 'fa-reply',
//   Rent: 'fa-house',
//   Shopping: 'fa-cart-shopping',
//   Transport: 'fa-car',
// };

// const Extra = () => {
//   const [inputValue, setInputValue] = useState('');
//   const [balance, setBalance] = useState(0);
//   const [income, setIncome] = useState(0);
//   const [expense, setExpense] = useState(0);
//   const [transactions, setTransactions] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('Income'); // Default to Income

//   const handleDelete = () => {
//     setInputValue('');
//   };

//   const handleNumberClick = (number) => {
//     setInputValue((prevValue) => prevValue + number);
//   };

//   const handleAddToBalance = () => {
//     const amount = parseFloat(inputValue);
//     if (!isNaN(amount)) {
//       const category = selectedCategory;
//       const transaction = {
//         category,
//         amount,
//         label: getSelectedLabel(),
//       };

//       if (category === 'Income') {
//         setIncome((prevIncome) => prevIncome + amount);
//       } else {
//         setExpense((prevExpense) => prevExpense + amount);
//       }

//       setBalance((prevBalance) => prevBalance + (category === 'Income' ? amount : -amount));
//       setTransactions((prevTransactions) => [...prevTransactions, transaction]);
//       setInputValue('');
//     } else {
//       alert('Please enter a valid number.');
//     }
//   };

//   const handleDeleteTransaction = (index) => {
//     const updatedTransactions = [...transactions];
//     const deletedTransaction = updatedTransactions.splice(index, 1)[0];

//     if (deletedTransaction.category === 'Income') {
//       setIncome((prevIncome) => prevIncome - deletedTransaction.amount);
//     } else {
//       setExpense((prevExpense) => prevExpense - deletedTransaction.amount);
//     }

//     setBalance((prevBalance) => prevBalance - deletedTransaction.amount);
//     setTransactions(updatedTransactions);
//   };

//   const getTransactionIcon = (transaction) => {
//     const iconClassName = labelToIconMap[transaction.label];
//     return (
//       <span className={`material-icons ${iconClassName}`}>
//         <i className={`fa-solid {iconClassName}`} />
//       </span>
//     );
//   };

//   const getSelectedLabel = () => {
//     // Your existing implementation
//   };

//   const genderhandler = () => {
//     setSelectedCategory('Income');
//     // Your existing implementation
//   };

//   const genderfehandler = () => {
//     setSelectedCategory('Expense');
//     // Your existing implementation
//   };

//   return (
//      <div className="app">
//         <div>
//           <div className="container">
//             <div className="balance">
//               <div className="balance__total">
//                 <h1>Balance</h1>
//                 <p>
//                   <span className="pound">$</span>&nbsp;{balance}
//                 </p>
//               </div>
//               <div className="balance__type balance__income">
//                 <div className="balance__group ">
//                   <h2>Income</h2>
//                   <p> {`${income}`}</p>
//                 </div>
//                 <span className="material-icons">
//                   <i className="fa-solid fa-arrow-up-long" />
//                 </span>
//               </div>
//               <div className="balance__type balance__expenses ">
//                 <div className="balance__group">
//                   <h2>Expenses</h2>
//                   <p>{`${expense}`}  </p>
//                 </div>
//                 <span className="material-icons">
//                   <i className="fa-solid fa-arrow-up-long" />
//                 </span>
//               </div>
//             </div>
//             <div className="balance__details">
//               <h3>Recent Transactions</h3>
//               {transactions.length > 0 ? (
//                 <ul>

//                   {transactions.map((transaction, index) => (
//                     <li key={index} className="transaction">
//                       <div className='transaction__type icon-1'>
//                         <span>{getTransactionIcon(transaction)}</span>
//                         <p className='ps-1'>{transaction.label}</p>
//                       </div>
//                       <div className='transaction__price'>
//                         <p>+{transaction.amount}</p><i class="fa-solid fa-trash " onClick={() => handleDeleteTransaction(index)}></i>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <div className="balance__empty">
//                   <span className="material-icons">
//                     <i className="fa-solid fa-tag" />
//                   </span>
//                   <p>
//                     Start adding <br />a new transaction
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//         <div className='ms-5 section'>

//           <div className="container">
//             <div className="type">
//               <div className="type__tab">
//                 <input type="radio" name="radio" id="tab-1" checked="checked" defaultValue="option1" onChange={genderhandler} />
//                 <label htmlFor="tab-1">Income</label>
//                 <input type="radio" name="radio" id="tab-2" defaultValue="option2" onChange={genderfehandler} />
//                 <label htmlFor="tab-2">Expense</label>
//                 <div className="type__color" />
//               </div>
//               <div className="type__categories">
//                 <div className="type__categories--inc">
//                   <input
//                     type="radio"
//                     name="radio-2"
//                     id="tab-3"
//                     checked="checked"

//                   />
//                   <label htmlFor="tab-3" className="icon-1" >
//                     <span className="material-icons">
//                       <i className="fa-solid fa-dollar-sign icn" />
//                     </span>
//                     <p>Salary</p>
//                   </label>
//                   <input type="radio" name="radio-2" id="tab-4" />
//                   <label htmlFor="tab-4" className="icon-2">
//                     <span className="material-icons">
//                       <i className="fa-solid fa-cake-candles" />
//                     </span>
//                     <p>Gift</p>
//                   </label>
//                   <input type="radio" name="radio-2" id="tab-5" />
//                   <label htmlFor="tab-5" className="icon-3">
//                     <span className="material-icons">
//                       <i className="fa-solid fa-reply" />
//                     </span>
//                     <p>Refund</p>
//                   </label>
//                 </div>
//                 <div className="type__categories--exp" style={{ display: "none" }}>
//                   <input
//                     type="radio"
//                     name="radio-3"
//                     id="tab-7"
//                     checked="checked"
//                   />
//                   <label htmlFor="tab-7" className="icon-1">
//                     <span className="material-icons">
//                       <i className="fa-solid fa-house" />
//                     </span>
//                     <p>Rent</p>
//                   </label>
//                   <input type="radio" name="radio-3" id="tab-8" />
//                   <label htmlFor="tab-8" className="icon-2">
//                     <span className="material-icons">
//                       <i className="fa-solid fa-cart-shopping" />
//                     </span>
//                     <p>Shopping</p>
//                   </label>
//                   <input type="radio" name="radio-3" id="tab-9" />
//                   <label htmlFor="tab-9" className="icon-4">
//                     <span className="material-icons">
//                       <i className="fa-solid fa-car" />
//                     </span>
//                     <p>Transport</p>
//                   </label>
//                 </div>

//               </div>
//             </div>
//             <div className="type__amount">

//               <input type="text" value={`$ ${inputValue || '00'}`} readOnly className='w-50' />

//               <button className="type__add" onClick={handleAddToBalance}>
//                 <span className="material-icons">
//                   <i className="fa-solid fa-plus" />
//                 </span>

//               </button>


//             </div>
//             <div className='cal'>
//               <div className="calculator">

//                 {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0].map((number) => (
//                   <div
//                     key={number}
//                     className="calculator__number"
//                     onClick={() => handleNumberClick(number)} >
//                     {number}
//                   </div>
//                 ))}
//                 <div className="calculator__cancel" onClick={()=>handleDelete()} >
//                   <span className="material-icons">
//                     <i className="fa-solid fa-delete-left" />
//                   </span>
//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//   );
// };

// export default Extra;