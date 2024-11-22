import styled from 'styled-components';
import { Button } from 'antd';
export const StyledAddMoreButton = styled(Button)`
  width: 100% !important;
  max-width: 751px !important;
  height: 44px !important;
  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 500;
  line-height: 1.55556rem;
  color: var(--base-color);

  .icon {
    width: 18px;
    height: 18px;
    margin: 0 60px;

    .svg {
      width: 100%;
      height: 100%;
      object-fit: contain;

      path {
        fill: var(--base-color);
        transition: fill 0.3s;
      }
    }
  }

  &:hover {
    .svg {
      path {
        fill: var(--accent-color);
      }
    }
  }
`;
