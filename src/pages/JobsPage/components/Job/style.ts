import { Card } from 'antd';
import styled from 'styled-components';

export const StyledJob = styled(Card)`
    margin-bottom: 30px;
    .ant-card-body{
        display: flex;
        flex-wrap: wrap;
        gap: 50px;
        @media(max-width: 601px){
            flex-direction: column;
        }
        &::before, &::after{
            content: unset;
        }
        .job-left{
            @media(max-width: 601px){
                text-align: center;
            }
            .company-image{
                object-fit: cover;
            }
            &__footer{
                margin-top: 20px;
                display: flex;
                align-items: center;
                gap: 15px;
                font-size: 40px;
                h3{
                    margin-bottom: 0;
                }
            }
        }
        .job-right{
            flex: 1;
            h2{
                color: var(--base-color);
                cursor: pointer;
                @media(max-width: 601px){
                    text-align: center;
                }
            }
            h3{
                color: var(--base-color);
                margin-top: 0;
                @media(max-width: 601px){
                    text-align: center;
                }
            }
            .job-right__header{
                margin-bottom: 15px;
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                column-gap: 30px;
                row-gap: 5px;
                @media(max-width: 601px){
                    flex-direction: column;
                    align-items: flex-start;
                }
                & > div{
                    display: flex;
                    gap: 30px;
                }
                .job-right__header-item{
                    display: flex;
                    gap: 5px;
                    align-items: center;
                    & > div{
                        margin-bottom: 0;
                    }
                }
            }
            .job-right__description{
                pre{
                    white-space: break-spaces;
                    font-family: inherit;
                }
            }
            .job-right__description.short{
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
            .job-right__show-more{
                cursor: pointer;
                color: var(--base-color);
            }
            .tags{
                display: flex;
                flex-wrap: wrap;
                gap: 30px;
                span{
                    font-size: .9rem;
                    padding: 0 10px;
                    background-color: var(--shadow-box);
                }
            }
        }
    }
`;