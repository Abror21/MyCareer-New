import { StyledDesiredPosition } from './style';
import { Select, SelectOption } from 'ui';
import { useIntl } from 'react-intl';
import { TextArea } from 'ui/Textarea';
import useQueryApiClient from 'utils/useQueryApiClient';
import { Form, FormInstance } from 'antd';
import React, { useEffect } from 'react';
import { experienceOptions } from 'utils/consts';
import { useFreelancerDataContext } from 'contexts/CreateCvContext/FreelancerData';
import { useSearchParams } from 'react-router-dom';

interface PersonalDetailsFormProps {
  desiredPositionForm: FormInstance<any>;
}

export const DesiredPositionForm = ({ desiredPositionForm }: PersonalDetailsFormProps) => {
  const intl = useIntl();
  const [searchparams, setSearchparams] = useSearchParams();
  const addUser = searchparams.get('add-user') ? searchparams.get('add-user') : null;
  const { state: freelancerDataState } = useFreelancerDataContext();

  const { data: desiredPositionData, isLoading: desiredPositionLoading } = useQueryApiClient({
    request: {
      url: '/api/desired-position',
      method: 'GET',
    },
  });

  useEffect(() => {
    if (freelancerDataState?.data) {
      const { desiredPosition, jobExperience, about, jobExpectations } = freelancerDataState.data;
      
      if (addUser != 'mount') {
        desiredPositionForm.setFieldsValue({
          desiredPositionId: desiredPosition?.id,
          jobExperience: jobExperience || null,
          about: about || null,
          jobExpectations: jobExpectations || null,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [freelancerDataState.data]);

  const handleTabKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const isLastInput = event.currentTarget === document.activeElement;
    const isTabKey = event.key === 'Tab';

    if (isLastInput && isTabKey) {
      event.preventDefault();
    }
  };
  return (
    <Form form={desiredPositionForm}>
      <StyledDesiredPosition>
        <div className="inputs-box">
          <div className="input">
            <Select
              name="desiredPositionId"
              placeholder={
                intl.messages.desiredPositionPlaceholder && intl.formatMessage({ id: 'desiredPositionPlaceholder' })
              }
              loading={desiredPositionLoading}
              label={intl.messages.desiredPositionLabel && intl.formatMessage({ id: 'desiredPositionLabel' })}
              rules={[
                {
                  required: true,
                  message: intl.messages.desiredPositionError && intl.formatMessage({ id: 'desiredPositionError' }),
                },
              ]}
            >
              {desiredPositionData?.data?.map((option: any) => (
                <SelectOption key={option.id} value={option.id}>
                  {option.name}
                </SelectOption>
              ))}
            </Select>
          </div>
          <div className="input">
            <Select
              label={
                intl.messages.desiderPositionExperienceLabel &&
                intl.formatMessage({ id: 'desiderPositionExperienceLabel' })
              }
              name="jobExperience"
              placeholder={
                intl.messages.desiderPositionExperiencePlaceholder &&
                intl.formatMessage({ id: 'desiderPositionExperiencePlaceholder' })
              }
              rules={[
                {
                  required: true,
                  message:
                    intl.messages.desiredPositionJobExError && intl.formatMessage({ id: 'desiredPositionJobExError' }),
                },
              ]}
            >
              {experienceOptions.map((option, index) => (
                <React.Fragment key={index}>
                  {intl.messages[option.value] && (
                    <SelectOption key={index} value={option.value}>
                      {intl.formatMessage({ id: option.value })}
                    </SelectOption>
                  )}
                </React.Fragment>
              ))}
            </Select>
          </div>
        </div>
        <div className="inputs-box">
          <div className="textarea">
            <TextArea
              label={
                <div className="textarea-label">
                  {intl.messages.desiderPositionAboutLabel && intl.formatMessage({ id: 'desiderPositionAboutLabel' })}
                  <span className="label-span">
                    {' '}
                    ({intl.messages.maxLength && intl.formatMessage({ id: 'maxLength' })}){' '}
                  </span>
                </div>
              }
              placeholder={
                intl.messages.desiderPositionAboutPlaceholder &&
                intl.formatMessage({ id: 'desiderPositionAboutPlaceholder' })
              }
              name="about"
              rules={[
                {
                  required: true,
                  message:
                    intl.messages.desiredPositionAboutError && intl.formatMessage({ id: 'desiredPositionAboutError' }),
                },
              ]}
              maxLength={1000}
            />
          </div>
        </div>
        <div className="inputs-box">
          <div className="textarea">
            <TextArea
              label={
                <div className="textarea-label">
                  {intl.messages.desiderPositionJobsLabel && intl.formatMessage({ id: 'desiderPositionJobsLabel' })}
                  <span className="label-span">
                    {' '}
                    ({intl.messages.maxLength && intl.formatMessage({ id: 'maxLength' })}){' '}
                  </span>
                </div>
              }
              placeholder={
                intl.messages.desiderPositionJobsPlaceholder &&
                intl.formatMessage({ id: 'desiderPositionJobsPlaceholder' })
              }
              name="jobExpectations"
              rules={[
                {
                  required: true,
                  message:
                    intl.messages.desiredPositionJobExpectionsError &&
                    intl.formatMessage({ id: 'desiredPositionJobExpectionsError' }),
                },
              ]}
              onKeyDown={handleTabKeyPress}
              maxLength={1000}
            />
          </div>
        </div>
      </StyledDesiredPosition>
    </Form>
  );
};
