import { Dropdown, Form, Modal } from 'antd';
import { MenuProps } from 'antd/lib';
import SvgSelector from 'assets/icons/SvgSelector';
import { CvPageInterface } from 'pages/AdminPage/components/Types';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { UserSkill } from 'types/Skill';
import { Select, SelectOption } from 'ui';
import { skillLevels } from 'utils/consts';
import { handleAccessDeniedError, openNotification } from 'utils/globalFunctions';
import useQueryApiClient from 'utils/useQueryApiClient';
import { useUserDispatch, useUserState } from '../../../../../../contexts/UserContext';

interface SkillsSideProps {
  cvData: CvPageInterface | undefined;
}
export const SkillsSide = ({ cvData }: SkillsSideProps) => {
  const intl = useIntl();
  const { allowedPages } = useUserState();
  const { dispatch: userDispatch } = useUserDispatch();

  const [skillForm] = Form.useForm();
  const [changedSkillData, setChangedSkillData] = useState<any>();
  const [skillData, setSkillData] = useState<any[]>([]);
  const [deletemodalvisible, setDeleteModalVisible] = useState(false);
  const [userSkills, setUserSkills] = useState<UserSkill[] | undefined>([]);

  const { data: skillApiData } = useQueryApiClient({
    request: {
      url: '/api/skill',
      method: 'GET',
    },
    onSuccess(response) {
      setSkillData(response.data || []);
    },
  });

  const { appendData: UpdateSkillLevelApi } = useQueryApiClient({
    request: {
      url: `/api/user-skill/${changedSkillData?.id}`,
      method: 'PUT',
    },
  });

  const { appendData: UpdateSkillVerifyApi } = useQueryApiClient({
    request: {
      url: `/api/manage-cabinets/VerifyUserSkill`,
      method: 'POST',
    },
  });
  const { appendData: CreateUserSkillApi } = useQueryApiClient({
    request: {
      url: `/api/user-skill/user/${cvData?.user?.id}`,
      method: 'POST',
    },
    onSuccess(res) {
      if (userSkills !== undefined) {
        setUserSkills([...userSkills, res.data]);
      } else {
        setUserSkills([res.data]);
      }
    },
    onError: (error) => {
      if (error.error === 'access_denied') {
        allowedPages && handleAccessDeniedError('system_administration', allowedPages, userDispatch);
      }
    },
  });

  const { refetch: refechtDeleteSkillApi, isLoading: deleteSkillLoading } = useQueryApiClient({
    request: {
      url: `/api/user-skill/${changedSkillData?.id}`,
      method: 'DELETE',
    },
    onSuccess: (res) => {
      const updatedSkills = userSkills?.filter((skill) => skill.id !== changedSkillData?.id);
      setUserSkills(updatedSkills);
      setDeleteModalVisible(false);
      setChangedSkillData({});
    },
    onError: (error) => {
      if (error.error === 'access_denied') {
        allowedPages && handleAccessDeniedError('system_administration', allowedPages, userDispatch);
      }
    },
  });
  const skillMenuItems = skillData?.map((item: any) => ({
    label: <div onClick={() => handleAddSkill(item.id)}>{item.content}</div>,
    key: item.id.toString(),
  }));

  const skillMenuProps: MenuProps = {
    items: skillMenuItems || [],
    style: {
      maxHeight: '200px',
      overflowY: 'auto',
    },
  };

  const verifyOption = [
    { id: 1, value: true, label: <SvgSelector id="addverified" /> },
    { id: 2, value: false, label: '' },
  ];

  useEffect(() => {
    setUserSkills(cvData?.skills);

    if (cvData && cvData.skills) {
      const initialValues: Record<string, any> = {};
      cvData?.skills?.forEach((item) => {
        initialValues[`level$${item.id}`] = item.level;
        initialValues[`verify$${item.skill.id}`] = item.verified;
      });
      skillForm.setFieldsValue(initialValues);
    }
  }, [cvData, skillForm]);

  useEffect(() => {
    if (changedSkillData?.id && changedSkillData?.type === 'level') {
      UpdateSkillLevelApi(changedSkillData.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changedSkillData]);

  useEffect(() => {
    if (!changedSkillData?.id || changedSkillData?.type !== 'verify' || changedSkillData.value === undefined) {
      return;
    }
    const reqData = {
      userId: cvData?.user?.id,
      [changedSkillData.value ? 'verifiedSkillIds' : 'unverifiedSkillIds']: [changedSkillData.id],
    };

    UpdateSkillVerifyApi(reqData);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changedSkillData, cvData]);

  useEffect(() => {
    const getFilteredSkills = () => {
      return (
        skillApiData?.data?.filter((item: any) => {
          const isSkillSelected = isSkillInCV(item);
          return !isSkillSelected;
        }) ?? []
      );
    };
    const isSkillInCV = (item: any) => {
      return userSkills?.some((selectedSkill) => selectedSkill.skill.id === item.id);
    };

    const filteredSkills = getFilteredSkills();
    setSkillData(filteredSkills);
  }, [userSkills, skillApiData?.data]);

  const handleAddSkill = (selectedSkillId: number) => {
    const selectedSkill = skillApiData?.data?.find((item: any) => item.id === selectedSkillId);

    if (selectedSkill) {
      CreateUserSkillApi({ skillId: selectedSkillId, level: 'Beginner' });
    }
  };

  const handleSkillFormChange = (changedValues: Record<string, string | number>) => {
    Object.entries(changedValues).forEach(([name, value]) => {
      const match = name.match(/(level|verify)\$(\d+)/);

      if (match) {
        const [, type, skillId] = match;
        setChangedSkillData({ id: parseInt(skillId, 10), value, type });
      }
    });
  };

  const handleDeleteSkill = () => {
    refechtDeleteSkillApi();
  };

  const handleCancel = () => {
    setChangedSkillData({});
    setDeleteModalVisible(false);
  };

  const handleOpenDeleteModal = (id: number) => {
    setChangedSkillData({ type: 'delete', id });
    setDeleteModalVisible(true);
  };

  return (
    <>
      <div className="titles">
        <h4 className="bar-title">{intl.messages.skills && intl.formatMessage({ id: 'skills' })}</h4>
        <h4 className="bar-title">{intl.messages.level && intl.formatMessage({ id: 'level' })}</h4>
        <h4 className="bar-title">{intl.messages.verified && intl.formatMessage({ id: 'verified' })}</h4>
      </div>
      <Form
        onValuesChange={(changedValues) => handleSkillFormChange(changedValues)}
        form={skillForm}
        className="skill-form"
      >
        <ul className="cv-preview-bar-ul ul-left-side">
          {userSkills?.map((item, index) => (
            <li className="edit-skills" key={index}>
              <p className="left-side-list-name">{item.skill.content}</p>
              <Select
                placeholder={
                  intl.messages.AddLanguageLevelSelectPlaceholder &&
                  intl.formatMessage({ id: 'AddLanguageLevelSelectPlaceholder' })
                }
                name={`level$${item.id}`}
                initialValue={'Beginner'}
                className="level-select"
              >
                {skillLevels.map((option) => (
                  <SelectOption key={option.value} value={option.value}>
                    {option.label}
                  </SelectOption>
                ))}
              </Select>
              <Select className="verify-select" name={`verify$${item.skill.id}`} showSearch={false}>
                {verifyOption.map((option: any) => (
                  <SelectOption key={option.value} value={option.value}>
                    {option.label}
                  </SelectOption>
                ))}
              </Select>
              <span className="remove-button" onClick={() => handleOpenDeleteModal(item.id)}>
                <SvgSelector id="close-svg" />
              </span>
            </li>
          ))}
        </ul>
        {userSkills && userSkills?.length !== 15 && (
          <Dropdown menu={skillMenuProps} trigger={['click']}>
            <div className="add-button">
              <span>+ {intl.messages.addSkill && intl.formatMessage({ id: 'addSkill' })}</span>
            </div>
          </Dropdown>
        )}
      </Form>

      <Modal
        title={intl.messages.deleteSkillConiformTitle && intl.formatMessage({ id: 'deleteSkillConiformTitle' })}
        open={deletemodalvisible}
        onOk={handleDeleteSkill}
        confirmLoading={deleteSkillLoading}
        onCancel={handleCancel}
      >
        <p>{intl.messages.deleteSkillConiformText && intl.formatMessage({ id: 'deleteSkillConiformText' })}</p>
      </Modal>
    </>
  );
};
