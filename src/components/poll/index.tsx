import { connect, MapDispatchToProps } from 'react-redux';
import * as React from 'react';
import { withRouter } from 'react-router-dom';

import { getPollAndAuthParticipant } from '../../graphql/getPoll';
import { setAuthTokenAndUser } from '../../actions/authActions';
import { setPseudonym } from '../../actions/userActions';
import Overview from './overview';
import { IUser, IPollQuery } from '../../interfaces';
import { RouteComponentProps } from 'react-router';
import { Store } from '../../reducers';
import { Action } from 'redux';
import { History } from 'history';
import AuthModal from './AuthModal';
import { ThunkDispatch } from 'redux-thunk';
import { compose, graphql, withApollo } from 'react-apollo';
import { ApolloClient } from 'apollo-boost';
import Results from './results';
import Settings from './settings';
import SideNav from './layout/SideNav';
import Header from './layout/Header';
import Media from 'react-media';
import { above } from '../../style/utilities';
import { Flex, Box } from '@rebass/grid';


interface Props extends RouteComponentProps<any>, PropsFromState, PropsFromDispatch {
    client: ApolloClient<any>
    data: IData
    className?: string
}

interface IData {
    loading: boolean
    error: string
    poll: IPollQuery
    authUser: IAuthUser
}

interface IAuthUser {
    isParticipant: boolean
    token: string
    user: IUser
    pseudonym: string
}


class Poll extends React.Component<Props> {

    componentDidUpdate() {
        if (!this.props.data.loading && !this.props.user.id && this.props.data.authUser) {
            const { isParticipant, token, user, pseudonym } = this.props.data.authUser
            if (isParticipant) {
                this.props.setAuthTokenAndUser(user, token)
                this.props.setPseudonym(pseudonym)
            }
        }
        if (this.props.location.search && this.props.user.id) {
            this.props.history.push(`/poll/${this.props.match.params.poll_id}`)
        }
    }

    componentWillUnmount() {
        this.props.client.resetStore();
    }

    render() {
        const { user } = this.props;
        const { loading, error }: any = this.props.data
        const pollResponse = this.props.data.poll
        const body = () => {
            if (loading) return <p>Loading...</p>
            if (error) {
                console.log({ error })
                return <p>{error.message ? error.message.replace('GraphQL error: ', '') : 'Error :('}</p>
            }
            if (pollResponse) {
                const { poll } = this.props.data
                return <React.Fragment>
                    {!user.id && <AuthModal isOpen={true} renderButton={false} poll={poll} />}
                    <Header poll={poll} pseudonym={this.props.pseudonym} />
                    {
                        this.props.match.params.pollNavRoute === "results" ? (
                            <Results poll={poll} user={user} pseudonym={this.props.pseudonym} />
                        ) : this.props.match.params.pollNavRoute === "settings" ? (
                            <Settings poll={poll} user={user} pseudonym={this.props.pseudonym} />
                        ) : (
                                    <Overview poll={poll} />
                                )
                    }

                </React.Fragment>
            }
        }
        return (<Flex>

            <Media query={above.lg.replace('@media ', '')}>
                {matches =>
                    matches && <Box width={1 / 12} >
                        <SideNav pollId={this.props.match.params.poll_id} />
                    </Box>}
            </Media>
            <Box width={11 / 12} >
                {body()}
            </Box>
        </Flex>

        )
    }

}


interface PropsFromState {
    user: IUser
    pseudonym: string
}
const mapStateToProps = (state: Store): PropsFromState => ({
    user: state.user.user,
    pseudonym: state.participant.pseudonym
});
interface PropsFromDispatch {
    getPollAndAuthParticipant: (pollId: string, queryParam: string, history: History) => void
    setAuthTokenAndUser: (user: IUser, jwt: string) => void
    setPseudonym: (pseudonym: string) => void
}
const mapDispatchToProps = (dispatch: ThunkDispatch<Store, any, Action>): MapDispatchToProps<PropsFromDispatch, void> => {
    return {
        getPollAndAuthParticipant: (pollId: string, queryParam: string, history) => dispatch(getPollAndAuthParticipant(pollId, queryParam, history)),
        setAuthTokenAndUser: (user: IUser, jwt: string) => dispatch(setAuthTokenAndUser(user, jwt)),
        setPseudonym: (pseudonym: string) => dispatch(setPseudonym(pseudonym))
    }
}


export default compose(
    withApollo,
    graphql(getPollAndAuthParticipant, {
        options: (props: Props) => ({
            variables: {
                id: props.match.params.poll_id,
                authToken: props.location.search.replace('?token=', '')
            }
        }),
        props: ({ data }) => ({ data })
    }),
    withRouter,
    connect(mapStateToProps, mapDispatchToProps))
    (Poll);


