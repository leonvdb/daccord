import * as React from 'react'
import i18n from '../../i18n';
import { DropdownItem } from 'reactstrap';

interface Props {
  langName: string,
  langCode: string
}

const LanguageButton = ({ langName, langCode }: Props) => {
  const changeLanguage = (e: React.MouseEvent<HTMLButtonElement>) => {
    i18n.changeLanguage(langCode);
  }
  return (
    <div>
      <DropdownItem onClick={changeLanguage}>{langName}</DropdownItem>
    </div>
  )
}

export default LanguageButton;