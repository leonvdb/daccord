import React, { useState } from 'react'
import styled from 'styled-components';
import { IOptionQuery } from '../../../interfaces';
import OptionReadModal from './OptionReadModal';
import OptionEditModal from './OptionEditModal';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { handleRatingChange } from '../../../actions/voteActions';
import { TableCellWrapper, HeadingTwo } from '../../../style/elements';

interface Props extends PropsFromDispatch {
    option: IOptionQuery
    userId: string
    pollId: string
    userRating: number | null
    className?: string
}

const Option = (props: Props) => {
    const [modalOpen, setModalOpen] = useState(false);

    const onClick = () => {
        setModalOpen(true);
    }

    const toggle = () => {
        setModalOpen(!modalOpen)
    }
    // const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     props.handleRatingChange(props.option.refId, parseInt(e.target.value, 10))
    // }
    const { title, description, creator } = props.option;
    const isCreator = creator.id.toString() === props.userId.toString()

    return (
        <div className={props.className}>
            <TableCellWrapper widthInPercent={50}>
                <HeadingTwo onClick={onClick}>
                    {title}
                </HeadingTwo>
            </TableCellWrapper>
            {/* <form >
                <input
                    data-testid="rating-input"
                    onChange={onChange}
                    value={props.userRating === null ? "" : props.userRating.toString()}
                    className="mb-5" type="text" style={{ width: "30px" }} />
            </form> */}
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

const styledOption = styled(Option)`
width: 100%;
height: 3.5rem;
max-height: 3.5rem;
margin-bottom: .5625rem;
background: white;
box-shadow: 0px 2px 8px rgba(104, 104, 104, 0.25);
border-radius: 5px;
display: table;
${HeadingTwo}{
    margin: 0 0 0 1.625rem;
}
`

export default connect(null, mapDispatchToProps)(styledOption);