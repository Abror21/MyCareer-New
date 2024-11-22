import { Form } from 'antd';
import { FormInstance } from 'antd/lib';
import SvgSelector from 'assets/icons/SvgSelector';
import { useHobbyContext } from 'contexts/CreateCvContext/HobbiesContext';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Button, Select, SelectOption } from 'ui';
import { openNotification } from 'utils/globalFunctions';
import useQueryApiClient from 'utils/useQueryApiClient';

export const AddHobbiesForm = ({ hobbiesForm }: { hobbiesForm: FormInstance<any> }) => {
  const intl = useIntl();
  const { dispatch, state } = useHobbyContext();
  const [allHobiesData, setAllHobiesData] = useState<any[]>([]);
  const [filteredHobiesData, setFilteredHobiesData] = useState<any[]>([]);

  const { isLoading } = useQueryApiClient({
    request: { url: '/api/hobby', method: 'GET' },
    onSuccess: (res) => {
      setAllHobiesData(res.data);
    },
  });

  useEffect(() => {
    let filteredHobbiesArray = allHobiesData?.filter(
      (apiLang: { content: string }) => !state.selectedHobbies?.some((hobby) => hobby.hobbyName === apiLang.content)
    );
    setFilteredHobiesData(filteredHobbiesArray);
  }, [allHobiesData, state.selectedHobbies]);

  const handleSubmit = (values: any) => {
    if (state.selectedHobbies.length >= 15) {
      openNotification('warning', intl.messages.addHobbyGreaterThanError && intl.formatMessage({ id: 'addHobbyGreaterThanError' }));
      return;
    }
    const HobbyItem = allHobiesData.find((m: any) => m.id === values.hobby);
    dispatch({ type: 'ADD_HOBBY', payload: { hobbyId: values.hobby, hobbyName: HobbyItem.content, id: values.hobby } });
    hobbiesForm.resetFields();
  };

  return (
    <Form onFinish={handleSubmit} form={hobbiesForm}>
      <div className="form">
        <Select
          label={intl.messages.hobbies && intl.formatMessage({ id: 'hobbies' })}
          name="hobby"
          loading={isLoading}
          placeholder={intl.messages.addHobbyPlaceholder && intl.formatMessage({ id: 'addHobbyPlaceholder' })}
          rules={[
            {
              required: true,
              message: intl.messages.HobbyAddLevelInputError && intl.formatMessage({ id: 'HobbyAddLevelInputError' }),
            },
          ]}
        >
          {filteredHobiesData?.map((item) => (
            <React.Fragment key={item.id}>
              {intl.messages[item?.content] && (
                <SelectOption key={item.id} value={item.id ? item.id : item.content}>
                  {intl.formatMessage({ id: item?.content })}
                </SelectOption>
              )}
            </React.Fragment>
          ))}
        </Select>

        <Button htmlType="submit" className="add-btn" label={<SvgSelector id="plus-svg" />} />
      </div>
    </Form>
  );
};
