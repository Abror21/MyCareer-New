import React, { useEffect } from 'react';
import { StyledEducationForm } from './style';
import { Form, message } from 'antd';
import { useIntl } from 'react-intl';
import { AddMoreButton, IconButton, Input, Select, SelectOption } from 'ui';
import useQueryApiClient from 'utils/useQueryApiClient';

export function EducationForm({ form, disable, actionFormData, nextStep, setNextStepStatus }: any) {
  const intl = useIntl();

  useEffect(() => {
    form.setFieldsValue({
      hiringEducation: [{ educationName: undefined, degrees: null }],
      hiringSertificates: [{ certificateName: undefined }],
    });
  }, [form]);

  useEffect(() => {

    form.setFieldsValue({
      hiringEducation:
        actionFormData?.educationField?.length > 0
          ? actionFormData.educationField
          : [{ educationName: undefined, degrees: null }],
      hiringSertificates:
        actionFormData?.certificateField?.length > 0
          ? actionFormData.certificateField
          : [{ certificateName: undefined }],
    });

  }, [actionFormData]);

  const handleAddField = (addFn: any) => {
    addFn({ educationName: undefined, degrees: null });
  };

  const handleRemoveOrClearField = (fieldName: any, fieldCount: any, removeFn: any) => {
    if (fieldCount > 1) {
      removeFn(fieldName);
    } else {
      form.setFieldsValue({
        hiringEducation: [{ educationName: undefined, degrees: null }],
      });
    }
  };

  const { isLoading, data: degreeData } = useQueryApiClient({
    request: {
      url: '/api/hirings/education/degree',
      method: 'GET',
    },
  });

  const checkDuplicateNames = (_: any, value: any, callback: any) => {
    const educationNames = form
      .getFieldValue('hiringEducation')
      .map((item: any) => item?.educationName)
      .filter(Boolean);
    const hasDuplicates = educationNames.length !== new Set(educationNames).size;

    if (hasDuplicates) {
      callback(intl.formatMessage({ id: 'duplicate_education_name_error' }));
    } else {
      callback();
    }
  };

  return (
    <StyledEducationForm>
      <hr style={{ background: 'gray', margin: '10px 0 20px 0' }} />
      <div className="languages-form-wrapper">
        <div className="labels">
          <h2>{intl.formatMessage({ id: 'degree_hiring' })}</h2>
          <h2>{intl.formatMessage({ id: 'education_hiring' })}</h2>
        </div>
        <Form.List name="hiringEducation">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div className="select-wrapper" key={key}>
                  <div className="select-box">
                    <div className="select">
                      <Form.Item
                        {...restField}
                        name={[name, 'degrees']}
                        rules={[
                          {
                            required: form.getFieldValue(['hiringEducation', name, 'educationName']),
                            message: intl.formatMessage({ id: 'degree_required' }),
                          },
                        ]}
                      >
                        <Select
                          disabled={disable}
                          loading={isLoading}
                          mode="multiple"
                          placeholder={intl.formatMessage({ id: 'degree_hiring' })}
                        >
                          {degreeData?.data?.map((option: any) => (
                            <SelectOption key={option} value={option}>
                              {intl.formatMessage({ id: option })}
                            </SelectOption>
                          ))}
                        </Select>
                      </Form.Item>
                    </div>
                    <div className="level-select-wrapper">
                      <div className="select select_input">
                        <Form.Item
                          {...restField}
                          name={[name, 'educationName']}
                          rules={[
                            { validator: checkDuplicateNames },
                            {
                              required: form.getFieldValue(['hiringEducation', name, 'degrees']),
                              message: intl.formatMessage({ id: 'education_name_required' }),
                            },
                          ]}
                        >
                          <Input disabled={disable} placeholder={intl.formatMessage({ id: 'education_hiring' })} />
                        </Form.Item>
                      </div>
                      <div className="mobile-hidden">
                        <IconButton
                          disable={disable}
                          iconId="close-svg"
                          onClick={() => handleRemoveOrClearField(name, fields.length, remove)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="more-btn">
                <Form.Item>
                  <AddMoreButton
                    disabled={disable}
                    label={intl.formatMessage({ id: 'add_education_btn' })}
                    onClick={() => handleAddField(add)}
                  />
                </Form.Item>
              </div>
            </>
          )}
        </Form.List>

        <Form.List name="hiringSertificates">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div className="certificate_field" key={key}>
                  <Form.Item>
                    <Input
                      disabled={disable}
                      {...restField}
                      name={[name, 'certificateName']}
                      label={intl.formatMessage({ id: 'specific_certifications' })}
                    />
                  </Form.Item>
                </div>
              ))}
            </>
          )}
        </Form.List>
      </div>
    </StyledEducationForm>
  );
}
