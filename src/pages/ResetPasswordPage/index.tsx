import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { LeftOutlined } from '@ant-design/icons';

import { StyledResetPasswordPage } from './style';
import { Button } from 'ui';
import { ResetPasswordForm } from './ResetPasswordForm';

export const ResetPasswordPage = () => {
  const intl = useIntl();
  const navigate = useNavigate();

  return (
    <StyledResetPasswordPage>
      <div className="form-wrapper">
        <div className="home-link">
          <Button
            label={intl.messages.home && intl.formatMessage({ id: 'home' })}
            type="link"
            className="link-btn"
            onClick={() => navigate('/')}
            icon={<LeftOutlined />}
          />
        </div>

        <ResetPasswordForm />
      </div>
    </StyledResetPasswordPage>
  );
};
