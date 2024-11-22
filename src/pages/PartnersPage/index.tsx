import React, { useEffect, useState } from 'react'
import { StyledPartnersPage } from './style'
import { Breadcrumb, PublicPageTitle } from 'ui'
import { Link } from 'react-router-dom'
import { useIntl } from 'react-intl'
import CompaniesList from './components/CompaniesList'
import useQueryApiClient from 'utils/useQueryApiClient'
import { PartnersOrJobsFilter } from 'components'
import { useLanguage } from 'contexts/LanguageContext'

const initialQeuryValues = {
    PageIndex: 1,
    PageSize: 10,
    Country: null,
    CompanyId: null
};

const PartnersPage = () => {
    const intl = useIntl();
    const { language } = useLanguage();
    const [queryParams, setQueryParams] = useState<any>(initialQeuryValues);

    useEffect(() => {
        window.scrollTo({ top: 0 })
    }, [])

    useEffect(() => {
        appendFilter(queryParams);
    }, [queryParams, language])


    const { data: partners, isLoading: isPartnersLoading, appendData: appendFilter } = useQueryApiClient({
        request: {
            url: `/api/organization/filter`,
            method: 'GET',
            disableOnMount: true
        },
    });
    let debounceTimer: any;
    const handleFilterChange = (changed: any, all: any) => {

        const debounceDelay = 1000;

        clearTimeout(debounceTimer);

        debounceTimer = setTimeout(() => {
            setQueryParams((prev: any) => ({
                ...prev,
                CompanyName: all.CompanyName ? all.CompanyName : null,
                Country: all.Country
            }));
        }, debounceDelay);
    };

    const handlePaginate = (page: number) => {
        setQueryParams((prev: any) => ({
            ...prev,
            PageIndex: page
        }))
    }

    return (
        <StyledPartnersPage >
            <div className="overlay"></div>
            <div className='container partners'>
                <div className="navigate" id='partners-navigate'>
                    <Breadcrumb
                        items={[
                            {
                                title: <Link to="/">{intl.messages.home && intl.formatMessage({ id: 'home' })}</Link>,
                            },
                            {
                                title: <h6>{intl.messages.partners ? intl.formatMessage({ id: 'partners' }) : 'Partners'}</h6>,
                            },
                        ]}
                    />
                </div>
                <PublicPageTitle label={intl.messages.partners ? intl.formatMessage({ id: 'partners' }) : 'Partners'}/>
                <PartnersOrJobsFilter
                    inputName="CompanyName"
                    selectName="Country"
                    handleFilterChange={handleFilterChange}
                />
                <CompaniesList
                    isPartnersLoading={isPartnersLoading}
                    data={partners?.data?.items}
                    partnerCount={partners?.data?.totalItems}
                    handlePaginate={handlePaginate}
                />
            </div>
        </StyledPartnersPage>
    )
}

export default PartnersPage