import * as React from 'react';
import { connect } from 'react-redux';
import { IUserState } from '../../interfaces';
import { Store } from '../../reducers';

import { IOption } from '../../interfaces';

import Option from './Option';
import AddOption from './AddOption';
import AuthModal from './AuthModal';

interface Props extends PropsFromState { options: IOption[] }

class Vote extends React.Component<Props> {

    render() {
        const { options, user } = this.props;

        let button;
        if (user.userId) {
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
                        />
                    ))}
                </div>
            </div>
        );
    }
}

interface PropsFromState {
    user: IUserState
}


const mapStateToProps = (state: Store) => ({
    user: state.user.user
});

export default connect(mapStateToProps, null)(Vote);
