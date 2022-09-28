import { useCallback } from 'react';
import { Container, DefinedContainer, DefinedOption, UndefinedContainer, UndefinedOption } from './styles';
import Chip from '@/components/common/Chip';
import { PLACE } from '@/components/common/Figure';

interface OptionsProps {
  locationName?: string;
  setIsMapOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const Options: React.FC<OptionsProps> = ({ locationName, setIsMapOpened }) => {
  const onClickMap = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setIsMapOpened((prevState) => !prevState);
  }, []);

  return (
    <Container>
      <DefinedContainer>
        {locationName && (
          <DefinedOption onClick={onClickMap}>
            <Chip
              type="location"
              Icon={<PLACE focused={false} />}
              content={locationName}
              backgroundColor="#F5F5F5"
              fontColor="#585858"
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
    </Container>
  );
};

export default Options;
