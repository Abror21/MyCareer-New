import { FormInstance } from 'antd';
import { AddHobbiesForm } from './AddHobbiesForm';
import { AddHobbiesList } from './AddHobbiesList';
import { StyledAddHobies } from './style';

export const AddHobbies = ({hobbiesForm}:{hobbiesForm: FormInstance<any>}) => {
  return (
  
      <StyledAddHobies>
        <AddHobbiesForm hobbiesForm={hobbiesForm} />
        <AddHobbiesList />
      </StyledAddHobies>
  );
};
