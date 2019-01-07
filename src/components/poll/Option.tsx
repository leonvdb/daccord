import * as React from 'react'
import { IOption } from '../../interfaces';
import OptionModal from './OptionModal';

interface Props {
    option: IOption
    userId: string
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

        const isCreator = creator.toString() === this.props.userId.toString()


        return (
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
                <div className="card" style={{ height: 150, cursor: 'pointer' }} onClick={this.onClick}>
                    <div className="card-header">
                        <h5 className="card-title d-inline-block">{title}</h5>
                    </div>
                    <div className="card-body">
                        <p className="card-text">{description}</p>
                    </div>
                </div>
                <OptionModal
                    name={title}
                    description={description}
                    modalOpen={modalOpen}
                    isCreator={isCreator}
                    toggle={this.toggle} />
            </div >
        )
    }
}
export default Option;