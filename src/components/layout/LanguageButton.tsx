import * as React from 'react'
import i18n from '../../i18n';
import { setLanguage } from '../../actions/langActions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppAction } from 'src/interfaces';
import styled from 'styled-components';

interface Props extends PropsFromDispatch {
  langName: string,
  langCode: string
  className?: string
}

class LanguageButton extends React.Component<Props> {


  changeLanguage = (e: React.MouseEvent<HTMLDivElement>) => {
    i18n.changeLanguage(this.props.langCode);
    this.props.setLanguage(this.props.langName);
  }

  render() {
    return (
      <div className={this.props.className} onClick={// tslint:disable-next-line jsx-no-lambda
        (e) => { this.changeLanguage(e) }}>{this.props.langName}</div>
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

const styledLanguageButton = styled(LanguageButton)`
cursor: pointer;
`;

export default connect<null, PropsFromDispatch>(null, mapDispatchToProps)(styledLanguageButton);