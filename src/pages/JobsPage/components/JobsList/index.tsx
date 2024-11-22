import React, { useEffect, useState } from 'react'
import { StyledJobsList } from './style'
import { List, Pagination, Popover } from 'antd'
import { MdOutlineSort } from "react-icons/md";
import Job from '../Job';
import JobInfoModal from '../Job/components/JobInfoModal';
import ApplicationFormModal from '../Job/components/ApplicationFormModal';
import AnswerModal from '../Job/components/AnswerModal';
import { useSearchParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import FlipMove from 'react-flip-move';

interface JobsListProps {
    data: any;
    jobsCount: number;
    isJobsLoading: boolean;
    handlePaginate: Function;
}

const JobsList = ({ data, jobsCount, isJobsLoading, handlePaginate }: JobsListProps) => {    
    const intl = useIntl();
    const [searchparams, setSearchparams] = useSearchParams();
    const [sortBy, setSortBy] = useState({value: '', order: ''});
    const [jobList, setJobList] = useState<any>([]);
    const [jobData, setJobData] = useState<any>(null);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const [isApplicationFormModalOpen, setIsApplicationFormModalOpen] = useState(false);
    const [isAnswerModelOpen, setIsAnswerModalOpen] = useState(false);
    const [jobId, setJobId] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const jobIdUrl = searchparams.get('job-id') ? Number(searchparams.get('job-id')) : null;

    useEffect(() => {
        if ((jobId || jobId == 0)) {
            const foundItem = jobList.find((item: any) => item?.id == jobId);
            setJobData(foundItem);
        }
    }, [jobId])

    useEffect(() => {
        if(jobIdUrl || (jobIdUrl == 0)){
            const foundItem = jobList.find((item: any) => item?.id == jobIdUrl);
            if(foundItem){
                setJobData(foundItem);
                setIsInfoModalOpen(true);
            }
        }
    }, [jobList])

    useEffect(() => {
        if (sortBy.value) {
            let sortedData;
                if(sortBy.order == 'descending'){
                    sortedData = [...jobList].sort((a: any, b: any) => b[sortBy.value]?.localeCompare(a[sortBy.value]));    
                }else{
                    sortedData = [...jobList].sort((a: any, b: any) => a[sortBy.value]?.localeCompare(b[sortBy.value]));
                }
            setJobList(sortedData);
        }
    }, [sortBy])
    

    useEffect(() => {
        if (data) {
            setJobList(data);
        } else {
            setJobList([]);
        }
    }, [data])

    const onPageChange = (page: number) => {
        setCurrentPage(page);
        handlePaginate(page);
    };

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

    return (
        <StyledJobsList>
            <div className='company-list__sort' id='company-list__sort'>
                <Popover
                    style={{ backgroundColor: 'aqua' }}
                    placement="right"
                    getTooltipContainer={() => document.getElementById('company-list__sort') as HTMLElement}
                    content={
                        <div className='company-list__sort__content'>
                            <p onClick={() => sortFunction('companyName')}>{intl.messages.by_name ? intl.formatMessage({ id: 'by_name' }) : "Sort by Company Name"}</p>
                            <p onClick={() => sortFunction('location')}>{intl.messages.sort_by_office ? intl.formatMessage({ id: 'sort_by_office' }) : "Sort by Office Location"}</p>
                            <p onClick={() => sortFunction('jobTitle')}>{intl.messages.sort_by_job ? intl.formatMessage({ id: 'sort_by_job' }) : "Sort by Job title"}</p>
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
                    loading={isJobsLoading}
                >
                    <FlipMove>
                        {jobList.map((item: any) => (
                            <div key={item.id}>
                                <Job
                                    data={item}
                                    setIsInfoModalOpen={setIsInfoModalOpen}
                                    setJobId={setJobId}
                                />
                            </div>
                        ))}
                    </FlipMove>
                </List>
                <Pagination
                    current={currentPage}
                    pageSize={10}
                    total={jobsCount}
                    onChange={onPageChange}
                />
            </div>
            {
                isInfoModalOpen &&
                <JobInfoModal
                    data={jobData}
                    isOpen={isInfoModalOpen}
                    setIsOpen={setIsInfoModalOpen}
                    setJobId={setJobId}
                    setJobData={setJobData}
                    setIsApplicationFormModalOpen={setIsApplicationFormModalOpen}
                />
            }
            {
                isApplicationFormModalOpen &&
                <ApplicationFormModal
                    data={jobData}
                    isOpen={isApplicationFormModalOpen}
                    jobId={jobId}
                    setJobId={setJobId}
                    setIsOpen={setIsApplicationFormModalOpen}
                    setIsAnswerModalOpen={setIsAnswerModalOpen}
                />
            }
            {
                isAnswerModelOpen &&
                <AnswerModal
                    position={jobData?.jobTitle}
                    isOpen={isAnswerModelOpen}
                    setIsOpen={setIsAnswerModalOpen}
                />
            }
        </StyledJobsList>
    )
}

export default JobsList