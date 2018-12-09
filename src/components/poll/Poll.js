import React, { Component } from 'react';
import { connect } from 'react-redux';

import Vote from './Vote';
import { getPoll } from '../../actions/pollActions';

class Poll extends Component {

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

const mapStateToProps = state => ({
    poll: state.poll.poll
});

export default connect(mapStateToProps, { getPoll })(Poll);