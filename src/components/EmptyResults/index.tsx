import { useIntl } from 'react-intl';

import { StyledEmptyResults } from './style';
import { Button } from 'ui';

interface EmptyResultsProps {
  onClick?: () => void;
}

export const EmptyResults = ({ onClick }: EmptyResultsProps) => {
  const intl = useIntl();

  return (
    <StyledEmptyResults>
      <div className="results">
        <div className="results-title">{intl.messages.searchResults && intl.formatMessage({ id: 'searchResults' })}</div>
        <div className="results-text">{intl.messages.noTalentsFound && intl.formatMessage({ id: 'noTalentsFound' })}</div>
        <div className="results-btn">
          <Button label={intl.messages.ok && intl.formatMessage({ id: 'ok' })} onClick={onClick} />
        </div>
      </div>
    </StyledEmptyResults>
  );
};
