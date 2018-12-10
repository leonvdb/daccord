import * as React from 'react';
import { connect } from 'react-redux';
import { createPoll } from '../actions/pollActions';
import TextInputGroup from './layout/TextInputGroup';
import { NewPoll } from 'src/interfaces';
import { RouteComponentProps } from 'react-router';

interface Props extends RouteComponentProps<any>, PropsFromState, PropsFromDispatch { }

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

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState(prevState => {
            let newState = { ...prevState };
            newState[e.target.name] = e.target.value
            return newState
        })
    };

    onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { title, email } = this.state

        // Form validation
        const errors: Errors = {}
        const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
        if (!validEmail) {
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

        const newPoll: NewPoll = {
            title,
            email
        };
        this.props.createPoll(newPoll)
            .then(poll => {
                this.props.history.push(`/poll/${poll.ref_id}`)
            })
            .catch(error => console.error(error));

    }

    render() {
        const { title, email, errors } = this.state;
        return (
            <div className="container">
                <h1 className="display-5 text-center my-4">Creating a new poll</h1>
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
}
interface PropsFromDispatch {
    createPoll: (poll: NewPoll) => void
}

export default connect<PropsFromState, PropsFromDispatch, void>(null, { createPoll })(CreatePoll);