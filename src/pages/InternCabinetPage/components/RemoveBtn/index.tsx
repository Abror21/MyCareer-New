import { Popconfirm, message } from 'antd';
import SvgSelector from 'assets/icons/SvgSelector';
import React from 'react';
import { useIntl } from 'react-intl';
import { StyledRemoveBtn } from './style';
import { Button } from 'ui';
import useQueryApiClient from 'utils/useQueryApiClient';
import { useTimeExpiration } from 'utils/useTimeExpiration';

interface Props {
  cloudId: number;
  getUserPrograms: () => void;
}

export function RemoveBtn({ cloudId, getUserPrograms }: Props) {
  const intl = useIntl();
  const { timeExpiration, saveTimeExpiration } = useTimeExpiration();

  const { appendData } = useQueryApiClient({
    request: { url: '/api/freelancer/update_enrollment', method: 'POST' },
    onSuccess() {
      getUserPrograms();
    },
    onError() {
      saveTimeExpiration(Date.now() + 5 * 60 * 1000);
    },
  });

  const submit = () => {
    timeExpiration !== null 
    ?  message.error(intl.formatMessage({ id: 'you_can_enroll_after_five_minutes_again' }))
    : appendData({ learningProgramIdsToUnenroll: [cloudId] });
  };

  return (
    <StyledRemoveBtn>
      <Popconfirm
        title={intl.formatMessage({
          id: 'delete_test.modal',
        })}
        description={intl.formatMessage({
          id: 'delete_test',
        })}
        okText={intl.messages.yes && intl.formatMessage({ id: 'yes' })}
        cancelText={intl.messages.no && intl.formatMessage({ id: 'no' })}
        onConfirm={submit}
      >
        <Button className={`remove-btn`} danger icon={<SvgSelector id="close-svg" />} />
      </Popconfirm>
    </StyledRemoveBtn>
  );
}
