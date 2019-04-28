import * as React from 'react'
import i18n from '../../i18n';
import { DropdownItem } from 'reactstrap';
import { setLanguage } from '../../actions/langActions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppAction } from '../../interfaces';

interface Props extends PropsFromDispatch {
  langName: string,
  langCode: string
}

class LanguageButton extends React.Component<Props> {


  changeLanguage = (e: React.MouseEvent<HTMLButtonElement>) => {
    i18n.changeLanguage(this.props.langCode);
    this.props.setLanguage(this.props.langName);
  }

  render() {
    return (
      <div>
        <DropdownItem onClick={this.changeLanguage}>{this.props.langName}</DropdownItem>
      </div>
    )

  }
}
interface PropsFromDispatch {
  setLanguage: (language: string) => void
}

/**
 * If this is written like this the action creator does not need redux thunk, because this 
 * mapDispatchToProps function can dispatch the action directly.
 */
function mapDispatchToProps(dispatch: Dispatch<AppAction>): PropsFromDispatch {
  return {
    setLanguage: (language) => dispatch(setLanguage(language))
  }
}

export default connect<null, PropsFromDispatch>(null, mapDispatchToProps)(LanguageButton);