import React from 'react';
import Modal from 'react-modal';
import '../css/Modal.css';
import { Button, Glyphicon } from 'react-bootstrap';


class AddExpenseModal extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            modalIsOpen: false
        };

        this.closeModal = this.closeModal.bind(this);
        this.buildMonthMenu = this.buildMonthMenu.bind(this);
    }
    
    componentWillMount() {
        Modal.setAppElement('body');
    }

    closeModal() {
        this.setState({ modalIsOpen: false});
    }

    buildMonthMenu() {
      return (
        <div>
          <label htmlFor="month">Month</label>
          <select id="month" name="month">
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
    }

    buildYearMenu() {
      return (
        <div>
          <label htmlFor="year">Year</label>
          <select id="year" name="year">
            <option value='2016' id="16">2016</option>
            <option value='2017' id="17">2017</option>
            <option value='2018' id="18">2018</option>
            <option value='2019' id="19">2019</option>
          </select>
        </div>
      );
    }

    render() {
        return (
            <div>
                <Modal
                isOpen={this.props.isOpen}
                onRequestClose={this.closeModal}
                contentLabel="Expense Modal"
                className="Modal"
                >
                  <Button bsStyle="danger" bsSize="small" >
                    <span className="closebtn glyphicon glyphicon-remove"></span>
                  </Button>
                  <div>
                    <fieldset>
                      <label htmlFor="description">Description</label>
                      <input type="text" id="description" name="description"
                      ></input>
                      <label htmlFor="amount">Amount</label>
                      <input type="text" id="amount" name="amount"></input>
                      {this.buildMonthMenu()}
                      {this.buildYearMenu()}
                    </fieldset>
                  </div>
                  <div className="button-center">
                    <Button bsStyle="success" bsSize="small">Add New Expense</Button>
                  </div>
                </Modal>
            </div>
        );
    }
}

export default AddExpenseModal;