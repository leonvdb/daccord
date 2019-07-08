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
import { LargeStrongLabel, LargeSecondaryLabel, TernaryLabel, SecondaryButton, PrimaryButton } from '../style/elements';
import { Flex, Box } from '@rebass/grid';
import styled, { css } from 'styled-components';
import Step from './poll/layout/Step';
import { mediumGray, primaryStrong, smallerLabel, above, below } from '../style/utilities';
import Media from 'react-media';

interface Props extends RouteComponentProps<any>, PropsFromDispatch, WithNamespaces {
    className?: string
}

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
        <div data-testid="create-poll-form" className={props.className}>
            <Flex>
                <CloseButton>
                    <button data-testid="close-button" type="button" // tslint:disable-next-line jsx-no-lambda
                        onClick={() => {
                            props.history.goBack();
                        }}>
                        Close <img src={Close} />
                    </button>
                </CloseButton>
                <InputArea width={[1, 1, 1, 1 / 2]}>
                    <LargeStrongLabel>{t("Creating a new poll")}</LargeStrongLabel>
                    <TernaryLabel>Step {counter}</TernaryLabel>
                    <LargeSecondaryLabel>Information about you</LargeSecondaryLabel>
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

                                    <div>
                                        {counter === counterLimit &&
                                            <PrimaryButton type="submit"
                                                data-testid="finish-button">
                                                Finish
                                            </PrimaryButton>
                                        }
                                        {counter !== counterLimit &&
                                            <PrimaryButton
                                                onClick={handleNext}
                                                type="button"
                                                data-testid="next-button">
                                                Next
                                        </PrimaryButton>
                                        }
                                        {counter > 1 && <SecondaryButton onClick={handlePrevious} type="button">Previous</SecondaryButton>}
                                    </div>
                                </form>

                            )
                        }}
                    </Mutation>
                </InputArea>
                <Media query={above.lg.replace('@media ', '')}>
                    {matches => matches && <Box width={[1 / 2]}>
                        <ProgressBar>
                            <Step count="1" focused={counter === 1} active={counter >= 1}>General Information</Step>
                            <Bar overlay={true} progress={counter === 1 ? 1 / 2 : 1} />
                            <Bar overlay={false} progress={counter === 1 ? 1 / 2 : 1} />
                            <Step count="2" focused={counter === 2} active={counter >= 2}>Information about you</Step>
                        </ProgressBar>
                    </Box>
                    }
                </Media>
            </Flex>
        </div>
    )
};

const ProgressBar = styled.div`
    margin-top: 32.25rem;
    margin-left: 1.875rem;
    ${above.custom(1300)}{
    margin-left: .875rem;
}
`

const Bar = styled.div<{ progress: number, overlay: boolean }>`
${({ progress }) => progress === 1 / 2 ? css`margin-bottom: -4px;` : css`margin-top: -4px;`}
height: 3.125rem;
width: 2px;
background-color: ${mediumGray};
margin-left: 17px;
transition: height ease-in-out .4s;
${({ progress, overlay }) => overlay ? css`
    position: absolute;
    background-color: ${primaryStrong};
    height: ${progress * 3.125}rem;
`: ''
    }
`;

const CloseButton = styled.div`
position: absolute;
right: 0;
padding: 2rem;
button{
    border: none;
    background-color: inherit;
    ${smallerLabel}
}
`

const InputArea = styled(Box)`
padding: 0 1.5rem;
margin-top: 5.5rem;
${below.custom(1050)}{
    ${LargeStrongLabel}{
        font-size: 2.8rem;
    }
}
${above.sm}{
margin-top: 15.5rem;
padding: 0 3rem;
}
${above.custom(1300)}{
padding: 0 6.75rem;
}
`;

interface PropsFromDispatch {
    setAuthTokenAndUser: (user: IUser, jwt: string) => void
    setPseudonym: (pseudonym: string) => void
}

const StyledCreatePoll = styled(CreatePoll)`
${LargeStrongLabel}{
    margin-bottom: 5.125rem;
    margin-top: 0;
}
button{
    float: right; 
}
${SecondaryButton}{
    padding: 0.5rem 1.75rem;
    font-size: 1.125rem;
}
${PrimaryButton}{
    margin: 0;
}
`

const ComponentWithNamespaces = withNamespaces()(StyledCreatePoll)
export default connect<void, PropsFromDispatch, void>(null, { setAuthTokenAndUser, setPseudonym })(ComponentWithNamespaces);