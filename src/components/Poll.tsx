import { connect, MapDispatchToProps } from 'react-redux';
import * as React from 'react';
import { withRouter } from 'react-router-dom';

import { getPoll, clearPollFromState } from '../actions/pollActions';
import Vote from './poll/Vote';
import { IPoll, IUserState } from '../interfaces';
import { RouteComponentProps } from 'react-router';
import { Store } from '../reducers';
import { Action } from 'redux';
import { History } from 'history';
import AuthModal from './poll/AuthModal';
import DeleteModal from './poll/DeleteModal';
import { ThunkDispatch } from 'redux-thunk';

interface Props extends RouteComponentProps<any>, PropsFromState, PropsFromDispatch { }

class Poll extends React.Component<Props> {

    componentDidMount() {
        //If token parameter is included getPoll authenticates the user and redirects to address without token
        this.props.getPoll(this.props.match.params.poll_id, this.props.location.search, this.props.history)
    }

    componentWillUnmount() {
        this.props.clearPollFromState()
    }

    render() {
        const { poll, user } = this.props;

        return (
            <React.Fragment>
                {!user.userId && <AuthModal isOpen={true} renderButton={false} />}
                <div className="container">
                    <h1 className="display-4 text-center mt-5">{poll.title}</h1>
                    {poll.creator.toString() === user.userId &&
                        <DeleteModal poll={poll} />
                    }
                    <Vote options={poll.options} pollId={poll.refId} />
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state: Store): PropsFromState => ({
    poll: state.poll.poll,
    user: state.user.user
});

const mapDispatchToProps = (dispatch: ThunkDispatch<Store, any, Action>): MapDispatchToProps<PropsFromDispatch, void> => {
    return {
        clearPollFromState: () => dispatch(clearPollFromState()),
        getPoll: (pollId: string, queryParam: string, history) => dispatch(getPoll(pollId, queryParam, history)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Poll));

interface PropsFromState {
    poll: IPoll
    user: IUserState
}
interface PropsFromDispatch {
    getPoll: (pollId: string, queryParam: string, history: History) => void
    clearPollFromState: () => void
}