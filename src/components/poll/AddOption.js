import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addOption } from '../../actions/optionActions';
import TextInputGroup from '../layout/TextInputGroup';
import { Popover, PopoverBody } from 'reactstrap';


class AddOption extends Component {


    state = {
        title: '',
        description: '',
        errors: {},
        popoverOpen: false
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
            popoverOpen: false,
            title: '',
            description: '',
        });

    }

    toggle = () => {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }


    render() {

        const { title, description, errors, popoverOpen } = this.state
        return (

            <div className="col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center align-items-center">
                <button
                    id="Popover"
                    onClick={this.toggle}
                    className="btn btn-light border">
                    <i className="fas fa-plus"></i> Add new option
                </button>
                <Popover placement="right" isOpen={popoverOpen} target="Popover" toggle={this.toggle}>
                    <PopoverBody>
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
                                <TextInputGroup
                                    label="Description"
                                    name="description"
                                    placeholder="Enter Description"
                                    value={description}
                                    onChange={this.onChange}
                                />
                                <button className="btn btn-secondary mx-auto btn-block w-100 mt-4" type="submit">Add Option</button>
                            </form>
                        </div>
                    </PopoverBody>
                </Popover>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    pollId: state.poll.poll.ref_id
});



export default connect(mapStateToProps, { addOption })(AddOption);
