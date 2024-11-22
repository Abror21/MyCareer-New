import { Modal } from 'antd';
import styled from 'styled-components';

export const StyledCompanyInfoModal = styled(Modal)`
    min-width: fit-content;
    .ant-modal-content{
        max-width: 1000px;
        padding: 30px;
    }
    button.ant-modal-close{
        top: 3px;
        inset-inline-end: 3px;
        color: var(--black);
        span{
            font-size: 1.3rem;
        }
    }
    .company-modal__header{
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        @media(max-width: 601px){
            flex-direction: column-reverse;
            align-items: center;
            gap: 15px;
        }
        h3{
            color: var(--base-color);
        }
        .company-image{
            object-fit: cover;
        }
    }
    .company-modal__info{
        width: 60%;
        display: flex;
        flex-wrap: wrap;
        column-gap: 30px;
        row-gap: 10px;
        margin-bottom: 30px;
        @media(max-width: 601px){
            margin-bottom: 15px;
        }
        & > div {
            display: flex;
            align-items: center;
            gap: 10px;
            h4{
                margin-bottom: 0;
            }
        }
        @media(max-width: 1366px){
            width: 100%;
        }
        .company-modal__item{
            span{
                flex: 1;
            }
        }
        .company-modal__info-industries{
            align-items: baseline;
            svg{
                transform: translateY(2px);
            }
        }
    }
    .company-modal__text{
        margin-bottom: 30px;
        text-align: justify;
        @media(max-width: 601px){
            margin-bottom: 15px;
        }
        .company-modal__description{
            pre{
                white-space: break-spaces;
                font-family: inherit;
            }
        }
        .company-modal__description.short{
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            @media(max-width: 768px){
                -webkit-line-clamp: 6;
            }
            @media(max-width: 425px){
                -webkit-line-clamp: 8;
            }
        }
        .company-modal__show-more{
            cursor: pointer;
            color: var(--base-color);
        }
    }
    .company-modal__footer{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
        font-size: 1.4rem;
        font-weight: 600;
        color: var(--text-color);
        transition: .3s;
        svg{
            font-size: 2.5rem;
        }
        &:hover{
            color: var(--green);
        }
    }
`;