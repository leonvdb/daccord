import * as React from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components';
import { TextInputGroup } from '../../layout/TextInputGroup';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Store } from '../../../reducers';
import { Mutation } from "react-apollo";
import { createOption } from '../../../graphql/cudOption';
import { getPoll } from '../../../graphql/getPoll'
import { SecondaryButton } from '../../../style/elements';
import PlusPurple from '../../../images/plus-purple.svg';

interface Props extends PropsFromState {
    pollId: string
    className?: string
}

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

    onSubmit = (e: React.FormEvent<HTMLFormElement>, mutation: any) => {
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
        mutation({ variables: { pollId: this.props.pollId, userId, title, description } })
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

            <div className={this.props.className}>
                <SecondaryButton
                    id="Modal"
                    onClick={this.toggle}
                    className="btn btn-light border">
                    <img src={PlusPurple} alt="Add Option" /> Add Option
                </SecondaryButton>
                <Modal placement="right" isOpen={addOptionOpen} target="Modal" toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add a new option</ModalHeader>
                    <ModalBody>
                        <Mutation
                            mutation={createOption}
                            update={ // tslint:disable-next-line jsx-no-lambda
                                (cache, { data: { createOption } }) => {
                                    const poll: any = cache.readQuery({ query: getPoll, variables: { id: this.props.pollId } })
                                    cache.writeQuery({
                                        query: getPoll,
                                        variables: { id: this.props.pollId },
                                        data: { poll: { ...poll.poll, options: [createOption, ...poll.poll.options] } },
                                    });
                                }}
                        >
                            {(createOption) => (
                                <div >
                                    <form onSubmit={ // tslint:disable-next-line jsx-no-lambda
                                        (e) => { this.onSubmit(e, createOption) }}>
                                        <TextInputGroup
                                            label="Title"
                                            testId="title-input"
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

                            )}
                        </Mutation>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state: Store) => ({
    userId: state.user.user.id
});

interface PropsFromState {
    userId: string
}

const styledAddOption = styled(AddOption)`
${SecondaryButton}{
    margin: 0;
    padding: .5rem 1rem;
    img{
        margin: 0 .6875rem 0.23rem 0;
    }
}
`

export default connect(mapStateToProps, {})(styledAddOption);
