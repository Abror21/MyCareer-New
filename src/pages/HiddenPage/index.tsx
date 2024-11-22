import React from 'react';
import { StyledHiddenPage } from './style';
import { useIntl } from 'react-intl';
import SvgSelector from 'assets/icons/SvgSelector';
import { Button } from 'ui';
import { useNavigate } from 'react-router-dom';

export function HiddenPage() {
  const intl = useIntl();
  const navigate = useNavigate()
  return (
    <StyledHiddenPage>
      <div className="inner">
        <div>
          <SvgSelector id="hidden-page" />
        </div>
        <div className='title'>{intl.formatMessage({ id: 'hiddenPage.title' })}</div>
        <div>
            <Button type='primary' className='btn' label={intl.formatMessage({id: "goToMainPage"})} onClick={() => navigate('/')}/>
        </div>
      </div>
    </StyledHiddenPage>
  );
}
