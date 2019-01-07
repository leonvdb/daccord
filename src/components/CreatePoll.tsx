import * as React from 'react';
import { connect } from 'react-redux';
import { createPoll } from '../actions/pollActions';
import TextInputGroup from './layout/TextInputGroup';
import { INewPoll, IPoll } from '../interfaces';
import { RouteComponentProps } from 'react-router';
import { Store } from '../reducers';
import { WithNamespaces, withNamespaces } from 'react-i18next';
import validateEmail from 'src/utilities/validateEmail';

interface Props extends RouteComponentProps<any>, PropsFromState, PropsFromDispatch, WithNamespaces { }

interface State {
    title: string,
    email: string,
    errors: Errors
}

interface Errors {
    email?: string,
    title?: string
}

class CreatePoll extends React.Component<Props, State> {
    state: State = {
        title: '',
        email: '',
        errors: {}
    };

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.poll.refId) {
            this.props.history.push(`/poll/${nextProps.poll.refId}`)
        }
    }


    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const propertyName = e.target.name
        const value = e.target.value
        this.setState(prevState => {
            const newState = { ...prevState };
            newState[propertyName] = value
            return newState
        })
    };

    onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { title, email } = this.state

        // Form validation
        const errors: Errors = {}
        if (!validateEmail(email)) {
            errors.email = 'Please enter a valid email address.'
        }

        if (title.length <= 0) {
            errors.title = 'Please enter a title'
        }

        if (Object.keys(errors).length > 0) {
            this.setState({
                errors
            })
            return;
        }

        const newPoll: INewPoll = {
            title,
            email
        };
        this.props.createPoll(newPoll)

    }

    render() {
        const { title, email, errors } = this.state;
        const { t } = this.props
        return (
            <div className="container">
                <h1 className="display-5 text-center my-4">{t("Create a new poll")}</h1>
                <form onSubmit={this.onSubmit}>
                    <TextInputGroup
                        classNames="w-50"
                        label="Title"
                        name="title"
                        placeholder="Enter Title"
                        value={title}
                        onChange={this.onChange}
                        error={errors.title}

                    />
                    <TextInputGroup
                        classNames="w-50"
                        label="Email"
                        name="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={this.onChange}
                        error={errors.email}
                    />
                    <button className="btn btn-secondary mx-auto btn-block w-50 mt-5" type="submit">Create</button>
                </form>
            </div>
        )
    };
};

interface PropsFromState {
    poll: IPoll
}
interface PropsFromDispatch {
    createPoll: (poll: INewPoll) => void
}

const mapStateToProps = (state: Store) => ({
    poll: state.poll.poll
});

const ComponentWithNamespaces = withNamespaces()(CreatePoll)
export default connect<PropsFromState, PropsFromDispatch, void>(mapStateToProps, { createPoll })(ComponentWithNamespaces);