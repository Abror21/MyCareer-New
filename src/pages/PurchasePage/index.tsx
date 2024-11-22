import { TimeProvider } from 'utils/useTimeExpiration';
import { StyledPurchasePage } from './style';
import React from 'react';
import { PurchaseList } from './components/PurchaseList';

export const PurchasePage = () => {
  return (
    <StyledPurchasePage>
      <TimeProvider>
        <PurchaseList />
      </TimeProvider>
    </StyledPurchasePage>
  );
};
