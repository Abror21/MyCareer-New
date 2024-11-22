import { Popconfirm } from 'antd';
import SvgSelector from 'assets/icons/SvgSelector';
import { useFreelancerDataContext } from 'contexts/CreateCvContext/FreelancerData';
import { useSkillContext } from 'contexts/CreateCvContext/SkillContext';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useSearchParams } from 'react-router-dom';

export const SelectedSkills = () => {
  const { state, dispatch } = useSkillContext();
  const { state: freelancerDataState } = useFreelancerDataContext();

  const intl = useIntl();
  const [searchparams, setSearchparams] = useSearchParams();
  const addUser = searchparams.get('add-user') ? searchparams.get('add-user') : null;

  const handleDeleteSelectedSkill = (id: number | undefined) => {
    if (id) {
      dispatch({ type: 'DELETE_SKILL_DATA', payload: id });
    }
  };
  useEffect(() => {
    if (freelancerDataState.data) {
      if (addUser != 'mount') {
        const skillsData = freelancerDataState?.data?.skills?.map(({ level, skill, verified }) => ({
          level,
          skillId: skill?.id,
          verified: verified,
        }));
        dispatch({ type: 'SET_SKILL_DATA', payload: skillsData });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [freelancerDataState.data]);

  return (
    <div className="selected-skills">
      {state?.selectedSkills?.map((item, index) => {
        const skill = state.skills.find((m) => m.id === item?.skillId);
        return (
          <div className="skill-item" key={index}>
            <p>{skill?.content}</p>
            <span>{item?.level}</span>
            {!item.verified && (
                <Popconfirm
                  title={
                    intl.messages.popconiformDeleteSelectedData &&
                    intl.formatMessage({ id: 'popconiformDeleteSelectedData' })
                  }
                  description={
                    intl.messages.popconiformDeleteSelectedDataDesc &&
                    intl.formatMessage({ id: 'popconiformDeleteSelectedDataDesc' })
                  }
                  onConfirm={() => handleDeleteSelectedSkill(item.skillId)}
                  okText={intl.messages.yes && intl.formatMessage({ id: 'yes' })}
                  cancelText={intl.messages.no && intl.formatMessage({ id: 'no' })}
                >
                  <div className="close-icon">
                    <SvgSelector id="close-svg" />
                  </div>
                </Popconfirm>
            )}
          </div>
        );
      })}
    </div>
  );
};
