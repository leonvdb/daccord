import * as React from 'react'
import i18n from '../../i18n';
import { DropdownItem } from 'reactstrap';
import { setLanguage } from 'src/actions/langActions';
import { connect } from 'react-redux';

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

export default connect(null, { setLanguage })(LanguageButton);