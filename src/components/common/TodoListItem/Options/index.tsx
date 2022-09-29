import { useCallback, useState } from 'react';
import { UseMutateFunction } from '@tanstack/react-query';

import { TodoUpdateRequest } from '@/shared/types/todo';
import { Container, DefinedContainer, DefinedOption, UndefinedContainer, UndefinedOption } from './styles';
import Chip from '@/components/common/Chip';
import { PLACE } from '@/components/common/Figure';
import Portal from '@/components/common//Portal';
import AlertModal from '@/components/common/AlertModal';
import ModalBackground from '@/components/common/ModalBackground/index';

interface OptionsProps {
  id: string;
  locationName?: string;
  setIsMapOpened: React.Dispatch<React.SetStateAction<boolean>>;
  updateTodo: UseMutateFunction<any, unknown, TodoUpdateRequest, unknown>;
}

const Options: React.FC<OptionsProps> = ({ id, locationName, setIsMapOpened, updateTodo }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const onClickMap = useCallback(() => {
    setIsMapOpened((prevState) => !prevState);
  }, []);

  const onDeleteHandler = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setIsModalOpen((old) => !old);
  }, []);

  return (
    <Container>
      <DefinedContainer>
        {locationName && (
          <DefinedOption>
            <Chip
              type="location"
              Icon={<PLACE focused={false} />}
              content={locationName}
              backgroundColor="#F5F5F5"
              fontColor="#585858"
              onClickHandler={onClickMap}
              onDeleteHander={onDeleteHandler}
            />
          </DefinedOption>
        )}
      </DefinedContainer>
      <UndefinedContainer>
        {!locationName && (
          <UndefinedOption onClick={onClickMap}>
            <PLACE focused={true} />
          </UndefinedOption>
        )}
      </UndefinedContainer>
      {isModalOpen && (
        <Portal>
          <AlertModal id={id} updateTodo={updateTodo} setIsModalOpen={setIsModalOpen} />
          <ModalBackground setIsModalOpen={setIsModalOpen} />
        </Portal>
      )}
    </Container>
  );
};

export default Options;
