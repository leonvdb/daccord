import React, { useState } from 'react';
import { IPollQuery, IUser } from '../../../interfaces';
import DeleteModal from './DeleteModal';

interface Props {
    poll: IPollQuery
    user: IUser
}
const Settings = (props: Props) => {
    const { poll, user } = props
    const [title, setTitle] = useState(poll.title)
    const [openEditField, setOpenEditField] = useState('')
    const isCreator = poll.creator.id.toString() === user.id

    const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setOpenEditField(e.currentTarget.name)
    }
    return (
        <React.Fragment>
            <h1>Settings</h1>
            {isCreator &&
                <div>
                    <h2>Poll</h2>
                    <DeleteModal poll={poll} />
                    <h4>Title</h4>
                    {openEditField === 'title' ?
                        <input value={title} onChange={// tslint:disable-next-line jsx-no-lambda
                            (e: React.ChangeEvent<any>) => { setTitle(e.target.value) }} /> :
                        <div>
                            <p className="d-inline-block">{poll.title}</p>
                            <button name="title" onClick={handleEditClick}>Edit</button>
                        </div>
                    }
                </div>
            }
        </React.Fragment>
    )
}

export default Settings;