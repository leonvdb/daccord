import * as React from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import { Store } from '../../reducers';
import { IPoll, IUserState, INewParticipant } from '../../interfaces';
import TextInputGroup from '../layout/TextInputGroup';
import validateEmail from 'src/utilities/validateEmail';
import { participate } from '../../actions/userActions';


interface Props extends PropsFromState, PropsFromDispatch {
    isOpen: boolean
    renderButton: boolean
}
interface State {
    isOpen: boolean,
    showParticipantError: boolean
    name: string,
    email: string,
    errors: Errors
}
interface Errors {
    name?: string,
    email?: string
}

class AuthModal extends React.Component<Props> {
    state: State = {
        isOpen: this.props.isOpen,
        showParticipantError: false,
        name: '',
        email: '',
        errors: {}
    }

    componentWillReceiveProps(nextProps: Props) {
        console.log(nextProps)
        if (nextProps.apiErrors.indexOf('PARTICIPANT_ALREADY_EXISTS') >= 0) {
            this.setState({
                showParticipantError: true
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
        const { name, email } = this.state
        const { poll } = this.props

        // Form validation
        const errors: Errors = {}
        if (name.length <= 0) { errors.name = 'Please enter a name' }
        if (!validateEmail(email)) { errors.email = 'Please enter a valid email address.' }
        if (Object.keys(errors).length > 0) {
            this.setState({
                errors
            })
            return;
        }

        const newParticipant: INewParticipant = {
            name,
            email,
            pollId: poll.refId
        }

        this.props.participate(newParticipant);

    }

    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }

    render() {
        const { isOpen, name, email, errors } = this.state
        const { poll, renderButton } = this.props

        return (
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center align-items-center">
                {renderButton && <button
                    id="Modal"
                    onClick={this.toggle}
                    className="btn btn-outline-success">
                    <i className="fas fa-hand-peace mr-1" />Participate
                </button>}
                <Modal placement="right" isOpen={isOpen} target="Modal" toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Become a participant of "{poll.title}"
                    </ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.onSubmit}>
                            <TextInputGroup
                                label="Name"
                                name="name"
                                placeholder="Enter Name"
                                value={name}
                                onChange={this.onChange}
                                error={errors.name}
                            />
                            <TextInputGroup
                                label="Email"
                                name="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={this.onChange}
                                error={errors.email}
                            />
                            <button className="btn btn-secondary mx-auto btn-block w-100 mt-4" type="submit">Participate</button>
                        </form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state: Store) => ({
    poll: state.poll.poll,
    user: state.user.user,
    apiErrors: state.errors
});

interface PropsFromDispatch {
    participate: (newParticipant: INewParticipant) => void
}

interface PropsFromState {
    poll: IPoll
    user: IUserState
    apiErrors: string[]
}

export default connect(mapStateToProps, { participate })(AuthModal);