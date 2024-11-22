import { StyledChatText } from './style';
import dayjs from 'dayjs';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';

interface ChatTextProps {
    label: string;
    isUser: number;
    date: string;
    isAnswerRight: number;
}

const ChatText = ({ date, label, isUser, isAnswerRight }: ChatTextProps) => {
  const formattedDate = dayjs(date).format('DD.MM.YYYY HH:mm');
  const user = isUser == 1;
  const isClose = user && isAnswerRight == 1;
  const isCheck = user && isAnswerRight == 2;
  return (
    <StyledChatText className={`chat-message ${isUser == 1 ? 'right' : 'left'}`}>
        <div className={`chat-message__text ${isCheck ? 'check': ''} ${isClose ? 'close' : ''}`}>
          {label}
          {(isCheck) && <CheckCircleFilled />}
          {(isClose) && <CloseCircleFilled />}
        </div>
        <p className='chat-date'>{formattedDate}</p>
    </StyledChatText>
  )
}

export default ChatText;