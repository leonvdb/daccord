import { connect, MapDispatchToProps } from 'react-redux';
import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from "react-apollo";

import { getPoll as getPollQuery } from '../../graphql/getPoll';
import getCurrentPoll from '../../graphql/getCurrentPoll';
import { getPoll, clearPollFromState } from '../../actions/pollActions';
import Vote from './Vote';
import { IPoll, IUser } from '../../interfaces';
import { RouteComponentProps } from 'react-router';
import { Store } from '../../reducers';
import { Action } from 'redux';
import { History } from 'history';
import AuthModal from './AuthModal';
import DeleteModal from './DeleteModal';
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
        const { user } = this.props;
        return (
            <Query query={getPollQuery} variables={{ id: this.props.match.params.poll_id, authToken: this.props.location.search }}>
                {({ loading: serverLoading, error, data: serverData }) => (
                    <Query query={getCurrentPoll}>
                        {({ loading: clientLoading, data: clientData }) => {
                            if (serverLoading || clientLoading) return <p>Loading...</p>
                            if (error) {
                                console.log({ error })
                                return <p>Error :( </p>
                            }
                            console.log({ serverData, clientData })
                            const { poll } = serverData.poll
                            return <React.Fragment>
                                {!user.id && <AuthModal isOpen={true} renderButton={false} />}
                                <div className="container">
                                    <h1 className="display-4 text-center mt-5">{poll.title}</h1>
                                    {poll.creator.id.toString() === user.id &&
                                        <DeleteModal poll={poll} />
                                    }
                                    <Vote options={poll.options} pollId={poll.refId} />
                                </div>
                            </React.Fragment>
                        }}
                    </Query>
                )}
            </Query>
        )
    }
}
interface PropsFromState {
    poll: IPoll
    user: IUser
}
const mapStateToProps = (state: Store): PropsFromState => ({
    poll: state.poll.poll,
    user: state.user.user
});
interface PropsFromDispatch {
    getPoll: (pollId: string, queryParam: string, history: History) => void
    clearPollFromState: () => void
}
const mapDispatchToProps = (dispatch: ThunkDispatch<Store, any, Action>): MapDispatchToProps<PropsFromDispatch, void> => {
    return {
        clearPollFromState: () => dispatch(clearPollFromState()),
        getPoll: (pollId: string, queryParam: string, history) => dispatch(getPoll(pollId, queryParam, history)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Poll));


