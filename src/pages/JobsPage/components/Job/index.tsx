import React, { useEffect, useRef, useState } from 'react'
import { StyledJob } from './style'
import { Image, Typography } from 'antd';
import { LuMapPin } from "react-icons/lu";
import { IoMdPaper } from "react-icons/io";
import { LiaBusinessTimeSolid } from "react-icons/lia";
import { TbBuildingCommunity } from "react-icons/tb";
import { LuEuro } from "react-icons/lu";
import Title from 'antd/es/typography/Title';
import { routes } from 'config/config';
import { useIntl } from 'react-intl';
import imagePlaceholder from 'assets/images/company-placeholder.svg'
import { separateIntegratedString } from 'utils/globalFunctions';

interface JobProps {
    data: any;
    setJobId: React.Dispatch<React.SetStateAction<number | null>>;
    setIsInfoModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Job = ({ data, setJobId, setIsInfoModalOpen }: JobProps) => {    
    const intl = useIntl();
    const textRef = useRef<HTMLSpanElement | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isClamped, setIsClamped] = useState(false);

    useEffect(() => {
        if(textRef.current){
            const windowWidth = window.innerWidth;
            const lineHeight = parseFloat(window.getComputedStyle(textRef.current).lineHeight);
            const textHeight = textRef.current.scrollHeight;
            const calculatedLineCount = Math.round(textHeight / lineHeight);

            if(windowWidth < 426){
                setIsClamped(calculatedLineCount > 8);
            }else if(windowWidth < 769){
                setIsClamped(calculatedLineCount > 6);
            }else{
                setIsClamped(calculatedLineCount > 4);
            }
        }
    }, [data]);

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    const description = <p>
        <span className={`${isExpanded ? 'job-right__description' : 'job-right__description short'}`} ref={textRef}>
            <pre>
                {data?.hiringDetails?.description}
            </pre>
        </span>
        {
            isClamped &&
            <span 
                onClick={toggleReadMore} 
                className='job-right__show-more'
            >
                {isExpanded ?
                    ` ${intl.messages.show_less ? intl.formatMessage({ id: 'show_less' }) : "Show less"}` :
                    ` ${intl.messages.read_more ? intl.formatMessage({ id: 'read_more' }) : "Read more"}`}
            </span>
        }
    </p>

    let salary;
    if(data?.minSalary && data?.maxSalary){
        salary = data?.minSalary+'-'+data?.maxSalary
    } else if(data?.minSalary){
        salary = data?.minSalary
    } else if(data?.maxSalary){
        salary = data?.maxSalary
    }

    return (
        <>
            <StyledJob>
                <div className='job-left'>
                    <Image
                        className='company-image'
                        width={150}
                        height={150}
                        preview={false}
                        src={routes.api.baseUrl + "/" + data?.image?.path}
                        fallback={imagePlaceholder}
                        alt='Company image'
                    />
                </div>

                <div className='job-right'>
                    {
                        data?.jobTitle &&
                        <Title level={2}
                            onClick={() => {
                            setJobId(data?.id);
                            setIsInfoModalOpen(true);
                        }}
                        >{data?.jobTitle}</Title>
                    }
                    {
                        data?.companyName &&
                        <Title
                            level={3}
                        >
                            {data?.companyName}
                        </Title>
                    }
                    <div className='job-right__header'>
                        {
                            data?.location &&
                                <div className='job-right__header-item country' title={intl.formatMessage({ id: 'office_location' })}>
                                    <LuMapPin />
                                    <Typography.Paragraph strong>{data?.location}{data?.region ? `, ${data.region}` : ''}</Typography.Paragraph>
                                </div>
                        }
                        {
                            data?.employmentType &&
                            <div className='job-right__header-item' title={intl.formatMessage({ id: 'workload' })}>
                                <IoMdPaper />
                                <Typography.Paragraph strong>{separateIntegratedString(data?.employmentType)}</Typography.Paragraph>
                            </div>
                        }
                        {
                            data?.contractDuration &&
                            <div className='job-right__header-item' title={intl.formatMessage({ id: 'employment_duration' })}>
                                <LiaBusinessTimeSolid />
                                <Typography.Paragraph strong>{separateIntegratedString(data?.contractDuration)}</Typography.Paragraph>
                            </div>
                        }
                        {
                            data?.jobLocation &&
                            <div className='job-right__header-item' title={intl.formatMessage({ id: 'work_mode' })}>
                                <TbBuildingCommunity />
                                <Typography.Paragraph strong>{separateIntegratedString(data?.jobLocation)}</Typography.Paragraph>
                            </div>
                        }
                        {
                            salary &&
                            <div className='job-right__header-item' title={intl.formatMessage({ id: 'salary' })}>
                                <LuEuro />
                                <Typography.Paragraph strong>{salary} {intl.messages.gross ? intl.formatMessage({ id: 'gross' }) : "GROSS"}/{separateIntegratedString(data?.salaryPeriod)}</Typography.Paragraph>
                            </div>
                        }
                    </div>
                    {
                        data?.hiringDetails?.description &&
                        <>
                            {description}
                        </>
                    }
                    {
                        data?.hiringDetails?.tags?.length > 0 &&
                        <div className='tags'>
                            {
                                data?.hiringDetails?.tags?.map((tag:string) => (
                                    <span key={tag}>{tag}</span>
                                ))
                            }
                        </div>
                    }
                </div>
            </StyledJob>
        </>
    )
}

export default Job