import React from 'react';
import AddExpense from './AddExpense';
import '../css/App.css';
import axios from 'axios';
import { Button, Glyphicon, Tabs, Tab } from 'react-bootstrap';
import ExpenseModal from './AddExpenseModal';
import { updateModal, updateTable } from '../actions/ShowModal';
import { connect } from 'react-redux';

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
     if(this.props.refreshTable) {
       this.getExpenseData();
       this.props.toggleRefreshDisplayStatus(false);
     }
  }

  setUpdateModalStatus = (_uid) =>{
    this.props.toggleUpdateModalStatus(true,_uid);
  };

  deleteExpense = (_uid) => {
    axios.delete(`/deleteExpense/${_uid}`)
    .then(response => {
      this.props.toggleRefreshDisplayStatus(true);
    });
  };

  displayExpenseData = (selectedYear) => {
    const results = this.state.data.map( (x, index) =>{
      if(x.year === selectedYear) {
        return (
          <tr key={index}>
            <td className="expense-cell">{x.description}</td>
            <td className="expense-cell">{x.amount}</td>
            <td className="expense-cell">{x.month}</td>
            <td className="expense-cell">{x.year}</td>
            <td className="expense-cell">
              <Button bsStyle="info" bsSize="small" onClick={() => this.setUpdateModalStatus(x._id)}>
                <Glyphicon glyph="glyphicon glyphicon-edit" />
              </Button>
            </td>
            <td className="expense-cell">
              <Button bsStyle="warning" bsSize="small" onClick={() => this.deleteExpense(x._id)}>
                <Glyphicon glyph="glyphicon glyphicon-remove" />
              </Button>
            </td>
          </tr>
        );
      }
      return null;
    });

    return results;
  };

  getYearsforTabs = () => {
    const allYears = this.state.data.map(entry =>  entry.year);

    const uniqueYears = Array.from(new Set(allYears)).sort(((a,b) => {
      if(a<b) {
        return 1;
      }
      if(a>b) {
        return -1;
      }
      return 0;
    }));

    const tabs = uniqueYears.map((year) => {
      return (
        <Tab eventKey={year} key={year} title={year}></Tab>
      );
    });

    return tabs;
  };

  handleSelect = (key) => {
    this.setState({ selectedYear: key });
  };

  render() {
    return (
      <div>
        <h1 align="center">Expense Manager</h1>
          <div>
            <Tabs activeKey={this.state.selectedYear} onSelect={this.handleSelect}
              id="uncontrolled-tab-example">
              {this.getYearsforTabs()}
            </Tabs>
          </div>
          <AddExpense />
          <ExpenseModal api="updateExpense" isOpen={this.props.updateModal} />
        <div>
          <table className="center">
            <thead>
              <tr>
                <th className="expense-header">Description</th>
                <th className="expense-header">Amount</th>
                <th className="expense-header">Month</th>
                <th className="expense-header">Year</th>
                <th className="expense-header">Update</th>
                <th className="expense-header">Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.displayExpenseData(this.state.selectedYear)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  updateModal: state.showUpdateModal,
  refreshTable: state.refreshTableStatus,
});

// Retrieving action creators from redux so they can be dispatched on props call

const mapDispatchToProps = dispatch => ({
  toggleUpdateModalStatus: (modalStatus,id) => dispatch(updateModal(modalStatus,id)),
  toggleRefreshDisplayStatus: toggleDisplayStatus => dispatch(updateTable(toggleDisplayStatus))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);