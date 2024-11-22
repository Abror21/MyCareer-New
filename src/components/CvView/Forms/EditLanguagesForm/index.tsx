import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useForm } from 'antd/lib/form/Form';
import { Form } from 'antd';

import { StyledEditLanguagesForm } from './style';
import { Button, Modal, Select, IconButton, SelectOption, AddMoreButton } from 'ui';
import useQueryApiClient from 'utils/useQueryApiClient';
import { RealCvInterface } from 'types/RealCV';
import { useUserDispatch } from 'contexts/UserContext';
import { languageLevels } from 'utils/consts';

type EditLanguagesFormProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  cvData: RealCvInterface;
};

type LanguageFromApi = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

type SelectedLanguage = {
  language: number | string | undefined;
  level: string | null;
};

export const EditLanguagesForm = ({ open, setOpen, cvData }: EditLanguagesFormProps) => {
  const intl = useIntl();
  const [form] = useForm();
  const { dispatch: userDispatch } = useUserDispatch();
  const [allLanguages, setAllLanguages] = useState<LanguageFromApi[]>([]);
  const [filteredLanguages, setFilteredLanguages] = useState<LanguageFromApi[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<SelectedLanguage[]>([]);

  const languageFields = Form.useWatch('languages', form);

  useEffect(() => {
    setSelectedLanguages([]);
    if (cvData.languages) {
      cvData.languages.map((lang) => {
        setSelectedLanguages((prevState) => [
          ...prevState,
          {
            language: lang.language.id,
            level: lang.level,
          },
        ]);
      });
    }
  }, [cvData, open]);

  useEffect(() => {
    if (selectedLanguages.length > 0) {
      const initialValues = selectedLanguages.map((selectedLang) => {
        const languageName = allLanguages.find((lang) => lang.id === selectedLang.language)?.name;
        return { language: languageName, level: selectedLang.level };
      });

      form.setFieldsValue({ languages: initialValues });
    } else {
      form.setFieldsValue({ language: undefined, level: undefined });
    }
  }, [open]);

  useEffect(() => {
    if(cvData?.languages && open){
      const renderedLangs = cvData.languages.map((lang) => {
        return{
          language: lang.language.id,
          level: lang.level,
        }
      });

      const initialValues = renderedLangs.map((selectedLang) => {
        const languageName = allLanguages.find((lang) => lang.id === selectedLang.language)?.name;
        return { language: languageName, level: selectedLang.level };
      });
      form.setFieldsValue({ languages: initialValues});
    }
  }, [open])

  useEffect(() => {
    if (languageFields) {
      setSelectedLanguages([]);

      languageFields.forEach((lang: { language: string | number | undefined; level: string }) => {
        if (lang.language) {
          if (typeof lang.language === 'number') {
            const filteredArray = allLanguages.filter(
              (lang) => !languageFields.some((selectedLang: { language: number }) => selectedLang.language === lang.id)
            );

            setFilteredLanguages(filteredArray);

            setSelectedLanguages((prevState) => [
              ...prevState,
              {
                language: lang.language,
                level: lang.level,
              },
            ]);
          }

          if (typeof lang.language === 'string') {
            let foundLanguageId = allLanguages.find((el) => el.name === lang.language)?.id;

            if (foundLanguageId) {
              setSelectedLanguages((prevState) => [
                ...prevState,
                {
                  language: foundLanguageId,
                  level: lang.level,
                },
              ]);
            }
          }
        }
      });
    }
  }, [languageFields]);

  useEffect(() => {
    setFilteredLanguages([]);
    if (selectedLanguages) {
      const filteredArray = allLanguages.filter(
        (lang) => !selectedLanguages.some((selectedLang) => selectedLang.language === lang.id)
      );

      setFilteredLanguages(filteredArray);
    }
  }, [selectedLanguages]);

  useQueryApiClient({
    request: {
      url: 'api/language',
      method: 'GET',
    },
    onSuccess: (response) => {
      setAllLanguages(response.data);
    },
  });

  const { appendData: updateUserLanguages } = useQueryApiClient({
    request: {
      url: `/api/freelancer/add-language`,
      method: 'POST',
    },
    onSuccess: () => {
      userDispatch({
        type: 'SET_USER_DATA',
        payload: {
          refresh: true,
        },
      });

      form.resetFields();
      setOpen(false);
    },
  });

  const handleAddField = (addFn: {
    (defaultValue?: any, insertIndex?: number | undefined): void;
    (arg0: { language: undefined; level: undefined }): void;
  }) => {
    addFn({ language: undefined, level: 'Beginner' });
  };

  const handleRemoveOrClearField = (
    fieldName: number,
    fieldCount: number,
    removeFn: { (index: number | number[]): void; (arg0: any): void }
  ) => {
    if (fieldCount > 1) {
      removeFn(fieldName);
      if (fieldCount === selectedLanguages.length) {
        setSelectedLanguages((prevState) => prevState.filter((_, index) => index !== fieldName));
      }
    } else {
      form.setFieldsValue({
        languages: [{ language: undefined, level: 'Beginner' }],
      });

      setSelectedLanguages([]);
    }
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

  const onFinish = (values: any) => {
    const freelancerLanguageDTOs = values.languages.map((item: any) => {
      const foundLanguage = allLanguages.find((lang) => lang.name === item.language);
      if (foundLanguage) {
        return { languageId: foundLanguage.id, level: item.level };
      }
    });

    updateUserLanguages({ freelancerLanguageDTOs });
  };

  return (
    <Modal
      forceRender
      open={open}
      onCancel={() => {
        setOpen(false);
        form.resetFields();
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
            form.resetFields();
          }}
        />,
        <Button
          key="submit"
          label={intl.messages.save && intl.formatMessage({ id: 'save' })}
          type="primary"
          htmlType="submit"
          className="btn primary-btn save-btn"
          onClick={handleSubmit}
        />,
      ]}
    >
      <StyledEditLanguagesForm>
        <Form form={form} onFinish={onFinish} layout="vertical" className="languages-form-wrapper">
          <div className="labels">
            <h2>{intl.messages.language && intl.formatMessage({ id: 'language' })}</h2>
            <h2>{intl.messages.level && intl.formatMessage({ id: 'level' })}</h2>
          </div>

          <Form.List name="languages">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div className="select-wrapper" key={key}>
                    <div className="select-box">
                      <div className="select">
                        <Select
                          {...restField}
                          name={[name, 'language']}
                          placeholder={intl.messages.AddLanguageSelectPlaceholder && intl.formatMessage({ id: 'AddLanguageSelectPlaceholder' })}
                          rules={[
                            {
                              required: true,
                              message: intl.messages.languageSelectError &&  intl.formatMessage({ id: 'languageSelectError' }),
                            },
                          ]}
                        >
                          {filteredLanguages &&
                            filteredLanguages.map((option) => (
                              <SelectOption key={option.id} value={option.name}>
                                {option.name}
                              </SelectOption>
                            ))}
                        </Select>
                      </div>
                      <div className="level-select-wrapper">
                        <div className="select">
                          <Select
                            {...restField}
                            name={[name, 'level']}
                            placeholder={ intl.messages.addSkillsLevelPlaceholder && intl.formatMessage({ id: 'addSkillsLevelPlaceholder' })}
                          >
                            {languageLevels &&
                              languageLevels.map((option) => (
                                <SelectOption key={option.value} value={option.value}>
                                  {option.label}
                                </SelectOption>
                              ))}
                          </Select>
                        </div>
                        <div className="mobile-hidden">
                          <IconButton
                            iconId="close-svg"
                            onClick={() => handleRemoveOrClearField(name, fields.length, remove)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="desktop-hidden">
                      <IconButton
                        iconId="close-svg"
                        onClick={() => handleRemoveOrClearField(name, fields.length, remove)}
                      />
                    </div>
                  </div>
                ))}
                {fields.length < 4 && (
                  <Form.Item>
                    <AddMoreButton
                      label={intl.messages.addLanguageBtn &&  intl.formatMessage({ id: 'addLanguageBtn' })}
                      onClick={() => handleAddField(add)}
                    />
                  </Form.Item>
                )}
              </>
            )}
          </Form.List>
        </Form>
      </StyledEditLanguagesForm>
    </Modal>
  );
};
