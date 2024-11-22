import styled from 'styled-components';
import { Tag } from 'antd';

export const StyledSkillTag = styled(Tag)`
  width: max-content;
  min-height: 30px;
  border-radius: 8px;
  background: var(--white);

  display: flex;
  align-items: center;

  font-size: 0.77778rem;
  line-height: 1.55556rem;
  font-weight: 500;

  .skill-name {
    color: var(--base-color);
  }

  .skill-level {
    color: var(--light-gray);
  }

  .ant-tag-close-icon {
    path {
      fill: var(--base-color);
    }
  }

  .tag-close-icon {
    width: 8px;
    height: 8px;

    .tag-close-svg {
      width: 100%;
      height: 100%;

      path {
        fill: var(--base-color);
      }
    }
  }

  .ant-tag {
    margin-right: -8px !important;
  }
`;
