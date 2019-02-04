import * as React from 'react'
import { IOptionQuery } from '../../interfaces';
import OptionReadModal from './OptionReadModal';
import OptionEditModal from './OptionEditModal';

interface Props {
    option: IOptionQuery
    userId: string
    pollId: string
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
                <div className="card" style={{ height: 150, cursor: 'pointer' }} onClick={this.onClick}>
                    <div className="card-header">
                        <h5 className="card-title d-inline-block">{title}</h5>
                    </div>
                    <div className="card-body">
                        {/* TODO: truncate to two lines */}
                        <p className="card-text text-truncate">{description}</p>
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
export default Option;