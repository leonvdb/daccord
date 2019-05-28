import * as React from 'react';
import { connect } from 'react-redux';
import { IUser, IPollQuery, IVoteNew } from '../../../interfaces';
import { Store } from '../../../reducers';
import styled from 'styled-components'

import { IOptionQuery } from '../../../interfaces';
import { TableCellWrapper, PrimaryButton, Label, Container, SmallerLabel } from '../../../style/elements';
import { darkerGray, above } from '../../../style/utilities';

import Option from './Option';
import AddOption from './AddOption';
import AuthModal from '../AuthModal';
import { clearError } from '../../../actions/errorActions';
import { Mutation } from 'react-apollo';
import { UPDATE_VOTES } from '../../../graphql/vote';
import { clearRatingChanges } from '../../../actions/voteActions';
import { getPoll } from '../../../graphql/getPoll';
import Media from 'react-media';
import { Flex, Box } from '@rebass/grid';

interface Props extends PropsFromState, PropsFromDispatch {
    poll: IPollQuery
}

class Overview extends React.Component<Props> {

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.user.id) {
            this.props.clearError('PARTICIPANT_ALREADY_EXISTS')
        }
    }

    onClick = () => {
        this.props.clearRatingChanges()
    }

    render() {
        const { user, poll } = this.props;
        const { options } = poll

        let button;
        if (user.id) {
            button = <AddOption pollId={this.props.poll.refId} />
        } else {
            button = <AuthModal isOpen={false} renderButton={true} poll={poll} />
        }

        return (
            <React.Fragment>

                <Container>
                    <ToolBar>
                        <Media query={above.lg.replace('@media ', '')}>
                            {matches =>
                                matches && <React.Fragment>

                                    <ToolBarBox width={[1, 1, 1, 11 / 17, 12 / 17].map((val) => val * (17 / 18))} pl={["1rem", "1.625rem"]}>
                                        <Label>
                                            Title
                                    </Label>
                                    </ToolBarBox>
                                    <ToolBarBox>
                                        <Label >
                                            My Opposition
    </Label>
                                    </ToolBarBox>
                                </React.Fragment>

                            }

                        </Media>
                        <ToolBarBox flex={1} className="flex-d-row">
                            {button}
                        </ToolBarBox>
                    </ToolBar>

                    <OptionsWrapper>
                        {options.map(option => {
                            let rating = option.userRating;
                            this.props.votes.forEach(vote => {
                                if (vote.optionId === option.refId) {
                                    rating = vote.rating
                                }
                            })
                            return (<Option
                                key={option.refId}
                                option={option}
                                userId={user.id}
                                pollId={poll.refId}
                                userRating={rating}
                            />)
                        }
                        )}
                    </OptionsWrapper>
                </Container>
                {this.props.votes.length > 0 &&
                    <UnsavedChangesBar
                        data-testid="unsaved-changes-bar">
                        <TableCellWrapper widthInPercent={99}>
                            <Media query={above.custom(700).replace('@media ', '')}>
                                {matches =>
                                    matches && <p>You made changes that are currently unsaved</p>}
                            </Media>
                        </TableCellWrapper>
                        <TableCellWrapper widthInPercent={1}>
                            <SmallerLabel data-testid="cancel-button"
                                onClick={this.onClick}>
                                cancel
                                    </SmallerLabel>
                        </TableCellWrapper>
                        <TableCellWrapper widthInPercent={1}>
                            <Mutation mutation={UPDATE_VOTES}
                                update={// tslint:disable-next-line jsx-no-lambda
                                    (cache, { data: { updateVotes } }) => {
                                        if (updateVotes) this.props.clearRatingChanges()
                                        const poll: any = cache.readQuery({ query: getPoll, variables: { id: this.props.poll.refId } });
                                        cache.writeQuery({
                                            query: getPoll,
                                            variables: { id: this.props.poll.refId },
                                            data: {
                                                poll: {
                                                    ...poll.poll, options: poll.poll.options.map((option: IOptionQuery) => {
                                                        updateVotes.forEach((updatedOption: IOptionQuery) => {
                                                            if (updatedOption.refId === option.refId) {
                                                                return option = updatedOption
                                                            }
                                                        })
                                                        return option
                                                    })
                                                }
                                            },
                                        });
                                    }}>
                                {(UPDATE_VOTES) => (
                                    <PrimaryButton onClick={() => {// tslint:disable-next-line jsx-no-lambda
                                        UPDATE_VOTES({ variables: { pollId: this.props.poll.refId, votes: this.props.votes } })
                                    }
                                    }>
                                        Save
                                </PrimaryButton>

                                )}
                            </Mutation>
                        </TableCellWrapper>
                    </UnsavedChangesBar>
                }
            </React.Fragment>
        );
    }
}


const OptionsWrapper = styled.div`
padding-top: 5.8125rem;
`;

export const ToolBar = styled(Flex)`
width:100%;
height: 2.375rem;
max-width: calc(100% - 2rem);
${above.custom(460)}{
    max-width: calc(100% - 4rem);
}
${above.lg}{
    max-width: calc(${11 / 12 * 100}% - 4rem);
}
${above.custom(1100)}{
    max-width: calc(${11 / 12 * 100}% - 9rem);
}
${above.custom(1400)}{
    max-width: calc(${11 / 12 * 100}% - 10.625rem);
}
position: fixed;
margin-top: 2rem;
align-items: stretch;
flex-direction: row;
.flex-d-row{
    flex-direction: row;
}
`
const ToolBarBox = styled(Box)`
display: flex;
  flex-direction: column;
  justify-content: flex-end;
  ${Label}{
      margin-bottom: 0;
  }
  button{
      align-self: flex-end;
  }
`

const UnsavedChangesBar = styled.div`
width: 100%;
max-width: 100%;
${above.lg}{
    max-width: ${11 / 12 * 100}%;
}
width: 100%;
height: 3.4375rem;
padding: 0 5.3125rem;
position: fixed;
bottom: 0;
display: table;
p{
    margin: 0;
    font-size: .75rem;
    color: ${darkerGray}
}
${SmallerLabel}{
    cursor: pointer;
}
background: rgba(255, 255, 255, 0.88);
box-shadow: 0px -2px 8px rgba(104, 104, 104, 0.25);
backdrop-filter: blur(4px);
`;

interface PropsFromState {
    user: IUser
    votes: IVoteNew[]
}

interface PropsFromDispatch {
    clearError: (error: string) => void
    clearRatingChanges: () => void
}


const mapStateToProps = (state: Store) => ({
    user: state.user.user,
    votes: state.votes.votes
});

export default connect(mapStateToProps, { clearError, clearRatingChanges })(Overview);
