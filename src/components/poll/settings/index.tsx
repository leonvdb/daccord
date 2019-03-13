import * as React from 'react';
import { IPollQuery, IUser } from '../../../interfaces';
import DeleteModal from './DeleteModal';

interface Props {
    poll: IPollQuery
    user: IUser
}
class Settings extends React.Component<Props>{
    render(){
        const {poll, user} = this.props
        return (
            <React.Fragment>
                <h1>Settings</h1>
                {poll.creator.id.toString() === user.id && <DeleteModal poll={poll} />}
            </React.Fragment>
        )
    }
}

export default Settings;