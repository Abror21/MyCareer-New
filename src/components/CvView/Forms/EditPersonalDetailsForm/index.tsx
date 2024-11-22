import React, { useEffect, useState } from 'react';
import { useForm } from 'antd/lib/form/Form';
import { Form } from 'antd';
import { useIntl } from 'react-intl';
import dayjs from 'dayjs';

import { StyledPersonalDetailsForm } from './style';
import { Modal } from 'ui/Modal';
import { Button, Checkbox, DatePicker, Input, Select, SelectOption, Spinner } from 'ui';
import { AvatarUploader } from 'components/index';
import { RealCvInterface } from 'types/RealCV';
import useQueryApiClient from 'utils/useQueryApiClient';
import { experienceOptions } from 'utils/consts';
import { useUserDispatch } from 'contexts/UserContext';
import { Country } from 'types/Country';
import { DesiredPosition } from 'types/DesiredPosition';
import { validateEmail, validateName, validatePhoneNumber } from 'utils/globalFunctions';
import { routes } from 'config/config';

type EditPersonalDetailsFormProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  image?: {
    id: number;
    createdAt: string;
    updatedAt: string;
    path: string;
  };
  cvData?: RealCvInterface;
};

type Regions = {
  name: string;
  countryId?: number;
  id?: number;
};

