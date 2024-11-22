import { message } from 'antd';
import { useIntl } from 'react-intl';
import { smoothScroll } from './globalFunctions';

interface ErrorProps {
  data: any;
  error: string;
  global?: boolean;
}

message.config({
  maxCount: 5,
  duration: 2,
});

function useHandleError() {
  const intl = useIntl();
  const handleError = (data: ErrorProps) => {
    if (data.global && data.error) {
      message.error(intl.formatMessage({ id: data.error }));
    }
    smoothScroll('top', 0);
  };

  return [handleError];
}

export default useHandleError;
