import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
//import { Link } from 'react-router-dom';
import AddExpenseModal from './AddExpenseModal';
import { connect } from 'react-redux';
import { showModal } from '../actions/ShowModal';

class AddExpense extends React.Component {
    constructor(props) {
        super(props);
        this.openModal = this.openModal.bind(this);
    }

    openModal() {
        this.props.toggleModalStatus(true);
      }

    render() {
        return (
        <div>
           <Button
               bsStyle="primary"
               bsSize="small"
               onClick={this.openModal}
            >
            <Glyphicon glyph="glyphicon glyphicon-plus" />
            Add Expense
           </Button>
           <div>
             <AddExpenseModal isOpen={this.props.showModal} />
           </div>
        </div>
        );
    }
}

// Retrieving state from redux that is managed by reducers.

const mapStateToProps = state => ({
    showModal: state.showModal
});

// Retrieving action creators from redux so they can be dispatched on props call

const mapDispatchToProps = dispatch => ({
    toggleModalStatus: modalStatus => dispatch(showModal(modalStatus))
  });

export default connect(mapStateToProps, mapDispatchToProps)(AddExpense);