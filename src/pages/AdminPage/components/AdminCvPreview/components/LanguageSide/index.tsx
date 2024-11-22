import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Modal, Form, Dropdown } from 'antd';
import { Select, SelectOption } from 'ui';
import SvgSelector from 'assets/icons/SvgSelector';
import { languageLevels } from 'utils/consts';
import useQueryApiClient from 'utils/useQueryApiClient';
import { CvPageInterface } from 'pages/AdminPage/components/Types';
import { MenuProps } from 'antd/lib';
import { useUserDispatch, useUserState } from '../../../../../../contexts/UserContext';
import { handleAccessDeniedError } from '../../../../../../utils/globalFunctions';

interface LanguageSideProps {
  cvData: CvPageInterface | undefined;
}

export const LanguageSide = ({ cvData }: LanguageSideProps) => {
  const intl = useIntl();
  const { allowedPages } = useUserState();
  const { dispatch: userDispatch } = useUserDispatch();

  const [languageForm] = Form.useForm();
  const [changedLanguageData, setChangedLanguageData] = useState<any>();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [userLanguages, setUserLanguages] = useState<any[] | undefined>([]);
  const [filteredLanguages, setFilteredLanguages] = useState<any[] | undefined>([]);

  const { appendData: UpdateLanguageLevelApi } = useQueryApiClient({
    request: {
      url: `/api/manage-cabinets/update-freelancer-language-from-admin?freelancerId=${cvData?.id}`,
      method: 'PUT',
    },
    onError: (error) => {
      if (error.error === 'access_denied') {
        allowedPages && handleAccessDeniedError('system_administration', allowedPages, userDispatch);
      }
    },
  });

  const { appendData: CreateUserLanguageApi } = useQueryApiClient({
    request: {
      url: `/api/manage-cabinets/add-freelancer-language-from-admin?freelancerId=${cvData?.id}`,
      method: 'POST',
    },
    onSuccess(res) {
      if (userLanguages !== undefined) {
        setUserLanguages([...userLanguages, res.data]);
      } else {
        setUserLanguages([res.data]);
      }
    },
    onError: (error) => {
      if (error.error === 'access_denied') {
        allowedPages && handleAccessDeniedError('system_administration', allowedPages, userDispatch);
      }
    },
  });

  const { data: apiLanguage } = useQueryApiClient({
    request: { url: '/api/language', method: 'GET' },
  });

  const { refetch: refechtDeleteLanguageApi, isLoading: deleteLanguageLoading } = useQueryApiClient({
    request: {
      url: `/api/manage-cabinets/delete-freelancer-language-from-admin?freelancerId=${cvData?.id}&languageId=${changedLanguageData?.languageId}`,
      method: 'DELETE',
    },
    onSuccess: (res) => {
      const updatedLanguages = userLanguages?.filter((lang) => lang.language.id !== changedLanguageData?.languageId);
      setUserLanguages(updatedLanguages);
      setDeleteModalVisible(false);
      setChangedLanguageData({});
    },
    onError: (error) => {
      if (error.error === 'access_denied') {
        allowedPages && handleAccessDeniedError('system_administration', allowedPages, userDispatch);
      }
    },
  });

  useEffect(() => {
    setUserLanguages(cvData?.languages);
    if (cvData && cvData.languages) {
      const initialValues: Record<string, any> = {};
      cvData?.languages?.forEach((lang) => {
        initialValues[`level$${lang.language.id}`] = lang.level;
      });
      languageForm.setFieldsValue(initialValues);
    }
  }, [cvData, languageForm]);

  useEffect(() => {
    // Filter languages from apiLanguage based on userLanguages
    if (apiLanguage?.data && userLanguages) {
      const filtered = apiLanguage.data.filter((lang: any) =>
        userLanguages.every((userLang) => userLang.language.id !== lang.id)
      );
      setFilteredLanguages(filtered);
    }
  }, [apiLanguage, userLanguages]);

  const handleLanguageFormChange = (changedValues: Record<string, string | number>) => {
    Object.entries(changedValues).forEach(([name, value]) => {
      const match = name.match(/level\$(\d+)/);
      if (match) {
        const [, languageId] = match;
        UpdateLanguageLevelApi({ languageId: parseInt(languageId, 10), level: value });
      }
    });
  };

  const handleDeleteLanguage = () => {
    refechtDeleteLanguageApi();
  };

  const handleCancel = () => {
    setChangedLanguageData({});
    setDeleteModalVisible(false);
  };

  const handleOpenDeleteModal = (languageId: number) => {
    setChangedLanguageData({ languageId });
    setDeleteModalVisible(true);
  };

  const handleAddLanguage = (selectedLanguageId: number) => {
    // Assuming you have languageData available
    const selectedLanguage = apiLanguage?.data?.find((item: any) => item.id === selectedLanguageId);

    if (selectedLanguage) {
      CreateUserLanguageApi({ languageId: selectedLanguageId, level: 'Beginner' });
    }
  };

  const languageMenuItems = filteredLanguages?.map((item: any) => ({
    label: <div onClick={() => handleAddLanguage(item.id)}>{item.name}</div>,
    key: item.id.toString(),
  }));

  const languageMenuProps: MenuProps = {
    items: languageMenuItems || [],
    style: {
      maxHeight: '200px',
      overflowY: 'auto',
    },
  };

  return (
    <>
      <h4 className="bar-title">{intl.messages.language && intl.formatMessage({ id: 'language' })}</h4>
      <Form onValuesChange={handleLanguageFormChange} form={languageForm} className="language-form">
        <ul className="cv-preview-bar-ul ul-left-side ">
          {userLanguages?.map((lang, index) => (
            <li className="edit-languages" key={index}>
              <p className="left-side-list-name">{lang.language.name}</p>
              <Select
                placeholder={
                  intl.messages.AddLanguageLevelSelectPlaceholder &&
                  intl.formatMessage({ id: 'AddLanguageLevelSelectPlaceholder' })
                }
                name={`level$${lang.language.id}`}
                initialValue={lang.level}
                className="level-select"
              >
                {languageLevels.map((option) => (
                  <SelectOption key={option.value} value={option.value}>
                    {option.label}
                  </SelectOption>
                ))}
              </Select>
              {userLanguages.length > 1 && (
                <span className="remove-button" onClick={() => handleOpenDeleteModal(lang.language.id)}>
                  <SvgSelector id="close-svg" />
                </span>
              )}
            </li>
          ))}
        </ul>
        {userLanguages && userLanguages.length !== 4 && (
          <Dropdown menu={languageMenuProps} trigger={['click']}>
            <div className="add-button">
              <span>+ {intl.messages.addLanguage && intl.formatMessage({ id: 'addLanguage' })}</span>
            </div>
          </Dropdown>
        )}
      </Form>

      <Modal
        title={intl.messages.deleteLanguageConiformTitle && intl.formatMessage({ id: 'deleteLanguageConiformTitle' })}
        open={deleteModalVisible}
        onOk={handleDeleteLanguage}
        confirmLoading={deleteLanguageLoading}
        onCancel={handleCancel}
      >
        <p>{intl.messages.deleteLanguageConiformText && intl.formatMessage({ id: 'deleteLanguageConiformText' })}</p>
      </Modal>
    </>
  );
};
