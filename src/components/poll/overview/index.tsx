import * as React from 'react';
import { connect } from 'react-redux';
import { IUser, IPollQuery } from '../../../interfaces';
import { Store } from '../../../reducers';

import { IOptionQuery } from '../../../interfaces';

import Option from './Option';
import AddOption from './AddOption';
import AuthModal from '../AuthModal';
import { clearError } from '../../../actions/errorActions';
import { Mutation } from 'react-apollo';
import { UPDATE_VOTES } from '../../../graphql/vote';

interface Props extends PropsFromState, PropsFromDispatch {
    options: IOptionQuery[]
    poll: IPollQuery
}

class Overview extends React.Component<Props> {

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.user.id) {
            this.props.clearError('PARTICIPANT_ALREADY_EXISTS')
        }
    }

    render() {
        const { options, user, poll } = this.props;

        let button;
        if (user.id) {
            button = <AddOption pollId={this.props.poll.refId}/>
        } else {
            button = <AuthModal isOpen={false} renderButton={true} poll={poll}/>
        }

        return (
            <React.Fragment>
            <div className="container-fluid w-100">
            
                <div className="mt-5 d-flex flex-wrap">

                    {button}
                    {options.map(option => (
                        <Option
                            key={option.refId}
                            option={option}
                            userId={user.id}
                            pollId={poll.refId}
                            userRating={option.userRating}
                        />
                    ))}
                </div>
            </div>
                <div style={{maxWidth: "inherit", width: "100%", height: "6vh", position: "fixed", bottom: "0px", display: "table", borderTop: "1px solid #ccc",background: "rgba(193, 193, 193, 0.88)"}}>
                <div style={{display: "table-cell", verticalAlign: "middle"}}>
                <p style={{ display: "inline-block"}} className="ml-4">you made changes that are currently unsaved</p>
                    <Mutation mutation={UPDATE_VOTES}>
                        {(UPDATE_VOTES) => (
                        <button 
                        className="btn btn-secondary mr-4"
                        style={{float: "right", display: "inline-block"}}
                        onClick={()=> {// tslint:disable-next-line jsx-no-lambda
                        UPDATE_VOTES({variables: {pollId: this.props.poll.refId, votes: this.props.votes}})}
                        }>
                            Save
                        </button>
                        )}
                    </Mutation>
                </div>
                </div>
            </React.Fragment>
        );
    }
}

interface PropsFromState {
    user: IUser
    votes: []
}

interface PropsFromDispatch {
    clearError: (error: string) => void
}



const mapStateToProps = (state: Store) => ({
    user: state.user.user,
    votes: state.votes.votes
});

export default connect(mapStateToProps, { clearError })(Overview);
