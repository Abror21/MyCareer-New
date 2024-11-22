import React, { useState } from 'react';
import { StyledCompanyInformtion } from './style';
import { LuCalendarDays, LuMapPin } from 'react-icons/lu';
import { IoEarthOutline } from 'react-icons/io5';
import { RiTeamLine } from 'react-icons/ri';
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2';
import { defaultImageUrl } from 'utils/consts';
import { useIntl } from 'react-intl';
import { routes } from 'config/config';

export function CompanyInformation({ data, setModalData }: any) {
  const intl = useIntl();
  const [showMore, setShowMore] = useState(false);

  const handleToggleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <StyledCompanyInformtion width={800} open={data?.status} footer={[]} onCancel={() => setModalData(null)}>
      <div className="modal-header">
        <div>
          <h2 className="company-name">{data?.data?.organizationName}</h2>
        </div>
        <div className="image-wrap">
          <div className="image-container">
            {data?.data?.image?.path == null ? (
              <img src={defaultImageUrl} alt="" />
            ) : (
              <img
                src={routes.api.frontendUrl + '/' + data?.data?.image?.path}
                alt="Company Logo"
                className="company-logo"
              />
            )}
          </div>
        </div>
      </div>
      <div className="modal-body">
        <div className="company-info">
          {data?.data?.organizationRegistered?.name && (
            <p>
              <LuMapPin />
              {data?.data?.organizationRegistered?.name}
            </p>
          )}

          {data?.data?.establishedYear && (
            <p>
              <LuCalendarDays />
              {data?.data?.establishedYear}
            </p>
          )}

          {data?.data?.employessCount && (
            <p>
              <RiTeamLine />
              {data?.data?.employessCount}
            </p>
          )}
        </div>

        <div className="company-body">
          {data?.data?.organizationWebPage && (
            <div className="company-link">
              <IoEarthOutline />
              <a href={data?.data?.organizationWebPage} className="website-link">
                {data?.data?.organizationWebPage}
              </a>
            </div>
          )}

          {data?.data?.industriys?.length > 0 && (
            <div className="industry-container">
              <HiOutlineBuildingOffice2 className="industry-svg" />
              <p className="industry">
                {data?.data?.industriys?.map((item: any, index: number) => {
                  return (
                    <React.Fragment key={index}>
                      {item.name}
                      {index < data?.data?.industriys?.length - 1 && ', '}
                    </React.Fragment>
                  );
                })}
              </p>
            </div>
          )}
        </div>

        {data?.data?.description && (
          <div className={`company-description ${showMore ? 'expanded' : ''}`}>
            <p className={`preview-text ${showMore && 'more-text'}`}>
              {showMore ? data?.data?.description : `${data?.data?.description.substring(0, 100)}...`}
            </p>
            <button className="show-more-button" onClick={handleToggleShowMore}>
              {showMore ? intl.formatMessage({ id: 'showless' }) : intl.formatMessage({ id: 'showMore' })}
            </button>
          </div>
        )}

        {data?.data?.operatingCountries?.length > 0 && (
          <p className="company-operations">
            {intl.formatMessage({ id: 'operating_country' })}&nbsp;&nbsp;
            {data?.data?.operatingCountries?.map((item: any, index: number) => {
              return (
                <span key={index}>
                  {item.name}
                  {index < data?.data?.operatingCountries?.length - 1 && ', '}
                </span>
              );
            })}
          </p>
        )}
      </div>
    </StyledCompanyInformtion>
  );
}
