import * as React from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import { Store } from '../../reducers';
import { IUser, IPollQuery } from '../../interfaces';
import TextInputGroup from '../layout/TextInputGroup';
import validateEmail from 'src/utilities/validateEmail';
import { resendLink } from '../../actions/userActions';
import { clearError } from '../../actions/errorActions';
import { Dispatch } from 'redux';
import { CREATE_PARTICIPANT } from '../../graphql/createParticipant';
import { Mutation } from 'react-apollo';
import { setAuthTokenAndUser } from '../../actions/authActions';


interface Props extends PropsFromState, PropsFromDispatch {
    poll: IPollQuery
    isOpen: boolean
    renderButton: boolean
}
interface State {
    isOpen: boolean,
    showParticipantError: boolean
    showLinkSent: boolean
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
        showLinkSent: false,
        name: '',
        email: '',
        errors: {}
    }

    componentWillReceiveProps(nextProps: Props) {
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

    onSubmit = (e: React.FormEvent<HTMLFormElement>, mutation: any) => {
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

        mutation({variables: {pollId: poll.refId, email}})

    }

    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }

    backFromError = () => {
        this.props.clearError('PARTICIPANT_ALREADY_EXISTS')
        this.setState({
            showParticipantError: false,
            showLinkSent: false
        })
    }

    resendLink = () => {
        this.props.resendLink(this.props.poll.refId, this.state.email)
        this.setState({ showLinkSent: true })
    }

    render() {

        const { isOpen, name, email, errors, showParticipantError, showLinkSent } = this.state
        const { poll, renderButton } = this.props

        let modal;
        if (!showParticipantError) {
            modal = <Modal placement="right" isOpen={isOpen} target="Modal" toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>
                    Become a participant of "{poll.title}"
                    </ModalHeader>
                <ModalBody>
                    <Mutation 
                    mutation={CREATE_PARTICIPANT}
                    update={// tslint:disable-next-line jsx-no-lambda
                        (cache, { data: { createParticipant}}) => {
                            if (createParticipant.token) {
                                this.props.setAuthTokenAndUser(createParticipant.token, createParticipant.user)
                            } else {
                                this.setState({showParticipantError: true})
                            }
                        }}
                    >
                        {(CREATE_PARTICIPANT) => (
                    <form onSubmit={// tslint:disable-next-line jsx-no-lambda
                        (e) => {this.onSubmit(e, CREATE_PARTICIPANT)}}>
                        <TextInputGroup
                            label="Name"
                            name="name"
                            placeholder="Enter Name"
                            value={name}
                            onChange={this.onChange}
                            error={errors.name}
                            classNames="w-75"
                        />
                        <TextInputGroup
                            label="Email"
                            name="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={this.onChange}
                            error={errors.email}
                            classNames="w-75 mb-5"
                        />
                        <button className="btn btn-secondary mx-auto btn-block w-50 mt-5" type="submit">Continue</button>
                    </form>
                        )} 
                    </Mutation>
                    <p className="text-center my-2">or</p>
                    <button className="btn btn-outline-info btn-block w-50 mx-auto">Sign in</button>
                </ModalBody>
            </Modal>
        } else {
            if (!showLinkSent) {
                modal =
                    <Modal placement="right" isOpen={isOpen} target="Modal" toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>
                            <i className="fas fa-arrow-left mr-5" onClick={this.backFromError} style={{ cursor: 'pointer' }} />
                            Become a participant of "{poll.title}"
                    </ModalHeader>
                        <ModalBody>
                            <div className="alert alert-danger">
                                Seems like you are already participating
                </div>
                            <button onClick={this.resendLink} className="btn btn-link btn-block mx-auto">Request new access link</button>
                        </ModalBody>
                    </Modal>
            } else {
                modal = <Modal placement="right" isOpen={isOpen} target="Modal" toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        <i className="fas fa-arrow-left mr-5" onClick={this.backFromError} style={{ cursor: 'pointer' }} />
                        Become a participant of "{poll.title}"
                    </ModalHeader>
                    <ModalBody>
                        <div className="alert alert-success">
                            Your new access Link has been sent, please check your email.
                </div>
                    </ModalBody>
                </Modal>
            }
        }

        return (
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center align-items-center">
                {renderButton && <button
                    id="Modal"
                    onClick={this.toggle}
                    className="btn btn-outline-success">
                    <i className="fas fa-hand-peace mr-1" />Participate
                </button>}
                {modal}
            </div>
        )
    }
}

const mapStateToProps = (state: Store) => ({
    user: state.user.user,
    apiErrors: state.errors
});

interface PropsFromDispatch {
    clearError: (error: string) => void,
    resendLink: (pollId: string, email: string) => void,
    setAuthTokenAndUser: (jwt: string, user: IUser) => void
}

const mapDispatchToProps = (dispatch: Dispatch<any>): PropsFromDispatch => {
    return {
        clearError: (error: string) => dispatch(clearError(error)),
        resendLink: (pollId: string, email: string) => dispatch(resendLink(pollId, email)),
        setAuthTokenAndUser: (jwt: string, user: IUser) => dispatch(setAuthTokenAndUser(jwt, user))
    }

}

interface PropsFromState {
    user: IUser
    apiErrors: string[]
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthModal) as any;