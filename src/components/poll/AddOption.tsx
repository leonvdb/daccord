import * as React from 'react'
import { connect } from 'react-redux';
import { addOption } from '../../actions/optionActions';
import TextInputGroup from '../layout/TextInputGroup';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { NewOption } from '../../../interfaces';
import { Store } from '../../reducers';

interface Props extends PropsFromState, PropsFromDispatch { }

interface State {
    title: string
    description: string
    errors: Errors
    modalOpen: boolean
}

interface Errors {
    title?: string
}


class AddOption extends React.Component<Props, State> {

    state: State = {
        title: '',
        description: '',
        errors: {},
        modalOpen: false
    };

    onChange = (e: React.ChangeEvent<any>) => {
        const propertyName = e.target.name
        const value = e.target.value
        this.setState(prevState => {
            const newState = { ...prevState };
            newState[propertyName] = value
            return newState
        })
    };

    onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { title, description } = this.state

        // Form validation
        const errors: Errors = {}

        if (title.length <= 0) {
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
                                    <label htmlFor="description">Description</label>
                                    <textarea className="form-control" name="description" id="description" rows={3} placeholder="Enter Description"
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

const mapStateToProps = (state: Store) => ({
    pollId: state.poll.poll.refId
});

interface PropsFromState {
    pollId: string
}
interface PropsFromDispatch {
    addOption: (option: NewOption, pollId: string) => void
}


export default connect(mapStateToProps, { addOption })(AddOption);
