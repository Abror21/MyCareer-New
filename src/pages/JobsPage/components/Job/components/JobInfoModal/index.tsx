import React, { useEffect, useRef, useState } from 'react'
import { StyledJobInfoModal } from './style'
import Title from 'antd/es/typography/Title';
import { Image, Typography } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LuMapPin } from "react-icons/lu";
import { IoMdPaper } from "react-icons/io";
import { LiaBusinessTimeSolid } from "react-icons/lia";
import { TbBuildingCommunity } from "react-icons/tb";
import { LuEuro } from "react-icons/lu";
import { TfiWorld } from "react-icons/tfi";
import { SlGraduation } from "react-icons/sl";
import { LiaCertificateSolid } from "react-icons/lia";
import { Button } from 'ui';
import { useUserState } from 'contexts/UserContext';
import { useIntl } from 'react-intl';
import imagePlaceholder from 'assets/images/company-placeholder.svg'
import { separateIntegratedString } from 'utils/globalFunctions';

interface JobInfoModalProps {
    data: any;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setJobId: React.Dispatch<React.SetStateAction<number | null>>;
    setJobData: React.Dispatch<React.SetStateAction<any>>;
    setIsApplicationFormModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const JobInfoModal = ({ data, isOpen, setIsOpen, setJobId, setJobData, setIsApplicationFormModalOpen }: JobInfoModalProps) => {
    const intl = useIntl();
    const textRef = useRef<HTMLSpanElement | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchparams, setSearchparams] = useSearchParams();
    const [isClamped, setIsClamped] = useState(false);
    const navigate = useNavigate();
    const user = useUserState();

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
        <span className={`${isExpanded ? 'job-modal__description' : 'job-modal__description short'}`} ref={textRef}>
            <pre>
                {data?.hiringDetails?.description}
            </pre>
        </span>
        {
            isClamped &&
            <span 
                onClick={toggleReadMore} 
                className='job-modal__show-more'
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
        <StyledJobInfoModal
            open={isOpen}
            centered
            footer
            onCancel={() => {
                setIsOpen(false);
                setJobId(null);
                setJobData(null);
                setSearchparams((params) => {
                    params.delete('job-id');
                    return params;
                });
            }}
            className='job-modal'
        >
            <div className='job-modal__header'>
                <Image
                    className='job-image'
                    width={150}
                    height={150}
                    preview={false}
                    src={data?.image?.path}
                    fallback={imagePlaceholder}
                    alt='job image'
                />
                <div className='job-modal__header-title'>
                    {
                        data?.jobTitle &&
                        <Title
                            level={2}
                        >
                            {data?.jobTitle}
                        </Title>
                    }
                    {
                        data?.companyName &&
                        <Title
                            level={4}
                        >
                            {data?.companyName}
                        </Title>
                    }
                </div>
            </div>
            <hr className='divider' />
            <Title level={4}>{intl.messages.basic_information ? intl.formatMessage({ id: 'basic_information' }) : "Basic Information"}</Title>
            <div className='job-modal__info'>
                <div className='job-modal__info-content'>
                    <div>
                        {
                            data?.location &&
                            <div title={intl.formatMessage({ id: 'office_location' })} className='job-modal__info-item'>
                                <LuMapPin />
                                <Typography.Text>{data?.location}{data?.region ? `, ${data.region}` : ''}</Typography.Text>
                            </div>
                        }
                        {
                            data?.employmentType &&
                            <div title={intl.formatMessage({ id: 'workload' })} className='job-modal__info-item'>
                                <IoMdPaper />
                                <Typography.Text>{separateIntegratedString(data?.employmentType)}</Typography.Text>
                            </div>
                        }
                    </div>
                    <div>
                        {
                            data?.contractDuration &&
                            <div title={intl.formatMessage({ id: 'employment_duration' })} className='job-modal__info-item'>
                                <LiaBusinessTimeSolid />
                                <Typography.Text>{separateIntegratedString(data?.contractDuration)}</Typography.Text>
                            </div>
                        }
                        {
                            data?.jobLocation &&
                            <div title={intl.formatMessage({ id: 'work_mode' })} className='job-modal__info-item'>
                                <TbBuildingCommunity />
                                <Typography.Text>{separateIntegratedString(data?.jobLocation)}</Typography.Text>
                            </div>
                        }
                    </div>
                </div>
                {
                    data?.language?.length > 0 &&
                    <div title={intl.formatMessage({ id: 'languages' })} className='job-modal__info-item'>
                        <TfiWorld />
                        {<Typography.Text>{data?.language}</Typography.Text>}
                    </div>
                }
                {
                    salary &&
                    <div title={intl.formatMessage({ id: 'salary' })} className='job-modal__info-item'>
                        <LuEuro />
                        <Typography.Text>{salary} {intl.messages.gross ? intl.formatMessage({ id: 'gross' }) : "GROSS"}/{separateIntegratedString(data?.salaryPeriod)}</Typography.Text>
                    </div>
                }
            </div>
            <hr className='divider' />
            {   
                (data?.hiringEducation?.length > 0 || data?.hiringSertificates?.length > 0) &&
                <>
                    <Title level={4}>{intl.messages.education_certificate ? intl.formatMessage({ id: 'education_certificate' }) : "Education & Certificates"}</Title>
                    <div className='job-modal__education'>
                        {
                            data?.hiringEducation?.map((edu: any) => {
                                if(edu?.educationName){
                                    return(
                                        <div className='job-modal__education-item-wrapper'>
                                            <div className='job-modal__education-item'>
                                                <SlGraduation />
                                                <Typography.Text>
                                                    {edu.educationName}
                                                </Typography.Text>
                                            </div>
                                            <span>
                                                {
                                                    edu.degrees?.map((degree: any, index: number) => {
                                                        if(index == edu.degrees?.length-1){
                                                            return separateIntegratedString(degree.degree)
                                                        }
                                                        return `${separateIntegratedString(degree.degree)}, `
                                                    })
                                                }
                                            </span>
                                        </div>
                                    )
                                }
                            })
                        }
                        {
                            data?.hiringSertificates?.map((cer: any) => {
                                if(cer?.certificateName){

                                    return(
                                        <div className='job-modal__education-item'>
                                            <LiaCertificateSolid />
                                            <Typography.Text>{cer?.certificateName}</Typography.Text>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                    <hr className='divider' />
                </>
            }
            {
                data?.hiringSkills?.length > 0 &&
                <>
                    <Title level={4}>{intl.messages.req_skills_experience ? intl.formatMessage({ id: 'req_skills_experience' }) : "Required skills & experience"}</Title>
                    {
                        data?.hiringSkills?.map((skill: any) => {
                            if(skill.skill && skill.level){

                                return(
                                    <div className='job-modal__skills-item'>
                                        <div>
                                            <span>{skill?.skill}</span> &nbsp;&nbsp;&nbsp;
                                        </div>
                                        <div>
                                            <span>{skill?.level}</span>
                                        </div>
                                    </div>
                                )
                            }
                        })
                    }
                    <hr className='divider' />
                </>
            }
            {
                data?.hiringDetails?.description &&
                <>
                    <Title level={4}>{intl.messages.additional_information ? intl.formatMessage({ id: 'additional_information' }) : "Additinal Information"}</Title>
                        <div className='job-modal__description'>
                            {description}
                        </div>
                    <hr className='divider' />
                </>
            }
            {
                data?.hiringDetails?.tags?.length > 0 &&
                <div className="job-modal__programs">
                    {
                        data?.hiringDetails?.tags?.map((tag: any) => (
                            <span>{tag}</span>
                        ))
                    }
                </div>
            }
            <div className='job-modal__footer'>
                {user?.role ?
                    <>
                        <Typography.Paragraph strong>{intl.messages.apply_this_job ? intl.formatMessage({ id: 'apply_this_job' }) : "Apply for this Job"}</Typography.Paragraph>
                        <Button
                            label={intl.messages.apply ? intl.formatMessage({ id: 'apply' }) : "Apply"}
                            type='primary'
                            onClick={() => {
                                setJobId(data?.id)
                                setIsOpen(false);
                                setIsApplicationFormModalOpen(true);
                                setSearchparams((params) => {
                                    params.delete('job-id');
                                    return params;
                                });
                            }}
                        />
                    </> :
                    <>
                        <Typography.Paragraph strong>{intl.messages.log_to_apply ? intl.formatMessage({ id: 'log_to_apply' }) : "Login or Sign Up to apply"}</Typography.Paragraph>
                        <Button
                            label={intl.messages.login ? intl.formatMessage({ id: 'login' }) : "Login"}
                            type='primary'
                            onClick={() => {
                                navigate(`/login?job-id=${data?.id}`);
                            }}
                        />
                    </>
                }
            </div>
        </StyledJobInfoModal>
    )
}

export default JobInfoModal