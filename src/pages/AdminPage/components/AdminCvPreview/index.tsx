import { useEffect, useState } from 'react';
import { StyledAdminCvPreview } from './style';
import { Avatar, Space } from 'antd';
import { routes } from 'config/config';
import { useIntl } from 'react-intl';
import SvgSelector from 'assets/icons/SvgSelector';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useQueryApiClient from 'utils/useQueryApiClient';
import { CvPageInterface } from '../Types';
import { handleAccessDeniedError, smoothScroll } from 'utils/globalFunctions';
import { SkillsSide } from './components/SkillsSide';
import { LanguageSide } from './components/LanguageSide';
import { HobbiesSide } from './components/HobbiesSide';
import { ActionModal } from './components/ActionModal';
import { EducationProvider } from 'contexts/CreateCvContext/EducationContext';
import { WorkExperienceProvider } from 'contexts/CreateCvContext/WorkExperienceContext';
import { WorkExperienceSide } from './components/WorkExperienceSide';
import { EducationSide } from './components/EducationSide';
import { UserInfarmationSide } from './components/UserInfarmationSide';
import { JobExpectationSide } from './components/JobExpectationsSide';
import { AboutSide } from './components/AboutSide';
import { StatusSide } from './components/StatusSide';
import fileDownload from 'js-file-download';
import { CertificateSide } from './components/CertificateSide';
import { CertificateProvider } from 'contexts/CreateCvContext/CertificateContext';
import { useUserDispatch, useUserState } from '../../../../contexts/UserContext';
import { Spinner } from 'ui';
export const AdminCvPreview = () => {
  const { id } = useParams();
  const intl = useIntl();
  const navigate = useNavigate();
  const { allowedPages } = useUserState();
  const { dispatch: userDispatch } = useUserDispatch();
  const [cvData, setCvData] = useState<CvPageInterface>();
  const [createInvoiceBtn, setCreateInvoiceBtn] = useState<boolean>(false);
  const [actionModalData, setActionModalData] = useState({});
  const [isActionModalVisible, setActionModalVisible] = useState<boolean>(false);
  const { isLoading: isCVLoading, refetch: FreelancerDataRefetch } = useQueryApiClient({
    request: {
      url: `/api/freelancer/${id}/real-data-cv`,
      method: 'GET',
    },
    onSuccess: (response) => {
      if (
        response.data.freelancerStatus.name === 'Applied Real CV' ||
        response.data.freelancerStatus.name === 'Applied IT' ||
        response.data.freelancerStatus.name === 'Applied CAREER'
      ) {
        setCreateInvoiceBtn(true);
      }
      setCvData(response.data);
    },
    onError: (error) => {
      if (error.error === 'access_denied') {
        allowedPages && handleAccessDeniedError('system_administration', allowedPages, userDispatch);
      }
    },
  });
  const { refetch: refetchDocxFileGet } = useQueryApiClient({
    request: {
      url: `api/manage-cabinets/${id}/generate-cv-docx`,
      method: 'GET',
      disableOnMount: true,
      multipart: true,
    },
    onSuccess: async (response) => {
      fileDownload(response, `${cvData?.lastName}-${cvData?.firstName}-cv.docx`);
    },
    onError: (error) => {
      if (error.data.error === 'access_denied') {
        allowedPages && handleAccessDeniedError('system_administration', allowedPages, userDispatch);
      }
    },
  });

  const { refetch: refetchPdfFileGet } = useQueryApiClient({
    request: {
      url: `/api/freelancer/${id}/generate-cv-pdf`,
      method: 'GET',
      disableOnMount: true,
      multipart: true,
    },
    onSuccess: (response) => {
      fileDownload(response, `${cvData?.lastName}-${cvData?.firstName}.pdf`);
    },
    onError: (error) => {
      if (error.error === 'access_denied') {
        allowedPages && handleAccessDeniedError('system_administration', allowedPages, userDispatch);
      }
    },
  });
  
  useEffect(() => {
    smoothScroll('top', 0);
  }, []);

  const handleOpenActionModal = (formName: string, id?: number) => {
    setActionModalData({
      formName,
      id,
    });
    setActionModalVisible(true);
  };

  return (
    <StyledAdminCvPreview>
      <Spinner spinning={isCVLoading} size='large'>
        <div className="cv-preview">
          <div className="navigate-back" onClick={() => navigate(-1)}>
            <span>&lt;</span>
            <span>{intl.messages.back && intl.formatMessage({ id: 'back' })}</span>
          </div>
          <div className="cv-preview-header">
            <div>
              <Space className="avatar">
                {cvData?.image?.path ? (
                  <Avatar src={`${routes.api.baseUrl}/${cvData?.image?.path}`} shape="square" />
                ) : (
                  <Avatar shape="square" icon={<SvgSelector id="avatar-icon" />} size={64} />
                )}
              </Space>
            </div>
            <UserInfarmationSide cvData={cvData} refetchResume={FreelancerDataRefetch} />
          </div>
          <div className="cv-preview-body">
            <div className="cv-preview-left-bar">
              {/* Status */}
              <StatusSide cvData={cvData} FreelancerDataRefetch={FreelancerDataRefetch} />
              {/* Skills */}
              <div className="block-information skills">
                <SkillsSide cvData={cvData} />
              </div>
              {/* Langauges */}
              <div className="block-information langauges">
                <LanguageSide cvData={cvData} />
              </div>
              {/* Hobbies */}
              <div className="block-information hobbies">
                <HobbiesSide cvData={cvData} />
              </div>
            </div>

            <div className="cv-preview-right-bar">
              <AboutSide cvData={cvData} />

              <JobExpectationSide cvData={cvData} />
              <CertificateProvider>
                <WorkExperienceProvider>
                  <EducationProvider>
                    <div className="block-information education">
                      <EducationSide cvData={cvData} handleOpenActionModal={handleOpenActionModal} />
                    </div>
                    <div className="block-information education">
                      <CertificateSide
                        FreelancerDataRefetch={FreelancerDataRefetch}
                        cvData={cvData}
                        handleOpenActionModal={handleOpenActionModal}
                      />
                    </div>
                    <div className="block-information experience">
                      <WorkExperienceSide cvData={cvData} handleOpenActionModal={handleOpenActionModal} />
                    </div>
                    <ActionModal
                      actionModalData={actionModalData}
                      isActionModalVisible={isActionModalVisible}
                      setActionModalVisible={setActionModalVisible}
                    />
                  </EducationProvider>
                </WorkExperienceProvider>
              </CertificateProvider>
            </div>
          </div>
          <div className="docx-btn" onClick={() => refetchDocxFileGet()}>
            <SvgSelector id="docx" />
          </div>
          <div className="pdf-btn" onClick={() => refetchPdfFileGet()}>
            <SvgSelector id="download-svg" />
          </div>
          {createInvoiceBtn && (
            <Link to={`/admin/invoice/${id}`} className="invoice-btn">
              <SvgSelector id="invoice" />
            </Link>
          )}
        </div>
        <div className="information-verified">
          <SvgSelector id="addverified" /> -{' '}
          <h6>{intl.messages.informationVerified && intl.formatMessage({ id: 'informationVerified' })}</h6>
        </div>
      </Spinner>
    </StyledAdminCvPreview>
  );
};
