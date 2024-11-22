import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Modal, Dropdown } from 'antd';
import SvgSelector from 'assets/icons/SvgSelector';
import useQueryApiClient from 'utils/useQueryApiClient';
import { CvPageInterface } from 'pages/AdminPage/components/Types';
import { MenuProps } from 'antd/lib';
import { handleAccessDeniedError, openNotification } from 'utils/globalFunctions';
import { useUserDispatch, useUserState } from '../../../../../../contexts/UserContext';

interface HobbiesSideProps {
  cvData: CvPageInterface | undefined;
}

export const HobbiesSide = ({ cvData }: HobbiesSideProps) => {
  const intl = useIntl();
  const { allowedPages } = useUserState();
  const { dispatch: userDispatch } = useUserDispatch();

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedHobby, setSelectedHobby] = useState<any | null>(null);
  const [userHobbies, setUserHobbies] = useState<any[] | undefined>([]);
  const [hobbies, setHobbies] = useState<any[] | undefined>([]);

  const { data: hobbiesApiData } = useQueryApiClient({
    request: {
      url: '/api/hobby',
      method: 'GET',
    },
    onSuccess(res) {
      setHobbies(res.data);
    },
  });

  const { appendData: CreateHobbyApi } = useQueryApiClient({
    request: {
      url: `/api/manage-cabinets/${cvData?.user?.id}/user-hobby?hobbyId=${selectedHobby?.id}`,
      method: 'POST',
    },
    onSuccess(res) {
      if (userHobbies !== undefined) {
        setUserHobbies([...userHobbies, res.data]);
      } else {
        setUserHobbies([res.data]);
      }
      setDeleteModalVisible(false);
      setSelectedHobby(null);
    },
    onError: (error) => {
      if (error.error === 'access_denied') {
        allowedPages && handleAccessDeniedError('system_administration', allowedPages, userDispatch);
      }
    },
  });

  const { refetch: refechtDeleteHobbyApi, isLoading: deleteHobbyLoading } = useQueryApiClient({
    request: {
      url: `/api/manage-cabinets/${cvData?.user?.id}/user-hobby?hobbyId=${selectedHobby?.id}`,
      method: 'DELETE',
    },
    onSuccess: (res) => {
      const updatedHobbies = userHobbies?.filter((hobby) => hobby.id !== selectedHobby?.id);
      setUserHobbies(updatedHobbies);
      handleCancel();
    },
    onError: (error) => {
      if (error.error === 'access_denied') {
        allowedPages && handleAccessDeniedError('system_administration', allowedPages, userDispatch);
      }
    },
  });

  useEffect(() => {
    setUserHobbies(cvData?.hobbies);
  }, [cvData]);

  useEffect(() => {
    if (selectedHobby?.type === 'create') {
      CreateHobbyApi();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedHobby]);

  useEffect(() => {
    const filteredHobbies = hobbiesApiData?.data?.filter(
      (hobby: any) => !userHobbies?.some((userHobby) => userHobby.id === hobby.id)
    );
    setHobbies(filteredHobbies);
  }, [userHobbies, hobbiesApiData]);

  const handleAddHobby = (id: number) => {
    if (userHobbies && userHobbies?.length >= 15) {
      openNotification(
        'warning',
        intl.messages.addHobbyGreaterThanError && intl.formatMessage({ id: 'addHobbyGreaterThanError' })
      );
      return;
    }
    setSelectedHobby({ id, type: 'create' });
  };

  const handleDeleteHobby = () => {
    refechtDeleteHobbyApi();
  };

  const handleCancel = () => {
    setDeleteModalVisible(false);
    setSelectedHobby(null);
  };

  const handleOpenDeleteModal = (id: number) => {
    setDeleteModalVisible(true);
    setSelectedHobby({ id, type: 'edit' });
  };

  const hobbiesMenuItems = hobbies?.map((item) => ({
    label: intl.messages[item?.content] && (
      <div onClick={() => handleAddHobby(item.id)}>{intl.formatMessage({ id: item?.content })}</div>
    ),
    key: item.id.toString(),
  }));

  const hobbiesMenuProps: MenuProps = {
    items: hobbiesMenuItems || [],
    style: {
      maxHeight: '200px',
      overflowY: 'auto',
    },
  };

  return (
    <>
      <h4 className="bar-title">{intl.messages.hobby && intl.formatMessage({ id: 'hobby' })}</h4>
      <ul className="cv-preview-bar-ul ul-left-side">
        {userHobbies && userHobbies.length > 0 ? (
          userHobbies?.map((hobby, index) => (
            <li key={index}>
              <div>
                {intl.messages[hobby?.content] && (
                  <p className="hobby-text">{intl.formatMessage({ id: hobby?.content })}</p>
                )}
                <SvgSelector id="hobby-svg" />
              </div>
              {userHobbies.length !== 1 && (
                <span className="remove-button" onClick={() => handleOpenDeleteModal(hobby.id)}>
                  <SvgSelector id="close-svg" />
                </span>
              )}
            </li>
          ))
        ) : (
          <p className="emptyText emptyText-hobbi">
            {intl.messages.HobbiesNotFound && intl.formatMessage({ id: 'HobbiesNotFound' })}
          </p>
        )}
      </ul>
      <Dropdown menu={hobbiesMenuProps} trigger={['click']}>
        <div className="add-button ">
          <span>+ {intl.messages.addhobby && intl.formatMessage({ id: 'addhobby' })}</span>
        </div>
      </Dropdown>
      <Modal
        title={intl.messages.deleteHobbyConiformTitle && intl.formatMessage({ id: 'deleteHobbyConiformTitle' })}
        open={deleteModalVisible}
        onOk={handleDeleteHobby}
        onCancel={handleCancel}
        confirmLoading={deleteHobbyLoading}
      >
        <p>{intl.messages.deleteHobbyConiformText && intl.formatMessage({ id: 'deleteHobbyConiformText' })}</p>
      </Modal>
    </>
  );
};
