import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import { IUser, IPollQuery } from '../../interfaces';
import TextInputGroup from '../layout/TextInputGroup';
import validateEmail from '../../utilities/validateEmail';
import { Dispatch } from 'redux';
import { CREATE_PARTICIPANT } from '../../graphql/cudParticipant';
import { Mutation, compose, withApollo } from 'react-apollo';
import { setAuthTokenAndUser } from '../../actions/authActions';
import { SEND_AUTH_LINK } from '../../graphql/sendAuthLink';
import DefaultClient from 'apollo-boost';
import { setPseudonym } from '../../actions/userActions';


interface Props extends PropsFromDispatch {
    poll: IPollQuery
    isOpen: boolean
    renderButton: boolean
    client: DefaultClient<any>
}
interface Errors {
    name?: string,
    email?: string
}


const AuthModal = (props: Props) => {
    const [isOpen, setIsOpen] = useState(props.isOpen)
    const [showParticipantError, setShowParticipantError] = useState(false)
    const [showLinkSent, setShowLinkSent] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [errors, setErrors]: [Errors, ({ }: Errors) => void] = useState({})

    const { poll, renderButton } = props

    const onSubmit = (e: React.FormEvent<HTMLFormElement>, mutation: any) => {
        e.preventDefault();

        // Form validation
        const currentErrors: Errors = {}
        if (name.length <= 0) { currentErrors.name = 'Please enter a name' }
        if (!validateEmail(email)) { currentErrors.email = 'Please enter a valid email address.' }
        if (Object.keys(currentErrors).length > 0) {
            setErrors(currentErrors)
            return;
        }
        mutation({ variables: { pollId: poll.refId, email, pseudonym: name } })

    }

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    const backFromError = () => {
        setShowParticipantError(false);
        setShowLinkSent(false);
    }

    const resendLink = () => {
        props.client.mutate({ mutation: SEND_AUTH_LINK, variables: { pollId: poll.refId, email } })
        setShowLinkSent(true);
    }

    let modal;
    if (!showParticipantError) {
        modal = <Modal placement="right" isOpen={isOpen} target="Modal" toggle={toggle} data-testid="auth-modal">
            <ModalHeader toggle={toggle}>
                Become a participant of "{poll.title}"
                </ModalHeader>
            <ModalBody>
                <Mutation
                    mutation={CREATE_PARTICIPANT}
                    update={// tslint:disable-next-line jsx-no-lambda
                        (cache, { data: { createParticipant } }) => {
                            if (createParticipant.token) {
                                props.setAuthTokenAndUser(createParticipant.user, createParticipant.token)
                                props.setPseudonym(createParticipant.pseudonym)
                            } else {
                                setShowParticipantError(true)
                            }
                        }}
                >
                    {(CREATE_PARTICIPANT, { loading, error }) => {
                        if (loading) return <p data-testid="loading-state">Loading...</p>
                        if (error) return <p data-testid="error-state">Error :(</p>
                        return (
                            <form onSubmit={// tslint:disable-next-line jsx-no-lambda
                                (e) => { onSubmit(e, CREATE_PARTICIPANT) }}>
                                <TextInputGroup
                                    testId="name-input"
                                    name="name"
                                    placeholder="Enter Name"
                                    value={name}
                                    onChange={// tslint:disable-next-line jsx-no-lambda
                                        (e: React.ChangeEvent<any>) => { setName(e.target.value) }}
                                    error={errors.name}
                                    classNames="w-75"
                                />
                                <TextInputGroup
                                    testId="email-input"
                                    name="email"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={// tslint:disable-next-line jsx-no-lambda
                                        (e: React.ChangeEvent<any>) => { setEmail(e.target.value) }}
                                    error={errors.email}
                                    classNames="w-75 mb-5"
                                />
                                <button className="btn btn-secondary mx-auto btn-block w-50 mt-5" type="submit" data-testid="submit-button">Continue</button>
                            </form>
                        )
                    }}
                </Mutation>
                <p className="text-center my-2">or</p>
                <button className="btn btn-outline-info btn-block w-50 mx-auto">Sign in</button>
            </ModalBody>
        </Modal>
    } else {
        if (!showLinkSent) {
            modal =
                <Modal placement="right" isOpen={isOpen} target="Modal" toggle={toggle}>
                    <ModalHeader toggle={toggle}>
                        <i className="fas fa-arrow-left mr-5" onClick={backFromError} style={{ cursor: 'pointer' }} data-testid="back-button" />
                        Become a participant of "{poll.title}"
                </ModalHeader>
                    <ModalBody>
                        <div data-testid="participant-error" className="alert alert-danger">
                            Seems like you are already participating
            </div>
                        <button onClick={resendLink} className="btn btn-link btn-block mx-auto">Request new access link</button>
                    </ModalBody>
                </Modal>
        } else {
            modal = <Modal placement="right" isOpen={isOpen} target="Modal" toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    <i className="fas fa-arrow-left mr-5" onClick={backFromError} style={{ cursor: 'pointer' }} />
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
        <div >
            {renderButton && <button
                data-testid='participate-button'
                id="Modal"
                onClick={toggle}
                className="btn btn-outline-success">
                <i className="fas fa-hand-peace mr-1" />Participate
            </button>}
            {modal}
        </div>
    )

}

interface PropsFromDispatch {
    setAuthTokenAndUser: (user: IUser, jwt: string) => void
    setPseudonym: (pseudonym: string) => void
}

const mapDispatchToProps = (dispatch: Dispatch<any>): PropsFromDispatch => {
    return {
        setAuthTokenAndUser: (user: IUser, jwt: string) => dispatch(setAuthTokenAndUser(user, jwt)),
        setPseudonym: (pseudonym: string) => dispatch(setPseudonym(pseudonym))
    }

}

export default compose(
    withApollo,
    connect(null, mapDispatchToProps)
)(AuthModal);