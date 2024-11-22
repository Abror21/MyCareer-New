import { useIntl } from 'react-intl';
import { StyledProgresBarCreateCV } from './style';
import { Progress } from 'ui';

export const ProgresBar = ({ progressPercentage }: { progressPercentage: number | undefined }) => {
  const intl = useIntl();
  let roundendNum;
  if (progressPercentage) {
    roundendNum = Math.ceil(progressPercentage);
  }
  return (
    <StyledProgresBarCreateCV>
      <div className="progres-bar">
        <h2>
          {intl.messages.completed && intl.formatMessage({ id: 'completed' })} {roundendNum}%
        </h2>
        <Progress percent={roundendNum} size={['', 20]} showInfo={false} />
      </div>
    </StyledProgresBarCreateCV>
  );
};
