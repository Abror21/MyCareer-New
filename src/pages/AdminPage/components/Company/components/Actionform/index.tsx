import React, { useEffect, useState } from 'react';
import { StyledActionForm } from './style';
import { BackButton, Button, Checkbox, DatePicker, Input, Select, SelectOption, TextArea, Upload } from 'ui';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Form, message } from 'antd';
import { validateEmail, validateName, validatePhoneNumber } from 'utils/globalFunctions';
import SvgSelector from 'assets/icons/SvgSelector';
import dayjs from 'dayjs';
import add_image from 'assets/images/add_image.jpg';
import useQueryApiClient from 'utils/useQueryApiClient';
import axios from 'axios';
import { routes } from 'config/config';
import Cookies from 'js-cookie';
import { employees } from 'utils/consts';

interface props {}

export default function ActionForm({}: props) {
  const navigate = useNavigate();
  const intl = useIntl();
  const locations = useLocation();
  const [image, setImage] = useState<File | null>(null);
  const [from] = Form.useForm();
  const [path, setPath] = useState<string | null>(null);
  const [year, setYear] = useState<number | null>(null);
  const [disable, setDisable] = useState<boolean>(locations.pathname.includes('/admin/view-partner') ? true : false);
  const params = useParams();
  const [description, setDescription] = useState('');

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const cursorPosition = event.target.selectionStart;

      const newText = `${description.slice(0, cursorPosition)}\n•${description.slice(cursorPosition)}`;

      setDescription(newText);

      setTimeout(() => {
        const textarea = event.target;
        textarea.selectionStart = textarea.selectionEnd = cursorPosition + 2;
        textarea.focus();
      }, 0);
    }
  };

  const handleChangeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  useEffect(() => {
    if (description !== '') from.setFieldsValue({ Description: description });
  }, [description]);

  const handleChange = (date: any) => {
    const currentYear = new Date().getFullYear();
    const selectedYear = date.year();
    if (selectedYear < 1900 || selectedYear > currentYear) {
      message.error(`Please enter a valid year between 1900 and ${currentYear}`);
      setYear(null);
    } else {
      setYear(selectedYear);
    }
  };

  const validateImage = async (file: File): Promise<boolean> => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const minSize = 0 * 1024; // Minimum size in bytes
    const maxSize = 1024 * 1024; // Maximum size in bytes
    const minWidth = 0; // Minimum width in pixels
    const minHeight = 0; // Minimum height in pixels
    const maxWidth = 1920; // Maximum width in pixels
    const maxHeight = 1280; // Maximum height in pixels

    // Check file type
    if (!allowedTypes.includes(file.type)) {
      message.error(intl.formatMessage({ id: 'CreateCvNotificationAvatarType' }));
      return false;
    }

    // Check file size
    if (file.size < minSize || file.size > maxSize) {
      message.error(
        file.size < minSize
          ? intl.formatMessage({ id: 'CreateCvNotificationAvatarMinSize' })
          : intl.formatMessage({ id: 'CreateCvNotificationAvatarMaxSize' })
      );
      return false;
    }

    const image = new Image();
    image.src = URL.createObjectURL(file);

    return new Promise<boolean>((resolve) => {
      image.onload = () => {
        const width = image.naturalWidth;
        const height = image.naturalHeight;

        if (width < minWidth || height < minHeight || width > maxWidth || height > maxHeight) {
          message.error(
            width < minWidth || height < minHeight
              ? intl.formatMessage({ id: 'CreateCvNotificationAvatarMinDimensions' })
              : intl.formatMessage({ id: 'CreateCvNotificationAvatarMaxDimensions' })
          );
          resolve(false);
        } else {
          resolve(true);
        }

        URL.revokeObjectURL(image.src);
      };

      image.onerror = () => {
        message.error(intl.formatMessage({ id: 'CreateCvNotificationAvatarLoadError' }));
        resolve(false);
        URL.revokeObjectURL(image.src);
      };
    });
  };

  const handleFileSelect = (file: File) => {
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx: any = canvas.getContext('2d');

          const canvasSize = Math.max(img.width, img.height);
          canvas.width = canvasSize;
          canvas.height = canvasSize;

          const offsetX = (canvasSize - img.width) / 2;
          const offsetY = (canvasSize - img.height) / 2;

          ctx!.drawImage(img, 0, 0, img.width, img.height);
          const imageData = ctx!.getImageData(0, 0, 1, 1).data;
          const backgroundColor = `rgba(${imageData[0]}, ${imageData[1]}, ${imageData[2]}, ${imageData[3]})`;

          ctx.fillStyle = backgroundColor;
          ctx.fillRect(0, 0, canvasSize, canvasSize);
          ctx.drawImage(img, offsetX, offsetY, img.width, img.height);

          canvas.toBlob((blob) => {
            if (blob) {
              const newFile = new File([blob], file.name, { type: 'image/png' });
              setImage(newFile);
            } else {
              message.error(intl.formatMessage({ id: 'CreateCvNotificationAvatarUploadError' }));
            }
          }, 'image/png');
        };

        img.onerror = () => {
          message.error(intl.formatMessage({ id: 'CreateCvNotificationAvatarImageError' }));
        };
      };

      reader.readAsDataURL(file);
    }
  };
  const handleImageChange = async (data: any) => {
    if (data.file) {
      const selectedImage = data.file.originFileObj;
      const isValid = await validateImage(selectedImage);
      if (isValid) {
        handleFileSelect(selectedImage);
      }
    }
  };

  const { isLoading: isLoadingCountry, data: countryData } = useQueryApiClient({
    request: {
      url: '/api/country',
      method: 'GET',
    },
  });

  const { isLoading: isLoadingIndsutry, data: insdustryData } = useQueryApiClient({
    request: {
      url: '/api/hirings/industry/filter',
      method: 'GET',
    },
  });

  const { isLoading: createCompanyLoading, appendData } = useQueryApiClient({
    request: {
      url: '/api/manage-cabinets/create/organization',
      method: 'POST',
      multipart: true,
    },
    onSuccess() {
      navigate('/admin/partners');
    },
    onError(error) {
      if (error?.data?.error == 'organization_already_exist')
        message.error(intl.formatMessage({ id: 'organization_already_exist' }));
    },
  });

  const { isLoading: updateCompanyLoading, appendData: updateCompany } = useQueryApiClient({
    request: {
      url: `/api/manage-cabinets/update/organization?id=${params.id}`,
      method: 'PUT',
      multipart: true,
    },
    onSuccess() {
      navigate('/admin/partners');
    },
  });
  const submit = (value: any) => {
    const orgCode = parseInt(value?.OrganizationCode);
    if (orgCode <= 0) {
      // message.error('OrganizationCode must be a valid positive number.');
      return;
    }

    if (locations.pathname === '/admin/partners/add-partner') {
      appendData({
        ...value,
        FormFile: image,
        EstablishedYear: dayjs(value?.EstablishedYear).year(),
        OrganizationCode: orgCode,
      });
    } else {
      updateCompany({
        ...value,
        FormFile: image,
        EstablishedYear: dayjs(value?.EstablishedYear).year(),
        OrganizationCode: orgCode,
        UpdateImage: image == null && path != null ? true : false,
      });
    }
  };

  const getCompanyById = async () => {
    if (locations.pathname !== '/admin/partners/add-partner') {
      const config = {
        headers: {
          Authorization: `Bearer ${Cookies.get('jwt')}`,
        },
      };
      await axios
        .get(`${routes.api.baseUrl}/api/manage-cabinets/organization/${params.id}`, config)
        .then((response) => {
          const {
            organizationName,
            organizationRegistered,
            description,
            organizationWebPage,
            employessCount,
            establishedYear,
            organizationsDetail,
            industriys,
            operatingCountries,
            ...otherData
          } = response.data.data;

          const id = organizationRegistered?.id || null;

          setDescription(description);

          const formattedDate = establishedYear ? dayjs(`${establishedYear}-01-01`) : null;

          const industryIds = industriys?.map((industry: any) => industry.id);
          const countryIds = operatingCountries?.map((country: any) => country.id);

          const { lastName, zipCode, personJob, email, organizationAddress, organizationCode, phoneNumber, name } =
            organizationsDetail;

          from.setFieldsValue({
            OrganizationName: organizationName,
            CountryId: id,
            EstablishedYear: formattedDate,
            EmployessCount: employessCount,
            CompanyWebPage: organizationWebPage,
            EmployeesCount: employessCount,
            LastName: lastName,
            ZipCode: zipCode,
            PersonJob: personJob,
            Email: email,
            OrganizationAddress: organizationAddress,
            OrganizationCode: organizationCode,
            PhoneNumber: phoneNumber,
            Name: name,
            IndustryId: industryIds,
            OperatingCountriesId: countryIds,
            ...otherData,
          });

          if (response.data.data.image !== null) {
            setPath(response.data.data?.image?.path);
          }
        })
        .catch((error) => {
          return;
        });
    }
  };

  useEffect(() => {
    getCompanyById();
  }, []);

  const onlyNumbers = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, '');
    from.setFieldsValue({ OrganizationCode: numericValue });
  };

  useEffect(() => {
    if (locations.pathname.includes('/admin/view-partner')) setDisable(true);
    else setDisable(false);
  }, [locations.pathname]);

  return (
    <StyledActionForm>
      <BackButton onClick={() => navigate(-1)} color="black" label={intl.formatMessage({ id: 'back' })} />
      <div className="title-container">
        <h1 className="title">
          {locations.pathname === '/admin/partners/add-partner' ? (
            intl.formatMessage({ id: 'add_company' })
          ) : locations.pathname.includes('/admin/view-partner') ? (
            <>{intl.formatMessage({ id: 'view_company' })}</>
          ) : (
            intl.formatMessage({ id: 'edit_company' })
          )}
        </h1>
        {locations.pathname.includes('/admin/view-partner') && (
          <Button
            className="edit-btn"
            icon={<SvgSelector id="edit" />}
            onClick={() => navigate('/admin/edit-partner/' + params.id)}
          />
        )}
      </div>
      <hr style={{ background: 'gray' }} />

      <Form form={from} labelAlign="right" layout="vertical" onFinish={submit}>
        <div className="title-base">{intl.formatMessage({ id: 'publish_info' })}</div>
        <div className="form-header">
          <div className="form-container">
            <div className="company-name">
              <div className="company-name-field">
                <Input
                  disabled={disable}
                  name="OrganizationName"
                  rules={[
                    {
                      required: true,
                      message: intl.formatMessage({ id: 'company_name_required' }),
                    },
                  ]}
                  label={intl.formatMessage({ id: 'company_name' })}
                />
              </div>
              <div className="country-field">
                <Select
                  disabled={disable}
                  name="CountryId"
                  loading={isLoadingCountry}
                  label={intl.formatMessage({ id: 'registry_country' })}
                >
                  {countryData?.data?.map((item: any, index: number) => {
                    return (
                      <SelectOption value={item.id} key={index}>
                        {item.name}
                      </SelectOption>
                    );
                  })}
                </Select>
              </div>
            </div>
            <div className="company-detail">
              <DatePicker
                disabled={disable}
                name="EstablishedYear"
                label={intl.formatMessage({ id: 'estabilshed_year' })}
                className="date-picker"
                picker="year"
                value={year ? dayjs(`${year}`, 'YYYY') : null}
                onChange={handleChange}
                placeholder="Select a year"
              />
              <Input disabled={disable} name="CompanyWebPage" label={intl.formatMessage({ id: 'company_web_site' })} />
              <div className="eployes-field">
                <Select disabled={disable} name="EmployeesCount" label={intl.formatMessage({ id: 'select_employes' })}>
                  {employees?.map((item: any, index: number) => {
                    return (
                      <SelectOption value={item?.count} key={index}>
                        {item?.count}
                      </SelectOption>
                    );
                  })}
                </Select>
              </div>
              <div className="operation-country-field">
                <Select
                  disabled={disable}
                  name="OperatingCountriesId"
                  loading={isLoadingCountry}
                  mode="multiple"
                  label={intl.formatMessage({ id: 'operation_country' })}
                >
                  {countryData?.data?.map((item: any, index: number) => {
                    return (
                      <SelectOption value={item.id} key={index}>
                        {item.name}
                      </SelectOption>
                    );
                  })}
                </Select>
              </div>
            </div>
            <div>
              <Select
                disabled={disable}
                name="IndustryId"
                label={intl.formatMessage({ id: 'industry' })}
                loading={isLoadingIndsutry}
                mode="multiple"
              >
                {insdustryData?.data?.map((item: any, index: number) => {
                  return (
                    <SelectOption value={item.id} key={item.id}>
                      {item.name}
                    </SelectOption>
                  );
                })}
              </Select>
            </div>
          </div>
          <div>
            {!image && !path ? (
              <>
                <Upload disabled={disable} className="upload" onChange={handleImageChange}>
                  <div className="image-container">
                    <img src={add_image} alt="default-photo" />
                  </div>
                </Upload>
              </>
            ) : (
              <div className="image-action">
                <div className="image-container">
                  <img
                    loading="lazy"
                    src={image !== null ? URL.createObjectURL(image) : routes.api.baseUrl + '/' + path}
                    alt="user"
                  />
                </div>
                {!locations.pathname.includes('/admin/view-partner') && (
                  <div
                    className="remove-btn"
                    onClick={() => {
                      setImage(null);
                      setPath(null);
                    }}
                  >
                    <SvgSelector id="trash" />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="description">
          <TextArea
            disabled={disable}
            name="Description"
            maxLength={10000}
            label={intl.formatMessage({ id: 'description' })}
            onChange={handleChangeDescription}
            onKeyDown={handleKeyDown}
            rows={4}
            value={description}
            style={{ resize: 'none' }}
          />
        </div>
        <hr style={{ margin: '40px 0 20px 0', background: 'gray' }} />
        <h1 className="title-base">{intl.formatMessage({ id: 'internal_information' })}</h1>
        <div className="internal-details">
          <div className="internal-fields">
            <Input
              disabled={disable}
              onChange={onlyNumbers}
              name="OrganizationCode"
              required
              label={intl.formatMessage({ id: 'company_code' })}
              rules={[
                {
                  required: true,
                  message: intl.messages.company_name_required && intl.formatMessage({ id: 'company_name_required' }),
                },
              ]}
            />
          </div>
          <div className="company_legas_address">
            <Input
              disabled={disable}
              name="OrganizationAddress"
              label={intl.formatMessage({ id: 'company_legas_address' })}
            />
          </div>
          <div className="internal-fields">
            <Input disabled={disable} name="ZipCode" label={intl.formatMessage({ id: 'zip_code' })} />
          </div>
        </div>

        <div className="job-details">
          <h1 className="contact-person">{intl.formatMessage({ id: 'contact_person' })}</h1>
          <div className="internal-details">
            <div className="company_legas_address">
              <Input disabled={disable} name="PersonJob" label={intl.formatMessage({ id: 'peron_job_title' })} />
            </div>
            <div className="internal-fields">
              <Input
                disabled={disable}
                name="Name"
                label={intl.formatMessage({ id: 'name' })}
                rules={[
                  {
                    message:
                      intl.messages.personalDetailNumberError &&
                      intl.formatMessage({ id: 'personalDetailNumberError' }),
                  },
                  { validator: (_, value) => validateName(intl, value) },
                ]}
              />
            </div>
            <div className="internal-fields">
              <Input
                disabled={disable}
                name="LastName"
                label={intl.formatMessage({ id: 'surname' })}
                rules={[
                  {
                    message:
                      intl.messages.personalDetailNumberError &&
                      intl.formatMessage({ id: 'personalDetailNumberError' }),
                  },
                  { validator: (_, value) => validateName(intl, value) },
                ]}
              />
            </div>
          </div>
        </div>
        <div className="internal-details-contact">
          <div className="email-field">
            <Input
              disabled={disable}
              name="Email"
              maxLength={50}
              rules={[
                {
                  message:
                    intl.messages.personalDetailEamilError && intl.formatMessage({ id: 'personalDetailEamilError' }),
                },
                { validator: (_, value) => validateEmail(intl, value) },
              ]}
              label={intl.formatMessage({ id: 'contact_email' })}
            />
          </div>
          <Input
            disabled={disable}
            name="PhoneNumber"
            maxLength={16}
            label={intl.formatMessage({ id: 'phone_number' })}
            rules={[
              {
                message:
                  intl.messages.personalDetailNumberError && intl.formatMessage({ id: 'personalDetailNumberError' }),
              },
              { validator: (_, value) => validatePhoneNumber(intl, value) },
            ]}
          />
        </div>
        <div className="save-button">
          {!locations.pathname.includes('/admin/view-partner') && (
            <Button
              loading={createCompanyLoading || updateCompanyLoading}
              className="btn"
              onClick={() => from.submit()}
              label={intl.formatMessage({ id: 'save_changes' })}
            />
          )}
        </div>
      </Form>
    </StyledActionForm>
  );
}
