import { Modal } from 'antd';
import styled from 'styled-components';

export const StyledJobInfoModal = styled(Modal)`
    min-width: fit-content;
    .ant-modal-content{
        max-width: 1000px;
    }
    .divider{
        background-color: var(--base-color);
        margin: 15px 0;
    }
    h4.ant-typography{
        color: var(--base-color);
    }
    .job-modal__header{
        display: flex;
        align-items: center;
        gap: 15px;
        @media(max-width: 601px){
            flex-direction: column;
        }
        &-title{
            display: flex;
            flex-direction: column;
            gap: 15px;
            @media(max-width: 601px){
                align-items: center;
            }
            h2, h4{
                margin: 0;
                color: var(--base-color);
            }
        }
    }
    .job-modal__info{
        width: 80%;
        display: flex;
        flex-wrap: wrap;
        column-gap: 30px;
        row-gap: 5px;
        @media(max-width: 1024px){
            width: 100%;
        }
        @media(max-width: 601px){
            flex-direction: column;
            height: 150px;
        }
        .job-modal__info-content{
            display: flex;
            align-items: center;
            column-gap: 30px;
            row-gap: 5px;
            & > div{
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                column-gap: 30px;
                row-gap: 5px;
            }
        }
        .job-modal__info-item {
            display: flex;
            align-items: center;
            gap: 10px;
            h4{
                margin-bottom: 0;
            }
            svg{
                flex: none;
            }
        }
    }
    .job-modal__education{
        display: flex;
        flex-direction: column;
        gap: 10px;
        &-item-wrapper{
            display: flex;
            flex-wrap: wrap;
            gap: 60px;
            @media(max-width: 601px){
                gap: unset;
                & > span{
                    padding-left: 33px;
                }
            }
        }
        &-item{
            display: flex;
            align-items: center;
            gap: 15px;
            svg{
                flex: none;
            }
        }
    }
    .job-modal__skills-item{
        display: flex;
        & > div{
            flex: 1;
        }
    }
    .job-modal__additional{
        padding-left: 18px;
        list-style: disc;
    }
    .job-modal__programs{
        display: flex;
        flex-wrap: wrap;
        gap: 30px;
        span{
            font-size: .9rem;
            padding: 0 10px;
            background-color: var(--shadow-box);
        }     
    }
    .job-modal__description{
        text-align: justify;
        .job-modal__description{
            pre{
                white-space: break-spaces;
                font-family: inherit;
            }
        }
        .job-modal__description.short{
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
        .job-modal__show-more{
            cursor: pointer;
            color: var(--base-color);
        }
    }
    .job-modal__footer{
        margin-top: 15px;
        gap: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        button.ant-btn{
            padding: 0 40px;
        }
        .ant-typography{
            margin: 0;
        }
    }
`;