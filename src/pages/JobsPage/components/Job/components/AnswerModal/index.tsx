import React from 'react'
import { StyledAnswerModal } from './style'
import { Typography } from 'antd';
import { useUserState } from 'contexts/UserContext';

interface AnswerModalProps {
    isOpen: boolean;
    position: string;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AnswerModal = ({ position, isOpen, setIsOpen }: AnswerModalProps) => {
    const user = useUserState();
    
  return (
    <StyledAnswerModal
        open={isOpen}
        centered
        footer
        onCancel={() => setIsOpen(false)}
    >
        <Typography.Text strong>Dear {user?.firstName}</Typography.Text>
        <br />
        <br />
        <p>
            Thank you for applying for the {position} position. We
            have successfully received your application.
        </p>
        <br />
        <Typography.Text strong>Best regards</Typography.Text>
        <br />
        <Typography.Text strong>The MyCareer Team</Typography.Text>
    </StyledAnswerModal>
  )
}

export default AnswerModal