import styled from 'styled-components';

export const StyledEditAboutForm = styled.div`
  .ant-form-item-required,
  .ant-form-item-label,
  label {
    font-size: 1.11112rem !important;
    line-height: 1.55556rem !important;
    font-weight: ${({ theme }) => theme.antd.fontWeightBold} !important;
    
  }

  .label-span {
    font-size: 0.7778rem;
    line-height: 1.55556rem !important;
    margin-left: 3px;
  }
`;
