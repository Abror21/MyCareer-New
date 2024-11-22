import React, { useState } from 'react'
import { StyledApplicationFormModal } from './style'
import { Checkbox, CheckboxProps, Form, Input, Typography } from 'antd';
import { Button } from 'ui';
import useQueryApiClient from 'utils/useQueryApiClient';
import { useIntl } from 'react-intl';

interface ApplicationFormModalProps {
    isOpen: boolean;
    jobId: number | null;
    data: any;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsAnswerModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setJobId: React.Dispatch<React.SetStateAction<number | null>>;
}

const ApplicationFormModal = ({ data, jobId, isOpen, setIsOpen, setIsAnswerModalOpen, setJobId }: ApplicationFormModalProps) => {
    const intl = useIntl();
    const { TextArea } = Input;
    const [form] = Form.useForm();
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [text, setText] = useState<string>('');

    const { isLoading: isJobPostLoading, appendData } = useQueryApiClient({
        request: {
            url: `/api/hirings/applicante?id=${jobId}`,
            method: 'POST',
            disableOnMount: true
        },
    onSuccess(){
        setText('');
        setIsOpen(false);
        setIsAnswerModalOpen(true);
        setJobId(null);
    }
    });

    const onChange: CheckboxProps['onChange'] = (e) => {
        setIsConfirmed(e.target.checked);
    };

    const handleSubmit = () => {
        appendData({text});
    }

    return (
        <StyledApplicationFormModal
            open={isOpen}
            centered
            footer
            onCancel={() => {
                setIsOpen(false);
                setJobId(null);
            }}
        >
            <Typography.Title level={3}>
                {intl.messages.job_application_form ? intl.formatMessage({ id: 'job_application_form' }) : "Job Application Form:"}
            </Typography.Title>
            <div className='form-modal'>
                <div className='form-modal__item'>
                    <Typography.Paragraph strong>{intl.messages.position_applied_for ? intl.formatMessage({ id: 'position_applied_for' }) : "Postition Applied For:"}</Typography.Paragraph>
                    <Typography.Paragraph strong>{data?.jobTitle}</Typography.Paragraph>
                </div>
                <div className='form-modal__item'>
                    <Typography.Paragraph strong>{intl.messages.company_name ? `${intl.formatMessage({ id: 'company_name' })}:` : "Company Name:"}</Typography.Paragraph>
                    <Typography.Paragraph strong>{data?.companyName}</Typography.Paragraph>
                </div>
                <div className="form-modal__item">
                    <Typography.Paragraph strong>{intl.messages.your_cv ? `${intl.formatMessage({ id: 'your_cv' })}:` : "Your CV:"}</Typography.Paragraph>
                    <Typography.Paragraph strong>{intl.messages.by_submitting && intl.formatMessage({ id: 'by_submitting' })}</Typography.Paragraph>
                </div>
                <div className="form-modal__item textarea">
                    <Typography.Paragraph strong>{intl.messages.additional_information ? `${intl.formatMessage({ id: 'additional_information' })}:` : "Additional Information:"}</Typography.Paragraph>
                    <TextArea
                        value={text}
                        showCount
                        maxLength={1000}
                        onChange={(val: any) => {
                            setText(val.target.value)
                        }}
                        placeholder="disable resize"
                        style={{ height: 150, resize: 'none', padding: '15px' }}    
                    />
                </div>
                <br />
                <Checkbox defaultChecked={false} onChange={onChange}>{intl.messages.i_confirm && intl.formatMessage({ id: 'i_confirm' })}</Checkbox>
                <br /><br />
                <p className='form-modal__footer'>
                    <Button
                        loading={isJobPostLoading}
                        disabled={!isConfirmed}
                        type='primary'
                        label="Submit"
                        onClick={handleSubmit}
                    />
                </p>
            </div>
        </StyledApplicationFormModal>
    )
}

export default ApplicationFormModal