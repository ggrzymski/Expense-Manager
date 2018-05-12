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
    this.getData = this.getData.bind(this);
  }

  getData(event,year) {
    axios.get('/getAll?month=All&year='+year)
    .then(response =>{
      event.setState({

      });
    });
  }

  render() {
    return (
      <div>
        <h1>Expense Manager</h1>
        <div>
          <AddExpense />
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th></th>
                <th className="desc-col">Description</th>
                <th className="button-col">Amount</th>
                <th className="button-col">Month</th>
                <th className="button-col">Year</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;