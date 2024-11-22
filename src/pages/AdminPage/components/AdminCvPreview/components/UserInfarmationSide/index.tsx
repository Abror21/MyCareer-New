import { Form } from 'antd';
import SvgSelector from 'assets/icons/SvgSelector';
import { CvPageInterface } from 'pages/AdminPage/components/Types';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Button } from 'ui';
import EditModal from './components/EditModal';

interface Props {
  cvData: CvPageInterface | undefined;
  refetchResume: Function;
}
export interface NameProps {
  title: string;
  countryId?: number;
  regionId?: number;
  street?: string;
  otherRegion?: boolean;
}
export const UserInfarmationSide = ({ cvData, refetchResume }: Props) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalValue, setModalValue] = useState<string | number>('');
  const [modalName, setModalName] = useState<string | NameProps>('');
  const [modalUrl, setModalUrl] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  useEffect(() => {
    if(modalName){
      form.setFieldValue(modalName, modalValue);
    }
  }, [modalName]);
  
  const handleEdit = (
    modalTitle: string,
    modalValue: string | number,
    name: string | NameProps,
    url: string
  ) => {
    setModalTitle(modalTitle);
    setModalName(name);
    setModalValue(modalValue);
    setModalUrl(url);
    setIsModalVisible(true);
  };

  return (
    <>
      <div className="user-information">
        <ul>
          <div>
            <li className="user-name">
              <p>
                {cvData?.firstName} {cvData?.lastName}
              </p>
            </li>
            <li>
              <p>{cvData?.desiredPosition?.name}</p>
              {
                cvData?.desiredPosition?.name &&
                <Button
                  label={<SvgSelector id="edit-svg"
                  className="edit-icon" />}
                  onClick={() => handleEdit(
                    intl.messages.position as string,
                    cvData?.desiredPosition?.id as number,
                    'desiredPositionId',
                    'change-desired-position'
                  )}
                />
              }
            </li>
          </div>
          <div>
            <li>
              <p>
                <SvgSelector id="phone" /> {cvData?.phoneNumber}
              </p>
              { 
                cvData?.phoneNumber &&
                <Button
                  label={<SvgSelector id="edit-svg" className="edit-icon" />}
                  onClick={() => handleEdit(
                    intl.messages.phone as string,
                    cvData?.phoneNumber as string,
                    'phoneNumber',
                    'change-phone'
                  )}
                />
              }
            </li>
            <li>
              <p>
                <SvgSelector id="email" /> {cvData?.email}
              </p>
              {
                cvData?.email &&
                <Button
                  label={<SvgSelector id="edit-svg" className="edit-icon" />}
                  onClick={() => handleEdit(
                    intl.messages.email as string,
                    cvData?.email as string,
                    'email',
                    'change-email'
                  )}
                />
              }
            </li>
            <li className="user-location">
              <p>
                <SvgSelector id="location" />
                {cvData && cvData.address?.country?.name},&nbsp;
                {cvData?.address && cvData?.address?.region !== null && cvData?.address?.region?.name}&nbsp;
                {cvData?.address && cvData?.address?.street}
              </p>
              {
                (cvData && cvData.address?.country?.name || cvData?.address?.region?.name || cvData?.address?.street) &&
                <Button
                  label={<SvgSelector id="edit-svg" className="edit-icon" />}
                  onClick={() => handleEdit(
                    intl.messages.address as string,
                    `${cvData?.address?.country?.name ?? ''} ${cvData?.address?.region ?? ''} ${cvData?.address?.street ?? ''}`,
                    'address',
                    'change-address'
                  )}
                />
              }
            </li>
          </div>
          <div>
            <li>
              <div>
                <p>{intl.messages.experience && intl.formatMessage({ id: 'experience' })}</p>
                <p className='job-experience'>{cvData?.jobExperience && intl.messages[cvData?.jobExperience] && intl.formatMessage({ id: cvData?.jobExperience })}</p>
              </div>
              {
                cvData?.jobExperience &&
                <Button
                  label={<SvgSelector id="edit-svg" className="edit-icon" />}
                  onClick={() => handleEdit(
                    intl.messages.experience as string,
                    intl.formatMessage({ id: cvData?.jobExperience }) as string,
                    'jobExperience',
                    'change-experience'
                  )}
                />
              }
            </li>
          </div>
        </ul>
      </div>

      <EditModal
        cvData={cvData}
        refetchResume={refetchResume}
        isModalVisible={isModalVisible}
        modalValue={modalValue}
        modalName={modalName}
        modalUrl={modalUrl}
        modalTitle={modalTitle}
        setIsModalVisible={setIsModalVisible}
        setModalValue={setModalValue}
        setModalName={setModalName}
        setModalUrl={setModalUrl}
        setModalTitle={setModalTitle}
      />
    </>
  );
};
