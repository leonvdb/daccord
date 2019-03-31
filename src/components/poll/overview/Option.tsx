import * as React from 'react'
import { IOptionQuery } from '../../../interfaces';
import OptionReadModal from './OptionReadModal';
import OptionEditModal from './OptionEditModal';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { handleRatingChange } from '../../../actions/voteActions';

interface Props extends PropsFromDispatch {
    option: IOptionQuery
    userId: string
    pollId: string
    userRating: number
}

class Option extends React.Component<Props>{
    state = {
        modalOpen: false
    }

    onClick = () => {
        this.setState({
            modalOpen: true
        })
    }

    toggle = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }
    render() {

        const { title, description, creator } = this.props.option;
        const { modalOpen } = this.state
        const isCreator = creator.id.toString() === this.props.userId.toString()


        return (
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
                <div className="card" style={{ height: 170, cursor: 'pointer' }}>
                    <div className="card-header" data-testid="option-header" onClick={this.onClick}>
                        <h5 className="card-title d-inline-block">{title}</h5>
                    </div>
                    <div className="card-body">
                        {/* TODO: truncate to two lines */}
                        <p className="card-text text-truncate">{description}</p>
                        <form >
                            <input onChange={// tslint:disable-next-line jsx-no-lambda
                                (e) => this.props.handleRatingChange(this.props.option.refId, parseInt(e.target.value, 10))}
                                defaultValue={this.props.userRating === null ? "" : this.props.userRating.toString()}
                                className="mb-5" type="text" style={{ width: "30px" }} />
                        </form>
                    </div>
                </div>
                {isCreator ? (
                    <OptionEditModal
                        pollId={this.props.pollId}
                        option={this.props.option}
                        modalOpen={modalOpen}
                        toggle={this.toggle} />
                ) : (
                        <OptionReadModal
                            title={title}
                            description={description}
                            modalOpen={modalOpen}
                            toggle={this.toggle} />
                    )
                }
            </div >
        )
    }
}

interface PropsFromDispatch {
    handleRatingChange: (optionId: string, rating: number) => void;
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): PropsFromDispatch => {
    return {
        handleRatingChange: (optionId: string, rating: number) => dispatch(handleRatingChange(optionId, rating))
    }
}
export default connect(null, mapDispatchToProps)(Option);