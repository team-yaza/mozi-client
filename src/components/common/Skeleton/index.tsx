import { CheckBox, CheckBoxContainer, Container, Description, Title, TodoContent } from './styles';

const Skeleton: React.FC = () => {
  return (
    <Container>
      <CheckBoxContainer>
        <CheckBox />
      </CheckBoxContainer>
      <TodoContent>
        <Title />
        <Description />
      </TodoContent>
    </Container>
  );
};

export default Skeleton;
