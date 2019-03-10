import * as React from 'react';
import { connect } from 'react-redux';
import { IUser, IPollQuery } from '../../interfaces';
import { Store } from '../../reducers';

import { IOptionQuery } from '../../interfaces';

import Option from './Option';
import AddOption from './AddOption';
import AuthModal from './AuthModal';
import { clearError } from '../../actions/errorActions';

interface Props extends PropsFromState, PropsFromDispatch {
    options: IOptionQuery[]
    poll: IPollQuery
}

class Vote extends React.Component<Props> {

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
            <div className="container">
                <button onClick={()=> {// tslint:disable-next-line jsx-no-lambda
                    console.log(this.props.votes)}
                    }>
                        Save Votes
                </button>
                <div className="mt-5 d-flex flex-wrap">

                    {button}
                    {options.map(option => (
                        <Option
                            key={option.refId}
                            option={option}
                            userId={user.id}
                            pollId={poll.refId}
                        />
                    ))}
                </div>
            </div>
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
    votes: state.votes
});

export default connect(mapStateToProps, { clearError })(Vote);
