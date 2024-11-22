import { Dropdown, Modal } from 'antd';
import SvgSelector from 'assets/icons/SvgSelector';
import { EducationInterface, useEducationContext } from 'contexts/CreateCvContext/EducationContext';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Button, Spinner } from 'ui';
import useQueryApiClient from 'utils/useQueryApiClient';
import { StyledDropDownMenu } from '../../../style';
import { MenuProps } from 'antd/lib';
import { CvPageInterface, VerifiedItem } from 'pages/AdminPage/components/Types';
import { useUserDispatch, useUserState } from '../../../../../../../contexts/UserContext';
import { handleAccessDeniedError } from '../../../../../../../utils/globalFunctions';

const EducationListItem = ({
  item,
  cvData,
  handleOpenActionModal,
}: {
  item: EducationInterface;
  cvData: CvPageInterface | undefined;
  handleOpenActionModal: (formName: string, id?: number) => void;
}) => {
  const { allowedPages } = useUserState();
  const { dispatch: userDispatch } = useUserDispatch();
  const { dispatch: educationDispatch } = useEducationContext();
  const [educationId, setEducationId] = useState<number>(0);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const intl = useIntl();
  const [isVerified, setIsVerified] = useState(false);
  const handleOpenDeleteModal = (id: number) => {
    setEducationId(id);
    setDeleteModalVisible(true);
  };

  const handleDelete = () => {
    if (educationId) {
      deleteEducation();
    }
  };

  const { isLoading: isDeleteLoading, refetch: deleteEducation } = useQueryApiClient({
    request: {
      url: `/api/education/${educationId}`,
      method: 'DELETE',
    },
    onSuccess: () => {
      educationDispatch({ type: 'DELETE_EDUCATION', payload: educationId });
      handleClose();
    },
    onError: (error) => {
      if (error.error === 'access_denied') {
        allowedPages && handleAccessDeniedError('system_administration', allowedPages, userDispatch);
      }
    },
  });
  const { appendData: VerifiyApendData, isLoading: verifyIsLoading } = useQueryApiClient({
    request: {
      url: `api/manage-cabinets/verify/education`,
      method: 'POST',
    },
    onError: (error) => {
      if (error.error === 'access_denied') {
        allowedPages && handleAccessDeniedError('system_administration', allowedPages, userDispatch);
      }
    },
  });

  useEffect(() => {
    setIsVerified(item.verified);
  }, [item.verified]);

  const handleClose = () => {
    setEducationId(0);
    setDeleteModalVisible(false);
  };
  const handleVerificate = (verified: boolean) => {
    if (isVerified === verified) {
      return;
    }
    VerifiyApendData({
      userId: cvData?.user.id,
      educationId,
      verified,
    });
    setIsVerified(verified);
  };
  const verifiedItem: VerifiedItem[] = [
    { label: 'VERIFIED', value: true },
    { label: 'NOT VERIFIED', value: false },
  ];
  const verifiedMenuItems = verifiedItem.map((item, index: number) => ({
    label: <StyledDropDownMenu onClick={() => handleVerificate(item.value)}>{item.label}</StyledDropDownMenu>,
    key: index,
  }));

  const verifiedMenuProps: MenuProps = {
    items: verifiedMenuItems || [],
    style: {
      maxHeight: '200px',
      overflowY: 'auto',
      padding: '15px 20px',
      borderRadius: '8px',
      fontFamily: 'var(--default-font)',
    },
  };
  return (
    <div>
      <div className="list-cv-preview">
        <p className="date">
          {item.dateFrom && (
            <>
              {dayjs(item?.dateFrom).format('YYYY')}
              {item.dateTo
                ? ` - ${dayjs(item.dateTo).format('YYYY')}`
                : ` - ${intl.messages.attending && intl.formatMessage({ id: 'attending' })}`}
            </>
          )}
        </p>
        <h6 className="title">
          <span>{`${item.name && item.name} | ${item.location && item.location}`} </span>
          {
            <Dropdown menu={verifiedMenuProps} trigger={['click']} onOpenChange={() => setEducationId(item.id)}>
              <div className="verify-side">
                {verifyIsLoading && educationId === item.id ? (
                  <Spinner spinning={true} />
                ) : isVerified ? (
                  <SvgSelector className="verify-icon" id="addverified" />
                ) : null}
                <SvgSelector id="chevron-down-svg" />
              </div>
            </Dropdown>
          }
        </h6>
        <h6>{item.programme}</h6>
        <p>{intl.formatMessage({ id: item?.degree ? item?.degree : 'degree' })}</p>
        <div className="action-buttons">
          <Button
            label={<SvgSelector id="edit-svg" className="edit-icon" />}
            onClick={() => handleOpenActionModal('education', item.id)}
          />
          <Button
            label={<SvgSelector id="close-svg" className="delete-icon" />}
            onClick={() => handleOpenDeleteModal(item.id)}
          />
        </div>
      </div>

      <Modal
        title={intl.messages.deleteEducationConiformTitle && intl.formatMessage({ id: 'deleteEducationConiformTitle' })}
        open={deleteModalVisible}
        onOk={handleDelete}
        confirmLoading={isDeleteLoading}
        onCancel={handleClose}
      >
        <p>{intl.messages.deleteEducationConiformText && intl.formatMessage({ id: 'deleteEducationConiformText' })}</p>
      </Modal>
    </div>
  );
};

export default EducationListItem;
