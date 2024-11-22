import { Empty, Form } from 'antd';
import { Checkbox, Modal } from 'ui';
import { StyledActionModal } from './style';
import useQueryApiClient from 'utils/useQueryApiClient';
import { useForm } from 'antd/es/form/Form';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useLanguage } from 'contexts/LanguageContext';
import { ActionModalDataType } from 'pages/InternCabinetPage/Types';
import {  useTimeExpiration } from 'utils/useTimeExpiration';

interface Props {
  actionModalData: ActionModalDataType | undefined;
  handleCloseModal: () => void;
  getUserPrograms?: () => void;
  setApplyType?: (value: string) => void;
  postTestStatus?: () => void;
  userProgram?: any;
}

export function TestActionModal({
  actionModalData,
  handleCloseModal,
  getUserPrograms,
  setApplyType,
  postTestStatus,
  userProgram,
}: Props) {
  const intl = useIntl();
  const [form] = useForm();
  const { language } = useLanguage();
  const [selectedPrograms, setSelectedPrograms] = useState<{ [id: number]: boolean }>({});
  const [addedPrograms, setAddedPrograms] = useState<number[]>([]);
  const [removedPrograms, setRemovedPrograms] = useState<number[]>([]);
  const {saveTimeExpiration} = useTimeExpiration()

  const handleCheckedChange = (cloudId: any, checked: boolean) => {
    if (checked) {
      if (!addedPrograms.includes(cloudId)) {
        setAddedPrograms((prev) => [...prev, cloudId]);
      }
      if (removedPrograms.includes(cloudId)) {
        setRemovedPrograms((prev) => prev.filter((programId) => programId !== cloudId));
      }
    } else {
      if (!removedPrograms.includes(cloudId)) {
        setRemovedPrograms((prev) => [...prev, cloudId]);
      }
      if (addedPrograms.includes(cloudId)) {
        setAddedPrograms((prev) => prev.filter((programId) => programId !== cloudId));
      }
    }

    setSelectedPrograms((prevState) => ({
      ...prevState,
      [cloudId]: checked,
    }));
  };

  const handleClose = () => {
    if (setApplyType) {
      setApplyType('');
    }
    handleCloseModal();
  };

  const { appendData } = useQueryApiClient({
    request: { url: '/api/freelancer/update_enrollment', method: 'POST' },
    onSuccess() {
      if (getUserPrograms) getUserPrograms();
      if (postTestStatus) postTestStatus();
      if(setApplyType) setApplyType("freelancer_interns.purchasetitle_5")
    },
    onError() {
      saveTimeExpiration(Date.now() + 5 * 60 * 1000);
      if (setApplyType) setApplyType('');
    },
  });

  const submit = () => {
    appendData({
      learningProgramIdsToEnroll: addedPrograms,
      learningProgramIdsToUnenroll: removedPrograms,
    });
    setAddedPrograms([]);
    setRemovedPrograms([]);
    handleCloseModal();
  };

  const { data: allPrograms } = useQueryApiClient({
    request: { url: '/api/learning-programs/filter', method: 'GET' },
  });


  useEffect(() => {
    if (userProgram) {
      const selectedProgramIds = userProgram
        ?.filter((i: any) => i?.status !== 'CANCELLED' || i?.status === '')
        ?.map((cloudId: any) => cloudId.cloudStudyId);
      const updatedSelectedPrograms = selectedProgramIds?.reduce((acc: any, programId: any) => {
        acc[programId] = true;
        return acc;
      }, {});
      setSelectedPrograms(updatedSelectedPrograms);
    }
  }, [userProgram]);

  return (
    <Modal
      width={400}
      forceRender
      destroyOnClose
      open={actionModalData?.type === 'action'}
      title={actionModalData?.modal_type && intl.formatMessage({ id: actionModalData?.modal_type })}
      onCancel={handleClose}
      onOk={submit}
      okText={intl.messages.save && intl.formatMessage({ id: 'applyTest' })}
      cancelText={intl.messages.cancel && intl.formatMessage({ id: 'cancel' })}
    >
      <Form form={form}>
        <StyledActionModal>
          <ul className="inner">
            {allPrograms?.items ? (
              allPrograms?.items?.map((purchaseItem: any, index: number) => (
                <li key={index} className="items">
                  <Checkbox
                    checked={selectedPrograms[purchaseItem?.cloudStudyId]}
                    onChange={(e) => handleCheckedChange(purchaseItem?.cloudStudyId, e.target.checked)}
                  />
                  {language === 'uz'
                    ? purchaseItem?.name_uz
                    : language === 'ru'
                      ? purchaseItem?.name_ru
                      : purchaseItem?.name_en}
                </li>
              ))
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </ul>
        </StyledActionModal>
      </Form>
    </Modal>
  );
}
