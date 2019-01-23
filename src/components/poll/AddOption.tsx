import * as React from 'react'
import { connect } from 'react-redux';
import { addOption } from '../../actions/optionActions';
import TextInputGroup from '../layout/TextInputGroup';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { INewOption } from '../../interfaces';
import { Store } from '../../reducers';

interface Props extends PropsFromState, PropsFromDispatch { }

interface State {
    title: string
    description: string
    errors: Errors
    addOptionOpen: boolean
}

interface Errors {
    title?: string
}


class AddOption extends React.Component<Props, State> {

    state: State = {
        title: '',
        description: '',
        errors: {},
        addOptionOpen: false
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
        const { userId } = this.props

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
            description,
            userId
        };

        this.props.addOption(newOption, this.props.pollId, this.props.userId);

        this.setState({
            addOptionOpen: false,
            title: '',
            description: '',
        });

    }

    toggle = () => {
        this.setState({
            addOptionOpen: !this.state.addOptionOpen
        });
    }


    render() {

        const { title, description, errors, addOptionOpen } = this.state
        return (

            <div className="col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center align-items-center">
                <button
                    id="Modal"
                    onClick={this.toggle}
                    className="btn btn-light border">
                    <i className="fas fa-plus" /> Add new option
                </button>
                <Modal placement="right" isOpen={addOptionOpen} target="Modal" toggle={this.toggle}>
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
                                        onChange={this.onChange} />
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
    pollId: state.poll.poll.refId,
    userId: state.user.user.id
});

interface PropsFromState {
    pollId: string
    userId: string
}
interface PropsFromDispatch {
    addOption: (option: INewOption, pollId: string, userId: string) => void
}


export default connect(mapStateToProps, { addOption })(AddOption);
