import styled from 'styled-components';
import CvBg from 'assets/images/cv-background.png';

export const StyledJobsPage = styled.div`
    background-image: url(${CvBg});
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    margin-top: var(--header-height);
    padding: var(--main-top);
    padding-bottom: 96px;

    .overlay {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 0;
        background: linear-gradient(180deg, rgba(7, 7, 7, 0.6) 45.83%, rgba(58, 112, 179, 0.6) 100%);
    }
    .jobs{
        position: relative;
        z-index: 1;
    }

    .navigate {
        position: relative;
        display: flex;
        align-items: center;
        gap: 10px;

        li {
            font-family: var(--primary-font);
            font-size: 1rem;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: var(--white);
        }

        li:nth-child(2) {
            color: var(--base-color);
        }

        a {
            color: var(--base-color);
        }
        a:hover {
            color: var(--accent-color);
        }
    }
`;