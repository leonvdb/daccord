import * as React from 'react';
import { connect } from 'react-redux';
import { setAuthTokenAndUser } from '../actions/authActions';
import { setPseudonym } from '../actions/userActions';
import TextInputGroup from './layout/TextInputGroup';
import { IUser } from '../interfaces';
import { RouteComponentProps } from 'react-router';
import { WithNamespaces, withNamespaces } from 'react-i18next';
import validateEmail from '../utilities/validateEmail';
import { Mutation } from 'react-apollo';
import { CREATE_POLL } from '../graphql/cudPoll';

interface Props extends RouteComponentProps<any>, PropsFromDispatch, WithNamespaces { }

interface State {
    title: string
    email: string
    name: string
    description: string
    errors: Errors
}

interface Errors {
    email?: string
    title?: string
    name?: string
    description?: string
}

class CreatePoll extends React.Component<Props, State> {
    state: State = {
        title: '',
        email: '',
        name: '',
        description: '',
        errors: {}
    };

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const propertyName = e.target.name
        const value = e.target.value
        this.setState(prevState => {
            const newState = { ...prevState };
            newState[propertyName] = value
            return newState
        })
    };

    onSubmit = (e: React.FormEvent<HTMLFormElement>, mutation: any) => {
        e.preventDefault();

        const { title, email, name, description } = this.state

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
        mutation({variables: {title, userEmail: email, userName: name, description}})

    }

    render() {
        const { title, email, errors, name, description } = this.state;
        const { t } = this.props
        return (
            <div className="container">
                <h1 className="display-5 text-center my-4">{t("Create a new poll")}</h1>
                <Mutation mutation={CREATE_POLL}
                update={// tslint:disable-next-line jsx-no-lambda
                    (cache, { data: { createPoll}}) => {
                        const {token, user, poll, pseudonym} = createPoll
                        this.props.setAuthTokenAndUser(user, token)
                        this.props.setPseudonym(pseudonym)
                        this.props.history.push(`/poll/${poll.refId}`)
                    }
                }
                >
                {(CREATE_POLL) => (
                <form onSubmit={ // tslint:disable-next-line jsx-no-lambda
                    (e) => {this.onSubmit(e, CREATE_POLL)}}>
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
                        label="Description"
                        name="description"
                        placeholder="Enter Description"
                        value={description}
                        onChange={this.onChange}
                        error={errors.description}
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
                    <TextInputGroup
                        classNames="w-50"
                        label="Name"
                        name="name"
                        placeholder="Enter Name"
                        value={name}
                        onChange={this.onChange}
                        error={errors.name}
                        />
                    <button className="btn btn-secondary mx-auto btn-block w-50 mt-5" type="submit">Create</button>
                </form>

                )}
                        </Mutation>
            </div>
        )
    };
};


interface PropsFromDispatch {
    setAuthTokenAndUser: ( user: IUser, jwt: string) => void
    setPseudonym: (pseudonym: string) => void
}


const ComponentWithNamespaces = withNamespaces()(CreatePoll)
export default connect<void, PropsFromDispatch, void>(null, { setAuthTokenAndUser, setPseudonym })(ComponentWithNamespaces);