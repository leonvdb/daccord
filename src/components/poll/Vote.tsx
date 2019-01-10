import * as React from 'react';
import { connect } from 'react-redux';
import { IUser } from '../../interfaces';
import { Store } from '../../reducers';

import { IOption } from '../../interfaces';

import Option from './Option';
import AddOption from './AddOption';
import AuthModal from './AuthModal';
import { clearError } from '../../actions/errorActions';

interface Props extends PropsFromState, PropsFromDispatch {
    options: IOption[]
    pollId: string
}

class Vote extends React.Component<Props> {

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.user.id) {
            this.props.clearError('PARTICIPANT_ALREADY_EXISTS')
        }
    }

    render() {
        const { options, user, pollId } = this.props;

        let button;
        if (user.id) {
            button = <AddOption />
        } else {
            button = <AuthModal isOpen={false} renderButton={true} />
        }

        return (
            <div className="container">
                <div className="mt-5 d-flex flex-wrap">

                    {button}
                    {options.map(option => (
                        <Option
                            key={option.refId}
                            option={option}
                            userId={user.id}
                            pollId={pollId}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

interface PropsFromState {
    user: IUser
}

interface PropsFromDispatch {
    clearError: (error: string) => void
}



const mapStateToProps = (state: Store) => ({
    user: state.user.user
});

export default connect(mapStateToProps, { clearError })(Vote);
