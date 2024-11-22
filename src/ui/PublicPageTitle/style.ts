import styled from 'styled-components';

export const StyledPublicPageTitle = styled.h1`
    position: relative;
    color: var(--white);
    font-family: var(--primary-font);
    font-size: 4.444444rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin: 0 0 39px 0;
    @media(max-width: 1024px){
        font-size: 3.5rem;
    }
    @media(max-width: 601px){
        font-size: 2.5rem;
    }
    @media(max-width: 375px){
        font-size: 2rem;
    }
`;