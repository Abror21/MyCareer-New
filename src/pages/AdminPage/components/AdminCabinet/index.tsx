import useQueryApiClient from 'utils/useQueryApiClient';
import { AdminSearch } from './components/AdminSearch';
import { StyledAdminCabinet } from './style';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { AdminPageTitle, Button } from 'ui';
import { FreelancerList } from './components/FreelancerList';
import { Pagination } from 'antd';
import { PaginationProps } from 'antd/lib';
import { handleAccessDeniedError, smoothScroll } from 'utils/globalFunctions';
import { AdminStatusHistory } from './components/AdminStatusHistory';
import { QueryParams } from '../Types';
import { useIntl } from 'react-intl';
import { useUserDispatch, useUserState } from '../../../../contexts/UserContext';
import UploadCV from './components/UploadCv';
import { useSearchParams } from 'react-router-dom';
import Cookies from 'js-cookie';

export const initialQeuryValues = {
  PageIndex: 1,
  PageSize: 10,
  DesiredPositionId: null,
  SkillIds: null,
  SkillsVerification: null,
  JobExperience: null,
  RegistrationDateFrom: null,
  RegistrationDateTo: null,
  Name: null,
  Surname: null,
  StatusId: null,
  CountryId: null,
  LanguageIds: null,
};

export const AdminCabinet = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const intl = useIntl();
  const { allowedPages } = useUserState();
  const { dispatch: userDispatch } = useUserDispatch();
  const [freelancerId, setFreelancerId] = useState<number>(0);
  const [isAddUserOpen, setIsAddUserOpen] = useState<boolean>(false);

  const [queryParams, setQueryParams] = useState<QueryParams>(initialQeuryValues);

  const {
    data: freelancerData,
    isLoading,
    refetch: filterRefetch,
    appendData,
  } = useQueryApiClient({
    request: {
      url: '/api/manage-cabinets/freelancer/filter',
      method: 'GET',
      data: queryParams,
    },
    onError: (error) => {
      if (error.error === 'access_denied') {
        allowedPages && handleAccessDeniedError('system_administration', allowedPages, userDispatch);
      }
    },
  });

  useEffect(() => {
    if (!isAddUserOpen && (searchParams.get('add-user') == 'mount' || searchParams.get('add-user') == 'post')) {
      setIsAddUserOpen(true);
    } else if (
      Cookies.get('temp-token') &&
      !(searchParams.get('add-user') == 'mount' || searchParams.get('add-user') == 'post')
    ) {
      Cookies.remove('temp-token');
    } else if (isAddUserOpen && !(searchParams.get('add-user') == 'mount' || searchParams.get('add-user') == 'post')) {
      setIsAddUserOpen(false);
    }
  }, [searchParams]);

  useEffect(() => {
    if (queryParams) {
      appendData(queryParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams]);

  const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
    if (type === 'prev') {
      return (
        <Button
          className="pagination-btn prev"
          label={intl.messages.previous && intl.formatMessage({ id: 'previous' })}
        />
      );
    }
    if (type === 'next') {
      return (
        <Button className="pagination-btn next" label={intl.messages.next && intl.formatMessage({ id: 'next' })} />
      );
    }

    return originalElement;
  };

  const handlePaginationChange = (page: number, pageSize: number) => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      PageSize: pageSize,
      PageIndex: page,
    }));
    smoothScroll('top', 95);
  };

  const handleFormChange = (changedValues: any, allValues: any) => {
    const formatAndSetDate = (dateKey: any) => {
      if (allValues[dateKey]) {
        allValues[dateKey] = dayjs(allValues[dateKey]).format('YYYY-MM-DD');
      }
    };

    formatAndSetDate('RegistrationDateFrom');
    formatAndSetDate('RegistrationDateTo');
    setQueryParams((prevParams) => ({
      ...prevParams,
      ...allValues,
      PageIndex: 1,
    }));
  };

  return (
    <StyledAdminCabinet>
      <div className="inner">
        <AdminPageTitle label={intl.messages.adminCabinet && intl.formatMessage({ id: 'adminCabinet' })} />
        <AdminSearch handleFormChange={handleFormChange} />
        <FreelancerList
          isLoading={isLoading}
          data={freelancerData?.data?.items}
          filterRefetch={filterRefetch}
          setFreelancerId={setFreelancerId}
          totalItems={freelancerData?.data?.totalItems}
        />
        <div className="pagination-container">
          {freelancerData.data?.totalPages > 0 && (
            <Pagination
              total={freelancerData?.data?.totalItems}
              pageSize={freelancerData?.data?.itemsPerPage}
              itemRender={itemRender}
              onChange={handlePaginationChange}
              hideOnSinglePage={true}
              current={queryParams.PageIndex}
            />
          )}
        </div>
        <AdminStatusHistory freelancerId={freelancerId} setFreelancerId={setFreelancerId} />
      </div>
      <UploadCV filterRefetch={appendData} isAddUserOpen={isAddUserOpen} setIsAddUserOpen={setIsAddUserOpen} />
    </StyledAdminCabinet>
  );
};
