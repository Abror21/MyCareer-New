import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { PaginationProps } from 'antd';

import { StyledTalentsList } from './style';
import { TalentCard } from 'components/TalentCard';
import useQueryApiClient from 'utils/useQueryApiClient';
import { Talent, TalentsFilterType } from 'types/Talent';
import { TalentsFilters } from '../TalentsFilters';
import Pagination from 'ui/Pagination/Pagination';
import SvgSelector from 'assets/icons/SvgSelector';
import { smoothScroll } from 'utils/globalFunctions';
import { EmptyResults } from 'components';
import { Spinner } from 'ui';
import { Link } from 'react-router-dom';

export const initialValues = {
  pageIndex: 1,
  pageSize: 10,
  desiredPositionId: null,
  verifiedSkillIds: null,
  jobExperience: null,
};

export const TalentsList = () => {
  const intl = useIntl();
  const [filter, setFilter] = useState<TalentsFilterType>(initialValues);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPageBeforeFiltering, setLastPageBeforeFiltering] = useState(1);
  const [reset, setReset] = useState(false);

  const {
    isLoading,
    data: { data },
    refetch,
  } = useQueryApiClient({
    request: {
      url: '/api/freelancer/filter',
      data: filter,
    },
    onSuccess: () => {
      setReset(false);
    },
  });

  useEffect(() => {
    refetch();
  }, [filter]);

  const onChange: PaginationProps['onChange'] = (page) => {
    if (!filter.desiredPositionId && !filter.verifiedSkillIds && !filter.jobExperience) {
      setLastPageBeforeFiltering(page);
    }

    setFilter({
      ...filter,
      pageIndex: page,
    });
    setCurrentPage(page);
    smoothScroll('top', 180);
  };

  const onReset = async () => {
    setCurrentPage(lastPageBeforeFiltering);
    setReset(true);
  };

  return (
    <StyledTalentsList>
      <TalentsFilters
        reset={reset}
        setReset={setReset}
        filter={filter}
        setFilter={setFilter}
        setCurrentPage={setCurrentPage}
        lastPageBeforeFiltering={lastPageBeforeFiltering}
      />
      <Spinner spinning={isLoading} dontRender className="talents-spinner">
        <div className="talents-list">
          {data &&
            data.items?.length !== 0 &&
            data.items.map((talent: Talent, index: number) => (
              <Link to={`/talents/${talent.user?.id}`} key={index}>
                <TalentCard talent={talent} isRealDataCv={talent.isRealDataCv} />
              </Link>
            ))}
        </div>

        {(data && data.items?.length === undefined && currentPage === 1) ||
          (data && data.items?.length === 0 && currentPage === 1 && <EmptyResults onClick={onReset} />)}
      </Spinner>

      {data && (
        <div className="pagination">
          <Pagination
            current={currentPage}
            pageSize={data.itemsPerPage}
            total={data.totalItems}
            prevIcon={<SvgSelector id="pagination-arrow" />}
            nextIcon={<SvgSelector id="pagination-arrow" />}
            onChange={onChange}
          />
        </div>
      )}
    </StyledTalentsList>
  );
};
