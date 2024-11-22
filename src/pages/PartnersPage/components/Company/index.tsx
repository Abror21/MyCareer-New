import React, { useEffect, useRef, useState } from 'react'
import { StyledCompany } from './style'
import { Image, Typography } from 'antd'
import { LiaIdCardAltSolid } from "react-icons/lia";
import { LuMapPin } from "react-icons/lu";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { RiTeamLine } from "react-icons/ri";
import { LuCalendarDays } from "react-icons/lu";
import Title from 'antd/es/typography/Title';
import CompanyInfoModal from './components/CompanyInfoModal';
import { routes } from 'config/config';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import imagePlaceholder from 'assets/images/company-placeholder.svg'

const Company = ({ data }: { data: any }) => {
    const intl = useIntl();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const textRef = useRef<HTMLSpanElement | null>(null);
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
        <span className={`${isExpanded ? 'company-right__description' : 'company-right__description short'}`} ref={textRef}>
            <pre>
                {data?.description}
            </pre>
        </span>
        {
            isClamped &&
            <span 
                onClick={toggleReadMore} 
                className='company-right__show-more'
            >
                {isExpanded ?
                    ` ${intl.messages.show_less ? intl.formatMessage({ id: 'show_less' }) : "Show less"}` :
                    ` ${intl.messages.read_more ? intl.formatMessage({ id: 'read_more' }) : "Read more"}`}
            </span>
        }
    </p>

    return (
        <StyledCompany>
            <div className='company-left'>
                <Image
                    className='company-image'
                    width={150}
                    height={150}
                    preview={false}
                    src={routes.api.baseUrl + "/" + data?.image?.path}
                    fallback={imagePlaceholder}
                    alt='Company image'
                />
                <div className={`company-left__footer`}>
                    <LiaIdCardAltSolid />
                    <Link to={`/jobs?company=${data?.organizationName}`}>{intl.messages.hiring ? intl.formatMessage({ id: 'hiring' }) : "Hiring"}</Link>
                </div>
            </div>

            <div className='company-right'>
                <Title
                    level={2}
                    onClick={() => setIsModalOpen(true)}
                >
                    {data?.organizationName}
                </Title>
                <div className='company-right__header'>
                    { 
                        data?.organizationRegistered?.name &&
                        <div
                            className='company-right__header-item'
                            title={intl.formatMessage({ id: 'registration_country' })}>
                            <LuMapPin />
                            <Typography.Paragraph strong>{data.organizationRegistered.name}</Typography.Paragraph>
                        </div>
                    }
                    {
                        data?.establishedYear &&
                        <div
                            className='company-right__header-item'
                            title={intl.formatMessage({ id: 'estabilshed' })}
                        >
                            <LuCalendarDays />
                            <Typography.Paragraph strong>{data.establishedYear}</Typography.Paragraph>
                        </div>
                    }
                    {
                        data?.employessCount &&
                        <div
                            className='company-right__header-item'
                            title={intl.formatMessage({ id: 'employees' })}
                        >
                            <RiTeamLine />
                            <Typography.Paragraph strong>{data.employessCount}</Typography.Paragraph>
                        </div>
                    }
                    {
                        data?.industriys?.length > 0 &&
                        <div
                            className='company-right__header-item industries'
                            title={intl.formatMessage({ id: 'industry' })}
                        >
                            <HiOutlineBuildingOffice2 />
                            <Typography.Paragraph strong>
                                {
                                    data?.industriys?.map((item: any, index: number) => {
                                        if(index == data?.industriys?.length-1){
                                            return `${item.name}`
                                        }else{
                                            return `${item.name}, `
                                        }
                                    })    
                                }
                            </Typography.Paragraph>
                        </div>
                    }
                </div>
                {description}
            </div>
            {
                isModalOpen &&
                <CompanyInfoModal
                    data={data}
                    isOpen={isModalOpen}
                    setIsOpen={setIsModalOpen}
                />
            }
        </StyledCompany>
    )
}

export default Company