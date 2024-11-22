import styled from 'styled-components';

export const StyledChatText = styled.div`
    &.chat-message {
        width: fit-content;
        max-width: 70%;
        color: white;
        padding: 8px 18px;
        margin: 15px 0;
        background-color: var(--base-color);
        border-radius: 15px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        opacity: 0;
        transform: translateY(20px);
        animation: fadeInUp 1s ease forwards;
        position: relative;
        &::after{
            content: '';
            position: absolute;
            bottom: 0;
        }
        &.left{
            margin-right: auto;
            border-bottom-left-radius: unset;
            &::after{
                left: -10px;
                border-top-right-radius: -3px;
                border-left: 12px solid transparent;
                border-bottom: 12px solid var(--base-color);
            }
        }
        &.right{
            margin-left: auto;
            border-bottom-right-radius: unset;
            &::after{
                right: -10px;
                border-top-right-radius: -3px;
                border-right: 12px solid transparent;
                border-bottom: 12px solid var(--base-color);
            }
        }
    }
    .chat-message__text{
        display: flex;
        justify-content: space-between;
        align-items: flex-end !important;
        gap: 30px;
        & > span{
            display: block;
            position: relative;
            margin-bottom: 5px;
            border-radius: 50%;
            &::after{
                content: '';
                position: absolute;
                top: 2px;
                right: 2px;
                bottom: 2px;
                left: 2px;
                border-radius: 50%;
                background-color: white;
                z-index: -1;
            }
        }
        &.check{
            & > span{
                & > svg{
                    color: var(--green);
                }
            }
        }
        &.close{
            & > span{
                & > svg{
                    color: var(--red);
                }
            }
        }
    }
    .chat-date{
        text-align: right;
        opacity: 0.6;
        font-size: 0.8rem;
    }

    @keyframes fadeInUp {
        0% {
            opacity: 0;
            transform: translateY(20px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;