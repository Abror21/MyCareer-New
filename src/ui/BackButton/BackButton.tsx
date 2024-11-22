import { StyledBackButton } from './style';
import { LeftOutlined } from '@ant-design/icons';

type BackButtonProps = {
  onClick?: any;
  label?: string;
  color?: string;
};

export const BackButton = ({ onClick, label, color = 'white' }: BackButtonProps) => {
  return (
    <StyledBackButton type="link" icon={<LeftOutlined />} onClick={onClick} className={`${color}`}>
      {label}
    </StyledBackButton>
  );
};
