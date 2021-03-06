import React from 'react';
import Modal from 'react-modal';
import '../css/Modal.css';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { expenseModal, updateModal, updateTable } from '../actions/ShowModal';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ExpenseModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          _id: '',
          description: '',
          year: '2016',
          amount: 0,
          month: 'Jan',
          confirmSubmission: false
        }
    }
    
    componentWillMount() {
        Modal.setAppElement('body');
    }

    closeExpenseModal = () => {
      this.props.toggleUpdateModalStatus(false);
      this.props.toggleExpenseModalStatus(false);
      this.props.toggleRefreshDisplayStatus(true);
      this.setState({ confirmSubmission : false});
    };

    handleTextChange = (e) => {

      const description = "description";
      const amount = "amount";

      switch(e.target.name) {
        case description: {
          this.setState({
            description: e.target.value
          });
          break;
        }
        case amount: {
          this.setState({
            amount: e.target.value
          });
          break;
        }
          default:
            return e.target.value 
      }
    };

    handleSelectChange = (e) => {
      const year = "year";
      const month = "month";

      switch(e.target.name) {
        case year: {
          this.setState({
            year: e.target.value
          });
          break;
        }
        case month: {
          this.setState({
            month: e.target.value
          });
          break;
        }
        default:
          return e.target.value;
      }
    };

    handleSubmitExpense = (e) => {
      if(this.props.api === "addExpense") {
        axios.post('/addExpense', {
          description: this.state.description,
          amount: this.state.amount,
          year: this.state.year,
          month: this.state.month
        })
        .then(response => {
          this.setState({ confirmSubmission : response.data});
        })
        .catch(error => console.log(error));
      }
      else if(this.props.api === "updateExpense") {
        axios.put(`/updateExpense/${this.props.expenseId}`, {
          description: this.state.description,
          amount: this.state.amount,
          year: this.state.year,
          month: this.state.month
        })
        .then(response => this.setState({ confirmSubmission : response.data}))
        .catch(error => console.log(error));
      }
    };

    displaySuccessModal = () => {
      return (
        <div>
        <Link to='/'>
          <Modal isOpen={this.props.isOpen} onRequestClose={this.closeExpenseModal}
            contentLabel="Confirmation Modal" className="Modal">
            <div className='button-center'>
              <h3>Expense Successfully Added</h3>
              <Button bsStyle="success" bsSize="small" 
                onClick={this.closeExpenseModal}>
                Close the Dialog
              </Button>
            </div>
          </Modal>
        </Link>
        </div>
      );
    };

    displayExpenseModal = () => {
      return (
      <div>
          <Modal
          isOpen={this.props.isOpen}
          onRequestClose={this.closeExpenseModal}
          contentLabel="Expense Modal"
          className="Modal"
          >
          <Link to='/'>
            <Button bsStyle="danger" bsSize="small" onClick={this.closeExpenseModal} >
              <span className="closebtn glyphicon glyphicon-remove"></span>
            </Button>
          </Link>
            <div>
              <fieldset>
                <label htmlFor="description">Description</label>
                <input type="text" id="description" name="description" 
                  onChange={this.handleTextChange}>
                </input>
                <label htmlFor="amount">Amount</label>
                <input type="text" id="amount" name="amount" 
                  onChange={this.handleTextChange}>
                </input>
                {this.buildMonthMenu()}
                {this.buildYearMenu()}
              </fieldset>
            </div>
            <div className="button-center">
              <Button bsStyle="success" bsSize="small" 
                onClick={this.handleSubmitExpense}>
                Add Expense
              </Button>
            </div>
          </Modal>
      </div>
      );
    };

    buildMonthMenu = () => {
      return (
        <div>
          <label htmlFor="month">Month</label>
          <select id="month" name="month" onChange={this.handleSelectChange}>
            <option value="Jan" id="Jan">January</option>
            <option value="Feb" id="Feb">February</option>
            <option value="Mar" id="Mar">March</option>
            <option value="Apr" id="Apr">April</option>
            <option value="May" id="May">May</option>
            <option value="Jun" id="Jun">June</option>
            <option value="Jul" id="Jul">July</option>
            <option value="Aug" id="Aug">August</option>
            <option value="Sep" id="Sep">September</option>
            <option value="Oct" id="Oct">October</option>
            <option value="Nov" id="Nov">November</option>
            <option value="Dec" id="Dec">December</option>
          </select>
        </div>
      );
    };

    buildYearMenu = () => {
      return (
        <div>
          <label htmlFor="year">Year</label>
          <select id="year" name="year" onChange={this.handleSelectChange}>
            <option value='2016' id="16">2016</option>
            <option value='2017' id="17">2017</option>
            <option value='2018' id="18">2018</option>
            <option value='2019' id="19">2019</option>
          </select>
        </div>
      );
    };

    render() {
        return (
          <div>
            { this.state.confirmSubmission ? this.displaySuccessModal() : this.displayExpenseModal()}
          </div>
        );
    }
}

const mapStateToProps = state => ({
    expenseModal: state.showExpenseModal,
    updateModal: state.showUpdateModal,
    expenseId: state.expenseId
});

const mapDispatchToProps = dispatch => ({
    toggleExpenseModalStatus: modalStatus => dispatch(expenseModal(modalStatus)),
    toggleUpdateModalStatus: modalStatus => dispatch(updateModal(modalStatus)),
    toggleRefreshDisplayStatus: toggleDisplayStatus => dispatch(updateTable(toggleDisplayStatus))
});

export default connect(mapStateToProps,mapDispatchToProps)(ExpenseModal);