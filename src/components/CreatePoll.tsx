import React, { useState } from 'react';
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

interface Errors {
    email?: string
    title?: string
    name?: string
    description?: string
}

const CreatePoll = (props: Props) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors]: [Errors, ({ }: Errors) => void] = useState({});

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const propertyName = e.target.name
        const { value } = e.target
        switch (propertyName) {
            case 'title':
                setTitle(value);
                break;
            case 'description':
                setDescription(value);
                break;
            case 'name':
                setName(value);
                break;
            case 'email':
                setEmail(value);
                break;
        }
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>, mutation: any) => {
        e.preventDefault();
        const currentErrors: Errors = {}
        if (!validateEmail(email)) currentErrors.email = 'Please enter a valid email address.'
        if (title.length <= 0) currentErrors.title = 'Please enter a title'
        if (Object.keys(currentErrors).length > 0) {
            setErrors(currentErrors)
            return;
        }
        mutation({ variables: { title, userEmail: email, userName: name, description } })
    }

    const { t } = props
    return (
        <div className="container">
            <h1 className="display-5 text-center my-4">{t("Create a new poll")}</h1>
            <Mutation mutation={CREATE_POLL}
                update={// tslint:disable-next-line jsx-no-lambda
                    (cache, { data: { createPoll } }) => {
                        const { token, user, poll, pseudonym } = createPoll
                        props.setAuthTokenAndUser(user, token)
                        props.setPseudonym(pseudonym)
                        props.history.push(`/poll/${poll.refId}`)
                    }
                }
            >
                {(CREATE_POLL) => (
                    <form onSubmit={ // tslint:disable-next-line jsx-no-lambda
                        (e) => { onSubmit(e, CREATE_POLL) }}>
                        <TextInputGroup
                            classNames="w-50"
                            label="Title"
                            name="title"
                            placeholder="Enter Title"
                            value={title}
                            onChange={onChange}
                            error={errors.title}

                        />
                        <TextInputGroup
                            classNames="w-50"
                            label="Description"
                            name="description"
                            placeholder="Enter Description"
                            value={description}
                            onChange={onChange}
                            error={errors.description}
                        />
                        <TextInputGroup
                            classNames="w-50"
                            label="Email"
                            name="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={onChange}
                            error={errors.email}
                        />
                        <TextInputGroup
                            classNames="w-50"
                            label="Name"
                            name="name"
                            placeholder="Enter Name"
                            value={name}
                            onChange={onChange}
                            error={errors.name}
                        />
                        <button className="btn btn-secondary mx-auto btn-block w-50 mt-5" type="submit">Create</button>
                    </form>

                )}
            </Mutation>
        </div>
    )
};


interface PropsFromDispatch {
    setAuthTokenAndUser: (user: IUser, jwt: string) => void
    setPseudonym: (pseudonym: string) => void
}


const ComponentWithNamespaces = withNamespaces()(CreatePoll)
export default connect<void, PropsFromDispatch, void>(null, { setAuthTokenAndUser, setPseudonym })(ComponentWithNamespaces);