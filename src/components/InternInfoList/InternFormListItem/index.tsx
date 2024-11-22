import SvgSelector from 'assets/icons/SvgSelector';
import { routes } from 'config/config';
import { WorkExperienceInterface } from 'contexts/CreateCvContext/WorkExperienceContext';
import dayjs from 'dayjs';
import { useIntl } from 'react-intl';
import { Spinner } from 'ui';
import useQueryApiClient from 'utils/useQueryApiClient';
import { RemoveBtn } from './RemoveBtn';
import { EducationInterface } from 'contexts/CreateCvContext/EducationContext';
import { StyledFormListItem } from './style';

type Props = {
  handleOpenActionModal: (formName?: string, id?: number) => void;
  item: WorkExperienceInterface | EducationInterface | any;
  formType?: string;
  dispatch: any;
};
export const InternFormListItem = (props: Props) => {
  const { item, handleOpenActionModal, dispatch, formType } = props;
  const intl = useIntl();

  const dateFrom = item?.dateFrom ? dayjs(item.dateFrom).toDate() : undefined;
  const dateTo = item?.dateTo ? dayjs(item.dateTo).toDate() : undefined;

  const handleDelete = () => {
    if (formType === 'education') {
      deleteEducation();
      return;
    }
    if (formType === 'certificate') {
      deleteCertificate();
      return;
    }
    deleteExperience();
  };

  const { isLoading: isDeleteLoading, refetch: deleteExperience } = useQueryApiClient({
    request: {
      url: `/api/experience/${item.id}`,
      method: 'DELETE',
    },
    onSuccess: () => {
      dispatch({ type: 'DELETE_WORK_EXPERIENCE', payload: item.id });
    },
  });

  const { isLoading: isEduDeleteLoading, refetch: deleteEducation } = useQueryApiClient({
    request: {
      url: `/api/education/${item.id}`,
      method: 'DELETE',
    },
    onSuccess: () => {
      dispatch({ type: 'DELETE_EDUCATION', payload: item.id });
    },
  });

  const { isLoading: isCerDeleteLoading, refetch: deleteCertificate } = useQueryApiClient({
    request: {
      url: `/api/certificate/${item.id}`,
      method: 'DELETE',
    },
    onSuccess: () => {
      dispatch({ type: 'DELETE_CERTIFICATE', payload: item.id });
    },
  });

  if (isDeleteLoading || isEduDeleteLoading || isCerDeleteLoading) {
    return <Spinner children={intl.formatMessage({ id: 'loading...' })} spinning={true} />;
  }

  return (
    <StyledFormListItem>
      <div className="form-list-item">
        <div className="content">
          {formType === 'education' ? (
            <div className="left">
              <h1>
                {item?.name}
                <span>
                  ({dayjs(dateFrom).format(routes.api.appDateFormat)}
                  {dateTo && ` - ${dayjs(dateTo).format(routes.api.appDateFormat)}`})
                </span>
              </h1>
              <p>{intl.messages[item?.degree] && intl.formatMessage({ id: item?.degree })}</p>
            </div>
          ) : formType === 'certificate' ? (
            <div className="left">
              <h1>
                {item?.certificateName} <span>({dayjs(item.issuingDate).format(routes.api.appDateFormat)})</span>
              </h1>
              <p>{item?.certificateProgramme}</p>
            </div>
          ) : (
            <div className="left">
              <h1>
                {item?.companyName}
                <span>
                  ({dayjs(dateFrom).format(routes.api.appDateFormat)}
                  {item?.dateTo && ` - ${dayjs(dateTo).format(routes.api.appDateFormat)}`})
                </span>
              </h1>
              <p>{item?.job}</p>
            </div>
          )}
          <div className="right">
            {!item?.verified && (
              <div className="edit-svg" onClick={() => handleOpenActionModal(formType, item?.id)}>
                <SvgSelector id="edit-svg" />
              </div>
            )}

            {!item?.verified && <RemoveBtn handleDelete={handleDelete} type="mobile" formType={formType} />}
          </div>
        </div>
        {!item?.verified && <RemoveBtn handleDelete={handleDelete} type="desktop" formType={formType} />}
      </div>
    </StyledFormListItem>
  );
};
