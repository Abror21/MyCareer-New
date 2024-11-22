import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';

import { Button } from 'ui';
import { StyledUnauthorizedPage } from './style';

export const UnauthorizedPage = () => {
  const intl = useIntl();
  const navigate = useNavigate();

  return (
    <StyledUnauthorizedPage>
      <p className="message">{intl.messages['error.unauthorized']&&  intl.formatMessage({ id: 'error.unauthorized' })}</p>
      <Button
        label={intl.messages.home && intl.formatMessage({ id: 'home' })}
        type="default"
        className="cancel-btn"
        onClick={() => navigate('/')}
      />
    </StyledUnauthorizedPage>
  );
};
