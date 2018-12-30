import * as React from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import { Store } from '../../reducers';
import { IPoll, IUserState } from '../../interfaces';
import TextInputGroup from '../layout/TextInputGroup';

interface Props extends PropsFromState {
    isOpen: boolean
    renderButton: boolean
}

class AuthModal extends React.Component<Props> {
    state = {
        isOpen: this.props.isOpen,
        name: '',
        email: '',
        errors: {
            name: '',
            email: ''
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
                        Become a participant of {poll.title}
                    </ModalHeader>
                    <ModalBody>
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
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state: Store) => ({
    poll: state.poll.poll,
    user: state.user.user
});

interface PropsFromState {
    poll: IPoll
    user: IUserState
}

export default connect(mapStateToProps, null)(AuthModal);; 