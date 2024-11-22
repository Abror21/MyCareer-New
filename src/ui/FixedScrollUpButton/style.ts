import styled from 'styled-components';

export const StyledFixedScrollUpButton = styled.button`
    position: relative;
    z-index: 10;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    border: 1px solid var(--bg-color);
    border-radius: 50%;
    color: white;
    right: 30px;
    bottom: 60px;
    font-size: 30px;
    background-color: var(--base-color);
    transition: 0.4s;
    &.invisible{
        opacity: 0;
        pointer-events: none;
    }
    @media(max-width: 1024px){
        right: 12px;
        bottom: 35px;
        width: 40px;
        height: 40px;
        font-size: 20px;
    }
    @media(max-width: 425px){
        width: 35px;
        height: 35px;
        font-size: 16px;
    }
`;