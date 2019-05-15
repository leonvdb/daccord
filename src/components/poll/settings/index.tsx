import React, { useState, useEffect } from 'react';
import { IPollQuery, IUser } from '../../../interfaces';
import DeleteModal from './DeleteModal';
import { UPDATE_POLL } from '../../../graphql/cudPoll';
import { getPoll } from '../../../graphql/getPoll';
import EditField from './EditField';
import { UPDATE_PARTICIPANT } from '../../../graphql/cudParticipant';
import { setPseudonym } from '../../../actions/userActions';
import { Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import WithdrawModal from './WithdrawModal';
import { Container } from '../../../style/elements';

interface Props extends PropsFromDispatch {
    poll: IPollQuery
    user: IUser
    pseudonym: string
}

interface Errors {
    pseudonym?: string,
    title?: string
}

const Settings = (props: Props) => {
    const { poll, user } = props
    const [title, setTitle] = useState(poll.title)
    const [description, setDescription] = useState(poll.description)
    const [pseudonym, setPseudonym] = useState(props.pseudonym)
    const [openEditField, setOpenEditField] = useState('')
    const [errors, setErrors]: [Errors, ({ }: Errors) => void] = useState({})
    const isCreator = poll.creator.id.toString() === user.id

    useEffect(() => {
        if (props.pseudonym !== pseudonym && openEditField !== 'pseudonym') setPseudonym(props.pseudonym);
    })

    const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setOpenEditField(e.currentTarget.name)

    }
    const onSubmit = (e: React.FormEvent<HTMLFormElement>, mutation: any) => {
        e.preventDefault()
        const currentErrors: Errors = {}
        if (title.length <= 0) { currentErrors.title = 'Please enter a Title' }
        if (Object.keys(currentErrors).length > 0) {
            setErrors(currentErrors)
            return;
        }
        mutation({ variables: { pollId: poll.refId, title, description } })
        setOpenEditField('')
        setErrors({})
    }
    const onSubmitPseudonym = (e: React.FormEvent<HTMLFormElement>, mutation: any) => {
        e.preventDefault()
        const currentErrors: Errors = {}
        if (pseudonym.length <= 0) { currentErrors.pseudonym = 'Please enter a pseudonym' }
        if (Object.keys(currentErrors).length > 0) {
            setErrors(currentErrors)
            return;
        }
        mutation({ variables: { pollId: poll.refId, pseudonym } })
        setOpenEditField('')
        setErrors({})
    }
    const cancel = () => {
        if (openEditField === 'title') setTitle(poll.title)
        if (openEditField === 'description') setDescription(poll.description)
        if (openEditField === 'pseudonym') setPseudonym(props.pseudonym)
        setOpenEditField('')
        setErrors({})
    }

    return (
        <Container>
            <h1>Settings</h1>
            <h2>User</h2>
            <EditField
                label="Pseudonym"
                open={openEditField === 'pseudonym'}
                mutation={UPDATE_PARTICIPANT}
                poll={poll}
                value={pseudonym}
                setValue={setPseudonym}
                name="pseudonym"
                placeholder="Enter Pseudonym"
                onSubmit={onSubmitPseudonym}
                cancel={cancel}
                handleEditClick={handleEditClick}
                error={errors.pseudonym}
                update={// tslint:disable-next-line jsx-no-lambda
                    (cache, { data: { updateParticipant } }) => {
                        props.setPseudonym(updateParticipant);
                    }} />
            {!isCreator &&
                <div>
                    <WithdrawModal poll={poll} />
                </div>}
            {isCreator &&
                <div>
                    <h2>Poll</h2>
                    <DeleteModal poll={poll} />
                    <EditField
                        label="Title"
                        open={openEditField === 'title'}
                        mutation={UPDATE_POLL}
                        poll={poll}
                        value={title}
                        setValue={setTitle}
                        name="title"
                        placeholder="Enter Title"
                        onSubmit={onSubmit}
                        cancel={cancel}
                        handleEditClick={handleEditClick}
                        error={errors.title}
                        update={// tslint:disable-next-line jsx-no-lambda
                            (cache, { data: { updatePoll } }) => {
                                const poll: any = cache.readQuery({ query: getPoll, variables: { id: props.poll.refId } })
                                cache.writeQuery({
                                    query: getPoll,
                                    variables: { id: props.poll.refId },
                                    data: { poll: { ...poll.poll, title: updatePoll.title } },
                                });
                            }} />
                    <EditField
                        label="Description"
                        open={openEditField === 'description'}
                        mutation={UPDATE_POLL}
                        poll={poll}
                        value={description}
                        setValue={setDescription}
                        name='description'
                        placeholder="Enter description"
                        onSubmit={onSubmit}
                        cancel={cancel}
                        handleEditClick={handleEditClick}
                        update={// tslint:disable-next-line jsx-no-lambda
                            (cache, { data: { updatePoll } }) => {
                                const poll: any = cache.readQuery({ query: getPoll, variables: { id: props.poll.refId } })
                                cache.writeQuery({
                                    query: getPoll,
                                    variables: { id: props.poll.refId },
                                    data: { poll: { ...poll.poll, description: updatePoll.description } },
                                });
                            }}
                    />
                </div>
            }
        </Container>
    )
}

interface PropsFromDispatch {
    setPseudonym: (pseudonym: string) => void
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): PropsFromDispatch => {
    return {
        setPseudonym: (pseudonym: string) => dispatch(setPseudonym(pseudonym))
    }

}

export default connect(null, mapDispatchToProps)(Settings);