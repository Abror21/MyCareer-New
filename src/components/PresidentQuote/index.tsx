import SvgSelector from 'assets/icons/SvgSelector';
import { StyledPresidentQuote } from './style';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

export const PresidentQuote = () => {
  const intl = useIntl();
  const navigate = useNavigate()
  return (
    <StyledPresidentQuote>
      <div className="container  ">
        <div className="quote-svg">
          <SvgSelector id="quote-svg" />
        </div>
        <div className="president_quote-inner">
          <div className="left-side">
            <h3>{intl.messages.presidentQuoteMessage && intl.formatMessage({ id: 'presidentQuoteMessage' })}</h3>
            <h4>{intl.messages.presidentQuoteSignature && intl.formatMessage({ id: 'presidentQuoteSignature' })}</h4>
          </div>
          <div className="right-side">
            <h5 className='text'>{intl.messages.presidentSource && intl.formatMessage({ id: 'presidentSource' })}</h5>
            <h5 role='link' className='link' onClick={() => navigate("https://president.uz")}>
              {intl.messages.presidentQuoteLink && intl.formatMessage({ id: 'presidentQuoteLink' })}
            </h5>
          </div>
        </div>
      </div>
    </StyledPresidentQuote>
  );
};
