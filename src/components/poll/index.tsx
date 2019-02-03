import { connect, MapDispatchToProps } from 'react-redux';
import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from "react-apollo";
import gql from "graphql-tag";

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
        const { poll, user } = this.props;
        console.log("run render")

        return (
            <Query
                query={gql`
                {
  poll(id:"${this.props.match.params.poll_id}"){
    title
    refId
    creator{
        id
    }
    options{
        title
        description
        refId
        creator{
            id
        }
    }
  }
}`
                }>
                {({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>
                    if (error) return <p>Error :( </p>
                    console.log({ data })
                    return <React.Fragment>
                        {!user.id && <AuthModal isOpen={true} renderButton={false} />}
                        <div className="container">
                            <h1 className="display-4 text-center mt-5">{poll.title}</h1>
                            {data.poll.creator.id.toString() === user.id &&
                                <DeleteModal poll={data.poll} />
                            }
                            <Vote options={data.poll.options} pollId={data.poll.refId} />
                        </div>
                    </React.Fragment>
                }}
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


