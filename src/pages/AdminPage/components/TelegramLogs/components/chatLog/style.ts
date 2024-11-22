import styled from 'styled-components';

export const StyledChatLog = styled.div`
    .ant-table-content{
        margin-top: 30px;
    }

    .infinite-scroll-wrapper{
        position: absolute;
        max-width: 1600px;
        width: 100%;
        top: 50px;
        left: 50%;
        transform: translateX(-50%);
        bottom: 15px;
        overflow: auto;
        .ant-spin.ant-spin-spinning{
            display: block;
        }
    }
    .infinite-scroll-content{
        padding: 0 30px;
        max-width: 800px;
        margin: 0 auto;
        overflow: unset !important;
        border-left: 1px solid var(--base-color);
        border-right: 1px solid var(--base-color);
    }
    .chat-container {
        padding: 0 30px;
        scroll-behavior: smooth !important;
    }
    .chat-up{
        width: 50px !important;
        height: 50px !important;
        position: fixed;
        bottom: 120px;
        right: 25%;
        z-index: 1;
    }
`;