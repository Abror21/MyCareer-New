import React, { useEffect, useState } from 'react'
import { StyledCompaniesList } from './style'
import Company from '../Company';
import { List, Pagination, Popover } from 'antd';
import { MdOutlineSort } from "react-icons/md";
import { useIntl } from 'react-intl';
import FlipMove from 'react-flip-move';

interface CompaniesListProps {
    isPartnersLoading: boolean;
    partnerCount: number;
    data: any;
    handlePaginate: Function;
}

const CompaniesList = ({ data, partnerCount, isPartnersLoading, handlePaginate }: CompaniesListProps) => {
    
    const intl = useIntl();
    const [sortBy, setSortBy] = useState({value: '', order: ''});
    const [companyList, setCompanyList] = useState<any>([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (sortBy.value) {
            let sortedData;
            if(sortBy.value == 'organizationRegistered'){
                if(sortBy.order == 'descending'){
                    sortedData = [...companyList].sort((a: any, b: any) => b[sortBy.value]?.name?.localeCompare(a[sortBy.value]?.name));
                }else{
                    sortedData = [...companyList].sort((a: any, b: any) => a[sortBy.value]?.name?.localeCompare(b[sortBy.value]?.name));
                }
            }else{
                if(sortBy.order == 'descending'){
                    sortedData = [...companyList].sort((a: any, b: any) => b[sortBy.value]?.localeCompare(a[sortBy.value]));    
                }else{
                    sortedData = [...companyList].sort((a: any, b: any) => a[sortBy.value]?.localeCompare(b[sortBy.value]));
                }
            }
            setCompanyList(sortedData);
        }
    }, [sortBy, companyList])

    useEffect(() => {
      if(data){
        setCompanyList(data);
      }else{
        setCompanyList([]);
      }
    }, [data])

    const sortFunction = (value: string) => {
        setSortBy((prev: any) => {
            if(prev.value == value){
                return{
                    value, order: prev.order == 'ascending' ? 'descending' : 'ascending'    
                }
            }
            else {
                return{
                    value, order: 'ascending'
                }
            }
        });
    }
    const onPageChange = (page: number) => {
        setCurrentPage(page);
        handlePaginate(page);
    };

    return (
        <StyledCompaniesList>
            <div className='company-list__sort' id='company-list__sort'>
                <Popover
                    style={{ backgroundColor: 'aqua' }}
                    placement="right"
                    getTooltipContainer={() => document.getElementById('company-list__sort') as HTMLElement}
                    content={
                        <div className='company-list__sort__content'>
                            <p onClick={() => sortFunction('organizationName')}>{intl.messages.by_name ? intl.formatMessage({ id: 'by_name' }) : "By Name"}</p>
                            <p onClick={() => sortFunction('organizationRegistered')}>{intl.messages.by_country ? intl.formatMessage({ id: 'by_country' }) : "By Country"}</p>
                        </div>
                    }
                >
                    <MdOutlineSort />
                </Popover>
            </div>
            <div>
                <List
                    itemLayout="vertical"
                    size="large"
                    loading={isPartnersLoading}
                >
                    <FlipMove>
                        {companyList.map((item: any) => (
                            <div key={item.id}>
                                <Company data={item} />
                            </div>
                        ))}
                    </FlipMove>
                </List>
                <Pagination
                    current={currentPage}
                    pageSize={10}
                    total={partnerCount}
                    onChange={onPageChange}
                />
            </div>
        </StyledCompaniesList>
    )
}

export default CompaniesList