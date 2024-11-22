import React, { useEffect, useState } from 'react';
import { StyledDetailsForm } from './style';
import { Button, Checkbox, DatePicker, Input, Select, SelectOption, TextArea } from 'ui';
import { useIntl } from 'react-intl';
import add_image from 'assets/images/add_image.jpg';
import { routes } from 'config/config';
import useQueryApiClient from 'utils/useQueryApiClient';

export function DetailsForm({ form, path, setPath, image, setImage, disable, actionFormData, hiringImage }: any) {
  const intl = useIntl();
  const [description, setDescription] = useState(actionFormData?.description || '');

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

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  useEffect(() => {
    if (description !== '') form.setFieldsValue({ description: description });
  }, [description]);

  const { isLoading: loadingOrganization, data: organizations } = useQueryApiClient({
    request: {
      url: '/api/organization/name',
      method: 'GET',
    },
  });

  const handleSequenceChange = (e: any) => {
    const numericValue = e.target.value.replace(/\D/g, '');
    form.setFieldsValue({ sequence: numericValue });
  };

  const { refetch: refetchImage, appendData: appendImageData } = useQueryApiClient({
    request: {
      url: '/api/manage-cabinets/hirings/organization-image',
      method: 'GET',
      disableOnMount: true,
    },
    onSuccess: (response) => {
      setPath(response?.data?.path || '');
    },
    onError: (error) => {
      return;
    },
  });

  useEffect(() => {
    if (!image) setPath('');
    else if (hiringImage && image && form.getFieldValue('companyCode')) appendImageData({ code: form.getFieldValue('companyCode') });
  }, [image]);

  return (
    <StyledDetailsForm>
      <hr style={{ background: 'gray', margin: '10px 0 20px 0' }} />
      <div>
        <TextArea
          name="description"
          label={intl.formatMessage({ id: 'description_hiring' })}
          disabled={disable}
          value={description}
          onChange={handleChange}
          maxLength={10000}
          onKeyDown={handleKeyDown}
          rows={4}
          style={{ resize: 'none' }}
        />
      </div>
      <div className="details-container">
        <Input
          name="tags"
          label={intl.formatMessage({ id: 'tags_hiring' })}
          disabled={disable}
          rules={[
            {
              validator: (_, value) => {
                if (value?.length > 0 && value.includes(' ') && !value.includes(',')) {
                  return Promise.reject(new Error(intl.formatMessage({ id: 'tags_comma_required' })));
                }
                return Promise.resolve();
              },
            },
          ]}
        />
      </div>
      <div>
        <h4>{intl.formatMessage({ id: 'image_header' })}</h4>
        <div className="image-checkbox">
          <Checkbox
            disabled={!form.getFieldValue('companyCode') ? true : disable}
            checked={!form.getFieldValue('companyCode') && !hiringImage ? false : image}
            onChange={() => setImage(!image)}
          />
          <p>{intl.formatMessage({ id: 'upload_without_image' })}</p>
        </div>
        <div className="organization-image">
          <div>
            <div className="date-container">
              <DatePicker
                disabled={disable}
                name="publishedEndDate"
                label={intl.formatMessage({ id: 'published_end_date' })}
              />
            </div>
            <div className="sequence-input">
              <Input
                disabled={disable}
                name="sequence"
                onChange={handleSequenceChange}
                label={intl.formatMessage({ id: 'sequence' })}
              />
            </div>
            <div>
              <Select
                disabled={disable}
                label={intl.formatMessage({ id: 'anonymous_publisher' })}
                name="anonymousCompanyId"
                allowClear
                loading={loadingOrganization}
              >
                {organizations?.data?.map((item: any, index: number) => {
                  const companyName = form.getFieldValue('companyName');

                  if (companyName === item.name || companyName === item.id) {
                    return null;
                  }

                  return (
                    <SelectOption key={index} value={item.id}>
                      {item?.name}
                    </SelectOption>
                  );
                })}
              </Select>
            </div>
          </div>
          <div>
            <div className="image-container">
              {path == '' || path == null ? (
                <>
                  <img src={add_image} alt="default-photo" />
                </>
              ) : (
                <>
                  <img src={routes.api.baseUrl + '/' + path} alt="default-photo" />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </StyledDetailsForm>
  );
}
