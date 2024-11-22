import { Modal } from 'antd';
import styled from 'styled-components';

export const StyledApplicationFormModal = styled(Modal)`
    min-width: fit-content !important;
    h3.ant-typography{
        color: var(--base-color);
    }
    .form-modal{
        &__item{
            width: 100%;
            display: flex;
            column-gap: 30px;
            & > :first-child{
                min-width: 25%;
            }
            @media(max-width: 660px){
                column-gap: 15px;
                &.textarea{
                    flex-wrap: wrap;
                }
            }
            @media(max-width: 375px){
                &{
                    column-gap: 10px;
                }
                & > :first-child{
                    min-width: 50%;
                }
            }
        }
        @media(max-width: 660px){
            .form-modal__footer{
                text-align: center;
            }
        }
    }
`;