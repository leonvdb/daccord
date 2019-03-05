import * as React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import TextInputGroup from '../layout/TextInputGroup';
import { IOptionQuery } from 'src/interfaces';
import { Mutation } from 'react-apollo';
import { UPDATE_OPTION, DELETE_OPTION } from '../../graphql/cudOption';
import { getPoll } from '../../graphql/getPoll';

interface Props {
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

    deleteOption = (mutation: any) => {
        mutation({variables: {pollId: this.props.pollId, optionId: this.props.option.refId}})
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

    onSubmit = (e: React.FormEvent<HTMLFormElement>, mutation: any) => {
        e.preventDefault();
        const { title, description } = this.state
        const { option, pollId } = this.props
        mutation({variables : {pollId, optionId: option.refId,  title, description}})
        this.props.toggle();
    }


    render() {
        const { modalOpen, title, description } = this.state
        const { toggle } = this.props

        return (
            <div>
                <Modal placement="right" isOpen={modalOpen} target="Modal" toggle={toggle}>
                    <ModalBody>
                        <Mutation mutation={UPDATE_OPTION}
                        
                        update={ // tslint:disable-next-line jsx-no-lambda
                            (cache, { data: { updateOption}}) => {
                            const poll: any = cache.readQuery({ query: getPoll, variables: {id: this.props.pollId}})
                            cache.writeQuery({
                                query: getPoll,
                                variables: {id: this.props.pollId},
                                data: {poll: {...poll.poll, options: poll.poll.options.map((option: IOptionQuery)=> {
                                    if(option.refId === updateOption.refId) return option = updateOption
                                    return option
                                })}},
                              });
                        }}>
                            {(UPDATE_OPTION) => (
                                <form onSubmit={ // tslint:disable-next-line jsx-no-lambda
                                    (e) => {this.onSubmit(e, UPDATE_OPTION)}}>
                                    <label htmlFor={title}>Title</label>
                                    <TextInputGroup label='title' name='title' value={title} placeholder='Enter Title' onChange={this.onChange} />
                                    <label htmlFor={description}>Description</label>
                                    <textarea className="form-control" name="description" id="description" rows={3} placeholder="Enter Description"
                                        value={description}
                                        onChange={this.onChange} />
                                    <hr />
                                    <Mutation 
                                    mutation={DELETE_OPTION}
                                    update={// tslint:disable-next-line jsx-no-lambda
                                        (cache, { data: { deleteOption}}) => {
                                            const poll: any = cache.readQuery({ query: getPoll, variables: {id: this.props.pollId}})
                                            cache.writeQuery({
                                                query: getPoll,
                                                variables: {id: this.props.pollId},
                                                data: {poll: {...poll.poll, options: poll.poll.options.filter((option: IOptionQuery) => (
                                                    option.refId !== this.props.option.refId
                                                    )
                                                )}},
                                              });
                                        }
                                    }
                                    >
                                        {(DELETE_OPTION) => (
                                            <button 
                                            className="btn btn-link btn-sm d-block mb-3" 
                                            type='button' 
                                            onClick={ // tslint:disable-next-line jsx-no-lambda
                                                (e) => {this.deleteOption( DELETE_OPTION)}}>Delete Option</button>
                                        )}
                                    </Mutation>
                                    <button className="btn btn-outline-secondary w-25 mr-2" type='button' onClick={toggle}>Cancel</button>
                                    <button className="btn btn-success w-25" type='submit'>Save</button>
                                </form>
                            )}
                        </Mutation>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default OptionReadModal;