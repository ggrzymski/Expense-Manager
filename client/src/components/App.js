import React from 'react';
import AddExpense from './AddExpense';
import '../css/App.css';
import axios from 'axios';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      selectedMonth: 'Jan',
      selectedYear: 2018,
      data: []
    };
  }

  getExpenseData = () => {
    axios.get('/getExpenseData')
    .then(response => {
      this.setState({ data: response.data });
    });
  }

  componentDidMount() {
    this.getExpenseData();
  }

  componentDidUpdate() {
    this.getExpenseData();
  }

  displayExpenseData = () => {
    const results = this.state.data.map( (x, index) =>{
      return (
        <tr key={index}>
          <td className="expense-cell">{x.description}</td>
          <td className="expense-cell">{x.amount}</td>
          <td className="expense-cell">{x.month}</td>
          <td className="expense-cell">{x.year}</td>
        </tr>
      );
    });

    return results;
  };

  render() {
    return (
      <div>
        <h1 align="center">Expense Manager</h1>
          <AddExpense />
        <div>
          <table className="center">
            <thead>
              <tr>
                <th className="expense-header">Description</th>
                <th className="expense-header">Amount</th>
                <th className="expense-header">Month</th>
                <th className="expense-header">Year</th>
              </tr>
            </thead>
            <tbody>
              {this.displayExpenseData()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;