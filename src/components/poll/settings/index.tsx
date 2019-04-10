import * as React from 'react';
import { IPollQuery, IUser } from '../../../interfaces';
import DeleteModal from './DeleteModal';

interface Props {
    poll: IPollQuery
    user: IUser
}

const Settings = (props: Props) => {
    const { poll, user } = props
    const isCreator = poll.creator.id.toString() === user.id
    return (
        <React.Fragment>
            <h1>Settings</h1>
            {isCreator && <DeleteModal poll={poll} />}
        </React.Fragment>
    )
}

export default Settings;