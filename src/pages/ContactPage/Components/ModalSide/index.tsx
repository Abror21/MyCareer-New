import { useEffect, useState } from 'react';
import { StyledContactModalSide } from './style';
import { Col, Form, Row } from 'antd';
import { Button, Input, Spinner, TextArea, Breadcrumb, PublicPageTitle } from 'ui';
import { useIntl } from 'react-intl';
import useQueryApiClient from 'utils/useQueryApiClient';
import { openNotification, validateEmail, validateName, validatePhoneNumber } from 'utils/globalFunctions';
import { useParams } from 'react-router';
import { RealCvInterface } from 'types/RealCV';
import { Link, useLocation } from 'react-router-dom';

interface ContactForm {
  name: string;
  email: string;
  phone?: string | null;
  textMessage: string;
  subject: string;
  type: string;
}
export const ModalSide = () => {
  const intl = useIntl();
  const { id } = useParams();
  const location = useLocation();
  const [submitType, setSubmitType] = useState<'Interview' | 'Email'>('Interview');
  const [cvData, setCvData] = useState<RealCvInterface | undefined>();
  const [contactForm] = Form.useForm();
  const handleSubmit = (values: ContactForm) => {
    ContactPostApi({ ...values, type: submitType, associatedUserId: id ? id : null });
  };
  const { refetch: getCvDataById } = useQueryApiClient({
    request: {
      url: `/api/freelancer/${id}/real-data-cv`,
      method: 'GET',
      disableOnMount: true,
    },

    onSuccess: (response) => {
      setCvData(response.data);
    },
  });

  const { isLoading: isFreelancerDataLoading, appendData: ContactPostApi } = useQueryApiClient({
    request: {
      url: `/api/contacts-us`,
      method: 'POST',
    },
    onSuccess() {
      contactForm.resetFields();
      openNotification(
        'success',
        intl?.messages?.sendContactSuccessMessage && intl.formatMessage({ id: 'sendContactSuccessMessage' })
      );
    },
  });

  useEffect(() => {
    if (id) {
      getCvDataById();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (cvData) {
      const defaultTextMessage = ` ${
        intl?.messages?.letsScheduleAnInterview && intl.formatMessage({ id: 'letsScheduleAnInterview' })
      }. (${
        intl?.messages?.internId &&
        intl.formatMessage({
          id: 'internId',
        })
      }: ${cvData.id})`;
      contactForm.setFieldsValue({
        textMessage: defaultTextMessage,
        subject: intl.messages.interviewSchedule && intl.formatMessage({ id: 'interviewSchedule' }),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cvData]);


  return (
    <StyledContactModalSide>
      <div className="overlay"></div>
      <div className="modal container">
        <div className="navigate">
          <Breadcrumb
            items={[
              {
                title: <Link to="/">{intl.messages.home && intl.formatMessage({ id: 'home' })}</Link>,
              },
              {
                title: <h6>{intl.messages.contacts && intl.formatMessage({ id: 'contacts' })}</h6>,
              },
            ]}
          />
        </div>
        <PublicPageTitle label={intl.messages.contacts && intl.formatMessage({ id: 'contacts' })}/>
        <div className=" modal-inner ">
          <div className="modal-title">
            <h4>{intl.messages.contactTitle && intl.formatMessage({ id: 'contactTitle' })}</h4>
            <div className="type-change">
              {location.pathname === '/contact-us' ? (
                <h5>{intl.messages.contact_us && intl.formatMessage({ id: 'contact_us' })}</h5>
              ) : (
                <h5 onClick={() => setSubmitType('Interview')} className={submitType === 'Interview' ? 'active' : ''}>
                  {intl.messages.scheduleAndInterview && intl.formatMessage({ id: 'scheduleAndInterview' })}
                </h5>
              )}
            </div>
          </div>
          <Spinner
            className='contactus__form-loader'
            spinning={isFreelancerDataLoading as boolean}
          >
            <Form form={contactForm} onFinish={handleSubmit}>
              <Row gutter={16} style={{ rowGap: '18px', gap: '15px' }}>
                <Col xs={24} md={12} xl={10}>
                  <Input
                    maxLength={30}
                    label={intl.messages.name && intl.formatMessage({ id: 'name' })}
                    name="senderName"
                    placeholder={intl.messages.nameInputPlaceholder && intl.formatMessage({ id: 'nameInputPlaceholder' })}
                    rules={[
                      {
                        required: true,
                        message:
                          intl.messages.name_should_not_be_null_or_empty &&
                          intl.formatMessage({ id: 'name_should_not_be_null_or_empty' }),
                      },
                      { validator: (_, value) => validateName(intl, value) },
                    ]}
                  />
                </Col>
                <Col xs={24} md={12} xl={10}>
                  <Input
                    maxLength={50}
                    name="senderEmail"
                    label={intl.messages.email && intl.formatMessage({ id: 'email' })}
                    placeholder={
                      intl.messages.emailInputPlaceholder && intl.formatMessage({ id: 'emailInputPlaceholder' })
                    }
                    rules={[
                      {
                        required: true,
                        message:
                          intl.messages.email_should_not_be_null &&
                          intl.formatMessage({ id: 'email_should_not_be_null' }),
                      },
                      { validator: (_, value) => validateEmail(intl, value) },
                    ]}
                  />
                </Col>

                <Col xs={24} md={12} xl={10}>
                  <Input
                    maxLength={50}
                    name="subject"
                    label={intl.messages.subject && intl.formatMessage({ id: 'subject' })}
                    placeholder={
                      intl.messages.subjectInputPlaceholder && intl.formatMessage({ id: 'subjectInputPlaceholder' })
                    }
                    rules={[
                      {
                        required: true,
                        message:
                          intl.messages.subject_should_not_be_null_or_empty &&
                          intl.formatMessage({ id: 'subject_should_not_be_null_or_empty' }),
                      },
                    ]}
                  />
                </Col>
                {submitType === 'Interview' && (
                  <Col xs={24} md={12} xl={10}>
                    <Input
                      maxLength={20}
                      name="senderPhone"
                      label={intl.messages.createCvPhoneNumber && intl.formatMessage({ id: 'createCvPhoneNumber' })}
                      placeholder={
                        intl.messages.numberInputPlaceholder && intl.formatMessage({ id: 'numberInputPlaceholder' })
                      }
                      rules={[
                        {
                          required: true,
                          message:
                            intl.messages.phone_should_not_be_null_or_empty &&
                            intl.formatMessage({ id: 'phone_should_not_be_null_or_empty' }),
                        },
                        { validator: (_, value) => validatePhoneNumber(intl, value) },
                      ]}
                    />
                  </Col>
                )}
                <Col xs={24} md={18} xl={10} className="textArea-col">
                  <TextArea
                    maxLength={250}
                    rules={[
                      {
                        required: true,
                        message:
                          intl.messages.text_should_not_be_null_or_empty &&
                          intl.formatMessage({ id: 'text_should_not_be_null_or_empty' }),
                      },
                    ]}
                    name="textMessage"
                    placeholder={
                      intl.messages.descriptionInputPlaceholder &&
                      intl.formatMessage({ id: 'descriptionInputPlaceholder' })
                    }
                    label={intl.messages.createCvTextMessage && intl.formatMessage({ id: 'createCvTextMessage' })}
                  />
                </Col>
              </Row>
              <Button
                className="contact-submit"
                type="primary"
                htmlType="submit"
                label={intl.messages.submit && intl.formatMessage({ id: 'submit' })}
              />
            </Form>
          </Spinner>
        </div>
      </div>
    </StyledContactModalSide>
  );
};
