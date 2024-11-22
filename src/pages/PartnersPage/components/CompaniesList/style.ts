import styled from 'styled-components';

export const StyledCompaniesList = styled.div`
    position: relative;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    .company-list__sort{
        position: relative;
        color: white;
        margin-left: auto;
        font-size: 50px;
        &__content{
            min-width: max-content;
            @media(max-width: 425px){
                &{
                    min-width: 215px;
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                    padding: 7px;
                    border-radius: 5px;
                }
            }
            p{
                cursor: pointer;
            }
        }
        .ant-popover-content{
            box-shadow: 0 0 15px 0.1px black;
            border-radius: 5px;
        }
    }
    .ant-pagination{
        text-align: center;
        .ant-pagination-item{
            a{
                color: white
            }
        }
        li{
            button{
                color: white;
            }
        }
        .ant-pagination-item-active{
            a{
                color: black;
            }
        }
    }
`;