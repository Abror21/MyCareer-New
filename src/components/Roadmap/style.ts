import styled from 'styled-components';
import timeline from 'assets/images/TimelineEn.png';
import timelineUz from 'assets/images/TimelineUzb.png';
import timelineRu from 'assets/images/TimelineRu.png';
import timelineMobile from 'assets/images/Timeline_mobile_En.png';
import timeLineModileRu from 'assets/images/Timeline_mobile_RU.png';
import timeLineModileUz from 'assets/images/Timeline_mobile_UZB.png';

export const StyledRoadmap = styled.div`
  position: relative;
  overflow: hidden;

  width: 100%;
  height: 800px;
  background: url(${timelineMobile}) no-repeat center center;
  background-size: cover;

  @media screen and (min-width: 728px) {
    height: 275px;
    background: url(${timeline}) no-repeat center center;
    background-size: cover;
  }
  @media screen and (min-width: 335px) and (max-width: 430px) {
    height: 1000px;
  }
  @media screen and (min-width: 430px) and (max-width: 550px) {
    height: 1300px;
  }
  @media screen and (min-width: 550px) and (max-width: 728px) {
    height: 1600px;
  }

  @media screen and (min-width: 1280px) {
    height: 450px;
  }
  @media screen and (min-width: 1600px) {
    height: 600px;
  }

  .inner {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1000;
  }

  .title {
    width: 100%;
    text-align: center;
    padding-top: 68px;

    font-family: var(--primary-font);
    font-size: 2.22223rem;
    line-height: normal;
    font-weight: 700;
    color: var(--white);

    h2 {
      width: 70%;
      display: inline-block;
      max-width: 623px;

      @media screen and (min-width: 728px) {
        width: auto;
      }
    }

    @media screen and (min-width: 728px) {
      font-size: 1.66667rem;
      padding-top: 25px;
    }
    @media screen and (min-width: 1280px) {
      font-size: 2.22223rem;
      padding-top: 50px;
    }
  }

  &.image-ru {
    position: relative;
    overflow: hidden;

    width: 100%;
    height: 800px;

    background: url(${timeLineModileRu}) no-repeat center center;
    background-size: cover;
    @media screen and (min-width: 728px) {
      height: 275px;
      background: url(${timelineRu}) no-repeat center center;
      background-size: cover;
    }

    @media screen and (min-width: 1280px) {
      height: 450px;
    }
    @media screen and (min-width: 1600px) {
      height: 600px;
    }
    @media screen and (min-width: 335px) and (max-width: 430px) {
      height: 1000px;
    }
    @media screen and (min-width: 430px) and (max-width: 550px) {
      height: 1300px;
    }
    @media screen and (min-width: 550px) and (max-width: 728px) {
      height: 1600px;
    }
  }
  &.image-uz {
    position: relative;
    overflow: hidden;

    width: 100%;
    height: 800px;

    background: url(${timeLineModileUz}) no-repeat center center;
    background-size: cover;
    @media screen and (min-width: 728px) {
      height: 275px;
      background: url(${timelineUz}) no-repeat center center;
      background-size: cover;
    }

    @media screen and (min-width: 1280px) {
      height: 450px;
    }
    @media screen and (min-width: 1600px) {
      height: 600px;
    }
    @media screen and (min-width: 335px) and (max-width: 430px) {
      height: 1000px;
    }
    @media screen and (min-width: 430px) and (max-width: 550px) {
      height: 1300px;
    }
    @media screen and (min-width: 550px) and (max-width: 728px) {
      height: 1600px;
    }
  }
`;
