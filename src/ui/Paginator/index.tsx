import React from 'react';
import { Pagination } from 'antd';
import { StyledPagination } from './style';
interface PaginatorProps {
  current: number;
  pageSize: number;
  total: number;
  onChange: (page: number, pageSize?: number | undefined) => void;
}
type PaginatorStyles = {
  common: string;
  active: string;
  prevNext: string;
  paginator: string;
};
const paginatorStyles: PaginatorStyles = {
  common: 'common-class',
  active: 'active-class',
  prevNext: 'prev-next-class',
  paginator: 'paginator-class',
};

const Paginator: React.FC<PaginatorProps> = ({ current, pageSize, total, onChange }) => {
  return (
    <StyledPagination>
      <div className={paginatorStyles.paginator}>
        <Pagination
          className="pagination"
          total={total}
          showSizeChanger={false}
          current={current}
          pageSize={pageSize}
          onChange={onChange}
          itemRender={(currentPage, type, originalElement) => {
            if (type === 'prev' || type === 'next') {
              return (
                <span className={`${paginatorStyles.common} ${paginatorStyles.prevNext}`}>
                  {type === 'prev' ? '←' : '→'}
                </span>
              );
            }

            const isActive: boolean = currentPage === current;

            return (
              <span className={`${paginatorStyles.common} ${isActive ? paginatorStyles.active : ''}`}>
                {currentPage}
              </span>
            );
          }}
        />
      </div>
    </StyledPagination>
  );
};

export default Paginator;
