import React, { useState } from 'react';
import { IPollQuery, IUser } from '../../../interfaces';
import DeleteModal from './DeleteModal';
import { UPDATE_POLL } from '../../../graphql/cudPoll';
import { getPoll } from '../../../graphql/getPoll';
import EditField from './EditField';
import { UPDATE_PARTICIPANT } from '../../../graphql/cudParticipant';

interface Props {
    poll: IPollQuery
    user: IUser
    pseudonym: string
}

const Settings = (props: Props) => {
    const { poll, user } = props
    const [title, setTitle] = useState(poll.title)
    const [description, setDescription] = useState(poll.description)
    const [pseudonym, setPseudonym] = useState(props.pseudonym)
    const [openEditField, setOpenEditField] = useState('')
    const isCreator = poll.creator.id.toString() === user.id

    const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setOpenEditField(e.currentTarget.name)

    }
    const onSubmit = (e: React.FormEvent<HTMLFormElement>, mutation: any) => {
        e.preventDefault()
        mutation({ variables: { pollId: poll.refId, title, description } })
        setOpenEditField('')
    }
    const onSubmitPseudonym = (e: React.FormEvent<HTMLFormElement>, mutation: any) => {
        e.preventDefault()
        mutation({ variables: { pollId: poll.refId, pseudonym } })
        setOpenEditField('')
    }
    const cancel = () => {
        setOpenEditField('')
    }
    return (
        <React.Fragment>
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
                update={// tslint:disable-next-line jsx-no-lambda
                    (cache, { data: { updateParticipant } }) => {
                        console.log(updateParticipant)
                        // const poll: any = cache.readQuery({ query: getPoll, variables: { id: props.poll.refId } })
                        // cache.writeQuery({
                        //     query: getPoll,
                        //     variables: { id: props.poll.refId },
                        //     data: { poll: { ...poll.poll, title: updatePoll.title } },
                        // });
                    }} />
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
        </React.Fragment>
    )
}

export default Settings;