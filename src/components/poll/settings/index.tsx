import React, { useState } from 'react';
import { IPollQuery, IUser } from '../../../interfaces';
import DeleteModal from './DeleteModal';
import TextInputGroup from '../../layout/TextInputGroup';
import { UPDATE_POLL } from '../../../graphql/cudPoll';
import { Mutation } from 'react-apollo';
import { getPoll } from '../../../graphql/getPoll';

interface Props {
    poll: IPollQuery
    user: IUser
}
const Settings = (props: Props) => {
    const { poll, user } = props
    const [title, setTitle] = useState(poll.title)
    const [description, setDescription] = useState(poll.description)
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
    const cancel = () => {
        setOpenEditField('')
    }
    return (
        <React.Fragment>
            <h1>Settings</h1>
            {isCreator &&
                <div>
                    <h2>Poll</h2>
                    <DeleteModal poll={poll} />
                    <div>
                        <h4>Title</h4>
                        {openEditField === 'title' ?
                            <Mutation
                                mutation={UPDATE_POLL}
                                update={// tslint:disable-next-line jsx-no-lambda
                                    (cache, { data: { updatePoll } }) => {
                                        const poll: any = cache.readQuery({ query: getPoll, variables: { id: props.poll.refId } })
                                        cache.writeQuery({
                                            query: getPoll,
                                            variables: { id: props.poll.refId },
                                            data: { poll: { ...poll.poll, title: updatePoll.title } },
                                        });
                                    }
                                }
                            >
                                {(UPDATE_POLL, { loading, error }) => {
                                    if (loading) return <div>Loading...</div>
                                    if (error) return <div>Error :(</div>
                                    return <form name="title" data-testid="edit-title-form" onSubmit={ // tslint:disable-next-line jsx-no-lambda
                                        (e) => { onSubmit(e, UPDATE_POLL) }}>
                                        <TextInputGroup
                                            value={title}
                                            onChange={// tslint:disable-next-line jsx-no-lambda
                                                (e: React.ChangeEvent<any>) => { setTitle(e.target.value) }}
                                            name="title"
                                            placeholder="Enter Title "
                                            testId="title-input" />
                                        <button data-testid="title-save-button">Save</button>
                                        <button type="button" onClick={cancel}>cancel</button>
                                    </form>
                                }}
                            </Mutation> :
                            <div>
                                <p className="d-inline-block">{poll.title}</p>
                                <button data-testid="edit-title-button" name="title" onClick={handleEditClick}>Edit</button>
                            </div>
                        }
                    </div>
                    <div>
                        <h4>Description</h4>
                        {openEditField === 'description' ?
                            <Mutation
                                mutation={UPDATE_POLL}
                                update={// tslint:disable-next-line jsx-no-lambda
                                    (cache, { data: { updatePoll } }) => {
                                        const poll: any = cache.readQuery({ query: getPoll, variables: { id: props.poll.refId } })
                                        cache.writeQuery({
                                            query: getPoll,
                                            variables: { id: props.poll.refId },
                                            data: { poll: { ...poll.poll, description: updatePoll.description } },
                                        });
                                    }
                                }
                            >
                                {(UPDATE_POLL, { loading, error }) => {
                                    if (loading) return <div>Loading...</div>
                                    if (error) return <div>Error :(</div>
                                    return <form name="description" data-testid="edit-description-form" onSubmit={ // tslint:disable-next-line jsx-no-lambda
                                        (e) => { onSubmit(e, UPDATE_POLL) }}>
                                        <TextInputGroup
                                            value={description ? description : ''}
                                            onChange={// tslint:disable-next-line jsx-no-lambda
                                                (e: React.ChangeEvent<any>) => { setDescription(e.target.value) }}
                                            name="description"
                                            placeholder="Enter Description "
                                            testId="description-input" />
                                        <button data-testid="description-save-button">Save</button>
                                        <button type="button" onClick={cancel}>cancel</button>
                                    </form>
                                }}
                            </Mutation> :
                            <div>
                                <p className="d-inline-block">{poll.description}</p>
                                <button data-testid="edit-description-button" name="description" onClick={handleEditClick}>Edit</button>
                            </div>
                        }
                    </div>
                </div>
            }
        </React.Fragment>
    )
}

export default Settings;