import * as React from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import { Store } from '../../reducers';
import { IUser, IPollQuery } from '../../interfaces';
import TextInputGroup from '../layout/TextInputGroup';
import validateEmail from '../../utilities/validateEmail';
import { Dispatch } from 'redux';
import { CREATE_PARTICIPANT } from '../../graphql/createParticipant';
import { Mutation, compose, withApollo } from 'react-apollo';
import { setAuthTokenAndUser } from '../../actions/authActions';
import { SEND_AUTH_LINK } from '../../graphql/sendAuthLink';
import DefaultClient from 'apollo-boost';
import { setPseudonym } from '../../actions/userActions';


interface Props extends PropsFromState, PropsFromDispatch {
    poll: IPollQuery
    isOpen: boolean
    renderButton: boolean
    client: DefaultClient<any>
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

        mutation({variables: {pollId: poll.refId, email, pseudonym: name}})

    }

    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }

    backFromError = () => {
        this.setState({
            showParticipantError: false,
            showLinkSent: false
        })
    }

    resendLink = () => {
        this.props.client.mutate({mutation: SEND_AUTH_LINK, variables: {pollId: this.props.poll.refId, email: this.state.email}})
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
                                this.props.setAuthTokenAndUser(createParticipant.user, createParticipant.token)
                                this.props.setPseudonym(createParticipant.pseudonym)
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
});

interface PropsFromDispatch {
    setAuthTokenAndUser: (user: IUser, jwt: string) => void
    setPseudonym: (pseudonym: string) => void
}

const mapDispatchToProps = (dispatch: Dispatch<any>): PropsFromDispatch => {
    return {
        setAuthTokenAndUser: ( user: IUser, jwt: string) => dispatch(setAuthTokenAndUser(user, jwt)),
        setPseudonym: (pseudonym: string) => dispatch(setPseudonym(pseudonym))
    }

}

interface PropsFromState {
    user: IUser
}

export default compose(
    withApollo,
    connect(mapStateToProps, mapDispatchToProps)
)(AuthModal) as any;