import * as React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import TextInputGroup from '../layout/TextInputGroup';
import { editOption, deleteOption } from '../../actions/optionActions';
import { INewOption, IOptionQuery } from 'src/interfaces';
import { connect } from 'react-redux';

interface Props extends PropsFromDispatch {
    pollId: string
    option: IOptionQuery
    modalOpen: boolean
    toggle: () => void
}

class OptionReadModal extends React.Component<Props> {

    state = {
        modalOpen: false,
        title: this.props.option.title,
        description: this.props.option.description
    }

    componentWillReceiveProps(nextProps: Props) {
        this.setState({
            modalOpen: nextProps.modalOpen
        })
    }

    deleteOption = () => {
        this.props.deleteOption(this.props.pollId, this.props.option.refId);
        this.props.toggle()
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
        const { title, description } = this.state
        const { option, pollId } = this.props

        const updatedOption: INewOption = {
            title,
            description
        };
        this.props.editOption(updatedOption, pollId, option.refId);
        this.props.toggle();
    }


    render() {
        const { modalOpen, title, description } = this.state
        const { toggle } = this.props

        return (
            <div>
                <Modal placement="right" isOpen={modalOpen} target="Modal" toggle={toggle}>
                    <ModalBody>
                        <form onSubmit={this.onSubmit}>
                            <label htmlFor={title}>Title</label>
                            <TextInputGroup label='title' name='title' value={title} placeholder='Enter Title' onChange={this.onChange} />
                            <label htmlFor={description}>Description</label>
                            <textarea className="form-control" name="description" id="description" rows={3} placeholder="Enter Description"
                                value={description}
                                onChange={this.onChange} />
                            <hr />
                            <button className="btn btn-link btn-sm d-block mb-3" type='button' onClick={this.deleteOption}>Delete Option</button>
                            <button className="btn btn-outline-secondary w-25 mr-2" type='button' onClick={toggle}>Cancel</button>
                            <button className="btn btn-success w-25" type='submit'>Save</button>
                        </form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

interface PropsFromDispatch {
    editOption: (option: INewOption, pollId: string, optionId: string) => void
    deleteOption: (pollId: string, optionID: string) => void
}

export default connect(null, { editOption, deleteOption })(OptionReadModal);