import { connect, MapDispatchToProps } from 'react-redux';
import * as React from 'react';
import { withRouter } from 'react-router-dom';

import { getPollAndAuthParticipant } from '../../graphql/getPoll';
import { setAuthTokenAndUser } from '../../actions/authActions';
import Overview from './overview';
import { IPoll, IUser, IPollQuery} from '../../interfaces';
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


interface Props extends RouteComponentProps<any>, PropsFromState, PropsFromDispatch { 
    client: ApolloClient<any>
    data: IData
}

interface IData {
    loading: boolean
    error: string
    poll: IPollQuery
    authUser: IAuthUser
}

interface IAuthUser {
    token: string,
    user: IUser
    pseudonym: string
}


class Poll extends React.Component<Props> {

    componentDidUpdate(){
        if(!this.props.data.loading && !this.props.user.id && this.props.data.authUser.token){
            const {token, user} = this.props.data.authUser
            this.props.setAuthTokenAndUser(token, user)
            console.log({pseudonym: this.props.data.authUser.pseudonym})
        }
        if(this.props.location.search && this.props.user.id){
            this.props.history.push(`/poll/${this.props.match.params.poll_id}`)
        }
    }

    componentWillUnmount() {
        this.props.client.resetStore();
    }

    render() {
        const { user } = this.props;
        const { loading, error} = this.props.data
        const pollResponse = this.props.data.poll
        const body = () => {
            if (loading) return <p>Loading...</p>
            if (error) {
                console.log({ error })
                return <p>Error :( </p>
            }
            if(pollResponse) {
                const {poll} = this.props.data
                return <React.Fragment>
                        {!user.id && <AuthModal isOpen={true} renderButton={false} poll={poll}/>}
                            {
                                this.props.match.params.pollNavRoute === "results" ? (
                                    <Results poll={poll} user={user}/>
                                ) : this.props.match.params.pollNavRoute === "settings" ? (
                                    <Settings poll={poll} user={user}/>
                                ) : (
                                    <React.Fragment>
                                        <h1 className="display-4 text-center mt-5">{poll.title}</h1>
                                        <Overview options={poll.options} poll={poll}/>
                                    </React.Fragment>
                                )
                            }
                            
                    </React.Fragment>}
        }
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-1" style={{paddingLeft: "0px", paddingRight: "0px"}}>
                            <SideNav pollId={this.props.match.params.poll_id}/>
                        </div>
                        <div className="col-11" style={{paddingLeft: "0px", paddingRight: "0px"}}>
                            {body()}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

}
interface PropsFromState {
    poll: IPoll
    user: IUser
}
const mapStateToProps = (state: Store): PropsFromState => ({
    poll: state.poll.poll,
    user: state.user.user
});
interface PropsFromDispatch {
    getPollAndAuthParticipant: (pollId: string, queryParam: string, history: History) => void
    setAuthTokenAndUser: (jwt: string, user: IUser) => void
}
const mapDispatchToProps = (dispatch: ThunkDispatch<Store, any, Action>): MapDispatchToProps<PropsFromDispatch, void> => {
    return {
        getPollAndAuthParticipant: (pollId: string, queryParam: string, history) => dispatch(getPollAndAuthParticipant(pollId, queryParam, history)),
        setAuthTokenAndUser: (jwt: string, user: IUser) => dispatch(setAuthTokenAndUser(jwt, user))
    }
}

export default compose(
    withApollo,
    graphql(getPollAndAuthParticipant, {
        options: (props: Props) => ({
            variables: {
                id: props.match.params.poll_id,
                authToken: props.location.search.replace('?token=','')
            }
        }),
        props: ({data}) => ({data})
    }),
    withRouter,
    connect(mapStateToProps, mapDispatchToProps))
    (Poll);


