import React, { useEffect, useState } from 'react'
import { StyledJobsPage } from './style'
import { Breadcrumb, PublicPageTitle } from 'ui'
import { Link, useSearchParams } from 'react-router-dom'
import { useIntl } from 'react-intl'
import JobsList from './components/JobsList'
import useQueryApiClient from 'utils/useQueryApiClient'
import { PartnersOrJobsFilter } from 'components'

const initialQeuryValues = {
    PageIndex: 1,
    PageSize: 10,
    Country: null,
    JobTitle: null
};

const JobsPage = () => {
    const intl = useIntl();
    const [queryParams, setQueryParams] = useState<any>(initialQeuryValues);
    const [searchparams, setSearchparams] = useSearchParams();
    const company = searchparams.get('company') ? searchparams.get('company') : null;
    
    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [])
    useEffect(() => {
        if(!company){
            appendFilter(queryParams);
        }
    }, [queryParams]);

    const { data: jobs, isLoading: isJobsLoading, appendData: appendFilter } = useQueryApiClient({
        request: {
            url: `/api/hirings/filter`,
            method: 'GET',
            disableOnMount: true
        },
    });

    let debounceTimer: any;
    const handleFilterChange = (changed: any, all: any,) => {
        if (company) {
            setSearchparams((params) => {
                params.delete('company');
                return params;
            });
        };
        const debounceDelay = 1000;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            setQueryParams((prev: any) => ({ ...prev, CompanyName: all.CompanyName, Country: all.Country }))
        }, debounceDelay);
    };

    const handlePaginate = (page: number) => {
        setQueryParams((prev: any) => ({ ...prev, PageIndex: page }))
    }

    return (
        <StyledJobsPage>
            <div className="overlay"></div>
            <div className='container jobs'>
                <div className="navigate" id='partners-navigate'>
                    <Breadcrumb
                        items={[
                            {
                                title: <Link to="/partners">{intl.messages.partners && intl.formatMessage({ id: 'partners' })}</Link>,
                            },
                            {
                                title: <h6>{intl.messages.jobs ? intl.formatMessage({ id: 'jobs' }) : 'Jobs'}</h6>,
                            },
                        ]}
                    />
                </div>
                <PublicPageTitle label={intl.messages.jobs ? intl.formatMessage({ id: 'jobs' }) : 'Jobs'} />
                <PartnersOrJobsFilter
                    inputName="CompanyName"
                    selectName="Country"
                    type='jobs'
                    handleFilterChange={handleFilterChange}
                />
                <JobsList
                    isJobsLoading={isJobsLoading}
                    data={jobs?.data?.items}
                    jobsCount={jobs?.data?.totalItems}
                    handlePaginate={handlePaginate}
                />
            </div>
        </StyledJobsPage>
    )
}

export default JobsPage