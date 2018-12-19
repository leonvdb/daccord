import { connect } from 'react-redux';
import * as React from 'react';

import { getPoll, clearPollFromState } from '../actions/pollActions';
import Vote from './poll/Vote';
import { IPoll } from '../interfaces';
import { RouteComponentProps } from 'react-router';
import { Store } from '../reducers';
import { Dispatch } from 'redux';
import { AppAction } from 'src/interfaces';

interface Props extends RouteComponentProps<any>, PropsFromState, PropsFromDispatch { }

class Poll extends React.Component<Props> {

    componentDidMount() {
        this.props.getPoll(this.props.match.params.poll_id);
    }

    componentWillUnmount() {
        this.props.clearPollFromState()
    }

    render() {
        const { poll } = this.props;

        return (
            <div className="container">
                <h1 className="display-4 text-center mt-5">{poll.title}</h1>
                <Vote options={poll.options} />
            </div>
        )
    }
}

const mapStateToProps = (state: Store) => ({
    poll: state.poll.poll
});

const mapDispatchToProps = (dispatch: Dispatch<AppAction>): PropsFromDispatch => {
    return {
        clearPollFromState: () => dispatch(clearPollFromState()),
        getPoll: (pollId: string) => getPoll(pollId)
    }
}

export default connect<PropsFromState, PropsFromDispatch, void>(mapStateToProps, mapDispatchToProps)(Poll);

interface PropsFromState {
    poll: IPoll
}
interface PropsFromDispatch {
    getPoll: (pollId: string) => void
    clearPollFromState: () => void
}