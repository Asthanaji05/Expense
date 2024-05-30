const ExpenseEntry = () => {
    const [expense, setExpense] = useState({
      topic: '',
      amount: '',
      category: '',
      date: '',
      notes: ''
    });

  
    return (
        <>
              <div>
        <form>
          <div>
            <label>Topic:</label>
            <input
              type="text"
              name="topic"
              value={expense.topic}
            />
          </div>
          <div>
            <label>Amount (INR):</label>
            <input
              type="number"
              name="amount"
              value={expense.amount}
              
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Category:</label>
            <input
              type="text"
              name="category"
              value={expense.category}
               />
          </div>
          <div>
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={expense.date}
            />
          </div>
          <div>
            <label>Notes for Reference:</label>
            <textarea
              name="notes"
              value={expense.notes}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div></>
   );
  };
  
  export default ExpenseEntry;