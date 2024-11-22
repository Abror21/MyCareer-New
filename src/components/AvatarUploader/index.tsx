import React, { useEffect, useState } from 'react';
import type { GetProp, UploadProps } from 'antd';
import { StyledAvatarUploader } from './style';
import { Button, Upload } from '../../ui';
import { useIntl } from 'react-intl';
import SvgSelector from '../../assets/icons/SvgSelector';
import { routes } from '../../config/config';
import { openNotification } from '../../utils/globalFunctions';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

type AvatarUploaderProps = {
  image?: {
    id: number;
    createdAt: string;
    updatedAt: string;
    path: string;
  };
  newImage?: File | null;
  setNewImage?: React.Dispatch<React.SetStateAction<File | null>>;
  setUpdateImage?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AvatarUploader = ({ image, newImage, setNewImage, setUpdateImage }: AvatarUploaderProps) => {
  const intl = useIntl();
  const [existingImage, setExistingImage] = useState('');

  useEffect(() => {
    if (image) {
      setExistingImage(image.path);
    }

    return () => {
      setExistingImage('');
      if (setNewImage) {
        setNewImage(null);
      }
    };
  }, [image]);

  const validateImage = async (file: File): Promise<boolean> => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const minSize = 25 * 1024; // Minimum size in bytes
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

  const onChange = async (data: any) => {
    if (data.file) {
      const selectedImage = data.file.originFileObj;
      const isValid = await validateImage(selectedImage);
      if (isValid) {
        if (setNewImage) {
          setNewImage(selectedImage);
        }
        if (setUpdateImage) {
          setUpdateImage(true);
        }
      }
    }
  };

  const removeImageHandler = () => {
    setExistingImage('');
    if (setNewImage) {
      setNewImage(null);
    }
    if (setUpdateImage) {
      setUpdateImage(true);
    }
  };

  return (
    <StyledAvatarUploader>
      <div className="avatar-upload-wrapper">
        {existingImage && (
          <>
            <div className="existing-image">
              {image && <img loading='lazy' src={`${routes.api.baseUrl}/${image.path}`} alt="avatar" />}
            </div>

            <div className="remove-image" onClick={removeImageHandler}>
              <SvgSelector id="close-svg" />
            </div>
          </>
        )}
        {!existingImage && !newImage && (
          <>
            <SvgSelector id="photo-camera-svg" />
            <Upload name="image" className="avatar-upload" onChange={onChange}>
              <Button
                label={intl.formatMessage({ id: 'personalDetailUploadBtn' })}
                type="primary"
                className="secondary-btn btn"
              />
            </Upload>
          </>
        )}

        {newImage && (
          <>
            <div className="existing-image">
              <img loading='lazy' src={URL.createObjectURL(newImage)} alt="user" />
            </div>

            <div className="remove-image" onClick={removeImageHandler}>
              <SvgSelector id="close-svg" />
            </div>
          </>
        )}
      </div>

      <div className="warning-image">
        <span>{intl.messages.avatarWarning1 && intl.formatMessage({ id: 'avatarWarning1' })}</span>
        <span>**{intl.messages.avatarWarning3 && intl.formatMessage({ id: 'avatarWarning3' })}</span>
        <span>**{intl.messages.avatarWarning4 && intl.formatMessage({ id: 'avatarWarning4' })}</span>
        <span>{intl.messages.avatarWarning2 && intl.formatMessage({ id: 'avatarWarning2' })}</span>
      </div>
    </StyledAvatarUploader>
  );
};
