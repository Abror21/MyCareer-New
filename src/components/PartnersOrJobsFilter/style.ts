import styled from 'styled-components';

export const StyledPartnersOrJobsFilter = styled.div`
    .filter-form{
        display: flex;
        flex-wrap: wrap;
        column-gap: 30px;
        row-gap: 15px;

        @media(max-width: 601px){
            flex-direction: column;
        }
        .ant-form-item{
            flex: 1;
        }
    }
    .ant-form-item-control-input{
        .ant-input-affix-wrapper,
        .ant-select{
            height: 44px;
            .anticon{
                color: var(--black) !important;
                font-size: 0.9rem;
                opacity: .6;
            }
            .ant-select-clear{
                transform: translateY(-50%);
                top: 57%;
                inset-inline-end: 16px;
            }
        }
    }
`;