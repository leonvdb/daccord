import * as React from 'react'
import { connect } from 'react-redux';
import { addOption } from '../../actions/optionActions';
import TextInputGroup from '../layout/TextInputGroup';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { INewOption } from '../../interfaces';
import { Store } from '../../reducers';
import validateEmail from 'src/utilities/validateEmail';
import { Link } from 'react-router-dom';

interface Props extends PropsFromState, PropsFromDispatch { }

interface State {
    title: string
    description: string
    email: string
    errors: Errors
    modalOpen: boolean
    showErrorParticipantExists: boolean
}

interface Errors {
    title?: string
    user?: string
    email?: string
}


class AddOption extends React.Component<Props, State> {

    state: State = {
        title: '',
        description: '',
        email: '',
        errors: {},
        modalOpen: false,
        showErrorParticipantExists: false
    };

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.apiErrors.indexOf('PARTICIPANT_ALREADY_EXISTS') === -1) {
            this.setState({
                modalOpen: false,
                title: '',
                description: '',
                email: ''
            });
        } else {
            this.setState({
                showErrorParticipantExists: true
            });
        }
    }

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

        const { title, description, email } = this.state
        const { userId } = this.props

        // Form validation
        const errors: Errors = {}

        if (title.length <= 0) {
            errors.title = 'Please enter a title'
        }


        if (!userId && !validateEmail(email)) {
            errors.user = 'No logged in user'
            if (email.length === 0) {
                errors.email = 'You are not logged in - To post an option enter your email or log into your account.'
            } else {
                errors.email = 'Please enter a valid email address.'
            }
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
            userId,
            email
        };

        this.props.addOption(newOption, this.props.pollId);

    }

    toggle = () => {
        if (this.state.modalOpen) {
            this.setState({
                showErrorParticipantExists: false
            });
        }
        this.setState({
            modalOpen: !this.state.modalOpen
        });
    }


    render() {


        const { title, description, errors, modalOpen, email, showErrorParticipantExists } = this.state

        let emailField;
        if (errors.user) {
            emailField = <div className="form-group">
                <TextInputGroup
                    label="Email"
                    name="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                />
            </div>
        }

        let cardBody;
        if (!showErrorParticipantExists) {
            cardBody = <form onSubmit={this.onSubmit}>
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
                {emailField}
                <button className="btn btn-secondary mx-auto btn-block w-100 mt-4" type="submit">Add Option</button>
            </form>
        } else {
            cardBody = <div>
                <div className="alert alert-danger" role="alert">
                    You seem to already participate in this poll..
                </div>
                <hr />
                <ul className="list-unstyled">
                    <li>Authenticate with your existing confirmation link</li>
                    <li><button className="btn btn-link p-0">Request a new confirmation link</button></li>
                    <li><Link to='/login'>Login </Link> to your account</li>
                </ul>
            </div>
        }

        return (
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center align-items-center">
                <button
                    id="Modal"
                    onClick={this.toggle}
                    className="btn btn-light border">
                    <i className="fas fa-plus" /> Add new option
                </button>
                <Modal placement="right" isOpen={modalOpen} target="Modal" toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        {showErrorParticipantExists && <i className="fas fa-chevron-left mr-3" />}
                        Add a new option
                    </ModalHeader>
                    <ModalBody>
                        <div >
                            {cardBody}
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state: Store) => ({
    pollId: state.poll.poll.refId,
    userId: state.user.user.userId,
    apiErrors: state.errors
});

interface PropsFromState {
    pollId: string
    userId: string
    apiErrors: string[]
}
interface PropsFromDispatch {
    addOption: (option: INewOption, pollId: string) => void
}


export default connect(mapStateToProps, { addOption })(AddOption);
