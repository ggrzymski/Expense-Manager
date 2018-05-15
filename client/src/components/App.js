import React from 'react';
import AddExpense from './AddExpense';
import '../css/App.css';
import axios from 'axios';
import { Button, Glyphicon } from 'react-bootstrap';

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
  };

  componentDidMount() {
    this.getExpenseData();
  }

  componentDidUpdate() {
    this.getExpenseData();
  }

  createUpdateButton = () =>{
    return (
      <Button bsStyle="info" bsSize="small">
        <Glyphicon glyph="glyphicon glyphicon-edit" />
      </Button>
    );
  };

  displayExpenseData = () => {
    const results = this.state.data.map( (x, index) =>{
      return (
        <tr key={index}>
          <td className="expense-cell">{x.description}</td>
          <td className="expense-cell">{x.amount}</td>
          <td className="expense-cell">{x.month}</td>
          <td className="expense-cell">{x.year}</td>
          <td className="expense-cell">{this.createUpdateButton()}</td>
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
                <th className="expense-header">Update</th>
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