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

const LanguageButton = (props: Props) => {

  const changeLanguage = (e: React.MouseEvent<HTMLDivElement>) => {
    i18n.changeLanguage(props.langCode);
    props.setLanguage(props.langName);
  }
  return (
    <div className={props.className} onClick={// tslint:disable-next-line jsx-no-lambda
      (e) => { changeLanguage(e) }}>{props.langName}</div>
  )

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