export const EditPersonalDetailsForm = ({ open, setOpen, image }: EditPersonalDetailsFormProps) => {
  const intl = useIntl();
  const [form] = useForm();
  const { dispatch: userDispatch } = useUserDispatch();
  const [newImage, setNewImage] = useState<File | null>(null);
  const [updateImage, setUpdateImage] = useState<boolean>(false);
  const [countryId, setCountryId] = useState<number>(0);
  const [regions, setRegions] = useState<Regions[]>([]);
  const [otherRegion, setOtherRegion] = useState(false);

  useEffect(() => {
    refetch();
    form.resetFields();
  }, [open]);

  useEffect(() => {
    if (countryId) {
      fetchRegions();
    }
  }, [countryId]);

  const { refetch, isLoading: isUserProfileLoading } = useQueryApiClient({
    request: {
      url: 'api/user/profile',
      method: 'GET',
    },
    onSuccess: (response) => {
      const { firstName, lastName, dateOfBirth, phoneNumber, email, address, desiredPosition, jobExperience } =
        response.data.freelancer;

      form.setFieldsValue({
        Name: firstName,
        Surname: lastName,
        DateOfBirth: dayjs(dateOfBirth),
        PhoneNumber: phoneNumber,
        Email: email,
        CountryId: address.countryId,
        RegionId: address.regionId,
        Address: address?.street,
        desiredPositionId: desiredPosition?.id,
        jobExperience: jobExperience || null,
      });

      setCountryId(address.countryId);
      setOtherRegion(address.otherRegion);
    },
  });

  const { data: allDesiredPositions, isLoading: desiredPositionsLoading } = useQueryApiClient({
    request: {
      url: '/api/desired-position',
      method: 'GET',
    },
  });

  const { data: allCountries, isLoading: isCountriesLoading } = useQueryApiClient({
    request: {
      url: '/api/country',
      method: 'GET',
    },
  });

  const { isLoading: isRegionsLoading, refetch: fetchRegions } = useQueryApiClient({
    request: {
      url: `/api/region/get-regions-by-country-id/${countryId}`,
      method: 'GET',
      disableOnMount: true,
    },
    onSuccess: (response) => {
      setRegions(response.data);
    },
  });

  const { appendData: updatePersonalDetails } = useQueryApiClient({
    request: {
      url: `/api/freelancer/edit-personal-details`,
      method: 'POST',
      multipart: true,
    },
    onSuccess: () => {
      userDispatch({
        type: 'SET_USER_DATA',
        payload: {
          refresh: true,
        },
      });
      setNewImage(null);
      setUpdateImage(false);
      setOpen(false);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleCountry = (id: number, isClear: boolean) => {
    setCountryId(id);
    if (isClear) {
      form.setFieldValue('RegionId', null);
    }
  };

  const handleFormValuesChange = (changedValues: any, allValues: any) => {
    if (changedValues[0].name[0] === 'CountryId') {
      handleCountry(changedValues[0].value, true);
    }
  };

  const otherRegionHandler = () => {
    setOtherRegion(!otherRegion);
    form.setFieldValue('RegionId', '');
  };

  const onFinish = async (values: any) => {
    values.DateOfBirth = dayjs(values.DateOfBirth).format('YYYY-MM-DD');
    values.OtherRegion = otherRegion;
    values.RegionId = otherRegion ? 0 : values.RegionId;

    const personalDetailsFormData: FormData = new FormData();

    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        personalDetailsFormData.append(key, values[key]);
      }
    }

    if (updateImage) {
      personalDetailsFormData.append('Image', newImage || '');
      personalDetailsFormData.append('UpdateImage', 'true');
    } else {
      personalDetailsFormData.append('UpdateImage', 'false');
    }

    updatePersonalDetails(personalDetailsFormData);
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then(() => {
        form.submit();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const isContentLoading = isUserProfileLoading || desiredPositionsLoading || isCountriesLoading || isRegionsLoading;

  return (
    <Modal
      forceRender
      destroyOnClose
      centered
      open={open}
      width={window.innerWidth < 1024 ? '100%' : 1104}
      onCancel={() => {
        setNewImage(null);
        refetch();
        setOpen(false);
      }}
      wrapClassName="edit-intern-cv-modal-wrapper"
      footer={[
        <Button
          key="cancel"
          label={intl.messages.cancel && intl.formatMessage({ id: 'cancel' })}
          type="default"
          className="cancel-btn"
          onClick={() => {
            setOpen(false);
            setNewImage(null);
          }}
        />,
        <Button
          key="submit"
          label={intl.messages.save && intl.formatMessage({ id: 'save' })}
          type="primary"
          htmlType="submit"
          className="btn primary-btn save-btn"
          onClick={handleSubmit}
          disabled={isContentLoading}
        />,
      ]}
    >
      <StyledPersonalDetailsForm>
        <Spinner spinning={isContentLoading}>
          <Form form={form} onFinish={onFinish} layout="vertical" onFieldsChange={handleFormValuesChange}>
            <div className="edit-personal-details-form">
              <div className="edit-avatar">
                <AvatarUploader
                  image={image}
                  newImage={newImage}
                  setNewImage={setNewImage}
                  setUpdateImage={setUpdateImage}
                />
              </div>

              <div className="edit-personal-details">
                <div className="top-block">
                  <Input
                    className="cv-input"
                    name="Name"
                    maxLength={32}
                    label={intl.messages.name && intl.formatMessage({ id: 'name' })}
                    placeholder={intl.messages.personalDetailNamePlaceholder && intl.formatMessage({ id: 'personalDetailNamePlaceholder' })}
                    validateTrigger="onBlur"
                    rules={[
                      { required: true, message: intl.messages.personalDetailNameError &&  intl.formatMessage({ id: 'personalDetailNameError' }) },
                      { validator: (_, value) => validateName(intl, value) },
                    ]}
                  />
                  <Input
                    className="cv-input"
                    name="Surname"
                    maxLength={32}
                    label={intl.messages.surname &&  intl.formatMessage({ id: 'surname' })}
                    placeholder={intl.messages.personalDetailNamePlaceholder &&  intl.formatMessage({ id: 'personalDetailNamePlaceholder' })}
                    validateTrigger="onBlur"
                    rules={[
                      { required: true, message: intl.messages.personalDetailNameError &&  intl.formatMessage({ id: 'personalDetailNameError' }) },
                      { validator: (_, value) => validateName(intl, value) },
                    ]}
                  />
                  <div className="cv-date-picker-wrapper">
                    <DatePicker
                      placeholder={intl.messages.selectDate &&  intl.formatMessage({ id: 'selectDate' })}
                      className="cv-date-picker"
                      label={intl.messages.dateOfBrith &&  intl.formatMessage({ id: 'dateOfBrith' })}
                      name="DateOfBirth"
                      validateTrigger="onBlur"
                      rules={[{ required: true, message: intl.messages.personalDetailDateOfBrithError &&  intl.formatMessage({ id: 'personalDetailDateOfBrithError' }) }]}
                      format={routes.api.appDateFormat}
                      size="large"
                      disabledDate={(current: dayjs.Dayjs) => {
                        const minDate = dayjs('1900-01-01');
                        const maxDate = dayjs();
                        return current && (current.isBefore(minDate) || current.isAfter(maxDate));
                      }}
                    />
                  </div>
                </div>

                <Input
                  className="cv-input"
                  maxLength={16}
                  label={intl.messages.createCvPhoneNumber &&  intl.formatMessage({ id: 'createCvPhoneNumber' })}
                  name="PhoneNumber"
                  placeholder={intl.messages.personalDetailNumberPlaceholder &&  intl.formatMessage({ id: 'personalDetailNumberPlaceholder' })}
                  validateTrigger="onBlur"
                  rules={[
                    { required: true, message: intl.messages.personalDetailNumberError &&  intl.formatMessage({ id: 'personalDetailNumberError' }) },
                    { validator: (_, value) => validatePhoneNumber(intl, value) },
                  ]}
                />

                <Input
                  className="cv-input"
                  maxLength={50}
                  label={intl.messages.email &&  intl.formatMessage({ id: 'email' })}
                  name="Email"
                  placeholder={intl.messages.personalDetailEmailPlaceholder && intl.formatMessage({ id: 'personalDetailEmailPlaceholder' })}
                  validateTrigger="onBlur"
                  rules={[
                    { required: true, message: intl.messages.personalDetailEamilError && intl.formatMessage({ id: 'personalDetailEamilError' }) },
                    { validator: (_, value) => validateEmail(intl, value) },
                  ]}
                />

                <div className="inputs-box">
                  {/* Country */}
                  <div className="input">
                    <Select
                      formItemClassName="cv-select"
                      name="CountryId"
                      placeholder={intl.messages.personalDetailCountryPlaceholder &&  intl.formatMessage({ id: 'personalDetailCountryPlaceholder' })}
                      loading={isCountriesLoading}
                      label={intl.messages.cancel &&  intl.formatMessage({ id: 'country' })}
                      rules={[
                        {
                          required: true,
                          message: intl.messages.personalDetailCountryError && intl.formatMessage({ id: 'personalDetailCountryError' }),
                        },
                      ]}
                    >
                      {allCountries &&
                        allCountries.data?.map((option: Country) => {
                          return (
                            <SelectOption key={option.id} value={option.id}>
                              {option.name}
                            </SelectOption>
                          );
                        })}
                    </Select>
                  </div>
                  {/* City */}
                  <div className="input">
                    <Select
                      allowClear
                      name="RegionId"
                      placeholder={intl.formatMessage({
                        id: otherRegion ? 'otherCity' : 'personalDetailCityPlaceholder',
                      })}
                      disabled={regions.length === 0 || otherRegion}
                      loading={isRegionsLoading}
                      label={intl.messages.city && intl.formatMessage({ id: 'city' })}
                      rules={[
                        {
                          required: !otherRegion,
                          message: intl.messages.personalDetailCityError && intl.formatMessage({ id: 'personalDetailCityError' }),
                        },
                      ]}
                    >
                      {!otherRegion ? (
                        regions &&
                        regions.map((option: any) => (
                          <SelectOption key={option.id} value={option.id}>
                            {option.name}
                          </SelectOption>
                        ))
                      ) : (
                        <SelectOption value="">{''}</SelectOption>
                      )}
                    </Select>
                    <Checkbox
                      onChange={otherRegionHandler}
                      name="OtherRegion"
                      label={intl.messages.otherCity && intl.formatMessage({ id: 'otherCity' })}
                      className="checkbox"
                      checked={otherRegion}
                    />
                  </div>
                </div>

                <div className="inputs-box">
                  {/* Adreess */}
                  <div className="input addrees-input">
                    <Input
                      className="cv-input"
                      name="Address"
                      maxLength={100}
                      label={intl.messages.address && intl.formatMessage({ id: 'address' })}
                      placeholder={intl.messages.personalDetailAddressPlaceholder && intl.formatMessage({ id: 'personalDetailAddressPlaceholder' })}
                      rules={[
                        {
                          required: true,
                          message: intl.messages.personalDetailAddressError && intl.formatMessage({ id: 'personalDetailAddressError' }),
                        },
                      ]}
                    />
                  </div>
                </div>

                <div className="experience-input">
                  <div className="input">
                    <Select
                      name="desiredPositionId"
                      placeholder={intl.messages.desiredPositionPlaceholder && intl.formatMessage({ id: 'desiredPositionPlaceholder' })}
                      loading={desiredPositionsLoading}
                      label={intl.messages.desiredPositionLabel && intl.formatMessage({ id: 'desiredPositionLabel' })}
                      rules={[
                        {
                          required: true,
                          message: intl.messages.desiredPositionError && intl.formatMessage({ id: 'desiredPositionError' }),
                        },
                      ]}
                    >
                      {allDesiredPositions &&
                        allDesiredPositions.data?.map((option: DesiredPosition) => (
                          <SelectOption key={option.id} value={option.id}>
                            {option.name}
                          </SelectOption>
                        ))}
                    </Select>
                  </div>

                  <div className="input">
                    <Select
                      label={intl.messages.desiderPositionExperienceLabel && intl.formatMessage({ id: 'desiderPositionExperienceLabel' })}
                      name="jobExperience"
                      placeholder={intl.messages.desiderPositionExperiencePlaceholder && intl.formatMessage({ id: 'desiderPositionExperiencePlaceholder' })}
                      rules={[
                        {
                          required: true,
                          message: intl.messages.desiredPositionJobExError && intl.formatMessage({ id: 'desiredPositionJobExError' }),
                        },
                      ]}
                    >
                      {experienceOptions &&
                        experienceOptions.map((option, index) => (
                          <SelectOption key={index} value={option.value}>
                            {option.label}
                          </SelectOption>
                        ))}
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </Spinner>
      </StyledPersonalDetailsForm>
    </Modal>
  );
};
