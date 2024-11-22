import styled from 'styled-components';
import { Card } from 'antd';

export const StyledCompany = styled(Card)`
    margin-bottom: 30px;
    display: flex;
    .ant-card-body{
        display: flex;
        flex-wrap: wrap;
        gap: 50px;
        width: 100%;
        
        @media(max-width: 601px){
            flex-direction: column;
            gap: 30px;
        }
        &::before, &::after{
            content: unset;
        }
        .company-left{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            @media(max-width: 601px){
                align-items: center;
            }
            .company-image{
                object-fit: cover;
            }
            &__footer{
                margin-top: 20px;
                display: flex;
                align-items: center;
                gap: 15px;
                font-size: 2rem;
                transition: .3;
                &:hover{
                    color: var(--accent-color);
                }
                a{
                    transition: unset;
                    font-weight: 600;
                    font-size: 1.11111rem;
                }
            }
        }
        .company-right{
            flex: 1;
            h2{
                cursor: pointer;
                color: var(--base-color);
                line-height: 1;
                @media(max-width: 601px){
                    text-align: center;
                }
            }
            .company-right__header{
                margin-bottom: 15px;
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                column-gap: 30px;

                @media(max-width: 1024px){
                    flex-direction: column;
                    align-items: flex-start;
                }
                .company-right__header-item{
                    display: flex;
                    gap: 10px;
                    align-items: center;
                    & > div{
                        margin-bottom: 0;
                        flex: 1;
                    }
                }
                .company-right__header-item.industries{
                    align-items: baseline;
                    svg{
                        transform: translateY(2px);
                    }
                }
            }
            .company-right__description{
                pre{
                    white-space: break-spaces;
                    font-family: inherit;
                }
            }
            .company-right__description.short{
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
            .company-right__show-more{
                cursor: pointer;
                color: var(--base-color);
            }
        }
    }
`;