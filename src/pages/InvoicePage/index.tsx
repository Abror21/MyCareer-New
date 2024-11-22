import { useState } from 'react';
import { StyledInvoicePage } from './style';

import { useNavigate, useParams } from 'react-router-dom';
import useQueryApiClient from '../../utils/useQueryApiClient';
import { useUserDispatch, useUserState } from '../../contexts/UserContext';
import { Invoice } from 'components';
import { BackButton, Spinner } from '../../ui';
import { handleAccessDeniedError } from '../../utils/globalFunctions';
import React from 'react';

export const InvoicePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { allowedPages } = useUserState();
  const { dispatch: userDispatch } = useUserDispatch();
  const [invoiceData, setInvoiceData] = useState<any>({});
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const { isLoading: isCreating, refetch: createInvoice } = useQueryApiClient({
    request: {
      url: `api/invoice/create/${id}`,
      method: 'GET',
      disableOnMount: true,
    },
    onSuccess: (response) => {
      setInvoiceData(response.data);
    },
    onError: (error) => {
      if (error.error === 'access_denied') {
        allowedPages && handleAccessDeniedError('system_administration', allowedPages, userDispatch);
      }
    },
  });

  const { isLoading: isFetching } = useQueryApiClient({
    request: {
      url: `/api/invoice/user/${id}`,
      method: 'GET',
    },
    onSuccess: (response) => {
      if (!response.data.length) {
        setIsEditMode(true);
        createInvoice();
        return;
      }

      let lastInvoice = response.data[response.data.length - 1];

      if (lastInvoice.invoiceStatus === 'Cancelled') {
        setIsEditMode(true);
        createInvoice();
        return;
      }
      if (lastInvoice.invoiceStatus === 'Created' || lastInvoice.invoiceStatus === 'Approved') {
        setIsEditMode(false);
        setInvoiceData(lastInvoice);
      }
    },
    onError: (error) => {
      if (error.error === 'access_denied') {
        allowedPages && handleAccessDeniedError('system_administration', allowedPages, userDispatch);
      }
    },
  });

  return (
    <StyledInvoicePage>
      <BackButton label="Back" color="green" onClick={() => navigate(-1)} />
      <Spinner spinning={isFetching || isCreating} dontRender>
        {invoiceData && <Invoice data={invoiceData} isEditMode={isEditMode} setIsEditMode={setIsEditMode} />}
      </Spinner>
    </StyledInvoicePage>
  );
};
