import { connect } from 'react-redux';
import * as React from 'react';

import { getPoll } from '../actions/pollActions';
import Vote from './poll/Vote';

class Poll extends React.Component {

    componentDidMount() {
        this.props.getPoll(this.props.match.params.poll_id);
    }

    render() {
        const { poll } = this.props;

        return (
            <React.Fragment>
                <h1>I will be a poll container</h1>
                <h3>The poll id is: {this.props.match.params.poll_id}</h3>
                <h3>The poll title is:{poll.title}</h3>
                <Vote options={poll.options} />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    poll: state.poll.poll
});

export default connect(mapStateToProps, { getPoll })(Poll);