import * as React from 'react';
import { Query } from 'react-apollo';
import { GET_VOTES_FROM_OPTION } from '../../../graphql/getOption';
import { IOptionQuery, IOptionDetails, IUser, IPollQuery } from '../../../interfaces';

interface Props {
    option: IOptionQuery
    poll: IPollQuery
    user: IUser
    rank: number
}

class ResultDetails extends React.Component<Props> {
    render(){
        const { poll, option } = this.props
        return <Query query={GET_VOTES_FROM_OPTION} variables={{pollId: poll.refId, optionId: option.refId}}>
        {({loading, error, data}) => {
            if (loading) return <p>Loading...</p>
            if (error) return <p>Error :(</p>
            const queryOption: IOptionDetails = data.option
            return (
                <React.Fragment>
                    <p>My Vote: {option.userRating}</p>
                    <p>Agreement: {option.result.agreementInPercent}%</p>
                    <p>Participation: {queryOption.votes.length/(poll.participants.length + 1) * 100}%</p>
                    <p>Rank: {this.props.rank}</p>

                    {queryOption.votes.map(vote => {
                        if (vote.voter.user.id !== this.props.user.id){
                            return <div className="bg-info" key={vote.id}>
                                <p>{vote.rating}</p>
                                <p>{vote.voter.pseudonym}</p>
                            </div>
                        }
                    })}
                </React.Fragment>
            )
        }}
        </Query>
    }
}

export default ResultDetails;