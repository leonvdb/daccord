import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addOption } from '../../actions/optionActions';
import TextInputGroup from '../layout/TextInputGroup';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class AddOption extends Component {


    state = {
        title: '',
        description: '',
        errors: {},
        modalOpen: false
    };

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        e.preventDefault();

        const { title, description } = this.state

        // Form validation
        const errors = {}

        if (!title.length > 0) {
            errors.title = 'Please enter a title'
        }

        if (Object.keys(errors).length > 0) {
            this.setState({
                errors
            })
            return;
        }

        const newOption = {
            title,
            description
        };

        this.props.addOption(newOption, this.props.pollId);

        this.setState({
            modalOpen: false,
            title: '',
            description: '',
        });

    }

    toggle = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        });
    }


    render() {

        const { title, description, errors, modalOpen } = this.state
        return (

            <div className="col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center align-items-center">
                <button
                    id="Modal"
                    onClick={this.toggle}
                    className="btn btn-light border">
                    <i className="fas fa-plus"></i> Add new option
                </button>
                <Modal placement="right" isOpen={modalOpen} target="Modal" toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add a new option</ModalHeader>
                    <ModalBody>
                        <div >
                            <form onSubmit={this.onSubmit}>
                                <TextInputGroup
                                    label="Title"
                                    name="title"
                                    placeholder="Enter Title"
                                    value={title}
                                    onChange={this.onChange}
                                    error={errors.title}
                                />
                                <div className="form-group">
                                    <label for="description">Description</label>
                                    <textarea class="form-control" name="description" id="description" rows="3" placeholder="Enter Description"
                                        value={description}
                                        onChange={this.onChange}></textarea>
                                </div>
                                <button className="btn btn-secondary mx-auto btn-block w-100 mt-4" type="submit">Add Option</button>
                            </form>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    pollId: state.poll.poll.ref_id
});



export default connect(mapStateToProps, { addOption })(AddOption);
