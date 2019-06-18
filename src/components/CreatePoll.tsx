import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setAuthTokenAndUser } from '../actions/authActions';
import { setPseudonym } from '../actions/userActions';
import { TextInputGroup } from './layout/TextInputGroup';
import { IUser } from '../interfaces';
import { RouteComponentProps } from 'react-router';
import { WithNamespaces, withNamespaces } from 'react-i18next';
import validateEmail from '../utilities/validateEmail';
import { Mutation } from 'react-apollo';
import { CREATE_POLL } from '../graphql/cudPoll';
import Close from '../images/close.svg';
import { LargeStrongLabel } from '../style/elements';

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
    const [counter, setCounter] = useState(1);

    const counterLimit = 2;

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

    const handlePrevious = () => {
        setCounter(counter - 1)
    }

    const handleNext = () => {
        if (validate()) setCounter(counter + 1)
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>, mutation: any) => {
        e.preventDefault();
        if (validate()) mutation({ variables: { title, userEmail: email, userName: name, description } })
    }

    const validate = () => {
        const currentErrors: Errors = {}
        switch (counter) {
            case 1:
                if (title.length <= 0) currentErrors.title = 'Please enter a title';
                break;
            case 2:
                if (!validateEmail(email)) currentErrors.email = 'Please enter a valid email address.';
                if (name.length <= 0) currentErrors.name = 'Please enter a name';
                break;
        }
        if (Object.keys(currentErrors).length > 0) {
            setErrors(currentErrors)
            return false;
        }
        return true
    }

    const { t } = props
    return (
        <div data-testid="create-poll-form">
            <div>
                <button data-testid="close-button" className="nav-link float-right" type="button" // tslint:disable-next-line jsx-no-lambda
                    onClick={() => {
                        props.history.goBack();
                    }}>
                    Close <img src={Close} />
                </button>
            </div>
            <LargeStrongLabel>{t("Creating a new poll")}</LargeStrongLabel>
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
                {(CREATE_POLL, { loading, error }) => {
                    if (loading) return <div data-testid="loading-state">Loading...</div>
                    if (error) return <div>Error :(</div>
                    return (
                        <form onSubmit={ // tslint:disable-next-line jsx-no-lambda
                            (e) => { onSubmit(e, CREATE_POLL) }}>
                            {counter === 1 && <div>
                                <TextInputGroup
                                    label="Title"
                                    testId="title-input"
                                    name="title"
                                    placeholder="Enter Title"
                                    value={title}
                                    onChange={onChange}
                                    error={errors.title}
                                />
                                <TextInputGroup
                                    label="Description"
                                    testId="description-input"
                                    name="description"
                                    placeholder="Enter Description"
                                    value={description}
                                    onChange={onChange}
                                    error={errors.description}
                                />
                            </div>
                            }
                            {counter === 2 && <div>
                                <TextInputGroup
                                    label="Email"
                                    testId="email-input"
                                    name="email"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={onChange}
                                    error={errors.email}
                                />
                                <TextInputGroup
                                    label="Name"
                                    testId="name-input"
                                    name="name"
                                    placeholder="Enter Name"
                                    value={name}
                                    onChange={onChange}
                                    error={errors.name}
                                />
                            </div>
                            }
                            <div className="mx-auto w-50 clearfix">
                                {counter > 1 && <button className="btn btn-secondary w-25 mt-5 d-inline-block" onClick={handlePrevious} type="button">Previous</button>}
                                {counter === counterLimit &&
                                    <button
                                        className="btn btn-primary w-25 mt-5 d-inline-block float-right"
                                        type="submit"
                                        data-testid="finish-button" >
                                        Finish
                            </button>
                                }
                                {counter !== counterLimit &&
                                    <button
                                        className="btn btn-primary w-25 mt-5 d-inline-block float-right"
                                        onClick={handleNext}
                                        type="button"
                                        data-testid="next-button">
                                        Next
                            </button>
                                }
                            </div>
                        </form>

                    )
                }}
            </Mutation>
            <span className="mx-auto mt-5 d-block text-center">
                {counter}/{counterLimit}
            </span>
        </div>
    )
};


interface PropsFromDispatch {
    setAuthTokenAndUser: (user: IUser, jwt: string) => void
    setPseudonym: (pseudonym: string) => void
}


const ComponentWithNamespaces = withNamespaces()(CreatePoll)
export default connect<void, PropsFromDispatch, void>(null, { setAuthTokenAndUser, setPseudonym })(ComponentWithNamespaces);