import { Button, Form } from 'antd';
import SvgSelector from 'assets/icons/SvgSelector';
import { UserLanguageInterface, useLanguageContext } from 'contexts/CreateCvContext/UserLanguageContext';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Select, SelectOption } from 'ui';
import { languageLevels } from 'utils/consts';

type Props = {
  apiLanguage: any;
  item: UserLanguageInterface;
  handleEditLanguage: (selectedLanguage: any) => void;
  handleDeleteLanguage: (item: any) => void;
  lastLanguage: UserLanguageInterface | undefined;
};

export const AddLanguagesListItem = (props: Props) => {
  const { item, apiLanguage, handleDeleteLanguage, handleEditLanguage, lastLanguage } = props;
  const [filteredLanguages, setFilteredLanguages] = useState<any[]>([]);
  const { state } = useLanguageContext();
  const intl = useIntl();
  const [form] = Form.useForm();
  const [selectedLanguage, setSelectedLanguage] = useState<UserLanguageInterface>({
    id: item.id,
    level: 'Beginner',
    languageId: 0,
  });

  useEffect(() => {
    if (item) {
      setSelectedLanguage(item);
    }
  }, [item]);

  useEffect(() => {
    let filteredLanguagesArray = apiLanguage?.data?.filter(
      (apiLang: { id: number }) => !state.userlanguage.some((userLang) => userLang.languageId === apiLang.id)
    );
    setFilteredLanguages(filteredLanguagesArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiLanguage]);

  useEffect(() => {
    if (item) {
      const language = apiLanguage?.data?.find((lang: any) => lang.id === item.languageId);
      form.setFieldsValue({ languageId: language?.name, level: item.level });
      setSelectedLanguage(item);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (lastLanguage?.id === item.id) {
      form.validateFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastLanguage]);

  const handleOnchange = (values: UserLanguageInterface) => {
    const updatedSelectedLanguage = { ...selectedLanguage };
    if (values.level) {
      updatedSelectedLanguage.level = values.level;
    }
    if (values.languageId) {
      updatedSelectedLanguage.languageId = values.languageId;
    }
    setSelectedLanguage(updatedSelectedLanguage);
    if (updatedSelectedLanguage.languageId && updatedSelectedLanguage.level) {
      handleEditLanguage(updatedSelectedLanguage);
    }
  };

  return (
    <Form onValuesChange={handleOnchange} form={form}>
      <div className="language-list-item">
        <div className="select-box">
          <Select
            style={{ height: '44px' }}
            placeholder={intl.messages.AddLanguageSelectPlaceholder && intl.formatMessage({ id: 'AddLanguageSelectPlaceholder' })}
            name="languageId"
            rules={[{ required: true, message: intl.messages.AddLanguageValidationError &&  intl.formatMessage({ id: 'AddLanguageValidationError' }) }]}
          >
            {filteredLanguages?.map((option: any) => {
              return (
                <SelectOption key={option.id} value={option.id}>
                  {option.name}
                </SelectOption>
              );
            })}
          </Select>
          <Select
            style={{ height: '44px' }}
            placeholder={intl.messages.AddLanguageLevelSelectPlaceholder && intl.formatMessage({ id: 'AddLanguageLevelSelectPlaceholder' })}
            name="level"
            rules={[{ required: true, message: intl.messages.AddLanguageLevelValidationError && intl.formatMessage({ id: 'AddLanguageLevelValidationError' }) }]}
          >
            {languageLevels.map((option) => (
              <SelectOption key={option.value} value={option.value}>
                {option.label}
              </SelectOption>
            ))}
          </Select>
        </div>
        <Button className="remove-btn" onClick={() => handleDeleteLanguage(item)}>
          <SvgSelector id="close-svg" />
        </Button>
      </div>
    </Form>
  );
};
