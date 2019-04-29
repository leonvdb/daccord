import React, {useState} from 'react'
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
    userRating: number | null
}

const Option = (props: Props) => {
    const [modalOpen, setModalOpen] = useState(false);

    const onClick = () => {
        setModalOpen(true);
    }

    const toggle = () => {
        setModalOpen(!modalOpen)
    }
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.handleRatingChange(props.option.refId, parseInt(e.target.value, 10))
    }
        const { title, description, creator } = props.option;
        const isCreator = creator.id.toString() === props.userId.toString()

        return (
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
                <div className="card" style={{ height: 170, cursor: 'pointer' }}>
                    <div className="card-header" data-testid="option-header" onClick={onClick}>
                        <h5 className="card-title d-inline-block">{title}</h5>
                    </div>
                    <div className="card-body">
                        {/* TODO: truncate to two lines */}
                        <p className="card-text text-truncate">{description}</p>
                        <form >
                            <input
                                data-testid="rating-input"
                                onChange={onChange}
                                value={props.userRating === null ? "" : props.userRating.toString()}
                                className="mb-5" type="text" style={{ width: "30px" }} />
                        </form>
                    </div>
                </div>
                {isCreator ? (
                    <OptionEditModal
                        pollId={props.pollId}
                        option={props.option}
                        modalOpen={modalOpen}
                        toggle={toggle} />
                ) : (
                        <OptionReadModal
                            title={title}
                            description={description}
                            modalOpen={modalOpen}
                            toggle={toggle} />
                    )
                }
            </div >
        )
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