import { useSearchParams } from 'react-router-dom';
import SvgSelector from 'assets/icons/SvgSelector';
import { StyledPersonalDetailsModal } from './style';
import { useIntl } from 'react-intl';
import { Button, Checkbox, DatePicker, Input, Select, SelectOption, Upload } from 'ui';
import { Form, FormInstance } from 'antd';
import { useEffect, useState } from 'react';
import useQueryApiClient from 'utils/useQueryApiClient';
import dayjs from 'dayjs';
import { routes } from 'config/config';
import { useFreelancerDataContext } from 'contexts/CreateCvContext/FreelancerData';
import { openNotification, validateEmail, validateName, validatePhoneNumber } from 'utils/globalFunctions';
import UploadFile from './components/UploadFile';
import { useUserState } from 'contexts/UserContext';

interface PersonalDetailsFormProps {
  personalForm: FormInstance<any>;
  setIsFileLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PersonalDetailsForm = ({ personalForm, setIsFileLoading }: PersonalDetailsFormProps) => {
  const intl = useIntl();
  const userState = useUserState();
  const { state: freelancerDataState, dispatch: freelancerDataDispatch } = useFreelancerDataContext();
  const [searchparams, setSearchparams] = useSearchParams();
  const addUser = searchparams.get('add-user') ? searchparams.get('add-user') : null;

  const [image, setImage] = useState<File | null>(null);
  const [backendImage, setBackendImage] = useState<string>();
  const [countryId, setCountryId] = useState<number>(0);
  const [otherRegion, setOtherRegion] = useState(false);

  useEffect(() => {
    if (countryId) {
      FetchRegion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryId]);

  useEffect(() => {
    if (otherRegion) {
      personalForm.setFieldValue('RegionId', null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otherRegion]);

  useEffect(() => {
    if (freelancerDataState.data) {
      const { firstName, lastName, image, phoneNumber, email, dateOfBirth, address } = freelancerDataState.data;
      if (addUser != 'mount') {
        personalForm.setFieldsValue({
          Name: firstName,
          Surname: lastName,
          PhoneNumber: phoneNumber,
          Email: userState?.email || email,
          DateOfBirth: dayjs().isSame(dateOfBirth, 'day') ? null : dayjs(dateOfBirth),
          CountryId: address.countryId,
          RegionId: address.regionId,
          Address: address?.street,
        });
        if (address.regionId) {
          handleCountry(address.countryId);
        } else {
          handleCountry(address.countryId, true);
          setOtherRegion(true);
        }
        if (image) {
          setBackendImage(routes.api.baseUrl + '/' + image?.path);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [freelancerDataState.data]);

  useEffect(() => {
    if(searchparams.get('add-user') == 'false' || searchparams.get('add-user') == 'finish'){
      personalForm.resetFields();
    }
  }, [searchparams])

  const { data: countryData, isLoading: countryLoading } = useQueryApiClient({
    request: {
      url: '/api/country',
      method: 'GET',
    },
  });

  const {
    data: regionOptionData,
    isLoading: regionLoading,
    refetch: FetchRegion,
  } = useQueryApiClient({
    request: {
      url: `/api/region/get-regions-by-country-id/${countryId}`,
      method: 'GET',
      disableOnMount: true,
    },
  });

  const { isLoading: isFreelancerDataLoading, refetch: refetchFreelancerData } = useQueryApiClient({
    request: {
      url: `/api/freelancer/real-data-cv`,
      method: 'GET',
    },
    onSuccess(res) {
      freelancerDataDispatch({ type: 'SET_FREELANCER_DATA', payload: res.data });
    },
  });

  useEffect(() => {
    setIsFileLoading(isFreelancerDataLoading);
  }, [isFreelancerDataLoading]);

  const handleFormValuesChange = (changedValues: any, allValues: any) => {
    if (changedValues[0].name[0] === 'CountryId') {
      handleCountry(changedValues[0].value, true);
    }
  };

  const handleImageChange = async (data: any) => {
    if (data.file) {
      const selectedImage = data.file.originFileObj;
      const isValid = await validateImage(selectedImage);
      if (isValid) {
        setImage(selectedImage);
        personalForm.setFieldValue('Image', selectedImage);
        personalForm.setFieldValue('UpdateImage', true);
      }
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setBackendImage('');
    personalForm.setFieldValue('Image', null);
    personalForm.setFieldValue('UpdateImage', true);
  };

  const handleCountry = (id: number, isClear?: boolean) => {
    setCountryId(id);
    if (isClear) {
      personalForm.setFieldValue('RegionId', null);
      return;
    }
  };

  const handleTabKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const isLastInput = event.currentTarget === document.activeElement;
    const isTabKey = event.key === 'Tab';

    if (isLastInput && isTabKey) {
      event.preventDefault();
    }
  };
  const validateImage = async (file: File): Promise<boolean> => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const minSize = 100 * 1024; // Minimum size in bytes
    const maxSize = 1024 * 1024; // Maximum size in bytes
    const minWidth = 400; // Minimum width in pixels
    const minHeight = 400; // Minimum height in pixels
    const maxWidth = 1920; // Maximum width in pixels
    const maxHeight = 1280; // Maximum height in pixels

    const isValidType = allowedTypes.includes(file.type);
    const isValidSize = file.size >= minSize && file.size <= maxSize;

    if (!isValidType) {
      openNotification('error', intl.messages.CreateCvNotificationAvatarType && intl.formatMessage({ id: 'CreateCvNotificationAvatarType' }));
      return false;
    }

    if (!isValidSize) {
      const sizeErrorMessage =
        file.size < minSize
          ? intl.messages.CreateCvNotificationAvatarMinSize && intl.formatMessage({ id: 'CreateCvNotificationAvatarMinSize' })
          : intl.messages.CreateCvNotificationAvatarMaxSize && intl.formatMessage({ id: 'CreateCvNotificationAvatarMaxSize' });
      openNotification('error', sizeErrorMessage);
      return false;
    }

    const image = new Image();
    image.src = URL.createObjectURL(file);

    const imageLoadPromise = new Promise<boolean>((resolve) => {
      image.onload = () => {
        const width = image.naturalWidth;
        const height = image.naturalHeight;

        const isValidDimensions = width >= minWidth && height >= minHeight && width <= maxWidth && height <= maxHeight;

        if (!isValidDimensions) {
          let dimensionErrorMessage = '';
          if (width < minWidth || height < minHeight) {
            dimensionErrorMessage = intl.messages.CreateCvNotificationAvatarMinDimensions && intl.formatMessage({ id: 'CreateCvNotificationAvatarMinDimensions' });
          } else {
            dimensionErrorMessage = intl.messages.CreateCvNotificationAvatarMaxDimensions && intl.formatMessage({ id: 'CreateCvNotificationAvatarMaxDimensions' });
          }
          openNotification('error', dimensionErrorMessage);
        }

        resolve(isValidDimensions);
      };
    });

    return await imageLoadPromise;
  };

  return (
    <>
      <UploadFile
        email={personalForm.getFieldValue("Email")}
        setIsFileLoading={setIsFileLoading}
        refetchFreelancerData={refetchFreelancerData}
      />
      <Form form={personalForm} onFieldsChange={handleFormValuesChange}>
        <StyledPersonalDetailsModal>
          <div className="image-side">
            <div className="avatar">
              <div className={`selected-image ${image || backendImage ? 'active' : ''} `}>
                <div className="remove-image" onClick={handleRemoveImage}>
                  <SvgSelector id="close-svg" />
                </div>
                {image && <img loading='lazy'src={URL.createObjectURL(image)} alt="user" />}
                {backendImage && <img loading='lazy' src={backendImage} alt="user" />}
              </div>

              <div className={`upload-side ${!image && !backendImage && 'active'}`}>
                <SvgSelector id={'photo-camera-svg'} />
                <Upload name="Image" onChange={handleImageChange}>
                  <Button
                    label={intl.messages.personalDetailUploadBtn && intl.formatMessage({ id: 'personalDetailUploadBtn' })}
                    type="primary"
                    className="secondary-btn btn"
                  />
                </Upload>
                {/* this is for if image changed this will be true for backend */}
                <Checkbox className="boolean-input" name="UpdateImage" initialValue={false} />
              </div>
            </div>
            <div className="warning-image">
              <span>{intl.messages.avatarWarning1 && intl.formatMessage({ id: 'avatarWarning1' })}</span>
              <span>**{intl.messages.avatarWarning3 && intl.formatMessage({ id: 'avatarWarning3' })}</span>
              <span>**{intl.messages.avatarWarning4 && intl.formatMessage({ id: 'avatarWarning4' })}</span>
              <span>{intl.messages.avatarWarning2 && intl.formatMessage({ id: 'avatarWarning2' })}</span>
            </div>
          </div>
          <div className="inputs-side">
            <div className="inputs-box">
              {/* Name */}
              <div className="input">
                <Input
                  name="Name"
                  maxLength={32}
                  label={ intl.messages.name && intl.formatMessage({ id: 'name' })}
                  placeholder={intl.messages.personalDetailNamePlaceholder && intl.formatMessage({ id: 'personalDetailNamePlaceholder' })}
                  rules={[
                    { required: true, message: intl.messages.personalDetailNameError && intl.formatMessage({ id: 'personalDetailNameError' }) },
                    { validator: (_, value) => validateName(intl, value) },
                  ]}
                />
              </div>

              {/* Surname */}
              <div className="input">
                <Input
                  maxLength={32}
                  name="Surname"
                  label={intl.messages.surname && intl.formatMessage({ id: 'surname' })}
                  placeholder={intl.messages.personalDetailSurnamePlaceholder && intl.formatMessage({ id: 'personalDetailSurnamePlaceholder' })}
                  rules={[
                    { required: true, message: intl.messages.personalDetailSurnameError && intl.formatMessage({ id: 'personalDetailSurnameError' }) },
                    { validator: (_, value) => validateName(intl, value) },
                  ]}
                />
              </div>
            </div>

            <div className="inputs-box">
              {/* Date of brith */}
              <div className="input date-birth-input">
                <DatePicker
                  placeholder={intl.messages.selectDate && intl.formatMessage({ id: 'selectDate' })}
                  label={intl.messages.dateOfBrith && intl.formatMessage({ id: 'dateOfBrith' })}
                  name="DateOfBirth"
                  rules={[{ required: true, message: intl.messages.personalDetailDateOfBrithError && intl.formatMessage({ id: 'personalDetailDateOfBrithError' }) }]}
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
            <div className="inputs-box">
              {/* Email */}
              <div className="input">
                <Input
                  maxLength={50}
                  label={ intl.messages.email && intl.formatMessage({ id: 'email' })}
                  name="Email"
                  placeholder={intl.messages.personalDetailEmailPlaceholder && intl.formatMessage({ id: 'personalDetailEmailPlaceholder' })}
                  rules={[
                    { required: true, message: intl.messages.personalDetailEamilError && intl.formatMessage({ id: 'personalDetailEamilError' }) },
                    { validator: (_, value) => validateEmail(intl, value) },
                  ]}
                />
              </div>

              {/* Number */}
              <div className="input">
                <Input
                  maxLength={16}
                  label={intl.messages.createCvPhoneNumber && intl.formatMessage({ id: 'createCvPhoneNumber' })}
                  name="PhoneNumber"
                  placeholder={intl.messages.personalDetailNumberPlaceholder && intl.formatMessage({ id: 'personalDetailNumberPlaceholder' })}
                  rules={[
                    { required: true, message: intl.messages.personalDetailNumberError && intl.formatMessage({ id: 'personalDetailNumberError' }) },
                    { validator: (_, value) => validatePhoneNumber(intl, value) },
                  ]}
                />
              </div>
            </div>
            <div className="inputs-box">
              {/* Country */}
              <div className="input">
                <Select
                  name="CountryId"
                  placeholder={intl.messages.personalDetailCountryPlaceholder && intl.formatMessage({ id: 'personalDetailCountryPlaceholder' })}
                  loading={countryLoading}
                  label={ intl.messages.country && intl.formatMessage({ id: 'country' })}
                  rules={[{ required: true, message: intl.messages.personalDetailCountryError && intl.formatMessage({ id: 'personalDetailCountryError' }) }]}
                >
                  {countryData?.data?.map((option: any) => {
                    return (
                      <SelectOption key={option.name} value={option.id}>
                        {option.name}
                      </SelectOption>
                    );
                  })}
                </Select>
              </div>
              {/* City */}
              <div className="input">
                <Select
                  name="RegionId"
                  placeholder={intl.formatMessage({ id: otherRegion ? 'otherCity' : 'personalDetailCityPlaceholder' })}
                  disabled={regionOptionData.length === 0 || otherRegion}
                  loading={regionLoading}
                  label={intl.messages.city && intl.formatMessage({ id: 'city' })}
                  rules={[{ required: !otherRegion, message: intl.messages.personalDetailCityError && intl.formatMessage({ id: 'personalDetailCityError' }) }]}
                >
                  {regionOptionData?.data?.map((option: any) => (
                    <SelectOption key={option.id} value={option.id}>
                      {option.name}
                    </SelectOption>
                  ))}
                </Select>
                <Checkbox
                  onChange={() => setOtherRegion(!otherRegion)}
                  name="OtherRegion"
                  checked={otherRegion}
                  label={intl.messages.otherCity && intl.formatMessage({ id: 'otherCity' })}
                  initialValue={false}
                  className="checkbox"
                />
              </div>
            </div>
            <div className="inputs-box">
              {/* Adreess */}
              <div className="input addrees-input">
                <Input
                  name="Address"
                  maxLength={100}
                  label={intl.messages.address && intl.formatMessage({ id: 'address' })}
                  placeholder={intl.messages.personalDetailAddressPlaceholder && intl.formatMessage({ id: 'personalDetailAddressPlaceholder' })}
                  rules={[{ required: true, message: intl.messages.personalDetailAddressError && intl.formatMessage({ id: 'personalDetailAddressError' }) }]}
                  onKeyDown={handleTabKeyPress}
                />
              </div>
            </div>
          </div>
        </StyledPersonalDetailsModal>
      </Form>
    </>
  );
};
