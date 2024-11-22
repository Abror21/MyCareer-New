import React, { useEffect, useRef, useState } from 'react'
import { StyledCompanyInfoModal } from './style'
import Title from 'antd/es/typography/Title';
import { Image, Typography } from 'antd';
import { LuMapPin } from "react-icons/lu";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { RiTeamLine } from "react-icons/ri";
import { LuCalendarDays } from "react-icons/lu";
import { IoEarthOutline } from "react-icons/io5";
import { LiaIdCardAltSolid } from "react-icons/lia";
import { Link } from 'react-router-dom';
import { routes } from 'config/config';
import { useIntl } from 'react-intl';
import imagePlaceholder from 'assets/images/company-placeholder.svg'

interface CompanyInfoModalProps {
    data: any;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CompanyInfoModal = ({ data, isOpen, setIsOpen }: CompanyInfoModalProps) => {
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
        <span className={`${isExpanded ? 'company-modal__description' : 'company-modal__description short'}`} ref={textRef}>
            <pre>
                {data?.description}
            </pre>
        </span>
        {
            isClamped &&
            <span 
                onClick={toggleReadMore} 
                className='company-modal__show-more'
            >
                {isExpanded ?
                    ` ${intl.messages.show_less ? intl.formatMessage({ id: 'show_less' }) : "Show less"}` :
                    ` ${intl.messages.read_more ? intl.formatMessage({ id: 'read_more' }) : "Read more"}`}
            </span>
        }
    </p>

    const operateCountries = data?.operatingCountries?.map((country: any, index: number) => {
        if(index == data?.operatingCountries?.length-1){
            return `${country.name}`
        }else{
            return `${country.name}, `
        }
    })
    return (
        <StyledCompanyInfoModal
            open={isOpen}
            centered
            footer
            onCancel={() => setIsOpen(false)}
        >
            <div className='company-modal'>
                <div className='company-modal__header'>
                    <Title
                        level={3}
                    >
                        {data?.organizationName}
                    </Title>
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

                <div className='company-modal__info'>
                    {
                        data?.organizationRegistered?.name &&
                        <div className='company-modal__item' title={intl.formatMessage({ id: 'registration_country' })}>
                            <LuMapPin />
                            <Typography.Text>{data?.organizationRegistered?.name}</Typography.Text>
                        </div>
                    }
                    {
                        data?.establishedYear &&
                        <div className='company-modal__item' title={intl.formatMessage({ id: 'established' })}>
                            <LuCalendarDays />
                            <Typography.Text>{data?.establishedYear}</Typography.Text>
                        </div>
                    }
                    {
                        data?.employessCount &&
                        <div className='company-modal__item' title={intl.formatMessage({ id: 'employees' })}>
                            <RiTeamLine />
                            <Typography.Text>{data?.employessCount}</Typography.Text>
                        </div>
                    }
                    {
                        data?.industriys?.length > 0 &&
                        <div className='company-modal__item company-modal__info-industries' title={intl.formatMessage({ id: 'industry' })}>
                            <HiOutlineBuildingOffice2 />
                            <Typography.Text>
                                {
                                    data?.industriys?.map((item: any, index: number) => {
                                        if(index == data?.industriys?.length-1){
                                            return `${item.name}`
                                        }else{
                                            return `${item.name}, `
                                        }
                                    })    
                                }
                            </Typography.Text>
                        </div>
                    }
                    {
                        data?.organizationWebPage &&
                        <div title={intl.formatMessage({ id: 'web_page' })}>
                            <IoEarthOutline />
                            <Typography.Link target='_blank' href={data?.organizationWebPage}>{data?.organizationWebPage}</Typography.Link>
                        </div>
                    }
                </div>
                <div className='company-modal__text'>
                    {description}
                </div>
                { 
                    data?.operatingCountries?.length > 0 &&
                    <Typography.Text>
                        {intl.messages.company_operates_in ? intl.formatMessage({ id: 'company_operates_in' }) : "Company operates in:"} {operateCountries}
                    </Typography.Text>
                }

                <Link to={`/jobs?company=${data?.organizationName}`} className='company-modal__footer'>
                    <LiaIdCardAltSolid /> {intl.messages.hiring ? intl.formatMessage({ id: 'hiring' }) : "Hiring"}
                </Link>
            </div>
        </StyledCompanyInfoModal>
    )
}

export default CompanyInfoModal