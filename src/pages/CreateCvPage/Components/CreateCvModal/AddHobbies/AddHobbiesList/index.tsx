import { Popconfirm } from 'antd';
import SvgSelector from 'assets/icons/SvgSelector';
import { useFreelancerDataContext } from 'contexts/CreateCvContext/FreelancerData';
import { useHobbyContext } from 'contexts/CreateCvContext/HobbiesContext';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useSearchParams } from 'react-router-dom';

export const AddHobbiesList = () => {
  const intl = useIntl();
  const [searchparams, setSearchparams] = useSearchParams();
  const addUser = searchparams.get('add-user') ? searchparams.get('add-user') : null;
  const { state, dispatch } = useHobbyContext();
  const { state: freelancerDataState } = useFreelancerDataContext();

  const handleDeleteSelectedHobby = (id: number) => {
    dispatch({ type: 'DELETE_HOBBY', payload: id });
  };

  useEffect(() => {
    if (freelancerDataState.data) {
      const hobbiesData = freelancerDataState?.data?.hobbies?.map(({ id, content }) => ({
        hobbyId: id,
        hobbyName: content,
        id: id,
      }));
      if (addUser != 'mount') {
        dispatch({ type: 'SET_HOBBY_DATA', payload: hobbiesData });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [freelancerDataState.data]);

  return (
    <div className="list">
      {state.selectedHobbies?.map((item) => (
        <div className="list-item" key={item.id}>
          {intl.messages[item?.hobbyName] && <p>{intl.formatMessage({id: item?.hobbyName})}</p>}
          <Popconfirm
            title={intl.messages.popconiformDeleteSelectedHobby && intl.formatMessage({ id: 'popconiformDeleteSelectedHobby' })}
            description={intl.messages.popconiformDeleteSelectedHobbyDesc && intl.formatMessage({ id: 'popconiformDeleteSelectedHobbyDesc' })}
            onConfirm={() => handleDeleteSelectedHobby(item.id)}
            okText={intl.messages.yes && intl.formatMessage({ id: 'yes' })}
            cancelText={intl.messages.no && intl.formatMessage({ id: 'no' })}
          >
            <div className="close-icon">
              <SvgSelector id="close-svg" />
            </div>
          </Popconfirm>
        </div>
      ))}
    </div>
  );
};
