import { Popconfirm } from 'antd';
import SvgSelector from 'assets/icons/SvgSelector';
import React from 'react';
import { useIntl } from 'react-intl';

interface Props {
  handleDelete: () => void;
  type?: 'mobile' | 'desktop';
  formType?: string;
}
export const RemoveBtn = ({ handleDelete, type, formType }: Props) => {
  const intl = useIntl();
  
  return (
    <>
      <Popconfirm
        title={intl.formatMessage({
          id: formType === 'education' ? 'popconiformDeleteEducation' : formType === "certificate" ? "popconiformDeleteCertificate" : "popconiformDeleteExperience"
        })}
        description={intl.formatMessage({
          id: formType === 'education' ? 'popconiformDeleteEducationDesc' : formType === "certificate" ? "popconiformDeleteCertificateDesc" : "popconiformDeleteExperienceDesc",
        })}
        onConfirm={() => handleDelete()}
        okText={intl.messages.yes && intl.formatMessage({ id: 'yes' })}
        cancelText={intl.messages.no && intl.formatMessage({ id: 'no' })}
      >
        <div className={`remove-btn ${type}`}>
          <SvgSelector id="close-svg" />
        </div>
      </Popconfirm>
    </>
  );
};
