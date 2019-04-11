import * as React from 'react';
import { connect } from 'react-redux';
import { IUser, IPollQuery, IVoteNew } from '../../../interfaces';
import { Store } from '../../../reducers';

import { IOptionQuery } from '../../../interfaces';

import Option from './Option';
import AddOption from './AddOption';
import AuthModal from '../AuthModal';
import { clearError } from '../../../actions/errorActions';
import { Mutation } from 'react-apollo';
import { UPDATE_VOTES } from '../../../graphql/vote';
import { clearRatingChanges } from '../../../actions/voteActions';
import { getPoll } from '../../../graphql/getPoll';

interface Props extends PropsFromState, PropsFromDispatch {
    poll: IPollQuery
}

class Overview extends React.Component<Props> {

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.user.id) {
            this.props.clearError('PARTICIPANT_ALREADY_EXISTS')
        }
    }

    onClick = () => {
        this.props.clearRatingChanges()
    }

    render() {
        const { user, poll } = this.props;
        const { options } = poll

        let button;
        if (user.id) {
            button = <AddOption pollId={this.props.poll.refId} />
        } else {
            button = <AuthModal isOpen={false} renderButton={true} poll={poll} />
        }

        return (
            <React.Fragment>
                <div className="container-fluid px-5">

                    <div className="mt-5 d-flex flex-wrap">

                        {button}
                        {options.map(option => {
                            let rating = option.userRating;
                            this.props.votes.forEach(vote => {
                                if (vote.optionId === option.refId) {
                                    Number.isNaN(vote.rating) ? rating = null : rating = vote.rating
                                }
                            })
                            return (<Option
                                key={option.refId}
                                option={option}
                                userId={user.id}
                                pollId={poll.refId}
                                userRating={rating}
                            />)
                        }
                        )}
                    </div>
                </div>
                {this.props.votes.length > 0 &&
                    <div
                        data-testid="unsaved-changes-bar"
                        style={{ maxWidth: "inherit", width: "100%", height: "6vh", position: "fixed", bottom: "0px", display: "table", borderTop: "1px solid #ccc", background: "rgba(193, 193, 193, 0.88)" }}>
                        <div style={{ display: "table-cell", verticalAlign: "middle" }}>
                            <p style={{ display: "inline-block" }} className="ml-5">you made changes that are currently unsaved</p>
                            <Mutation mutation={UPDATE_VOTES}
                                update={// tslint:disable-next-line jsx-no-lambda
                                    (cache, { data: { updateVotes } }) => {
                                        if (updateVotes) this.props.clearRatingChanges()
                                        const poll: any = cache.readQuery({ query: getPoll, variables: { id: this.props.poll.refId } });
                                        cache.writeQuery({
                                            query: getPoll,
                                            variables: { id: this.props.poll.refId },
                                            data: {
                                                poll: {
                                                    ...poll.poll, options: poll.poll.options.map((option: IOptionQuery) => {
                                                        updateVotes.forEach((updatedOption: IOptionQuery) => {
                                                            if (updatedOption.refId === option.refId) {
                                                                return option = updatedOption
                                                            }
                                                        })
                                                        return option
                                                    })
                                                }
                                            },
                                        });
                                    }}>
                                {(UPDATE_VOTES) => (
                                    <button
                                        className="btn btn-secondary mr-5"
                                        style={{ float: "right", display: "inline-block" }}
                                        onClick={() => {// tslint:disable-next-line jsx-no-lambda
                                            UPDATE_VOTES({ variables: { pollId: this.props.poll.refId, votes: this.props.votes } })
                                        }
                                        }>
                                        Save
                            </button>
                                )}
                            </Mutation>
                            <button
                                data-testid="cancel-button"
                                className="btn btn-link mr-2"
                                style={{ float: "right", display: "inline-block" }}
                                onClick={this.onClick}
                            >
                                cancel
                                </button>
                        </div>
                    </div>
                }
            </React.Fragment>
        );
    }
}

interface PropsFromState {
    user: IUser
    votes: IVoteNew[]
}

interface PropsFromDispatch {
    clearError: (error: string) => void
    clearRatingChanges: () => void
}



const mapStateToProps = (state: Store) => ({
    user: state.user.user,
    votes: state.votes.votes
});

export default connect(mapStateToProps, { clearError, clearRatingChanges })(Overview);
