import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import AddExpenseModal from './AddExpenseModal';
import { connect } from 'react-redux';
import { expenseModal } from '../actions/ShowModal';

class AddExpense extends React.Component {
    constructor(props) {
        super(props);
        this.openExpenseModal = this.openExpenseModal.bind(this);
    }

    openExpenseModal() {
        this.props.toggleExpenseModalStatus(true);
      }

    render() {
        return (
        <div>
           <div className="expense-button">
            <Button
                bsStyle="primary"
                bsSize="small"
                onClick={this.openExpenseModal}
                >
                <Glyphicon glyph="glyphicon glyphicon-plus" />
                Add Expense
            </Button>
           </div>
           <div>
             <AddExpenseModal api="addExpense" isOpen={this.props.expenseModal} />
           </div>
        </div>
        );
    }
}

// Retrieving state from redux that is managed by reducers.

const mapStateToProps = state => ({
    expenseModal: state.showExpenseModal,
});

// Retrieving action creators from redux so they can be dispatched on props call

const mapDispatchToProps = dispatch => ({
    toggleExpenseModalStatus: modalStatus => dispatch(expenseModal(modalStatus)),
  });

export default connect(mapStateToProps, mapDispatchToProps)(AddExpense);