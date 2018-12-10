import { connect } from 'react-redux';
import * as React from 'react';

import { getPoll } from '../actions/pollActions';
import Vote from './poll/Vote';
import { IPoll } from '../interfaces';
import { RouteComponentProps } from 'react-router';
import { Store } from 'src/reducers';

interface Props extends RouteComponentProps<any>, PropsFromState, PropsFromDispatch { }

class Poll extends React.Component<Props> {

    componentDidMount() {
        this.props.getPoll(this.props.match.params.poll_id);
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

export default connect<PropsFromState, PropsFromDispatch, void>(mapStateToProps, { getPoll })(Poll);

interface PropsFromState {
    poll: IPoll
}
interface PropsFromDispatch {
    getPoll: (pollId: string) => void
}