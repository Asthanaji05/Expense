import { useState } from 'react';
import './App.css';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

function App() {
  const [bal, setBal] = useState(0);
  const [transaction, setTransaction] = useState({
    type: "Income",  // added type to differentiate income and expense
    topic: "",
    amount: 0,
    category: "",
    date: "",
    notes: ""
  });
  const [transactions, setTransactions] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction({
      ...transaction,
      [name]: name === 'amount' ? Number(value) : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add the new transaction to the transactions list
    setTransactions([...transactions, transaction]);

    // Update the balance based on transaction type
    if (transaction.type === "Income") {
      setBal(bal + transaction.amount);
    } else if (transaction.type === "Expense") {
      setBal(bal - transaction.amount);
    }

    // Clear the form fields after submission
    setTransaction({
      type: "income",
      topic: "",
      amount: 0,
      category: "",
      date: "",
      notes: ""
    });
  };
  const calculateExpensesByCategory = () => {
    const expenseData = transactions
      .filter(trans => trans.type === "Expense")
      .reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
        return acc;
      }, {});
      return expenseData;
    };
    const expenseData = calculateExpensesByCategory();
    const categoryColors = {
      Education: 'rgba(75, 192, 192, 0.2)',
      Food: 'rgba(255, 99, 132, 0.2)',
      Travel: 'rgba(54, 162, 235, 0.2)',
      Clothes: 'rgba(255, 206, 86, 0.2)',
      Others: 'rgba(153, 102, 255, 0.2)',
      'Job Income': 'rgba(255, 159, 64, 0.2)',
      Gifts: 'rgba(75, 192, 192, 0.2)',
      EMIs: 'rgba(201, 203, 207, 0.2)'
    };
  
    const categoryBorderColors = {
      Education: 'rgba(75, 192, 192, 1)',
      Food: 'rgba(255, 99, 132, 1)',
      Travel: 'rgba(54, 162, 235, 1)',
      Clothes: 'rgba(255, 206, 86, 1)',
      Others: 'rgba(153, 102, 255, 1)',
      'Job Income': 'rgba(255, 159, 64, 1)',
      Gifts: 'rgba(75, 192, 192, 1)',
      EMIs: 'rgba(201, 203, 207, 1)'
    };
  
    const chartData = {
      labels: Object.keys(expenseData),
      datasets: [
        {
          label: 'Expenses by Category',
          data: Object.values(expenseData),
          backgroundColor: Object.keys(expenseData).map(category => categoryColors[category]),
          borderColor: Object.keys(expenseData).map(category => categoryBorderColors[category]),
          borderWidth: 1,
        },
      ],
    };
    const chartOptions = {
      plugins: {
        legend: {
          labels: {
            color: 'white', // Change text color
          },
        },
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)', // Change gridlines color
          },
          ticks: {
            color: 'white', // Change x-axis labels color
          },
        },
        y: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)', // Change gridlines color
          },
          ticks: {
            color: 'white', // Change y-axis labels color
          },
        },
      },
    };
    
    
  return (
    <>
      <div>
        <h1>Expense Tracker</h1>
        <h2 className='cardBal'>Balance: {bal} INR</h2>
        <div>
          <form onSubmit={handleSubmit}>
            <div className='card'>
            <div>
              <p>Type:</p>
              <select name="type" value={transaction.type} onChange={handleChange}>
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
            </div>

            <div>
              <p>Date:</p>
              <input
                type="date"
                name="date"
                value={transaction.date}
                onChange={handleChange}
              />
            </div>

            <div>
              <p>Category:</p>
              <select name="category" value={transaction.category} onChange={handleChange}>
                <option value="Education">Education</option>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Clothes">Clothes</option>
                <option value="Others">Others</option>
                <option value="Job Income">Job Income</option>
                <option value="Gifts">Gifts</option>
                <option value="EMIs">EMIs</option>
              </select>
            </div>
            </div>

<div className='card'>            <div>
              <p>Topic:</p>
              <input
                type="text"
                name="topic"
                value={transaction.topic}
                onChange={handleChange}
              />
            </div>
            <div>
              <p>Amount (INR):</p>
              <input
                type="number"
                name="amount"
                value={transaction.amount}
                onChange={handleChange}
              />
            </div>


            <div>
              <p>Notes for Reference:</p>
              <textarea
                name="notes"
                value={transaction.notes}
                onChange={handleChange}
              />
            </div>
</div>
            <button type="submit" className='submitBtn'>Submit</button>
          
          </form>
        </div>
        <h1>Recent transactions</h1>
        <ul>
          {transactions.map((trans, index) => (
            <li key={index} className={trans.type === 'Income' ? 'income' : 'expense'}>
              <p className='type'> {trans.type}</p>
              <h2 className='topic'>{trans.topic}</h2>
              <h2 className='amount'>{trans.amount}</h2>
              <p className='category'>Category:  {trans.category}</p>
              <p className='dt'>Date: {trans.date}</p>
              <p className='nt'>{trans.notes}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
      <Bar data={chartData} options={chartOptions} />
      </div>
    </>
  );
}

export default App;
