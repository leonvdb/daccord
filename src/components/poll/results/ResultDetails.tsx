import * as React from 'react';
import { Query } from 'react-apollo';
import { GET_VOTES_FROM_OPTION } from '../../../graphql/getOption';
import { IOptionQuery, IUser, IPollQuery } from '../../../interfaces';
import CircularProgressBar from '../layout/CircularProgressBar';
import { colorScale } from '../../../style/utilities';
import styled from 'styled-components';
import { Divider } from '../../../style/elements';

interface Props {
    option: IOptionQuery
    poll: IPollQuery
    user: IUser
    rank: number
    className?: string
}

const ResultDetails = (props: Props) => {

    const { poll, option } = props
    return <Query query={GET_VOTES_FROM_OPTION} variables={{ pollId: poll.refId, optionId: option.refId }} >
        {({ loading, error, data }) => {
            if (loading) return <p data-testid="loading-state">Loading...</p>
            if (error) return <p>Error :(</p>
            // const queryOption: IOptionDetails = data.option
            const { agreementInPercent, participationInPercent } = option.result
            const agreementColor = colorScale(100 - agreementInPercent)
            const participationColor = colorScale(100 - participationInPercent)
            return (
                <div data-testid="result-details" className={props.className}>
                    <Divider />
                    {/* <p>Rank: {rank}</p>
                        <p data-testid="my-vote">My Vote: {option.userRating}</p> */}
                    <CircularProgressBar sqSize={62} strokeWidth={7} percentage={agreementInPercent} color={agreementColor} />
                    <CircularProgressBar sqSize={62} strokeWidth={7} percentage={participationInPercent} color={participationColor} />

                    {/* {queryOption.votes.map(vote => {
                            if (vote.voter.user.id !== this.props.user.id) {
                                return <div className="bg-info" key={vote.id}>
                                    <p>{vote.rating}</p>
                                    <p>{vote.voter.pseudonym}</p>
                                </div>
                            }
                        })} */}
                </div>
            )
        }}
    </Query>
}

export default styled(ResultDetails)`
font-size: 1rem;
`;