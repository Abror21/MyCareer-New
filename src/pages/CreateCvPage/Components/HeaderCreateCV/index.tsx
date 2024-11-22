/* eslint-disable jsx-a11y/anchor-is-valid */
import { useNavigate } from 'react-router-dom';
import { StyledHeaderCreateCv } from './style';
import { useIntl } from 'react-intl';
import { BackButton } from 'ui';

type Props = {
  currentFormIndex: number;
};
export const HeaderCreateCV = (props: Props) => {
  const navigate = useNavigate();
  const intl = useIntl();
  return (
    <StyledHeaderCreateCv>
      <div className="navigate-back">
        <BackButton label={intl.messages.back && intl.formatMessage({ id: 'back' })} color="white" onClick={() => navigate(-1)} />
      </div>
      <h1 dangerouslySetInnerHTML={{ __html: intl.messages.createCvTitle && intl.formatMessage({ id: 'createCvTitle' }) }} />
    </StyledHeaderCreateCv>
  );
};
