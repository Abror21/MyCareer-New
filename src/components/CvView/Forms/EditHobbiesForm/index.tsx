import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useForm } from 'antd/lib/form/Form';

import { StyledEditHobbiesForm } from './style';
import { Button, IconButton, Modal, Select, SelectOption, Tag } from 'ui';
import useQueryApiClient from 'utils/useQueryApiClient';
import { Form } from 'antd';
import { RealCvInterface } from 'types/RealCV';
import { useUserDispatch } from 'contexts/UserContext';
import { Hobby } from 'types/Hobby';

type EditHobbiesFormProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  cvData: RealCvInterface;
};

type SelectedHobby = {
  hobbyId: number;
  hobbyName: string | undefined;
};

export const EditHobbiesForm = ({ open, setOpen, cvData }: EditHobbiesFormProps) => {
  const intl = useIntl();
  const [form] = useForm();
  const { dispatch: userDispatch } = useUserDispatch();
  const [allHobbies, setAllHobbies] = useState<Hobby[]>([]);
  const [filteredHobbies, setFilteredHobbies] = useState<Hobby[]>([]);
  const [selectedHobbies, setSelectedHobbies] = useState<SelectedHobby[]>([]);
  const [isEmpty, setIsEmpty] = useState(false);

  useQueryApiClient({
    request: {
      url: 'api/hobby',
      method: 'GET',
    },
    onSuccess: (response) => {
      setAllHobbies(response.data);
    },
  });

  const { appendData: updateUserHobbies } = useQueryApiClient({
    request: {
      url: `/api/user-hobby`,
      method: 'POST',
    },
    onSuccess: () => {
      userDispatch({
        type: 'SET_USER_DATA',
        payload: {
          refresh: true,
        },
      });

      setOpen(false);
    },
  });

  useEffect(() => {
    setFilteredHobbies([]);
    if (allHobbies && selectedHobbies) {
      let filteredArray = allHobbies.filter(
        (hobby: Hobby) => !selectedHobbies?.some((selectedHobby) => selectedHobby.hobbyId === hobby.id)
      );

      setFilteredHobbies(filteredArray);
    }
  }, [allHobbies, selectedHobbies]);

  useEffect(() => {
    setSelectedHobbies([]);
    if (cvData.hobbies) {
      cvData.hobbies.map((hobby) => {
        setSelectedHobbies((prevState) => [
          ...prevState,
          {
            hobbyId: hobby.id,
            hobbyName: hobby.content,
          },
        ]);
      });
    }
  }, [cvData, open]);

  const addHobbyHandler = () => {
    let values = form.getFieldsValue(['hobby']);
    let foundHobby = allHobbies.find((hobby) => hobby.id === values.hobby);

    if (foundHobby) {
      setSelectedHobbies((prevState) => [
        ...prevState,
        {
          hobbyId: values.hobby,
          hobbyName: foundHobby?.content,
        },
      ]);
    }

    form.resetFields();
  };

  const removeHobbyHandler = (id: number) => {
    setSelectedHobbies((prevState) => prevState.filter((hobby) => hobby.hobbyId !== id));
  };

  const handleSubmit = () => {
    const userHobbies: { hobbyId: number | undefined; otherHobby: string }[] = [];

    if (selectedHobbies) {
      selectedHobbies.forEach((hobby) => {
        userHobbies.push({ hobbyId: hobby.hobbyId, otherHobby: '' });
      });
    }

    if (userHobbies.length === 0) {
      const values = form.getFieldsValue();
      if (!values.hobby) {
        // if user didn't choose any hobbies
        form.setFields([
          {
            name: 'hobby',
            errors: [`${intl.messages.HobbiesInputError && intl.formatMessage({ id: 'HobbiesInputError' })}`],
          },
        ]);
      } else {
        // if user has chosen skill but didn't press Plus button
        setIsEmpty(true);

        setTimeout(() => {
          setIsEmpty(false);
        }, 1000);
      }
      return;
    }
    updateUserHobbies({ userHobbies });
  };

  return (
    <Modal
      forceRender
      open={open}
      onCancel={() => {
        setOpen(false);
      }}
      wrapClassName="edit-intern-cv-modal-wrapper"
      footer={[
        <Button
          key="cancel"
          label={intl.messages.cancel && intl.formatMessage({ id: 'cancel' })}
          type="default"
          className="cancel-btn"
          onClick={() => setOpen(false)}
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
      <StyledEditHobbiesForm>
        <Form form={form} layout="vertical" className="edit-hobbies-form">
          <div className="select-wrapper">
            <div className="select-box">
              <div className="select">
                <Select
                  name="hobby"
                  placeholder={intl.messages.addHobbyPlaceholder && intl.formatMessage({ id: 'addHobbyPlaceholder' })}
                  label={intl.messages.hobbies && intl.formatMessage({ id: 'hobbies' })}
                >
                  {filteredHobbies &&
                    filteredHobbies.map((option) => (
                      <React.Fragment key={option.id}>
                        {intl.messages[option?.content] && (
                          <SelectOption key={option.id} value={option.id}>
                            {intl.formatMessage({ id: option?.content })}
                          </SelectOption>
                        )}
                      </React.Fragment>
                    ))}
                </Select>
              </div>
            </div>
            <IconButton danger={isEmpty} iconId="plus-svg" onClick={addHobbyHandler} />
          </div>

          <div className="tags-wrapper">
            {selectedHobbies &&
              selectedHobbies?.map((hobby) => (
                <div key={hobby.hobbyId}>
                  {hobby.hobbyName && intl.messages[hobby.hobbyName] && (
                    <Tag closable={true} onClose={() => removeHobbyHandler(hobby.hobbyId)} className="hobby-tag">
                      {intl.formatMessage({ id: hobby.hobbyName })}
                    </Tag>
                  )}
                </div>
              ))}
          </div>
        </Form>
      </StyledEditHobbiesForm>
    </Modal>
  );
};
